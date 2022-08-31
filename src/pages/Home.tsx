import { FormEvent, useEffect, useState } from "react";
import { signOutUser, auth, db } from "../utils/firebase/firebase.utils";
import { Link, useNavigate } from "react-router-dom";
import { HiSearch, HiViewList, HiOutlinePlusCircle } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import Modal from "react-modal";
import { addDoc, collection, DocumentData, getDocs } from "firebase/firestore";
import uuid from "react-uuid";
Modal.setAppElement("#root");

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [uid, setUid] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [values, setValues] = useState({
    title: "",
    blog: "",
  });

  const [blogData, setBlogData] = useState<DocumentData[]>([]);

  const firstLetter = username.charAt(0);

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
      getData();
    });
  }, [navigate, username]);

  useEffect(() => {
    if (blogData) {
      console.log(blogData);
    }
  }, [blogData]);

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

  const handleTitle = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setValues((prev) => ({
      ...prev,
      title: (e.target as HTMLInputElement).value,
    }));
  };
  const handleBlog = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setValues((prev) => ({
      ...prev,
      blog: (e.target as HTMLInputElement).value,
    }));
  };

  const formatDate = (date: any) => {
    const convertToDoubleDigit = (val: any) => `0${val}`.slice(-2);

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${convertToDoubleDigit(date.getDate())} ${
      months[date.getMonth()]
    } ${date.getFullYear()}`;
  };
  //console.log(formatDate(new Date("Aug 31 2022")));

  const validations = () => {
    if (!values.title || !values.blog) {
      setErrorMsg("Please fill all the fields.");
      setSubmitButtonDisabled(false);
      setSuccessMsg("");
      return false;
    }
    setErrorMsg("");
    return true;
  };

  const handleSubmission = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitButtonDisabled(true);
    // Validations
    const valid = validations();

    //Add new Blog
    if (valid) {
      let date = new Date().toDateString().slice(4);
      // date = formatDate(strDate);
      const title = values.title;
      const blog = values.blog;
      const blogDocRef = collection(db, "blogs");
      await addDoc(blogDocRef, {
        uid,
        username,
        date,
        title,
        blog,
        id: uuid(),
      })
        .then((blogDocRef) => {
          setSubmitButtonDisabled(false);
          console.log("Document has been added successfully");
          console.log("ID of the added document: " + blogDocRef.id);
          setValues({
            blog: "",
            title: "",
          });
          setSuccessMsg("Document has been added successfully");
          setTimeout(() => {
            setSuccessMsg("");
          }, 3000);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const getData = async () => {
    const docsRef = collection(db, "blogs");
    const docsSnap = await getDocs(docsRef);

    if (docsSnap) {
      let newBlogsData: DocumentData[] = [];
      docsSnap.docs.forEach((doc) => {
        //console.log("Doucument Id: ", doc.id);
        newBlogsData.push(doc.data());
        //setBlogData((prev) => [...prev, doc.data()]);
      });
      setBlogData(newBlogsData);
      console.log(blogData);
    } else {
      console.log("No documents found.");
    }
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    console.log("Search");
  };

  return (
    <>
      <div className="fixed top-0 left-0 flex justify-around items-center w-24 h-screen bg-darkGrey  flex-col md:flex-row md:bottom-0 md:h-24 md:w-screen md:top-auto md:drop-shadow-[0_-6mm_4mm_white]  tb:flex-row tb:bottom-0 tb:h-20 tb:w-screen tb:top-auto  tb:drop-shadow-[0_-6mm_4mm_white]   m:flex-row m:bottom-0 m:h-16 m:w-screen m:top-auto m:drop-shadow-[0_-6mm_4mm_white]">
        <div className="md:flex items-center text-center font-semibold ">
          <span className="w-16 h-16 block text-2xl text-white text-center  rounded-50  bg-primary p-4 tb:w-9 tb:h-9 tb:p-1 tb:text-xl m:w-7 m:h-7 m:p-1 m:text-sm">
            {firstLetter}
          </span>
          <div className="2xl:hidden xl:hidden lg:hidden md:visible md:text-sm md:ml-5 md:font-normal md:text-white tb:hidden  m:hidden">
            {username}
          </div>
        </div>

        <div
          className=" items-center md:flex md:justify-between cursor-pointer hover:bg-darkerGrey p-4 rounded-lg transition-all duration-200"
          onClick={handleSearch}
        >
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
          shouldCloseOnOverlayClick={false}
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
                <div className="mt-8">
                  <div className="absolute ml-14 tb:ml-8 m:ml-6">
                    <div onClick={() => setModalIsOpen(false)}>
                      <ImCross className="text-base text-secondary tb:text-sm m:text-sm " />
                    </div>
                  </div>
                </div>
              </div>
              <div className=" col-span-8 mt-8 tb:items-center tb:justify-center tb:mt-24  m:mt-24 m:items-center m:justify-center m:col-span-10 ">
                <h1 className=" font-dm font-bold text-4xl  text-left  text-darkGrey tb:text-center m:text-center">
                  New Blog
                </h1>
                <div className="font-lexend flex flex-col ">
                  <form>
                    <div className="text-secondary ">
                      <p className="text-xl font-light mb-5 tb:text-center m:text-center m:text-xl ">
                        Let's show the world what you have for them
                      </p>
                      <input
                        className="text-darkGrey border-solid border-2 border-secondary pt-5 pb-5 pl-8 pr-8 mb-5 w-full focus:outline-none focus:border-primary  tb:h-8 tb:pl-4 tb:text-sm   m:h-8 m:text-xs m:pl-4 "
                        type="text"
                        required
                        placeholder="Title"
                        value={values.title}
                        onChange={handleTitle}
                      />
                      <textarea
                        className="text-darkGrey border-solid border-2 border-secondary p-5 mb-5 w-full focus:outline-none focus:border-primary tb:pl-4 tb:text-sm   m:text-xs m:pl-4"
                        placeholder="Write Blog Details"
                        required
                        value={values.blog}
                        onChange={handleBlog}
                        rows={12}
                        cols={12}
                      />
                      <div className="mb-5">
                        <b className=" text-sm text-errorMsg mb-5  ">
                          {errorMsg}
                        </b>
                      </div>
                      <div className="mb-5">
                        <b className=" text-sm text-successMsg mb-5  ">
                          {successMsg}
                        </b>
                      </div>

                      <div className="flex justify-end tb:justify-center m:justify-center">
                        <button
                          className="text-white font-semibold bg-secondary border-solid border-2  border-secondary  h-14 w-44  hover:outline-none hover:bg-darkGrey hover:border-none  disabled:bg-gray-500  tb:h-10  m:w-full m:h-10 m:text-sm"
                          type="submit"
                          onClick={handleSubmission}
                          disabled={submitButtonDisabled}
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

        <div className=" mb-10 flex flex-col items-left ">
          <div className="flex flex-col mt-10  items-left mr-8">
            {blogData.length > 0 &&
              blogData.map((item) => {
                return (
                  <div key={item.id}>
                    <h1 className="text-2xl font-semibold m:hidden">
                      {item.date}
                    </h1>
                    <Link to="/viewblog" className="mb-14 mr-12 m:mr-8">
                      <h1 className="text-3xl text-primary font-dm font-normal m:text-2xl">
                        {item.title}
                      </h1>
                      <p className="line-clamp-5 font-normal text-justify m:text-base m:font-extralight m:line-clamp-6">
                        {item.blog}
                      </p>
                      <div className="text-primary font-normal">read more</div>
                      <div className="flex justify-between">
                        <div className=" 2xl:hidden xl:hidden lg:hidden md:hidden tb:hidden m:visible m:text-base m:font-semibold ">
                          {item.date}
                        </div>
                        <div className="text-secondary text-base font-light m:text-right ">
                          @{item.username}
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
