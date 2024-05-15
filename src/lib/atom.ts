import { atom, useAtom } from "jotai";
import { atomWithStorage, selectAtom } from "jotai/utils";
import {
  videoSequenceAtomState,
  responseWindowAtomState,
  videoPlayState,
  selectedEventAtom,
} from "~/types";

export const VideoSequenceAtom = atom<videoSequenceAtomState>({
  sequence: 1,
});

export const ResponseWindowAtom = atom<responseWindowAtomState>({
  prompt: "",
  response: "",
});

export const VideoPlayAtom = atom<videoPlayState>({
  paused: true,
});

export const CampusEventsAtom = atomWithStorage<selectedEventAtom>(
  "selectedEventAtom",
  {
    selectedEvent: null,
  }
);

export const useVideoSequenceAtom = () => useAtom(VideoSequenceAtom);
export const useResponseWindowAtom = () => useAtom(ResponseWindowAtom);
export const useVideoPlayStateAtom = () => useAtom(VideoPlayAtom);
export const useCampusEventsAtom = () => useAtom(CampusEventsAtom);
