import Head from "next/head";
import { withProtected } from "../../firebase/auth/hook/route";
import Layout from "@/layouts/Layout";
import { prisma } from "@/lib/prisma";
import { Feedback } from ".prisma/client";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const feedback: Feedback[] = await prisma.feedback.findMany({
    where: {
      // @ts-ignore
      session_id: params?.id,
    },
  });
  return {
    props: {
      feedback: JSON.parse(JSON.stringify(feedback)),
    },
  };
};

function Home({ feedback }: { feedback: Feedback[] }) {
  return (
    <div>
      <Head>
        <title>Feedback</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h2 className="mb-7">Dashboard</h2>

        <div className="w-full mt-10">
          <div className="w-full">
            <div className="flex mb-5">
              <h3 className="w-full font-bold">Feedback</h3>
            </div>
            <div className="">
              {feedback && feedback?.length !== 0 ? (
                <div>
                  {feedback?.map((f: any) => (
                    <div
                      key={f?.id}
                      className="p-6 mb-4 transition-all duration-200 bg-white rounded"
                    >
                      <h4 className="font-bold">{f?.text}</h4>
                      <h5 className="mb-3 font-medium text-gray-400">
                        Rating: {f?.rating}
                      </h5>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center w-full p-6 space-y-2 text-gray-600 bg-white rounded-md h-80 min-h-28">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="64"
                    height="64"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      fill="currentColor"
                      d="M14.997 2L21 8l.001 4.26A5.466 5.466 0 0 0 17.5 11l-.221.004a5.503 5.503 0 0 0-5.127 4.205l-.016.074-.03.02A4.75 4.75 0 0 0 10.878 22L3.993 22a.993.993 0 0 1-.986-.876L3 21.008V2.992c0-.498.387-.927.885-.985L4.002 2h10.995zM17.5 13a3.5 3.5 0 0 1 3.5 3.5l-.001.103a2.75 2.75 0 0 1-.581 5.392L20.25 22h-5.5l-.168-.005a2.75 2.75 0 0 1-.579-5.392L14 16.5a3.5 3.5 0 0 1 3.5-3.5z"
                    />
                  </svg>
                  <h4 className="font-bold">No feedback</h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
export default withProtected(Home);
