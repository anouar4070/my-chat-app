import { auth, signOut } from '@/auth';
import { Button } from "@heroui/button";
import { FaRegSmile } from "react-icons/fa";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <h1 className="text-3xl">hello</h1>
      <h3 className="text-2xl font-semibold">User session data:</h3>
      {session ? (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button
              type="submit"
              color="primary"
              variant="bordered"
              startContent={<FaRegSmile size={20} />}
            >
              Sign out
            </Button>
          </form>
        </div>
      ) : (
        <div>Not signed in</div>
      )}
    </div>
  );
}

/**
 <form
  action={async () => {
    "use server";
    await signOut();
  }}
>
   ✅ Why this works:
action={...}: This uses Next.js Server Actions, a new way to handle form submissions server-side without having to create a separate API route.

"use server": This directive marks the function as a server action—Next.js will run this function only on the server, not in the browser.

await signOut(): You can call server-only logic (like auth functions, database calls, etc.) directly in this action.
 */
