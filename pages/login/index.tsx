import { NextPage } from "next";
import { FormEvent } from "react";
import { useUserContext } from "hooks/useUserContext";
import { useRouter } from "next/router";
import Link from "next/link";

const Login: NextPage = () => {
  const { setUserInfo } = useUserContext();
  const { push } = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { email, password } = event.currentTarget;

    const response = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (response.ok) {
      const { id: userId, jwtToken } = await response.json();
      setUserInfo({
        userId,
        jwtToken,
      });
      await push("/");
    }
  }

  return (
    <main>
      <form className={"flex flex-col gap-y-2 p-4 w-full h-screen border-gray-200"} onSubmit={handleSubmit}>
        <Link href={"/"}>
          <a className={"bg-gray-200 py-2 px-4 rounded-md text-center"}>메인페이지로 돌아가기</a>
        </Link>
        <input className={"border-2 py-2 px-4 rounded-md"} type="email" name="email" placeholder={"email"} />
        <input className={"border-2 py-2 px-4 rounded-md"} type="password" name="password" placeholder={"password"} />
        <button type="submit" className={"bg-gray-200 px-4 py-2 rounded-md text-center"}>
          로그인
        </button>
      </form>
    </main>
  );
};

export default Login;
