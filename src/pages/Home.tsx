import React, { useEffect, useState } from "react";
import { signOutUser, auth } from "../utils/firebase/firebase.utils";
import { Link, useNavigate } from "react-router-dom";
import { HiSearch, HiViewList, HiOutlinePlusCircle } from "react-icons/hi";
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
    console.log("Session end user logged out");
  };

  const myBlogs = () => {
    navigate("/myblogs");
  };

  const createBlog = () => {
    navigate("/createblog");
  };

  return (
    <>
      <div className="fixed top-0 left-0 flex justify-around items-center w-24 h-screen bg-darkGrey  flex-col md:flex-row md:bottom-0 md:h-24 md:w-screen md:top-auto md:drop-shadow-[0_-6mm_4mm_white]  tb:flex-row tb:bottom-0 tb:h-20 tb:w-screen tb:top-auto  tb:drop-shadow-[0_-6mm_4mm_white]   m:flex-row m:bottom-0 m:h-16 m:w-screen m:top-auto m:drop-shadow-[0_-6mm_4mm_white]">
        <div className=" md:flex items-center text-center font-semibold ">
          <span className="w-16 h-16 block text-2xl text-white text-center  rounded-50  bg-primary p-4 tb:w-9 tb:h-9 tb:p-1 tb:text-xl m:w-7 m:h-7 m:p-1 m:text-sm">
            {firstLetter}
          </span>
          <div className="2xl:hidden xl:hidden lg:hidden md:visible md:text-sm md:ml-5 md:font-normal md:text-white tb:hidden  m:hidden">
            {username}
          </div>
        </div>

        <div className=" items-center md:flex md:justify-between cursor-pointer hover:bg-darkerGrey p-4 rounded-lg transition-all duration-200">
          <HiSearch className="ml-1 text-center text-3xl text-primary tb:text-2xl tb:ml-0 m:ml-0 m:text-xl" />
          <span className=" text-sm text-white tb:hidden m:hidden ">
            search
          </span>
        </div>

        <div
          className=" items-center md:flex md:justify-between cursor-pointer hover:bg-darkerGrey p-4 rounded-lg transition-all duration-200 "
          onClick={createBlog}
        >
          <HiOutlinePlusCircle className="ml-1  text-3xl text-primary  tb:text-2xl tb:ml-0 m:ml-0 m:text-xl" />
          <span className=" text-sm text-white tb:hidden m:hidden">create</span>
        </div>

        <div
          className=" items-center md:flex md:justify-between cursor-pointer hover:bg-darkerGrey p-4 rounded-lg transition-all duration-200"
          onClick={myBlogs}
        >
          <HiViewList className="ml-1 text-3xl text-primary  tb:text-2xl tb:ml-0 m:ml-0 m:text-xl" />
          <span className=" text-sm text-white tb:hidden m:hidden">blogs</span>
        </div>

        <div className="items-center md:hidden tb:hidden m:hidden "></div>
        <div className="items-center md:hidden tb:hidden m:hidden "></div>

        <div
          className="items-center md:mt-0 md:flex md:justify-between cursor-pointer hover:bg-darkerGrey p-4 rounded-lg transition-all duration-200	 "
          onClick={SignOut}
        >
          <FiLogOut className="ml-1 text-3xl text-primary  tb:text-2xl tb:ml-0 m:ml-0 m:text-xl" />
          <span className=" text-sm text-white tb:hidden m:hidden">
            log out
          </span>
        </div>
      </div>
      <div className=" flex flex-col mt-10  ml-48 md:ml-20 md:mb-20 tb:mb-16 m:mb-14 tb:ml-20 m:ml-11">
        <div className="bg-primary pt-1 pb-1 w-5 "></div>
        <div className="text-xl font-lexend">Latest</div>

        <div className="flex flex-col items-left ">
          <div className="flex flex-col mt-10  items-left mr-8">
            <h1 className="text-2xl font-semibold m:hidden">26 August</h1>
            <Link to="/viewblog" className="mb-14 mr-12 m:mr-8">
              <h1 className="text-3xl text-primary font-dm font-normal m:text-2xl">
                15 Disadvantages Of Freedom And How You Can Workaround It.
              </h1>
              <p className="line-clamp-5 font-normal text-justify m:text-base m:font-extralight m:line-clamp-6">
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
              <div className="text-primary font-normal">read more</div>
              <div className="flex justify-between">
                <div className=" 2xl:hidden xl:hidden lg:hidden md:hidden tb:hidden m:visible m:text-base m:font-semibold ">
                  26 August 2022
                </div>
                <div className="text-secondary text-base font-light m:text-right ">
                  @{username}
                </div>
              </div>
            </Link>

            <h1 className="text-2xl font-semibold m:hidden">26 August</h1>
            <Link to="/viewblog" className="mb-14 mr-12 m:mr-8">
              <h1 className="text-3xl text-primary font-dm font-normal m:text-2xl">
                15 Disadvantages Of Freedom And How You Can Workaround It.
              </h1>
              <p className="line-clamp-5 font-normal text-justify m:text-base m:font-extralight m:line-clamp-6">
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
              <div className="text-primary font-normal">read more</div>
              <div className="flex justify-between">
                <div className=" 2xl:hidden xl:hidden lg:hidden md:hidden tb:hidden m:visible m:text-base m:font-semibold ">
                  26 August 2022
                </div>
                <div className="text-secondary text-base font-light m:text-right ">
                  @{username}
                </div>
              </div>
            </Link>

            <h1 className="text-2xl font-semibold m:hidden">26 August</h1>
            <Link to="/viewblog" className="mb-14 mr-12 m:mr-8">
              <h1 className="text-3xl text-primary font-dm font-normal m:text-2xl">
                15 Disadvantages Of Freedom And How You Can Workaround It.
              </h1>
              <p className="line-clamp-5 font-normal text-justify m:text-base m:font-extralight m:line-clamp-6">
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
              <div className="text-primary font-normal">read more</div>
              <div className="flex justify-between">
                <div className=" 2xl:hidden xl:hidden lg:hidden md:hidden tb:hidden m:visible m:text-base m:font-semibold ">
                  26 August 2022
                </div>
                <div className="text-secondary text-base font-light m:text-right ">
                  @{username}
                </div>
              </div>
            </Link>

            <h1 className="text-2xl font-semibold m:hidden">26 August</h1>
            <Link to="/viewblog" className="mb-14 mr-12 m:mr-8">
              <h1 className="text-3xl text-primary font-dm font-normal m:text-2xl">
                15 Disadvantages Of Freedom And How You Can Workaround It.
              </h1>
              <p className="line-clamp-5 font-normal text-justify m:text-base m:font-extralight m:line-clamp-6">
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
              <div className="text-primary font-normal">read more</div>
              <div className="flex justify-between">
                <div className=" 2xl:hidden xl:hidden lg:hidden md:hidden tb:hidden m:visible m:text-base m:font-semibold ">
                  26 August 2022
                </div>
                <div className="text-secondary text-base font-light m:text-right ">
                  @{username}
                </div>
              </div>
            </Link>

            <h1 className="text-2xl font-semibold m:hidden">26 August</h1>
            <Link to="/viewblog" className="mb-14 mr-12 m:mr-8">
              <h1 className="text-3xl text-primary font-dm font-normal m:text-2xl">
                15 Disadvantages Of Freedom And How You Can Workaround It.
              </h1>
              <p className="line-clamp-5 font-normal text-justify m:text-base m:font-extralight m:line-clamp-6">
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
              <div className="text-primary font-normal">read more</div>
              <div className="flex justify-between">
                <div className=" 2xl:hidden xl:hidden lg:hidden md:hidden tb:hidden m:visible m:text-base m:font-semibold ">
                  26 August 2022
                </div>
                <div className="text-secondary text-base font-light m:text-right ">
                  @{username}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
