import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase/firebase.utils";
import { ArrowIcon } from "../assests/Arrow";

function ViewBlog() {
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
    navigate(-1);
  };
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-2 m:col-span-1 z-50">
          <div className="mt-10">
            <div className=" ml-20 top-11 tb:ml-12 ">
              <div onClick={back}>
                <span className="text-xl tb:text-base">Back</span>
              </div>
            </div>
            <div className="absolute top-12 ml-14 tb:ml-8">
              <div onClick={back}>
                <BiArrowBack className="text-4xl text-secondary  tb:text-2xl  " />
                {/* <ArrowIcon />*/}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-8 flex flex-col mt-10  md:mb-20 tb:mb-16 m:mb-14  m:ml-11">
          <div className="flex flex-col items-left  m:mt-10">
            <h1 className="text-4xl text-justify text-primary mb-5 font-dm font-normal m:text-3xl m:mt-10">
              15 Disadvantages Of Freedom And How You Can Workaround It.
            </h1>
            <div className="flex justify-between">
              <div className="text-secondary mb-10 text-xl font-extralight  m:text-base">
                written by @samurai992 <br />
                on 26 August 2022
              </div>
            </div>
            <p className="text-xl font-normal text-justify first-letter:text-7xl  m:text-base m:font-normal">
              Et molestiae hic earum repellat aliquid est doloribus delectus.
              Enim illum odio porro ut omnis dolor debitis natus. Voluptas
              possimus deserunt sit delectus est saepe nihil. Qui voluptate
              possimus et quia. Eligendi voluptas voluptas dolor cum. Rerum est
              quos quos id ut molestiae fugit. Et molestiae hic earum repellat
              aliquid est doloribus delectus. Enim illum odio porro ut omnis
              dolor debitis natus. Voluptas possimus deserunt sit delectus est
              saepe nihil. Qui voluptate possimus et quia. Eligendi voluptas
              voluptas dolor cum. Rerum est quos quos id ut molestiae fugit. Et
              molestiae hic earum repellat aliquid est doloribus delectus. Enim
              illum odio porro ut Tehreems. Voluptas possimus deserunt sit
              delectus est saepe nihil. Qui voluptate possimus et quia. Eligendi
              voluptas voluptas dolor cum. Rerum est quos quos id ut molestiae
              fugit.
            </p>
          </div>
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
}

export default ViewBlog;
