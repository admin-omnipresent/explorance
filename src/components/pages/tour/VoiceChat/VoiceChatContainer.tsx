import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { PiSealWarningFill } from "react-icons/pi";
import { useVideoPlayStateAtom } from "~/lib/atom";

import VoiceChat from "./VoiceChat";
import { MotionBox } from "~/lib/framer";

const VoiceChatContainer = () => {
  const [{ paused }] = useVideoPlayStateAtom();
  return (
    <Flex
      justify="center"
      align="center"
      backgroundColor="#1E1E1E"
      borderRadius={22}
      flexDir="column"
    >
      <VoiceChat />
    </Flex>
  );
};

export default VoiceChatContainer;
