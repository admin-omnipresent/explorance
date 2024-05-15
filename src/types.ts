import { chatMessagesSenders, videoDataType } from "./enums";

// Supabase Types
type TourDatabaseResponse = {
  sequence_number: string;
  tour_video: string;
  ai_video: string;
  video_type: videoDataType;
  captions_file: string;
};

type EventDatabaseResponse = {
  event_speaker_name: string;
  event_title: string;
  video_tags: string[];
  event_date: string;
  event_type: string[];
  event_video: string;
  event_guest_picture: string;
  event_slug: string;
  transcript_id: string;
};

// CDN Types
type BucketType = {
  ETag: string;
  Key: string;
};

// data types
type WalkthroughData = {
  sequenceNumber: string;
  videoFile: string;
  aiAvatarVideo: string;
  videoDataType: videoDataType;
  captionsFile: string;
}[];

type CampusEventsData = {
  guestSpeakerName: string;
  talkTitle: string;
  tags: string[];
  talkDate: string;
  eventType: string[];
  talkVideo: string;
  thumbnail_url: string;
  eventSlug: string;
  transcription_id: string;
}[];

type ChatMessages = {
  sender: chatMessagesSenders;
  content: string;
}[];

// atom state types
type videoSequenceAtomState = {
  sequence: number;
};

type responseWindowAtomState = {
  prompt: string;
  response: string;
};

type videoPlayState = {
  paused: boolean;
};

type selectedEventAtom = {
  selectedEvent: {
    guestSpeakerName: string;
    talkTitle: string;
    tags: string[];
    talkDate: string;
    eventType: string[];
    talkVideo: string;
    thumbnail_url: string;
    eventSlug: string;
    transcription_id: string;
  } | null;
};

export {
  type EventDatabaseResponse,
  type TourDatabaseResponse,
  type BucketType,
  type WalkthroughData,
  type CampusEventsData,
  type ChatMessages,
  type videoSequenceAtomState,
  type responseWindowAtomState,
  type videoPlayState,
  type selectedEventAtom,
};
