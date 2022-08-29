import { FormEvent, useEffect, useState } from "react";
import { signOutUser, auth } from "../utils/firebase/firebase.utils";
import { Link, useNavigate } from "react-router-dom";
import { HiSearch, HiViewList, HiOutlinePlusCircle } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [values, setValues] = useState({
    title: "",
    blog: "",
  });

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

  const validations = () => {
    if (!values.title || !values.blog) {
      setErrorMsg("Please Fill all the fields !");
      return;
    }
    setErrorMsg("");
  };

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
          onClick={() => setModalIsOpen(true)}
        >
          <HiOutlinePlusCircle className="ml-1  text-3xl text-primary  tb:text-2xl tb:ml-0 m:ml-0 m:text-xl" />
          <span className=" text-sm text-white tb:hidden m:hidden">create</span>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            overlay: {},
            content: {
              borderColor: "black",
              borderWidth: "1px",
              borderRadius: "16px",
            },
          }}
        >
          <>
            <div className="grid grid-cols-12">
              <div className="col-span-2 m:col-span-1">
                <div className="mt-10">
                  <div className="absolute top-12 ml-14 tb:ml-8 m:ml-6">
                    <div onClick={() => setModalIsOpen(false)}>
                      <ImCross className="text-base text-secondary  tb:text-2xl m:text-xl " />
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
                      <div className="flex justify-end">
                        <button
                          className="text-white font-semibold bg-secondary border-solid border-2  border-secondary  h-14 w-44  hover:outline-none hover:bg-darkGrey hover:border-none  disabled:bg-gray-500  tb:h-10 m:w-40 m:h-10 m:text-sm"
                          type="submit"
                          onClick={handleSubmission}
                        >
                          SUBMIT
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-span-2 m:col-span-1"></div>
            </div>
          </>
        </Modal>
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
