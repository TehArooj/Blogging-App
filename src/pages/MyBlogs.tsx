import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase/firebase.utils";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

function MyBlogs() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

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
  const back = () => {
    navigate("/home");
  };
  return (
    <>
      <div className="z-50">
        <div className="mt-10">
          <div className=" ml-20 top-11 tb:ml-12 ">
            <div onClick={back}>
              <span className="text-xl tb:text-base">Back</span>
            </div>
          </div>
          <div className="absolute top-12 ml-14 tb:ml-8">
            <div onClick={back}>
              <BiArrowBack className="text-4xl text-secondary  tb:text-2xl  " />
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-col mt-10  ml-24 md:ml-20 md:mb-20 tb:mb-16 m:mb-14 tb:ml-20 m:ml-11">
        <div className="bg-primary pt-1 pb-1 w-6 "></div>
        <div className="text-xl font-lexend">My Blogs</div>

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
                <div className="flex justify-end">
                  <div>
                    <AiOutlineEdit className="text-2xl"></AiOutlineEdit>
                  </div>
                  <div>
                    <AiOutlineDelete className="text-2xl"></AiOutlineDelete>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyBlogs;
