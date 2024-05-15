import { Box, Spinner } from "@chakra-ui/react";
import EventVideoPlayer from "./EventVideoPlayerContainer";
import { CampusEventsData } from "~/types";

interface EventVideoPlayerContainerProps {
  selectedEvent: CampusEventsData[0] | null;
}

const EventVideoPlayerContainer: React.FC<EventVideoPlayerContainerProps> = ({
  selectedEvent,
}) => {
  return (
    <Box>
      {selectedEvent ? (
        <EventVideoPlayer selectedEvent={selectedEvent} />
      ) : (
        <Spinner />
      )}
    </Box>
  );
};

export default EventVideoPlayerContainer;
