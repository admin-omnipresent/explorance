import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { IoSparklesSharp } from "react-icons/io5";
import { MotionBox, MotionCircle } from "~/lib/framer";
import { shiningAnimation } from "~/lib/keyframes";
import { WalkthroughData } from "~/types";

interface BeginExperiencePageProps {
  loadExperience: (data: WalkthroughData) => void;
  walkthroughData: WalkthroughData;
  isLoading: boolean;
}

const BeginExperiencePage: React.FC<BeginExperiencePageProps> = ({
  loadExperience,
  walkthroughData,
  isLoading,
}) => {
  return (
    <Flex
      justify="center"
      align="center"
      h="full"
      w="full"
      position="relative"
      overflow="hidden"
    >
      <MotionCircle
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        top={-560}
        position="absolute"
        bg="purple"
        size="2xl"
        filter="blur(250px)"
      />
      <MotionCircle
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        bottom={-560}
        position="absolute"
        bg="purple"
        size="2xl"
        filter="blur(250px)"
      />
      <MotionBox
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Flex zIndex={1} align="center" flexDir="column">
          <Text fontSize="7xl" fontWeight={600} color="white">
            Virtual Campus Tour
          </Text>
          <Text
            textAlign="center"
            maxW={490}
            fontWeight={200}
            color={"rgba(255, 255, 255, 0.4)"}
            fontSize="lg"
          >
            Embark on an immersive journey through our campus from the comfort
            of your own device.
          </Text>
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
                boxSize={6}
                color="white"
                as={IoSparklesSharp}
                animation={`${shiningAnimation} 2s linear infinite`}
              />
            </MotionBox>
            <Button
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
          </Box>
        </Flex>
      </MotionBox>
    </Flex>
  );
};

export default BeginExperiencePage;
