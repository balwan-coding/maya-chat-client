import { usersAdapter } from "../slices/usersSlice";
import type { State } from "../store";

export const usersSelectors = usersAdapter.getSelectors(
  (state: State) => state.users
);
