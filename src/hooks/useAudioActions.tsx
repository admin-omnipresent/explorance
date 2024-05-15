import { useEffect, useRef, useState } from "react";
import { api } from "~/utils/api";
import { convertAudioFileToBase64 } from "~/utils/fileToBase64";
import player from "play-sound";
import axios from "axios";
import { useVideoPlayStateAtom } from "~/lib/atom";

const useAudioActions = () => {
  const audioPlayer = player();

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>();
  const [userAudioChunks, setUserAudioChunks] = useState<Blob[]>([]);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isResponding, setIsResponding] = useState<boolean>(false);

  // const [audioUrl, setAudioUrl] = useState("");

  // const [audioBuffer, setAudioBuffer] = useState(null);
  // const [audioSource, setAudioSource] = useState(null);

  const transcribeAudioMut = api.openAI.transcribeAudio.useMutation();
  const chatCompletionsMut = api.openAI.chatCompletions.useMutation();

  const [{ paused }, setVideoPauseState] = useVideoPlayStateAtom();

  const initiateRecording = async () => {
    try {
      setVideoPauseState({ paused: !paused });

      const audio_stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const mediaRecorder = new MediaRecorder(audio_stream);
      const audioContext = new AudioContext();

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);

      const source = audioContext.createMediaStreamSource(audio_stream);
      const analyzer = audioContext.createAnalyser();
      analyzer.fftSize = 32;

      const dataArray = new Uint8Array(analyzer.frequencyBinCount);

      source.connect(analyzer);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          setUserAudioChunks((prevChunks) => [...prevChunks, event.data]);
        }
      };

      const updateIsSpeaking = () => {
        analyzer.getByteFrequencyData(dataArray);
        const average =
          dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
        setIsSpeaking(average > 100); // Adjust threshold as needed
        requestAnimationFrame(updateIsSpeaking);
      };

      updateIsSpeaking();
    } catch (err) {
      console.error("Error in accessing media devices: ", err);
    }
  };

  const exportAudio = () => {
    if (userAudioChunks.length > 0) {
      const blob = new Blob(userAudioChunks, { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "recorded_audio.mp3";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setUserAudioChunks([]);
    }
  };

  // const playAudio = (aiAudioBuffer: Buffer) => {
  //   const blob = new Blob([aiAudioBuffer], { type: "audio/mp3" });

  //   const objectURL = URL.createObjectURL(blob);

  //   const audioElem = new Audio();

  //   audioElem.src = objectURL;
  //   audioElem.play();
  // };

  const playAudio = (audioData: string) => {
    // Assuming audioData is a Base64 encoded string of the audio
    const audioBlob = new Blob([Buffer.from(audioData, "base64")], {
      type: "audio/mpeg",
    });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audioElem = new Audio(audioUrl);
    audioElem
      .play()
      .catch((error) => console.error("Failed to play audio:", error));
  };

  const [isDataAvailable, setIsDataAvailable] = useState(false);

  useEffect(() => {
    const handleUserEndRecording = async () => {
      if (userAudioChunks.length > 0) {
        setIsResponding(true);
        const blob = new Blob(userAudioChunks, { type: "audio/mpeg" });
        const audioFile = new File([blob], "user_input.mp3", {
          type: "audio/mpeg",
        });
        const audioBase64 = await convertAudioFileToBase64(audioFile);

        const transcribedData = await transcribeAudioMut.mutateAsync({
          audioFileBase64: audioBase64 ?? "",
        });

        const completionsData = await chatCompletionsMut.mutateAsync({
          prompt: transcribedData.transcribed_response.text,
        });

        const response = await axios.post<{
          audio: string;
          message: string;
          status: string;
        }>("https://snu-explorance.somesh.xyz/ai/snu-explorance-ai/audio", {
          query: transcribedData.transcribed_response.text,
        });

        playAudio(response.data?.audio);

        console.log({
          transcribedData,
          completionsData,
        });

        setUserAudioChunks([]);

        setIsResponding(false);
      }
    };

    if (isDataAvailable && userAudioChunks.length > 0) {
      // Reset isDataAvailable to false after processing
      const asyncF = async () => {
        await handleUserEndRecording();
        setIsDataAvailable(false);
      };

      asyncF().catch(console.error);
    }
  }, [userAudioChunks, isDataAvailable]);

  const endRecording = async () => {
    setVideoPauseState({ paused: !paused });
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // setUserAudioChunks([]);
      setIsDataAvailable(true);
      mediaRecorderRef.current = null;
      console.log("Recording terminated");
    }
  };

  return {
    initiateRecording,
    endRecording,
    isRecording,
    isSpeaking,
    isResponding,
    exportAudio,
  };
};

export default useAudioActions;
