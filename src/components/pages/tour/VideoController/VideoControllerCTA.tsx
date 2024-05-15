import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

interface VideoControlerProps {
  label?: string;
  icon: IconType;
  iconSize: number;
  handleOperation?: () => void;
}

const VideoControllerCTA: React.FC<VideoControlerProps> = ({
  icon,
  label,
  iconSize,
  handleOperation,
}) => {
  return (
    <Button
      borderRadius={20}
      p={2}
      h={8}
      bg="rgba(255, 255, 255, 0.1)"
      variant="none"
      color="white"
      _hover={{
        color: "#1E1E1E",
        bg: "white",
      }}
      onClick={handleOperation}
    >
      <Flex align="center" gap={2}>
        <Icon boxSize={iconSize} as={icon} />
        {label ? (
          <Text fontWeight={300} fontSize="small">
            {label}
          </Text>
        ) : (
          <></>
        )}
      </Flex>
    </Button>
  );
};

export default VideoControllerCTA;
