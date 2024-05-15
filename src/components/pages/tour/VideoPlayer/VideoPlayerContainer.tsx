import { Flex, Text } from "@chakra-ui/react";
//test
import VideoPlayer from "./VideoPlayer";
import VideoController from "../VideoController/VideoController";
import { WalkthroughData } from "~/types";
import ChatResponseWindow from "../TextChat/ChatResponseWindow";
import TourNavigation from "../TourNavigation/TourNavigation";
import { useState } from "react";

interface VideoPlayerProps {
  walkthroughData: WalkthroughData;
  displayPlayer: boolean;
  selectedScript: WalkthroughData;
}

const VideoPlayerContainer: React.FC<VideoPlayerProps> = ({
  displayPlayer,
  selectedScript,
  walkthroughData,
}) => {
  const [showNavigator, SetShowNavigator] = useState<boolean>(false);
  const [showCaptions, SetShowCaptions] = useState<boolean>(false);
  return (
    <Flex h="full" borderRadius={22} w="full" bg="#1E1E1E" flexDir="column">
      <Flex
        h="full"
        align="center"
        justify="center"
        w="full"
        position="relative"
      >
        {walkthroughData && walkthroughData.length > 0 ? (
          <VideoPlayer
            captionsFile={selectedScript[0]?.captionsFile ?? ""}
            volume={0.2}
            videoFile={selectedScript[0]?.videoFile}
            showCaptions={showCaptions}
          />
        ) : (
          <Text>Nothing to play right now</Text>
        )}

        <ChatResponseWindow />
        <TourNavigation
          displayNavigationModal={showNavigator}
          hideNavigationModal={() => SetShowNavigator(false)}
        />

        <VideoController
          showNavigator={showNavigator}
          SetShowNavigator={SetShowNavigator}
          showCaptions={showCaptions}
          SetShowCaptions={SetShowCaptions}
          walkthroughData={walkthroughData}
          videoCount={walkthroughData.length}
          displayState={displayPlayer}
        />
      </Flex>
    </Flex>
  );
};

export default VideoPlayerContainer;
