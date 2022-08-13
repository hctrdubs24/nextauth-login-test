import { getSession, signOut } from "next-auth/react";
import Head from "next/head";

export default function HomePage({ session }) {
  /* Procesado desde FrontEnd
     const [user, setUser] = useState(null);

     useEffect(() => {
       * Función inmediatamente invocada.
       (async () => {
         const session = await getSession();
         setUser(session.user);
       })();
      }, []);
   */

  /*


  * Uso de hook useSession de auth
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    router.push("/login");
  }

  */

  return (
    <>
      <Head>
        <title>Home - My Next App</title>
      </Head>

      <div className="container min-w-full min-h-screen">
        <section className="flex flex-col justify-center items-center py-5">
          {session ? (
            <div className="py-5 text-center items-center">
              <h2 className="text-5xl">Welcome {session.user.name}</h2>
              <p>Your email: {session.user.email}</p>
              <picture className="flex justify-center p-5 overflow-hidden h-96">
                <img
                  src={session.user.image}
                  alt="user image"
                  className="max-w-full max-h-full rounded-full border-solid border-4 border-zinc-600 cursor-pointer transition-all hover:scale-110 hover:border-gray-400  "
                />
              </picture>
              <button
                className=" bg-sky-500 px-5 py-3 text-white text-center font-bold rounded-lg hover:bg-sky-600 focus:bg-sky-800"
                onClick={() => signOut()}
              >
                SingOut
              </button>
            </div>
          ) : (
            <section>
              <div className="animate-pulse">
                <div className="shadow p-4 min-h-screen mx-auto flex flex-col items-center">
                  <div className="m-3 w-96 h-8 bg-slate-500 rounded-xl"></div>
                  <div className="w-48 h-6 bg-slate-500 rounded-xl"></div>
                  <div className="m-4  w-96 h-96 rounded-full bg-slate-700"></div>
                  <div className=" px-5 py-3 w-20 h-8 bg-slate-500 rounded-md"></div>
                </div>
              </div>
            </section>
          )}
        </section>
      </div>
    </>
  );
}

/**
 * If the user is not logged in, redirect them to the login page
 * @param ctx - The context object that Next.js provides to getInitialProps.
 * @returns The session object is being returned.
 */
export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  // console.log(session);

  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return {
    props: { session },
  };
};
