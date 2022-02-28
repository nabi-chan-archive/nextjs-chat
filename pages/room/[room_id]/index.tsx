import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import { io } from "socket.io-client";

interface IMsg {
  id: string;
  room_id: string;
  user_id: string;
  message: string;
  createdAt: string;
}

interface IProps {
  room_id: string;
  msg: IMsg[];
}

// TODO: must changed hard-coded user id
const user = "694bedd3-8776-40fe-be5a-584d1021ebae";

export const getServerSideProps: GetServerSideProps<IProps> = async (ctx) => {
  const room_id = String(ctx.query.room_id);

  const response = await fetch(`http://localhost:3000/api/room/${room_id}`);
  const msg = await response.json();

  return {
    props: {
      room_id,
      msg,
    },
  };
};

const Home: NextPage<IProps> = ({ room_id, msg }) => {
  useEffect(() => {
    const socket = io("", {
      path: "/api/socket.io",
    });

    socket.on("connect", () => {
      console.log("successfully connected socket.io server", socket);
    });

    socket.on("connect_error", (err) => {
      console.log("failed to connect socket.io server", err);
    });

    socket.on("message", (message: IMsg) => {
      setChat((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const [chat, setChat] = useState<IMsg[]>(msg);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = event.currentTarget.content;

    if (!input.value) return;

    const message = {
      user,
      msg: input.value,
    };

    await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    input.value = "";
    input.focus();
  }

  return (
    <>
      <Head>
        <title>Socket.io connect example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"flex flex-col w-full h-screen"}>
        <div className={"flex-1"}>
          <div className="container mx-auto p-4">
            {chat.length ? (
              chat.map((chat) => (
                <div key={`msg_${chat.id}`} className={"mb-1"}>
                  <span className={chat.user_id === user ? "text-red-500" : ""}>
                    {chat.user_id === user ? "Me" : chat.user_id.slice(0, 8)}
                  </span>
                  : {chat.message}
                  <span className={"ml-4 text-sm text-gray-300"}>{chat.createdAt}</span>
                </div>
              ))
            ) : (
              <div className={"text-center text-gray-600 text-xl"}>채팅 기록이 없습니다.</div>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit} className={"bg-gray-400 sticky bottom-0"}>
          <div className="container mx-auto flex items-center gap-x-4 p-4 h-20">
            <input className={"flex-1 h-full px-4"} type="text" name={"content"} placeholder={"write some chat..."} />
            <button className={"h-full px-4 bg-white"} type={"submit"}>
              submit
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default Home;
