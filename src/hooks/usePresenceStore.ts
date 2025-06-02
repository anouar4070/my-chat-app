import { create } from "zustand";
import { devtools } from "zustand/middleware";

type PresenceState = {
  members: string[];                // List of current member IDs
  add: (id: string) => void;        // Function to add a member
  remove: (id: string) => void;     // Function to remove a member
  set: (ids: string[]) => void;    // Function to replace the whole members list
};

// Create the Zustand store with devtools middleware for debugging
const usePresenceStore = create<PresenceState>()(devtools((set) => ({
  members: [],
  add: (id) => set((state) => ({members: [...state.members, id]})),
  remove: (id) => set((state) => ({members: state.members.filter(member => member !== id)})),
  set: (ids) => set({members: ids})
}),
{name: 'PresenceStore'}  // Devtools store name
))

export default usePresenceStore;
