// chat selectore

import { chatAdapter } from "../slices/chatSlice";
import type { State } from "../store";

export const chatSelectors = chatAdapter.getSelectors(
  (state: State) => state.chat
);
