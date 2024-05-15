import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
} from "@chakra-ui/react";

import { IoChatboxEllipses } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { ChatMessages } from "~/types";
import { chatMessagesSenders } from "~/enums";

interface ChatProps {
  setInput: (input_value: string) => void;
  handleSendQueryToAi: (user_input: string, transcript_id: string) => void;
  user_input: string;
  transcription_id: string;
  chatMessages: ChatMessages;
  isResponding: boolean;
}

const Chat: React.FC<ChatProps> = ({
  handleSendQueryToAi,
  setInput,
  transcription_id,
  user_input,
  chatMessages,
  isResponding,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendQueryToAi(user_input, transcription_id);
    }
  };

  return (
    <Box overflowY={"auto"} h={300} borderRadius={20} bg="#181818">
      <Flex pb={3.5} gap={3} h="full" justify="flex-end" flexDir="column">
        {chatMessages && chatMessages.length > 0 ? (
          <Flex
            gap={3}
            flexDir="column"
            p={2}
            h="flex-grow"
            overflowY="auto"
            transition="all 0.3s"
          >
            {chatMessages.map((chat, index) => {
              return (
                <Flex
                  key={index}
                  justify={
                    chat.sender === chatMessagesSenders.User
                      ? "flex-end"
                      : "flex-start"
                  }
                  px={2}
                  w="full"
                >
                  <Box
                    fontSize="small"
                    borderRadius={10}
                    bg={
                      chat.sender === chatMessagesSenders.User
                        ? "#1B1B1B"
                        : "purple.500"
                    }
                    px={3}
                    py={1}
                    border={
                      chat.sender === chatMessagesSenders.User
                        ? "1px solid"
                        : ""
                    }
                    borderColor={
                      chat.sender === chatMessagesSenders.User
                        ? "rgba(255, 255, 255, 0.1)"
                        : ""
                    }
                    color="white"
                    transition="all 0.3s"
                  >
                    {chat.content}
                  </Box>
                </Flex>
              );
            })}
          </Flex>
        ) : (
          <Flex justify="center" align="center" h="full">
            <Flex gap={2} align="center" flexDir="column">
              <Icon
                color="white"
                bg="#1B1B1B"
                border="1px"
                borderColor="rgba(255, 255, 255, 0.1)"
                borderRadius="50%"
                p={2}
                boxSize={14}
                as={IoChatboxEllipses}
              />
              <Text color="white" fontWeight={600}>
                Start a new conversation
              </Text>
              <Text color="#A4A4A4" textAlign="center" fontSize="small">
                Begin chatting with AI. You never know what interesting
                conversations might come up!
              </Text>
            </Flex>
          </Flex>
        )}
        <Flex justify="center">
          <InputGroup px={3} w={"100%"}>
            <Input
              borderRadius={10}
              color="white"
              bg="#1B1B1B"
              border="1px"
              borderColor="rgba(255, 255, 255, 0.1)"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask AI anything"
              fontSize="small"
              onKeyDown={handleKeyDown}
              _hover={{
                borderColor: "purple.500",
              }}
              _placeholder={{
                color: "rgba(255, 255, 255, 0.6)",
              }}
            />
            <InputRightElement mr={3}>
              {isResponding ? (
                <Spinner color="purple.500" />
              ) : (
                <Icon
                  onClick={() =>
                    handleSendQueryToAi(user_input, transcription_id)
                  }
                  _hover={{
                    cursor: "pointer",
                    bg: "white",
                    color: "#1B1B1B",
                  }}
                  color="white"
                  bg="#1B1B1B"
                  borderRadius="20%"
                  p={0.5}
                  boxSize={7}
                  as={IoIosSend}
                  transition="all 0.2s"
                />
              )}
            </InputRightElement>
          </InputGroup>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Chat;
