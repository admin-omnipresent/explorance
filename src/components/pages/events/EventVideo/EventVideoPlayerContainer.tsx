import ReactPlayer from "react-player";
import { CampusEventsData, selectedEventAtom } from "~/types";

interface EventVideoPlayerProps {
  selectedEvent: CampusEventsData[0] | null;
}

const EventVideoPlayer: React.FC<EventVideoPlayerProps> = ({
  selectedEvent,
}) => {
  return (
    <ReactPlayer
      playing={false}
      controls={true}
      height="100%"
      width="100%"
      url={`${process.env.NEXT_PUBLIC_CLOUDFLARE_PUBLIC_URL}${selectedEvent?.talkVideo}`}
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        position: "absolute",
        objectFit: "cover",
      }}
    />
  );
};

export default EventVideoPlayer;
