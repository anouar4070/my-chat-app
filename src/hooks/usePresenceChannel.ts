import { useCallback, useEffect, useRef } from "react";
import usePresenceStore from "./usePresenceStore"
import { Channel, Members } from "pusher-js";
import { pusherClient } from "@/lib/pusher";

// Custom React hook to manage a Pusher presence channel
export const usePresenceChannel = () => {

  // Extract set, add, and remove functions from the presence store 
  const {set, add, remove} = usePresenceStore(state => ({
    set: state.set,
    add: state.add,
    remove: state.remove,
  }));

// Ref to hold the Pusher channel instance
const channelRef = useRef<Channel | null>(null)

 // Memoized function to set the full list of member IDs in the store
const handleSetMembers = useCallback((memberIds: string[]) => {
set(memberIds)
}, [set])

  // Memoized function to add a new member ID to the store
const handleAddMember = useCallback((memberId: string) => {
add(memberId)
}, [add])

// Memoized function to remove a member ID from the store
const handleRemoveMember = useCallback((memberId: string) => {
remove(memberId)
}, [remove])

 // Effect runs on mount to subscribe to the Pusher presence channel
  useEffect(() => {
    if(!channelRef.current){
       // Subscribe to the 'presence-nm' channel
      channelRef.current = pusherClient.subscribe('presence-nm')

      // When subscription succeeds, set the initial list of members
      channelRef.current.bind('pusher:subscription_succeeded', (members: Members) => {
        handleSetMembers(Object.keys(members.members))
      })

      // When a new member joins, add him to the store
       channelRef.current.bind('pusher:member_added', (member: {id: string}) => {
        handleAddMember(member.id)
      })

      // When a member leaves, remove him from the store
       channelRef.current.bind('pusher:member_removed', (member: {id: string}) => {
        handleRemoveMember(member.id)
      })
    }

    // Cleanup when the component unmounts
    return () => {
      if(channelRef.current && channelRef.current.subscribed) {
        channelRef.current.unsubscribe();
        channelRef.current.unbind_all();
      }
    }
  }, [handleAddMember, handleRemoveMember, handleSetMembers])
  
}