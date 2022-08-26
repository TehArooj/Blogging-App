import React, { FC, useEffect, useState } from "react";
import { signOutUser, auth } from "../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { HiViewList } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const firstLetter = username.charAt(0);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName!);
        localStorage.setItem("userName", user.displayName!);
      }
      if (!localStorage.getItem("userName")) {
        navigate("/login");
      }
    });
  }, [navigate, username]);

  const SignOut = async () => {
    try {
      await signOutUser().then(() => {
        localStorage.clear();
        navigate("/login");
        console.log(auth);
      });
    } catch (error) {
      console.log(error);
    }
    console.log("Session end User Logged Out");
  };

  return (
    <div>
      <div className=" grid grid-cols-12 grid-rows-2 grid-flow-row justify-evenly not-italic w-full h-full">
        <div className="flex items-start w-full h-full">
          <div className="flex flex-col items-center font-lexend absolute w-24 h-full left-0 top-0 bg-darkGrey bg-cover object-fill bg-no-repeat">
            <div className="mb-14 mt-10 text-center font-semibold">
              <span className="text-2xl text-white text-center  rounded-50  bg-primary  p-4">
                {firstLetter}
              </span>
            </div>
            <div className="mb-14 items-center">
              <HiSearch className="ml-1 text-3xl text-primary" />
              <span className=" text-sm text-white">search</span>
            </div>

            <div className="mb-14 items-center">
              <IoMdAddCircleOutline className="ml-1  text-3xl text-primary" />
              <span className=" text-sm text-white">create</span>
            </div>

            <div className="mb-14 items-center">
              <HiViewList className="ml-1/2 text-3xl text-primary" />
              <span className=" text-sm text-white">blogs</span>
            </div>

            <div className="mb-2 mt-40 items-center" onClick={SignOut}>
              <FiLogOut className="ml-2 text-3xl text-primary" />
              <span className=" text-sm text-white">log out</span>
            </div>
          </div>
        </div>
        <div className=" col-span-11 row-span-1 grid-flow-row flex flex-row items-left ml-10 mr-8 ">
          <div className="mt-10 ">
            <div>
              <div className="bg-primary pt-1 pb-1 w-1/3 "></div>
              <span className="text-xl font-lexend">Latest</span>
            </div>
            <div className="mt-10 mb-14 items-left mr-8">
              <h1 className="text-xl font-bold">
                Hi {username} You have succesfully logged In Welcome Home
              </h1>
              <p className="line-clamp-5 mr-8">
                Et molestiae hic earum repellat aliquid est doloribus delectus.
                Enim illum odio porro ut omnis dolor debitis natus. Voluptas
                possimus deserunt sit delectus est saepe nihil. Qui voluptate
                possimus et quia. Eligendi voluptas voluptas dolor cum. Rerum
                est quos quos id ut molestiae fugit. Et molestiae hic earum
                repellat aliquid est doloribus delectus. Enim illum odio porro
                ut omnis dolor debitis natus. Voluptas possimus deserunt sit
                delectus est saepe nihil. Qui voluptate possimus et quia.
                Eligendi voluptas voluptas dolor cum. Rerum est quos quos id ut
                molestiae fugit. Et molestiae hic earum repellat aliquid est
                doloribus delectus. Enim illum odio porro ut Tehreems. Voluptas
                possimus deserunt sit delectus est saepe nihil. Qui voluptate
                possimus et quia. Eligendi voluptas voluptas dolor cum. Rerum
                est quos quos id ut molestiae fugit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
