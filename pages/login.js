import { useEffect, useState } from "react";
import { signIn, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [providers, setProviders] = useState({});

  useEffect(() => {
    (async () => {
      const providers = await getProviders();
      setProviders(providers);
    })();
  }, [providers]);

  if (status !== "loading" && status === "authenticated") {
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>Login - My Next App</title>
      </Head>
      <div className="container min-w-full min-h-screen flex justify-center items-center ">
        <div className="grid grid-cols-5 gap-5">
          {
            /* Rendering the buttons for each provider. */
            providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.name} className="col-span-3 col-start-2 ">
                  <button
                    onClick={() => signIn(provider.id)}
                    className="w-full bg-sky-500 px-5 py-3 text-white text-center font-bold rounded-lg hover:bg-sky-600 focus:bg-sky-800"
                  >
                    Signin with {provider.id}
                  </button>
                </div>
              ))
          }
        </div>
      </div>
    </>
  );
}
