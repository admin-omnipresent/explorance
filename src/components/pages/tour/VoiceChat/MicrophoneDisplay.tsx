import { Circle, Flex, Icon, Text } from "@chakra-ui/react";
import { FaMicrophone } from "react-icons/fa";

interface MicrophoneDisplayProps {
  isRecording: boolean | undefined;
  isSpeaking: boolean | undefined;
  isResponding: boolean | undefined;
  startRecording: () => void;
  endRecording: () => void;
}

const MicrophoneDisplay: React.FC<MicrophoneDisplayProps> = ({
  isRecording,
  isSpeaking,
  isResponding,
  endRecording,
  startRecording,
}) => {
  return (
    <>
      <Circle
        transition="all 0.3s ease-in-out"
        _hover={{ cursor: "pointer" }}
        onClick={isRecording ? endRecording : startRecording}
        p={3}
        bg={
          isRecording ? (isSpeaking ? "rgba(0, 0, 0, 0.2)" : "black") : "black"
        }
      >
        <Icon boxSize={8} as={FaMicrophone} />
      </Circle>
      <Text fontSize="small">
        {isRecording
          ? `Listening`
          : isResponding
            ? `Processing Request`
            : `Talk to me`}
      </Text>
    </>
  );
};

export default MicrophoneDisplay;
