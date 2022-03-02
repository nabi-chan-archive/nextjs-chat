import type { NextPage } from "next";
import Link from "next/link";
import { useUserContext } from "hooks/useUserContext";
import { FormEvent, useEffect, useState } from "react";
import { Profile } from "types/profile";

function fetchUserProfile(userId: string, setProfiles: (data: Profile[]) => void) {
  fetch(`http://localhost:3000/api/user/profile?user_id=${userId}`).then((response) => {
    response.json().then((data) => setProfiles(data));
  });
}

const Profile: NextPage = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const { userId } = useUserContext();

  useEffect(() => {
    fetchUserProfile(userId, setProfiles);
  }, [userId]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { username, thumbnail, isDefault } = event.currentTarget;

    await fetch("http://localhost:3000/api/user/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        username: username.value,
        thumbnail: thumbnail.value,
        isDefault: isDefault.checked,
      }),
    });

    fetchUserProfile(userId, setProfiles);
  }

  return (
    <main className={"flex flex-col gap-y-4 p-4 w-full h-screen border-gray-200"}>
      <Link href={"/"}>
        <a className={"bg-gray-200 py-2 px-4 rounded-md text-center"}>메인페이지로 돌아가기</a>
      </Link>

      <form onSubmit={handleSubmit} className={"flex flex-col gap-y-2"}>
        <input className={"border-2 rounded-md px-4 py-2"} type="text" name="username" placeholder={"username"} />
        <input className={"border-2 rounded-md px-4 py-2"} type="text" name="thumbnail" placeholder={"thumbnail url"} />
        <label className={"flex gap-x-2 border-2 rounded-md px-4 py-2"}>
          <input type="checkbox" name="isDefault" />
          <span>default profile</span>
        </label>
        <button type="submit" className={"px-4 py-2 bg-gray-200 rounded-md"}>
          프로필 만들기
        </button>
      </form>

      <div className={"flex flex-col gap-y-2"}>
        {profiles.map((profile) => (
          <ul className={"border-2 rounded-md p-4"} key={profile.id}>
            <li>username : {profile.username}</li>
            <li>thumbnail : {profile.thumbnail}</li>
            <li>isDefault : {profile.isDefault.toString()}</li>
          </ul>
        ))}
      </div>
    </main>
  );
};

export default Profile;
