import { getUnapprovedPhotos } from "@/app/actions/adminActions"
import MemberPhotos from "@/components/MemberPhotos"
import { Divider } from "@heroui/divider"

export const dynamic = 'force-dynamic';

export default async function PhotoModerationPage() {
  const photos = await getUnapprovedPhotos()
  return (
    <div className="flex flex-col mt-10 gap-3">
   <h3 className="text-2xl">Photos awaiting moderation</h3>
   <Divider />
   <MemberPhotos photos={photos} />
    </div>
  )
}


/**
 We’re using force-dynamic because:
 This tells Next.js:
➡️ "Always render this page on the server, on every request."

✅ we want fresh, server-side-rendered data.

✅ we're calling a server action (getUnapprovedPhotos()).

we could use useEffect, but it:

✅ Would be slower for users,

✅ Requires exposing a client-safe API route, and

✅ Might not be ideal for admin/moderation tools.
 */