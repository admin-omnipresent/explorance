import { Box, Circle, Flex, Spinner, Text } from "@chakra-ui/react";
import SearchBar from "../EventNavigation/SearchBar";
import { CampusEventsData } from "~/types";
import EventsView from "../EventNavigation/EventsView";

interface EventsLandingPageProps {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  campusEventsData: CampusEventsData;
}

const EventsLandingPage: React.FC<EventsLandingPageProps> = ({
  campusEventsData,
  handleSearch,
}) => {
  return (
    <Box overflowX="hidden" position="relative" bg="#121212" h="100vh">
      <Circle
        position="absolute"
        left={-450}
        top={0}
        bg="#9747FF"
        filter="blur(250px)"
        size="lg"
      />
      <Circle
        position="absolute"
        right={-450}
        top={0}
        bg="#9747FF"
        filter="blur(250px)"
        size="lg"
      />
      <Flex
        justify="center"
        w="full"
        align="center"
        gap={10}
        zIndex={1}
        flexDir="column"
      >
        <Flex gap={10} w={1000} flexDir="column">
          <Flex gap={3} mt={150} align="center" flexDir="column">
            <Box
              borderRadius={20}
              px={4}
              py={2}
              bg="#181818"
              border="1px solid"
              borderColor="#4B4B4B"
              fontSize="small"
              color="#A4A4A4"
            >
              Upcoming Events
            </Box>
            <Text
              textAlign="center"
              maxW={900}
              fontSize="6xl"
              fontWeight={600}
              lineHeight={"120%"}
              color="white"
            >
              Stay Ahead in Today&apos;s Dynamic Landscape
            </Text>
            <Text
              textAlign="center"
              maxW={490}
              fontWeight={200}
              color="#A4A4A4"
              fontSize="16px"
              lineHeight="136.1%"
            >
              Explore our diverse range of upcoming events featuring industry
              experts sharing insights on cutting-edge topics.
            </Text>
            <SearchBar handleTypeEvent={handleSearch} />
            {/* <Flex w="full" color="white" bg="yellow">
              {uniqueTags && uniqueTags.length > 0 ? (
                <Spinner color="purple" />
              ) : (
                <Flex w="full">
                  {uniqueTags.map((tag) => {
                    return <Text>{tag}</Text>;
                  })}
                </Flex>
              )}
            </Flex> */}
          </Flex>
          {campusEventsData && campusEventsData.length > 0 ? (
            <EventsView campusEvents={campusEventsData} />
          ) : (
            <Spinner />
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default EventsLandingPage;
