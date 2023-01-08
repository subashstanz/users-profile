import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../pages/user/[userId]";

type Props = {};

const SIDEBAR = ["Profile", "Posts", "Gallery", "ToDo"];
const BIO_DATA_1 = [
  {
    name: "UserName",
    key: "username",
  },
  {
    name: "e-mail",
    key: "email",
  },
  {
    name: "Phone",
    key: "phone",
  },
  {
    name: "Website",
    key: "website",
  },
];
const BIO_DATA_2 = [
  {
    name: "Name",
    key: "name",
  },
  {
    name: "catchPhrase",
    key: "catchPhrase",
  },
  {
    name: "bs",
    key: "bs",
  },
];

const ADDRESS_DATA = [
  {
    name: "Street",
    key: "street",
  },
  {
    name: "Suite",
    key: "suite",
  },
  {
    name: "City",
    key: "city",
  },
  {
    name: "Zipcode",
    key: "zipcode",
  },
];

function UserHomePage(props: any) {
  const contextValue = useContext(UserDataContext);
  const router = useRouter();
  const [singleUserData, setSingleUserData] = useState<Record<string, any>>({});
  const [openContext, setOpenContext] = useState<Boolean>(false);
  console.log("singleUserData", singleUserData);

  // const router = useRouter();
  // const currentUser = useContext(UserDataContext)
  // console.log('rouer',currentUser)

  useEffect(() => {
    console.log("props.userId", props.userId);
    console.log("contextValue", contextValue);
    if (props.userId && contextValue?.length) {
      console.log("test");
      const selectedUser = contextValue?.filter((user) => {
        return user.id == props.userId;
      });
      console.log("selectedUser", selectedUser);
      if (selectedUser?.length) {
        setSingleUserData({ ...selectedUser[0] });
      }
    }
  }, [props.userId]);

  return (
    <div className="bg-white text-gray-500 h-screen w-screen flex pl-10 pt-[3.5rem] ">
      <div className="w-72 h-full bg-blue-600 rounded-md flex flex-col  justify-center cursor-pointer ">
        {SIDEBAR?.map((item, index) => {
          return (
            <div
              key={index}
              className="text-white flex items-center my-3 mx-10 py-3 px-1 border-b-[1px] border-gray-100"
            >
              {item}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col h-full w-full ml-7 ">
        <div className=" w-full h-20 flex items-center justify-between p-8 border-b-[1px] border-gray-200">
          <div className="text-gray-900 font-medium text-lg">Profile</div>
          <div
            className="flex space-x-2 items-center cursor-pointer"
            onClick={() => setOpenContext(!openContext)}
          >
            <div className="">
              <img
                src={singleUserData.profilepicture}
                alt="useImage"
                className="h-10 w-10 rounded-full"
              />
            </div>
            <div>{singleUserData?.name}</div>
          </div>
        </div>
        <div className="flex w-full h-full items-center text-lg ">
          <div className="grow-0 w-[350px] h-full bg-gray-100 flex  flex-col items-center">
            <div className="flex flex-col my-3  space-y-3 items-center ">
              <img
                src={singleUserData.profilepicture}
                alt="useImage"
                className="h-52 w-52 rounded-full"
              />
              <div className="font-medium text-gray-700 cursor-pointer">
                {singleUserData?.name}
              </div>
            </div>
            <div>
              {BIO_DATA_1?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-3 my-2 text-lg"
                  >
                    <div className="font-medium text-gray-600">{item.name}</div>{" "}
                    :-
                    <div className="font-normal text-gray-900">
                      {singleUserData[item.key]}
                    </div>
                  </div>
                );
              })}
            </div>
            <hr className="border-b-2 border-gray-900" />
            <div className="text-gray-400">Company</div>
            <div className="ml-4">
              {BIO_DATA_2?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-3 ml-2 text-lg"
                  >
                    <div className="font-medium text-gray-600">{item.name}</div>
                    :-
                    <div className="font-normal text-gray-900">
                      {singleUserData?.company?.[item.key]}
                    </div>
                  </div>
                );
              })}
            </div>
            <div></div>
          </div>
          <div className="grow">
            <div className="flex flex-col space-y-3">
              <div className="ml-5 text-gray-400-gray-400">Address*</div>
              <div className="ml-10">
                {ADDRESS_DATA?.map((address, index) => {
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="font-medium text-gray-600">
                        {address.name}
                      </div>{" "}
                      :-
                      <div className="font-normal text-gray-900">
                        {singleUserData?.address?.[address.key]}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="w-[100vh] h-[400px] ml-10 rounded-md my-5 rounded- bg-gray-200">
                Map
              </div>
              <div className="flex justify-end mr-3 space-x-3 ">
                <div className="flex space-x-2">
                  <div>Lat</div>
                  <div className="text-gray-900">
                    {singleUserData?.address?.geo?.lat}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div>Lat</div>
                  <div className="text-gray-900">
                    {singleUserData?.address?.geo?.lng}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {openContext && (
          <div
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div className="flex flex-col my-3  space-y-3 items-center ">
              <img
                src={singleUserData.profilepicture}
                alt="useImage"
                className="h-20 w-20 rounded-full"
              />
              <div className="font-medium text-gray-700 cursor-pointer">
                {singleUserData?.name}
              </div>
              <div className="font-normal text-gray-700 cursor-pointer">
                {singleUserData?.email}
              </div>
              <div onClick={() => router.push(`/`)} className=" cursor-pointer inline-block rounded-md border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500">
                signOut
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default UserHomePage;
