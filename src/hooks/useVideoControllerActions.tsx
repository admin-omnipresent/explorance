import { useVideoPlayStateAtom, useVideoSequenceAtom } from "~/lib/atom";

const useVideoControllerActions = () => {
  const [videoSequence, setVideoSequence] = useVideoSequenceAtom();
  const [videoPauseState, setVideoPauseState] = useVideoPlayStateAtom();

  const handleNavigation = (direction: boolean, videoCount: number) => {
    const nextSequence = () => {
      if (videoSequence.sequence < videoCount) {
        setVideoSequence({ sequence: videoSequence.sequence + 1 });
      }
    };

    const prevSequence = () => {
      if (videoSequence.sequence > 1) {
        setVideoSequence({ sequence: videoSequence.sequence - 1 });
      }
    };

    if (direction === false) {
      nextSequence();
    } else if (direction === true) {
      prevSequence();
    }
  };

  const handleVideoPauseState = () => {
    setVideoPauseState({ paused: !videoPauseState.paused });
  };

  const handleSkipNavigation = (videoNumber: number) => {
    setVideoSequence({ sequence: videoNumber });
  };

  return { handleNavigation, handleVideoPauseState, handleSkipNavigation };
};

export default useVideoControllerActions;
