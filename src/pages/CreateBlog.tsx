import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { FormEvent, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../utils/firebase/firebase.utils";

function CreateBlog() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [uid, setUid] = useState("");
  const [values, setValues] = useState({
    title: "",
    blog: "",
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName!);
        localStorage.setItem("userName", user.displayName!);
        setUid(user.uid);
      }
      if (!localStorage.getItem("userName")) {
        navigate("/login");
      }
    });
  }, [navigate, username]);

  const handleTitle = (e: FormEvent) => {
    e.preventDefault();
    setValues((prev) => ({
      ...prev,
      title: (e.target as HTMLInputElement).value,
    }));
  };
  const handleBlog = (e: FormEvent) => {
    e.preventDefault();
    setValues((prev) => ({
      ...prev,
      blog: (e.target as HTMLInputElement).value,
    }));
  };

  const back = () => {
    navigate("/home");
  };

  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmission = async (e: FormEvent) => {
    e.preventDefault();
    // Validations
    if (!values.title || !values.blog) {
      setErrorMsg("Please Fill all the fields !");
      return;
    }
    setErrorMsg("");

    //have to add a unique id in here
    /*const date = new Date().toDateString().slice(4);
    const title = values.title;
    const blog = values.blog;
     const blogDocRef = doc(db, "blogs");
    blogDocRef.push().set({
      uid,
      username,
      date,
      title,
      blog,
    });*/

    /* const blogDocRef = doc(db, "blogs");
    const date = new Date().toDateString().slice(4);
    const title = values.title;
    const blog = values.blog;
    await setDoc(blogDocRef, {
      uid,
      username,
      date,
      title,
      blog,
    });*/
  };

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-2 m:col-span-1">
          <div className="mt-10">
            <div className=" ml-20 top-11 tb:ml-12 m:ml-10">
              <div onClick={back}>
                <span className="text-xl tb:text-base m:text-sm">Back</span>
              </div>
            </div>
            <div className="absolute top-12 ml-14 tb:ml-8 m:ml-6">
              <div onClick={back}>
                <BiArrowBack className="text-4xl text-secondary  tb:text-2xl m:text-xl " />
              </div>
            </div>
          </div>
        </div>
        <div className=" col-span-8 mt-10 tb:items-center tb:justify-center tb:mt-24  m:mt-24 m:items-center m:justify-center m:col-span-10 ">
          <h1 className=" font-dm font-bold text-5xl  text-left  text-darkGrey tb:text-center m:text-center">
            New Blog
          </h1>
          <div className="font-lexend flex flex-col ">
            <form>
              <div className="text-secondary ">
                <p className="text-2xl font-light mb-5 tb:text-center m:text-center m:text-xl ">
                  Let's show the world whate you have for them
                </p>
                <input
                  className="text-darkGrey border-solid border-2 border-secondary pt-5 pb-5 pl-8 pr-8 mb-5 w-960 focus:outline-none focus:border-primary lg:w-767 md:w-680 tb:w-512 tb:h-8 tb:pl-4 tb:text-sm m:w-96  m:h-8 m:text-xs m:pl-4 "
                  type="text"
                  required
                  placeholder="Title"
                  onChange={handleTitle}
                />
                <textarea
                  className="text-darkGrey border-solid border-2 border-secondary p-5 mb-16 w-960 focus:outline-none focus:border-primary lg:w-767 md:w-680 tb:w-512 tb:pl-4 tb:text-sm m:w-96  m:text-xs m:pl-4"
                  placeholder="Write Blog Details"
                  required
                  onChange={handleBlog}
                  rows={15}
                  cols={15}
                />
                <div className="flex justify-around">
                  <button
                    className="text-white font-semibold bg-secondary border-solid border-2  border-secondary  h-14 w-44  hover:outline-none hover:bg-darkGrey hover:border-none  disabled:bg-gray-500  tb:h-10 m:w-40 m:h-10 m:text-sm"
                    type="submit"
                    onClick={handleSubmission}
                  >
                    SUBMIT
                  </button>
                  <button
                    className="text-white font-semibold bg-secondary border-solid border-2  border-secondary  h-14 w-44  hover:outline-none hover:bg-darkGrey hover:border-none  disabled:bg-gray-500  tb:h-10 m:w-40 m:h-10 m:text-sm"
                    onClick={back}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-span-2 m:col-span-1"></div>
      </div>
    </>
  );
}
export default CreateBlog;
