import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
} from "@chakra-ui/react";
import { IoSparklesSharp } from "react-icons/io5";
import { useState } from "react";
import useChatActions from "~/hooks/useChatActions";

const VideoControllerChat = () => {
  const { handleChatInput, executeChatPrompt } = useChatActions();

  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(true);
  const [chatInput, setChatInput] = useState<string>("");

  const [isGeneratingResponse, setIsGeneratingResponse] =
    useState<boolean>(false);

  return (
    <InputGroup w={80}>
      <InputLeftElement pb={2} pointerEvents="none">
        {isGeneratingResponse ? (
          <Spinner size="sm" color="white" />
        ) : (
          <Icon as={IoSparklesSharp} color="white" />
        )}
      </InputLeftElement>
      <Input
        h={8}
        fontSize="small"
        fontWeight={300}
        borderRadius={20}
        border="none"
        bg="rgba(255, 255, 255, 0.1)"
        color="white"
        onFocus={(e) => {
          setShowPlaceholder(false);
          e.target.value = ""; // check this to clear input feild
        }}
        onBlur={() => setShowPlaceholder(true)}
        onChange={(e) => handleChatInput(setChatInput, e.target.value)}
        onKeyDown={(e) => {
          executeChatPrompt(e, chatInput, setIsGeneratingResponse).catch(
            console.error
          );
        }}
        placeholder={showPlaceholder ? `Ask AI anything` : ""}
        _placeholder={{ color: "white" }}
      />
    </InputGroup>
  );
};

export default VideoControllerChat;
