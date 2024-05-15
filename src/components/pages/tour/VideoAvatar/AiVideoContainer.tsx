import { Flex, Spinner, Text } from "@chakra-ui/react";
import AiVideoPlayer from "./AiVideoPlayer";
import React from "react";
import { WalkthroughData } from "~/types";
// import ReactPlayer from "react-player";

import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface AiVideoContainerProps {
  selectedScript: WalkthroughData;
}

export const AiVideoContainer: React.FC<AiVideoContainerProps> = ({
  selectedScript,
}) => {
  return (
    <Flex
      borderRadius={22}
      backgroundColor="#1E1E1E"
      justifyContent="center"
      alignItems="center"
      width="full" // Make the container full width
      height="full" // Make the container full height
      position="relative" // Ensure positioning context for the absolute-positioned child
      overflow="hidden" // Hide overflow to prevent scrollbars
    >
      {selectedScript && selectedScript.length > 0 ? (
        <AiVideoPlayer videoFile={selectedScript[0]?.aiAvatarVideo} />
      ) : (
        <ReactPlayer
          url={`https://pub-75274250b3dd42109b51e593903a7d41.r2.dev/AI_guide_Introduction.mp4`}
          playing={true}
          loop={true}
          width="100%"
          // controls={true}
          height="100%"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            objectFit: "cover",
          }}
        />
      )}
    </Flex>
  );
};

export default AiVideoContainer;
