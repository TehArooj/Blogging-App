import { FormEvent, useEffect, useState } from "react";
import { signOutUser, auth, db } from "../utils/firebase/firebase.utils";
import { Link, useNavigate } from "react-router-dom";
import { HiSearch, HiOutlinePlusCircle } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { FaBlog } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import Modal from "react-modal";
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  setDoc,
} from "firebase/firestore";
import uuid from "react-uuid";
import LoaderSpinner from "../components/LoaderSpinner.component";
import HomepageLoaderSpinner from "../components/HomepageLoaderSpinner.component";
Modal.setAppElement("#root");

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [uid, setUid] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [gotData, setgotData] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [values, setValues] = useState({
    title: "",
    blog: "",
  });

  const [searchedData, setSearchedData] = useState<DocumentData[]>([]);
  const [blogData, setBlogData] = useState<DocumentData[]>([]);

  const [searchQuery, setSearchQuery] = useState("");
  const firstLetter = username.charAt(0).toUpperCase();

  const [isPhone, setIsPhone] = useState(
    window.matchMedia("(max-width: 767px)").matches
  );

  // Store username in local storage to maintain session
  useEffect(() => {
    window
      .matchMedia("(max-width: 767px)")
      .addEventListener("change", (e) => setIsPhone(e.matches));
  }, []);

  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia("(min-width: 1024px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 1024px)")
      .addEventListener("change", (e) => setIsDesktop(e.matches));
  }, []);

  // Store username in local storage to maintain session
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
    if (searchedData) {
      console.log(searchedData);
    }
  }, [searchedData]);

  // Signout user
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

  // Navigate to my blogs page
  const myBlogs = () => {
    navigate("/myblogs");
  };

  // Change input of title and blog
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

  // Validation checks
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

  // Submit a new Blog
  const handleSubmission = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitButtonDisabled(true);
    // Validations
    const valid = validations();

    //Add new Blog
    if (valid) {
      let date = new Date().toUTCString();
      console.log(date);
      const title = values.title;
      const blog = values.blog;
      const id = uuid();
      await setDoc(doc(db, "blogs", id), {
        uid,
        username,
        date,
        title,
        blog,
        id,
      })
        .then((blogDocRef) => {
          setSubmitButtonDisabled(false);
          console.log("Document has been added successfully");
          setValues({
            blog: "",
            title: "",
          });
          setSuccessMsg("Document has been added successfully");
          setTimeout(() => {
            setSuccessMsg("");
          }, 3000);
          setModalIsOpen(false);
          getData();
        })
        .catch((err) => {
          setSubmitButtonDisabled(false);
          console.log(err.message);
        });
    }
  };

  // Get blogs data of all users
  const getData = async () => {
    const docsRef = collection(db, "blogs");
    const docsSnap = await getDocs(docsRef);
    if (docsSnap) {
      let newBlogsData: DocumentData[] = [];
      docsSnap.docs.forEach((doc) => {
        newBlogsData.push(doc.data());
      });
      console.log(newBlogsData);
      newBlogsData.sort((a, b) =>
        new Date(a.date) < new Date(b.date) ? 1 : -1
      );
      setBlogData(newBlogsData);
      setgotData(true);
    } else {
      setgotData(false);
      console.log("No documents found.");
    }
    setSearchQuery("");
  };

  // Search
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setSearchClicked(!searchClicked);
    console.log("Search");
  };

  // Close Modal and refresh to get realtime data
  const closeModalAndRefreshPage = () => {
    getData();
    setModalIsOpen(false);
  };
  useEffect(() => {
    console.log(searchQuery);
    console.log(searchedData);
    setSearchedData(
      blogData.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [blogData, searchQuery]);

  // Format date
  const formatDate = (d: Date, format: boolean) => {
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "long" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

    return format ? `${da} ${mo} ${ye}` : `${da} ${mo}`;
  };

  return (
    <>
      <div className="fixed top-0 left-0 flex justify-around items-center w-24 h-screen bg-darkGrey  flex-col md:flex-row md:bottom-0 md:h-20 md:w-screen md:top-auto md:drop-shadow-[0_-6mm_4mm_white]  tb:flex-row tb:bottom-0 tb:h-16 tb:w-screen tb:top-auto  tb:drop-shadow-[0_-6mm_4mm_white]   m:flex-row m:bottom-0 m:h-16 m:w-screen m:top-auto m:drop-shadow-[0_-6mm_4mm_white]">
        <div className="flex flex-col justify-between h-full w-full mt-4 mb-4 items-center md:flex-row tb:flex-row m:flex-row">
          <div className="md:flex md:flex-row md:w-full md:justify-evenly tb:justify-evenly tb:flex tb:flex-row tb:w-full m:justify-evenly m:flex m:flex-row m:w-full">
            <div className=" md:flex tb:flex m:flex items-center text-center font-semibold ">
              <span className="ml-2 w-16 h-16 block text-2xl text-white text-center rounded-50  bg-primary p-4 md:w-9 md:h-9 md:p-1 md:text-xl  tb:w-9 tb:h-9 tb:p-1 tb:text-xl m:w-9 m:h-9 m:p-1 m:text-xl">
                {firstLetter}
              </span>
              <div className="2xl:hidden xl:hidden lg:hidden md:visible md:text-sm md:ml-3 md:font-normal md:text-white tb:hidden  m:hidden">
                {username}
              </div>
            </div>

            <div
              className=" items-center 2xl:mt-5 xl:mt-5 lg:mt-5  md:flex md:justify-between cursor-pointer hover:bg-darkerGrey p-4 rounded-lg transition-all duration-200"
              onClick={handleSearch}
            >
              <HiSearch className="ml-2 text-center text-3xl text-primary tb:text-2xl tb:ml-0 m:ml-0 m:text-2xl" />
              <span className=" text-sm text-white ml-1 tb:hidden m:hidden ">
                search
              </span>
            </div>

            <div
              className=" items-center 2xl:mt-5 xl:mt-5 lg:mt-5 md:flex md:justify-between cursor-pointer hover:bg-darkerGrey p-4 rounded-lg transition-all duration-200 "
              onClick={() => setModalIsOpen(true)}
            >
              <HiOutlinePlusCircle className="ml-2  text-3xl text-primary  tb:text-2xl tb:ml-0 m:ml-0 m:text-2xl" />
              <span className=" text-sm text-white ml-1 tb:hidden m:hidden">
                create
              </span>
            </div>
            <Modal
              isOpen={modalIsOpen}
              shouldCloseOnOverlayClick={false}
              onRequestClose={() => setModalIsOpen(false)}
              style={{
                overlay: {
                  right: "0",
                  left: "0",
                  backgroundColor: "rgb(0,0,0,0.5)",
                },
                content: {
                  padding: "0px",
                  borderColor: "rgb(0,0,0,.5)",
                  borderWidth: "1px",
                  borderRadius: "16px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: isPhone ? "3px" : "20px",
                  width: isPhone ? "80%" : "58%",
                  height: isPhone ? "85%" : "80%",
                },
              }}
            >
              <>
                {submitButtonDisabled ? (
                  <LoaderSpinner />
                ) : (
                  <>
                    <div className="flex justify-end tb:mt-4 m:mt-4 2xl:hidden xl:hidden lg:hidden md:hidden">
                      <div className="absolute tb:mr-5 tb:p-1 m:mr-3 m:p-0">
                        <div
                          onClick={closeModalAndRefreshPage}
                          className="cursor-pointer"
                        >
                          <ImCancelCircle className="text-2xl text-secondary  hover:text-primary  tb:text-base m:text-base " />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 ">
                      <div className="col-span-12 mt-8 pl-8 pr-8 m:pl-4 m:pr-4 tb:pl-5 tb:pr-5 tb:items-center tb:justify-center m:items-center m:justify-center">
                        <div className="flex justify-between tb:justify-center m:justify-center">
                          <h1 className="mb-2 font-dm font-bold text-4xl text-left  text-darkGrey tb:text-center m:text-center">
                            New Blog
                          </h1>
                          <div className="mt-1 mr-5 tb:hidden m:hidden">
                            <div className="absolute">
                              <div
                                onClick={closeModalAndRefreshPage}
                                className="cursor-pointer"
                              >
                                <ImCancelCircle className="text-2xl text-secondary  hover:text-primary  tb:text-base m:text-base " />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="font-lexend flex flex-col ">
                          <form>
                            <div className="text-secondary ">
                              <p className="text-xl font-light mb-6 tb:text-center tb:text-base m:text-center m:text-base ">
                                Let's show the world what you have for them
                              </p>
                              <input
                                className="text-darkGrey border-solid border-2 border-secondary pt-4 pb-4 pl-8 pr-8 mb-2 w-full focus:outline-none focus:border-primary  tb:pl-4 tb:text-sm m:text-xs m:pl-4 "
                                type="text"
                                required
                                placeholder="Title"
                                value={values.title}
                                onChange={handleTitle}
                              />
                              <textarea
                                className="text-darkGrey border-solid border-2 border-secondary p-5 mb-2 w-full  focus:outline-none focus:border-primary tb:pl-4 tb:text-sm  m:text-xs m:pl-4"
                                placeholder="Write Blog Details"
                                required
                                value={values.blog}
                                onChange={handleBlog}
                                rows={12}
                                cols={12}
                              />
                              <b className=" text-sm text-errorMsg mb-5  ">
                                {errorMsg}
                              </b>
                              <b className=" text-sm text-successMsg mb-5  ">
                                {successMsg}
                              </b>
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
                    </div>
                  </>
                )}
              </>
            </Modal>
            <div
              className="2xl:mt-5 xl:mt-5 lg:mt-5 items-center md:flex md:justify-between cursor-pointer hover:bg-darkerGrey p-4 rounded-lg transition-all duration-200"
              onClick={myBlogs}
            >
              <FaBlog className="ml-3 text-2xl text-primary tb:text-xl tb:ml-1 m:ml-1 m:text-xl" />
              <span className=" text-sm text-white ml-1 tb:hidden m:hidden">
                blogs
              </span>
            </div>
          </div>
          <div
            className="items-center md:w-30 md:mt-0 md:mr-10 md:flex md:justify-between cursor-pointer hover:bg-darkerGrey p-4 rounded-lg transition-all duration-200	 "
            onClick={SignOut}
          >
            <FiLogOut className="ml-2 text-3xl text-primary md:text-5xl tb:text-2xl tb:ml-0 tb:mr-14 m:mr-6 m:ml-0 m:text-2xl" />
            <span className=" text-sm text-white ml-1 tb:hidden m:hidden w-full">
              logout
            </span>
          </div>
        </div>
      </div>

      <div
        className={`absolute top-0 left-0 w-screen h-20 m:h-16 ml-24 md:ml-0 tb:ml-0 m:ml-0 flex items-center flex-row justify-center bg-darkGrey  drop-shadow-2xl ${
          searchClicked ? "block" : "hidden"
        }`}
      >
        <input
          value={searchQuery}
          placeholder="Search By Title"
          type="search"
          className=" w-1/2 p-3 rounded-sm outline-none m:p-2"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="ml-8 m:ml-4 tb:ml-4 m:p-3 cursor-pointer hover:bg-darkerGrey p-4 rounded-lg transition-all duration-200 ">
          <ImCancelCircle
            className=" text-primary text-xl"
            onClick={handleSearch}
          />
        </div>
      </div>
      <div className=" flex flex-col mt-10 md:mb-20 tb:mb-16 m:mb-14 ml-24 pl-28 pr-28  md:ml-0 tb:ml-0 m:ml-0 md:pl-14 md:pr-14 tb:pl-12 tb:pr-12 m:mt-20 m:pl-11 m:pr-11">
        <div
          className={`mb-10 flex flex-col items-left ${
            searchClicked ? "mt-20" : ""
          }`}
        >
          <div className="m:flex m:justify-center m:items-center ">
            <div className="bg-primary pt-1 pb-1 w-5"></div>
          </div>
          <div className="text-xl font-lexend font-normal m:text-center ">
            Latest
          </div>

          <div className="flex flex-col mt-10 items-left ">
            {gotData ? (
              <>
                {searchedData.length > 0 &&
                  searchedData.map((item) => {
                    return (
                      <div key={item.id}>
                        <h1 className="text-2xl font-semibold mb-1 m:hidden">
                          {formatDate(new Date(item.date), false).toUpperCase()}
                        </h1>
                        <Link to={`/viewblog/${item.id}`} className="mb-14">
                          <h1 className="text-4xl text-primary text-left font-dm font-normal mb-5 m:mb-3 tb:text-3xl  m:text-2xl">
                            {item.title}
                          </h1>
                          <p className="font-normal text-left m:text-base m:font-extralight ">
                            {item.blog.slice(0, 650)}
                            {item.blog.length > 650 && (
                              <span>
                                ...{" "}
                                <span className="text-primary font-normal">
                                  read more
                                </span>
                              </span>
                            )}
                          </p>
                        </Link>
                        <div className="flex justify-between mb-8 mt-4 tb:mb-12 m:mb-12   ">
                          <div className=" 2xl:hidden xl:hidden lg:hidden md:hidden tb:hidden m:visible m:text-base m:font-semibold ">
                            {formatDate(
                              new Date(item.date),
                              true
                            ).toUpperCase()}
                          </div>
                          <div className="text-secondary text-base font-light m:text-right ">
                            @{item.username}
                          </div>
                        </div>
                      </div>
                    );
                  })}{" "}
              </>
            ) : isDesktop ? (
              <HomepageLoaderSpinner />
            ) : (
              <LoaderSpinner />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
