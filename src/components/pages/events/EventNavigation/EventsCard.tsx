import { Box, Flex, Icon, Spinner, Text } from "@chakra-ui/react";
import { MdOutlineArrowOutward } from "react-icons/md";
import useEventActions from "~/hooks/useEventActions";
import { CampusEventsData } from "~/types";
import { formatDate } from "~/utils/helpers";

import Image from "next/image";

interface EventsCardProp {
  event: CampusEventsData[0];
}

const EventsCard: React.FC<EventsCardProp> = ({ event }) => {
  const { redirectToEventPage, isRedirecting } = useEventActions();

  return (
    <Box>
      <Flex width={260} height={220} flexDir="column">
        <Box
          border="1px"
          borderRadius={20}
          borderColor="#181818"
          position="relative"
          overflow="hidden"
          width="100%"
          height="100%"
        >
          <Text
            position="absolute"
            zIndex={1}
            top={3}
            left={3}
            px={3}
            py={2}
            borderRadius={15}
            bg="rgba(255, 255, 255, 0.1)"
            color="white"
            fontSize="xx-small"
          >
            {event.eventType}
          </Text>
          <Icon
            onClick={() => redirectToEventPage(event)}
            _hover={{
              cursor: "pointer",
              bg: "white",
              color: "black",
              transition: "all 0.2s",
            }}
            transition="all 0.2s"
            borderRadius="50%"
            bg="rgba(255, 255, 255, 0.1)"
            backdropFilter="blur(8px)"
            boxSize={8}
            p={1}
            color="white"
            position="absolute"
            zIndex={1}
            bottom={3}
            right={2}
            as={isRedirecting ? Spinner : MdOutlineArrowOutward}
          />
          <Image
            alt="card_thumbnail"
            layout="fill"
            src={`${process.env.NEXT_PUBLIC_CLOUDFLARE_PUBLIC_URL}${event.thumbnail_url}`}
          />
        </Box>
      </Flex>
      <Flex gap={0.5} flexDir="column">
        <Flex mt={3} gap={1.5} align="center" color="white">
          <Text>{event.guestSpeakerName}</Text>
          <Box mt={1} borderRadius="50%" h={1} w={1} bg="#B4B4B4" />
          <Text color="#B4B4B4" mt={1} fontSize="small">
            {formatDate(event.talkDate)}
          </Text>
        </Flex>
        <Text fontSize="lg" color="white">
          {event.talkTitle}
        </Text>
      </Flex>
    </Box>
  );
};

export default EventsCard;
