import React, { useEffect, useState } from "react";
import { signOutUser, auth } from "../utils/firebase/firebase.utils";
import { Link, useNavigate } from "react-router-dom";
import {
  HiSearch,
  HiViewList,
  HiOutlinePlusCircle,
  HiLogout,
} from "react-icons/hi";
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

  const myBlogs = () => {
    navigate("/myblogs");
  };

  const createBlog = () => {
    navigate("/createblog");
  };

  return (
    <div>
      <div className=" flex justify-evenly not-italic w-full h-full md:items-end ">
        <div className="flex items-start w-1/2 h-full md:items-end  ">
          <div className="flex flex-col items-center font-lexend fixed w-24 h-full left-0 top-0 bg-darkGrey bg-cover object-fill bg-no-repeat  md:h-24 md:w-full md:sticky md:bottom-0 md:left-0 md:flex-row md:space-y-4  md:justify-around md:self-end md:flex-1 md:shrink-0  tb:h-20 tb:w-full tb:flex-row  tb:space-y-4  tb:justify-around tb:self-end tb:flex-1 tb:shrink-0 m:h-16 m:w-full m:flex-row  m:space-y-4  m:justify-around m:self-end m:flex-1 m:shrink-0 m:content-center ">
            <div className=" mb-14 mt-10 text-center font-semibold md:mt-4 md:mb-0 tb:mt-2 tb:mb-0 m:mt-1 m:mb-0 ">
              <span className="text-2xl text-white text-center  rounded-50  bg-primary p-4 tb:p-3 tb:text-xl m:p-2 m:text-sm">
                {firstLetter}
              </span>
              <div className="2xl:hidden xl:hidden lg:hidden md:visible md:text-sm md:ml-5 md:font-normal md:text-white tb:hidden  m:hidden">
                {username}
              </div>
            </div>
            <div className="mb-14 items-center">
              <HiSearch className="ml-1 text-center text-3xl text-primary tb:text-2xl m:text-xl" />
              <span className=" text-sm text-white tb:hidden m:hidden ">
                search
              </span>
            </div>

            <div className="mb-14 items-center  " onClick={createBlog}>
              <HiOutlinePlusCircle className="ml-1  text-3xl text-primary  tb:text-2xl m:text-xl" />
              <span className=" text-sm text-white tb:hidden m:hidden">
                create
              </span>
            </div>

            <div className="mb-14 items-center " onClick={myBlogs}>
              <HiViewList className="ml-1 text-3xl text-primary  tb:text-2xl m:text-xl" />
              <span className=" text-sm text-white tb:hidden m:hidden">
                blogs
              </span>
            </div>

            <div className="mb-2 mt-60 items-center md:mt-0 " onClick={SignOut}>
              <FiLogOut className="ml-1 text-3xl text-primary  tb:text-2xl m:text-xl" />
              <span className=" text-sm text-white tb:hidden m:hidden">
                log out
              </span>
            </div>
          </div>
        </div>
        <div className=" flex flex-col mt-10 lg:ml-14 tb:ml-12 m:ml-12 ">
          <div className="bg-primary pt-1 pb-1 w-5 "></div>
          <div className="text-xl font-lexend">Latest</div>

          <div className="flex flex-col items-left ">
            <div className="flex flex-col mt-10  items-left mr-8">
              <h1 className="text-2xl font-semibold m:hidden">26 August</h1>
              <Link to="/viewblog" className="mb-14">
                <h1 className="text-3xl text-primary  mr-10 font-dm font-normal m:text-2xl">
                  Struggles of being a SE
                </h1>
                <p className="line-clamp-5 mr-12 font-normal m:text-base m:font-extralight">
                  Et molestiae hic earum repellat aliquid est doloribus
                  delectus. Enim illum odio porro ut omnis dolor debitis natus.
                  Voluptas possimus deserunt sit delectus est saepe nihil. Qui
                  voluptate possimus et quia. Eligendi voluptas voluptas dolor
                  cum. Rerum est quos quos id ut molestiae fugit. Et molestiae
                  hic earum repellat aliquid est doloribus delectus. Enim illum
                  odio porro ut omnis dolor debitis natus. Voluptas possimus
                  deserunt sit delectus est saepe nihil. Qui voluptate possimus
                  et quia. Eligendi voluptas voluptas dolor cum. Rerum est quos
                  quos id ut molestiae fugit. Et molestiae hic earum repellat
                  aliquid est doloribus delectus. Enim illum odio porro ut
                  Tehreems. Voluptas possimus deserunt sit delectus est saepe
                  nihil. Qui voluptate possimus et quia. Eligendi voluptas
                  voluptas dolor cum. Rerum est quos quos id ut molestiae fugit.
                </p>
                <div className="text-primary font-normal">read more</div>
                <div className=" 2xl:hidden xl:hidden lg:hidden md:hidden tb:hidden m:visible m:text-base m:font-semibold ">
                  26 August 2022
                </div>
                <div className="text-secondary text-base font-light m:text-right m:mr-8">
                  @{username}
                </div>
              </Link>
              <h1 className="text-2xl font-semibold m:hidden">26 August</h1>
              <Link to="/viewblog" className="mb-14">
                <h1 className="text-3xl text-primary  mr-12 font-dm font-normal m:text-2xl">
                  Struggles of being a SE
                </h1>
                <p className="line-clamp-5  mr-12 font-normal m:text-base m:font-extralight">
                  Et molestiae hic earum repellat aliquid est doloribus
                  delectus. Enim illum odio porro ut omnis dolor debitis natus.
                  Voluptas possimus deserunt sit delectus est saepe nihil. Qui
                  voluptate possimus et quia. Eligendi voluptas voluptas dolor
                  cum. Rerum est quos quos id ut molestiae fugit. Et molestiae
                  hic earum repellat aliquid est doloribus delectus. Enim illum
                  odio porro ut omnis dolor debitis natus. Voluptas possimus
                  deserunt sit delectus est saepe nihil. Qui voluptate possimus
                  et quia. Eligendi voluptas voluptas dolor cum. Rerum est quos
                  quos id ut molestiae fugit. Et molestiae hic earum repellat
                  aliquid est doloribus delectus. Enim illum odio porro ut
                  Tehreems. Voluptas possimus deserunt sit delectus est saepe
                  nihil. Qui voluptate possimus et quia. Eligendi voluptas
                  voluptas dolor cum. Rerum est quos quos id ut molestiae fugit.
                </p>
                <div className="text-primary font-normal">read more</div>
                <div className=" 2xl:hidden xl:hidden lg:hidden md:hidden tb:hidden m:visible m:text-base m:font-semibold ">
                  26 August 2022
                </div>
                <div className="text-secondary text-base font-light m:text-right m:mr-8">
                  @{username}
                </div>
              </Link>
              <h1 className="text-2xl font-semibold m:hidden">26 August</h1>
              <Link to="/viewblog" className="mb-14">
                <h1 className="text-3xl text-primary  mr-12 font-dm font-normal m:text-2xl">
                  Struggles of being a SE
                </h1>
                <p className="line-clamp-5  mr-12 font-normal m:text-base m:font-extralight">
                  Et molestiae hic earum repellat aliquid est doloribus
                  delectus. Enim illum odio porro ut omnis dolor debitis natus.
                  Voluptas possimus deserunt sit delectus est saepe nihil. Qui
                  voluptate possimus et quia. Eligendi voluptas voluptas dolor
                  cum. Rerum est quos quos id ut molestiae fugit. Et molestiae
                  hic earum repellat aliquid est doloribus delectus. Enim illum
                  odio porro ut omnis dolor debitis natus. Voluptas possimus
                  deserunt sit delectus est saepe nihil. Qui voluptate possimus
                  et quia. Eligendi voluptas voluptas dolor cum. Rerum est quos
                  quos id ut molestiae fugit. Et molestiae hic earum repellat
                  aliquid est doloribus delectus. Enim illum odio porro ut
                  Tehreems. Voluptas possimus deserunt sit delectus est saepe
                  nihil. Qui voluptate possimus et quia. Eligendi voluptas
                  voluptas dolor cum. Rerum est quos quos id ut molestiae fugit.
                </p>
                <div className="text-primary font-normal">read more</div>
                <div className=" 2xl:hidden xl:hidden lg:hidden md:hidden tb:hidden m:visible m:text-base m:font-semibold ">
                  26 August 2022
                </div>
                <div className="text-secondary text-base font-light m:text-right m:mr-8">
                  @{username}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
