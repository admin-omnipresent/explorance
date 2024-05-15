import {
  Box,
  Button,
  Circle,
  Flex,
  Icon,
  Text,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { WalkthroughData } from "~/types";
import { MotionBox } from "~/lib/framer";
import { IoSparklesSharp } from "react-icons/io5";
import { shiningAnimation } from "~/lib/keyframes";

import React from "react";
import NextImage, { StaticImageData } from "next/image";
import TextArt from "../../../../../public/textArt.svg";

interface VideoPlayerStaticProps {
  loadExperience: (input: WalkthroughData) => void;
  walkthroughData: WalkthroughData;
  isLoading: boolean;
  isFetchingWalkthroughData: boolean;
}

const VideoPlayerStatic: React.FC<VideoPlayerStaticProps> = ({
  loadExperience,
  walkthroughData,
  isLoading,
  isFetchingWalkthroughData,
}) => {
  return (
    <Flex
      position="relative"
      flexDir="column"
      align="center"
      w="full"
      maxH="full"
      bg="red"
      borderRadius={22}
      backgroundColor="#1E1E1E"
      p={7}
    >
      <Flex zIndex={2} pt={5} gap={2} align="center" flexDir="column">
        <Text
          filter="drop-shadow(0px 0px 90px #9747FF)"
          bg="#181818"
          py={2}
          px={5}
          border="solid 2px"
          borderRadius={44}
          borderColor="#4B4B4B"
          color="#A4A4A4"
          textAlign="center"
        >
          Explore Shiv Nadar IoE with the power of AI
        </Text>
        <Box mt={5}>
          <NextImage
            src={TextArt as StaticImageData}
            width={900}
            height={900}
            alt="Text Art"
          />
        </Box>
        <Box position="relative">
          <MotionBox
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            zIndex={1}
            right={0}
            top={3}
            position="absolute"
          >
            <Icon
              zIndex={1}
              right={0}
              top={3}
              filter="drop-shadow(0px 10px 10px #9747FF)"
              borderColor="#9747FF"
              boxSize={5}
              color="white"
              as={IoSparklesSharp}
              animation={`${shiningAnimation} 2s linear infinite`}
            />
          </MotionBox>
          {isFetchingWalkthroughData ? (
            <Spinner />
          ) : (
            <Button
              mb={5}
              border="1px solid"
              borderColor="#4B4B4B"
              _hover={{
                bg: "gray.100",
                color: "#181818",
              }}
              px={6}
              py={5}
              fontWeight={500}
              isLoading={isLoading}
              color="gray.100"
              bg="#181818"
              mt={6}
              onClick={() => loadExperience(walkthroughData)}
            >
              Start Exploring Now
            </Button>
          )}
        </Box>
      </Flex>
      <Image
        src="/SNUBG.png"
        width="100%"
        height="48vh"
        alt="SNU Background"
        borderRadius="22px"
      />
    </Flex>
  );
};

export default VideoPlayerStatic;
