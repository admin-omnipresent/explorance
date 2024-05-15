import { Circle, Icon, Text } from "@chakra-ui/react";
import { MdOutlineArrowBackIos } from "react-icons/md";
import useVideoControllerActions from "~/hooks/useVideoControllerActions";
import { WalkthroughData } from "~/types";

interface VideoControllerNavigatorProps {
  direction: boolean; // true for left and false for right
  videoCount: number;
  walkthroughData: WalkthroughData;
}

const VideoControllerNavigator: React.FC<VideoControllerNavigatorProps> = ({
  direction,
  videoCount,
  walkthroughData,
}) => {
  const { handleNavigation } = useVideoControllerActions();
  return (
    <Circle
      onClick={() => handleNavigation(direction, videoCount)}
      _hover={{
        bg: "white",
        color: "black",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out", //@somesh have a look at easing out of animations for hover
      }}
      p={2}
      bg="rgba(255, 255, 255, 0.1)"
      color="white"
    >
      <Icon
        boxSize={3.5}
        transform={direction ? "" : "rotate(180deg)"}
        as={MdOutlineArrowBackIos}
      />
    </Circle>
  );
};

export default VideoControllerNavigator;
