'use client'

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ClientSession() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || status === "loading") {
    return <div className="w-1/2 bg-blue-50 p-10 rounded-xl shadow-md">Loading client session...</div>;
  }

  return (
    <div className="bg-blue-50 p-10 rounded-xl shadow-md w-1/2 overflow-auto">
      <h3 className="text-2xl font-semibold">Client session data:</h3>
      {session ? (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      ) : (
        <div>Not signed in</div>
      )}
    </div>
  );
}


/**
 'use client'

import { useSession } from "next-auth/react";

export default function ClientSession() {
  const session = useSession();
  return (
    <div className="bg-blue-50 p-10 rounded-xl shadow-md w-1/2 overflow-auto">
      <h3 className="text-2xl font-semibold">Client session data:</h3>
      {session ? (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      ) : (
        <div>Not signed in</div>
      )}
    </div>
  );
}
 */
