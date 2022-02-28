import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { push } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [roomId, setRoomId] = useState<string>("");

  async function handleRoomCreate() {}

  async function handleRoomJoin(event: FormEvent<HTMLFormElement>) {}

  return (
    <>
      <Head>
        <title>Socket.io connect example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"flex flex-col gap-y-2 p-4 w-full h-screen border-gray-200"}>
        <button onClick={handleRoomCreate} className={"px-4 py-2 bg-gray-200 rounded-md"}>
          채팅방 생성하기
        </button>
        <div className={"px-4 py-2 border-2 rounded-md"}>최근 생성된 채팅방 ID : {roomId}</div>
        <form onSubmit={handleRoomJoin} className={"flex gap-2"}>
          <input
            ref={inputRef}
            className={"flex-1 border-2 px-4 rounded-md"}
            type="text"
            name={"room_id"}
            placeholder={"채팅방 ID"}
          />
          <button className={"px-4 py-2 bg-gray-200 rounded-md"}>이 채팅방에 접속하기</button>
        </form>
      </main>
    </>
  );
};

export default Home;
