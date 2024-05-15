import {
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { IoSearchOutline } from "react-icons/io5";
import { PiCommand } from "react-icons/pi";

interface SearchBarProps {
  handleTypeEvent: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleTypeEvent }) => {
  return (
    <InputGroup mt={8} maxW={600}>
      <InputLeftElement pointerEvents="none">
        <Icon boxSize={5} color="#9A9FA5" as={IoSearchOutline} />
      </InputLeftElement>
      <Input
        color="white"
        bg="#181818"
        border="1px solid"
        borderColor="#4B4B4B"
        py={4}
        borderRadius={22}
        placeholder="Search upcoming events"
        _placeholder={{ color: "#9A9FA5" }}
        _focus={{ borderColor: "#9747FF" }}
        _hover={{
          borderColor: "#9747FF",
        }}
        onChange={(e) => handleTypeEvent(e)}
      />
      <InputRightElement mr={2} pointerEvents="none">
        <Flex
          borderRadius={18}
          align="center"
          gap={1}
          py={1}
          px={2}
          bg="#121212"
        >
          <Icon color="white" as={PiCommand} />
          <Text fontSize="small" color="white">
            F
          </Text>
        </Flex>
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchBar;
