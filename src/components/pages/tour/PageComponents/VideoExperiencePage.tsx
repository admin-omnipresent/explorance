import { Box, Button, Grid, GridItem } from "@chakra-ui/react";
import { WalkthroughData } from "~/types";

import React, { useEffect, useState } from "react";
import AiVideoContainer from "../VideoAvatar/AiVideoContainer";
import VoiceChatContainer from "../VoiceChat/VoiceChatContainer";
import VideoPlayerContainer from "../VideoPlayer/VideoPlayerContainer";
import { useVideoSequenceAtom } from "~/lib/atom";
import useServerSideActions from "~/hooks/useServerSideActions";
import VideoPlayerStatic from "../VideoPlayer/VideoPlayerStatic";

interface VideoExperiencePageProps {
  walkthroughData: WalkthroughData;
  isFetchingWalkthroughData: boolean;
}

const VideoExperiencePage: React.FC<VideoExperiencePageProps> = ({
  walkthroughData,
  isFetchingWalkthroughData,
}) => {
  const [displayPlayer, setDisplayPlayer] = useState<boolean>(false);
  const [selectedScript, setselectedScript] = useState<WalkthroughData>([]);
  const { scriptData, isLoading, loadExperience } = useServerSideActions();
  const [{ sequence }] = useVideoSequenceAtom();

  useEffect(() => {
    if (scriptData.length != 0) setDisplayPlayer(true);
    const filterVideo = scriptData.filter(
      (script) => parseInt(script.sequenceNumber) === 1
    );
    setselectedScript(filterVideo ?? null);
  }, [scriptData]);

  useEffect(() => {
    const filterVideo = scriptData.filter(
      (script) => parseInt(script.sequenceNumber) === sequence
    );
    setselectedScript(filterVideo ?? null);
  }, [sequence]);
  return (
    <Grid gap={3} p={3} h="full" templateColumns="1fr 5fr">
      <Grid gap={3} templateRows="2fr 1fr">
        <AiVideoContainer selectedScript={selectedScript} />
        <VoiceChatContainer />
      </Grid>
      <GridItem>
        {scriptData && scriptData.length > 0 ? (
          <VideoPlayerContainer
            displayPlayer={displayPlayer}
            selectedScript={selectedScript}
            walkthroughData={walkthroughData}
          />
        ) : (
          <VideoPlayerStatic
            isFetchingWalkthroughData={isFetchingWalkthroughData}
            isLoading={isLoading as boolean}
            loadExperience={loadExperience}
            walkthroughData={walkthroughData}
          />
        )}
      </GridItem>
    </Grid>
  );
};

export default VideoExperiencePage;
