import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import UserHomePage from "../../components/userHomePage";

type Props = {};

export const UserDataContext = React.createContext<Record<string, any>[]>([]);

function UserMainPage({}: Props) {
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
    <UserDataContext.Provider value={userData}>
      <>{router?.query?.userId && userData?.length ? <UserHomePage userId={router?.query?.userId} /> : null}</>
    </UserDataContext.Provider>
  );
}

export default UserMainPage;
