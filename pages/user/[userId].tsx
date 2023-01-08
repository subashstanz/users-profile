import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import UserHomePage from "../../components/userHomePage";

type Props = {};

export const UserDataContext = React.createContext<Record<string, any>[]>([]);

function UserMainPage({}: Props) {
  const router = useRouter();
  const [userData, setUserData] = useState<Record<string, any>[]>([]);
  console.log('heaed',userData)

  console.log("fibal", userData);
  useEffect(() => {
    getusers();
  }, []);

  const getusers = async () => {
    try {
      const response = await axios.get(`https://panorbit.in/api/users.json`);
      //   console.log("response", response);
      console.log("userId", response?.data?.users);
      //   const selectedUser = response?.data?.users?.filter(
      //     (user: { id: string | string[] | undefined }) => {
      //       console.log("iser", user.id);
      //       if (typeof router?.query?.userId !== undefined) {
      //         return user.id == router.query.userId;
      //       }
      //     }
      //   );
      //   console.log("selectedUser", selectedUser);

      //   if (selectedUser?.length) {
      //     setUserData(selectedUser[0]);
      //   }
      setUserData(response?.data?.users);
    } catch (err) {
      console.log(err);
    }
  };

  console.log("achu", router?.query?.userId);

  //   const currentUser = useContext(UserDataContext);
  //   console.log("rouer", currentUser);

  //   useEffect(() => {
  //     if (router.query.userId && currentUser?.length) {
  //       console.log("test");
  //     }
  //   }, []);

  return (
    <UserDataContext.Provider value={userData}>
      <>{router?.query?.userId && userData?.length ? <UserHomePage userId={router?.query?.userId} /> : null}</>
    </UserDataContext.Provider>
  );
}

export default UserMainPage;
