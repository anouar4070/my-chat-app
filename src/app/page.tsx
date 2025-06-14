import { auth } from "@/auth";
import ClientSession from "@/components/ClientSession";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-row justify-around mt-20 gap-6">
      <div className="bg-green-50 p-10 rounded-xl shadow-md w-1/2 overflow-auto">
        <h3 className="text-2xl font-semibold">Server session data:</h3>
        {session ? (
          <div>
            <pre>{JSON.stringify(session, null, 2)}</pre>
          </div>
        ) : (
          <div>Not signed in</div>
        )}
      </div>
      <ClientSession />
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
