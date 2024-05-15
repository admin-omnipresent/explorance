import { Grid } from "@chakra-ui/react";
import { CampusEventsData } from "~/types";

import EventsCard from "./EventsCard";

interface EventsViewProps {
  campusEvents: CampusEventsData;
}

const EventsView: React.FC<EventsViewProps> = ({ campusEvents }) => {
  return (
    <Grid w="full" rowGap={10} templateColumns="repeat(3,1fr)">
      {campusEvents.map((event, index) => {
        return <EventsCard event={event} key={index} />;
      })}
    </Grid>
  );
};

export default EventsView;
