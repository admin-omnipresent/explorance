import { Flex, Icon, Text } from "@chakra-ui/react";
import { MotionBox } from "~/lib/framer";
import { IoSparklesSharp } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";
import { useEffect, useState } from "react";
import { useResponseWindowAtom } from "~/lib/atom";
import Markdown from "react-markdown";

const ChatResponseWindow = () => {
  const [{ prompt, response }, setResponseWindowAtom] = useResponseWindowAtom();
  const [displayResponseWindow, setDisplayResponseWindow] =
    useState<boolean>(false);

  useEffect(() => {
    if (prompt.trim() !== "" && response.trim() !== "") {
      setDisplayResponseWindow(true);
    } else {
      setDisplayResponseWindow(false);
    }
  }, [prompt, response]);

  const closeResponseWindow = () => {
    setDisplayResponseWindow(false);
    setResponseWindowAtom({ prompt: "", response: "" });
  };

  return (
    displayResponseWindow && (
      <MotionBox
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        bg="rgba(0, 0, 0, 0.6)"
        backdropFilter="blur(20px)"
        borderRadius={20}
        p={6}
        w={600}
        bottom={"100px"}
        position="absolute"
      >
        <Flex gap={3} flexDir="column">
          <Flex
            align="start"
            color="purple.200"
            w="full"
            justify="space-between"
          >
            <Flex align="center" gap={3}>
              <Icon boxSize={4} as={IoSparklesSharp} />
              <Text fontSize="15px">{prompt}</Text>
            </Flex>
            <Icon
              transition="all 0.3s ease-in-out"
              cursor="pointer"
              _hover={{ color: "red.400" }}
              onClick={closeResponseWindow}
              color="purple.300"
              boxSize={4}
              as={MdOutlineClose}
            />
          </Flex>
          <Text lineHeight="155.5%" color="white">
            <Markdown>{response}</Markdown>
          </Text>
        </Flex>
      </MotionBox>
    )
  );
};

export default ChatResponseWindow;
