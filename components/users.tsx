import React, { useEffect, useState } from "react";
import axios from "axios";
import { stringify } from "querystring";
import Image from "next/image";
import { useRouter } from "next/router";

type Props = {};

function Users({}: Props) {
  const router = useRouter();
  const [userData, setUserData] = useState<Record<string, any>[]>([]);
  useEffect(() => {
    getusers();
  }, []);

  const getusers = async () => {
    try {
      const response = await axios.get(`https://panorbit.in/api/users.json`);
      setUserData(response?.data?.users);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    // <UserDataContext.Provider value={userData}>
    <div className="bg-blue-100 h-full w-full flex items-center justify-center ">
      <div className="w-[500px] h-[500px] bg-white flex flex-col rounded-lg">
        <div className="text-black p-10 bg-[#F6F6F6] flex items-center font-medium text-lg justify-center">
          {" "}
          <>Select an Account</>
        </div>
        <div className="mx-3 overflow-y-auto">
          {userData?.map((user, index) => {
            return (
              <div
                key={index}
                onClick={() => router.push(`/user/${user.id}`)}
                className="h-12 cursor-pointer w-full bg-white flex items-center space-x-4 border-b-[1px] border-gray-300 p-3"
              >
                <div className="h-5 w-5 rounded-full">
                  <img
                    src={user?.profilepicture || ""}
                    alt="Logo"
                    className="h-5 w-5 rounded-full"
                  />
                </div>
                <div className="text-gray-900">{user?.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    // </UserDataContext.Provider>
  );
}

export default Users;
