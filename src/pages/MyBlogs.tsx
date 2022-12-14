import { useEffect, useState, MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../utils/firebase/firebase.utils";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import {
  collection,
  DocumentData,
  doc,
  getDocs,
  query,
  where,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { ArrowIcon } from "../assests/Arrow";
import Modal from "react-modal";
import { ImCancelCircle } from "react-icons/im";
import LoaderSpinner from "../components/LoaderSpinner.component";
import DeleteLoaderSpinner from "../components/DeleteLoaderSpinner.component";

function MyBlogs() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [uid, setUid] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [myBlogs, setMyBlogs] = useState<DocumentData[]>([]);
  const [text, setText] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [itemID, setItemID] = useState<string>("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);
  const [gotData, setgotData] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);

  const [isPhone, setIsPhone] = useState(
    window.matchMedia("(max-width: 767px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(max-width: 767px)")
      .addEventListener("change", (e) => setIsPhone(e.matches));
  }, []);

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
      getMyBlogsData();
    });
  }, [navigate, username]);

  // Navigate back to home page
  const back = () => {
    navigate("/home");
  };

  // Get all blogs of the current user
  const getMyBlogsData = async () => {
    const q = query(collection(db, "blogs"), where("uid", "==", uid));

    const querySnapshot = await getDocs(q);
    let newBlogsData: DocumentData[] = [];
    if (querySnapshot) {
      querySnapshot.forEach((doc) => {
        const documentData = doc.data();
        newBlogsData.push(documentData);
      });

      setMyBlogs(newBlogsData);
      setgotData(true);
      console.log(newBlogsData);
    } else {
      setgotData(false);
      console.log("No documents found.");
    }
  };

  // Edit Blog
  const editBlog = async (e: MouseEvent, id: any) => {
    e.preventDefault();
    console.log(id);
    setSubmitButtonDisabled(true);
    const taskDocRef = doc(db, "blogs", id);
    try {
      await updateDoc(taskDocRef, {
        title: text,
        blog: details,
      });
      getMyBlogsData();
      setSuccessMsg("Document has been updated successfully.");
      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
      setModalIsOpen(false);
      
    } catch (err) {
      setSubmitButtonDisabled(false);
      alert(err);
    }
    setSubmitButtonDisabled(false);
    console.log("edit");
  };

  // Delete Blog
  const deleteBlog = async (e: MouseEvent, id: any) => {
    e.preventDefault();
    setDeleteButtonDisabled(true);
    const docRef = doc(db, "blogs", id);
    try {
      await deleteDoc(docRef);
      getMyBlogsData();
      setDeleteClicked(false);
    } catch (err) {
      setDeleteButtonDisabled(false);
      alert(err);
    }
    setDeleteButtonDisabled(false);
  };

  // Format date
  const formatDate = (d: Date, format: boolean) => {
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "long" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

    return format ? `${da} ${mo} ${ye}` : `${da} ${mo}`;
  };
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-2 tb:col-span-1 tb:z-50 m:col-span-1 m:z-50">
          <div className="mt-11">
            <div className=" ml-16 top-9 font-dm font-normal m:ml-12">
              <div onClick={back}>
                <span className="text-2xl cursor-pointer">Back</span>
              </div>
            </div>
            <div className="absolute top-16 ml-11 m:ml-7">
              <div onClick={back} className="cursor-pointer">
                <ArrowIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full col-span-8 flex flex-col mt-12  md:mb-20 tb:mb-16 tb:ml-16 tb:mr-16 m:mb-14  m:ml-0 m:pl-2 m:pr-2 m:col-span-10">
          <div className="flex flex-col items-left  m:mt-20 tb:mt-20 ">
            <div className="bg-primary pt-1 pb-1 w-6 "></div>
            <div className="text-xl font-lexend">My Blogs</div>

            <div className="flex flex-col items-left ">
              <div className="flex flex-col mt-10 items-left tb:mt-5 m:mt-5 ">
                {gotData ? (
                  <>
                    {myBlogs.length <= 0 ? (
                      <h1 className="text-4xl text-primary text-left font-dm font-normal mb-5 mr-2 tb:text-3xl m:mb-3 m:text-2xl ">
                        No blogs available please create a new one :)
                      </h1>
                    ) : (
                      myBlogs.length > 0 &&
                      myBlogs.map((item) => {
                        return (
                          <div key={item.id}>
                            <div className="flex justify-between">
                              <h1 className="text-2xl font-semibold mb-1 m:hidden ">
                                {formatDate(
                                  new Date(item.date),
                                  false
                                ).toUpperCase()}
                              </h1>
                              <div className="flex justify-end tb:z-50 m:hidden m:z-50">
                                <div
                                  className="hover:bg-primary hover:text-white p-3 rounded-lg transition-all duration-200 cursor-pointer"
                                  onClick={() => {
                                    setModalIsOpen(true);
                                    setText(item.title);
                                    setDetails(item.blog);
                                    setItemID(item.id);
                                  }}
                                >
                                  <AiOutlineEdit className="text-2xl "></AiOutlineEdit>
                                </div>

                                <div
                                  className="ml-[2px] hover:bg-errorMsg hover:text-white p-3 rounded-lg transition-all duration-200 cursor-pointer"
                                  onClick={() => {
                                    setDeleteClicked(true);
                                    setItemID(item.id);
                                  }}
                                >
                                  <AiOutlineDelete className="text-2xl "></AiOutlineDelete>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between">
                              <Link to={`/viewblog/${item.id}`} className="">
                                <h1 className="text-4xl text-primary text-left font-dm font-normal mb-5 mr-2 tb:text-3xl m:mb-3 m:text-2xl ">
                                  {item.title}
                                </h1>
                              </Link>
                              <div className="2xl:hidden xl:hidden lg:hidden md:hidden tb:hidden flex justify-end m:z-50">
                                <div
                                  className="text-black cursor-pointer"
                                  onClick={() => {
                                    setModalIsOpen(true);
                                    setText(item.title);
                                    setDetails(item.blog);
                                    setItemID(item.id);
                                  }}
                                >
                                  <AiOutlineEdit className="text-2xl "></AiOutlineEdit>
                                </div>
                                <div
                                  className="ml-[2px] text-errorMsg cursor-pointer"
                                  onClick={() => {
                                    setDeleteClicked(true);
                                    setItemID(item.id);
                                  }}
                                >
                                  <AiOutlineDelete className="text-2xl "></AiOutlineDelete>
                                </div>
                              </div>
                            </div>
                            <Link to={`/viewblog/${item.id}`} className="">
                              <p className="font-normal text-left m:text-base m:font-extralight ">
                                {item.blog.slice(0, 600)}
                                {item.blog.length > 600 && (
                                  <span>
                                    ...{" "}
                                    <span className="text-primary font-normal">
                                      read more
                                    </span>
                                  </span>
                                )}
                              </p>
                            </Link>
                            <div className="flex justify-between  mb-8 mt-4 tb:mb-12 m:mb-12">
                              <div className=" 2xl:hidden xl:hidden lg:hidden md:hidden tb:hidden m:visible m:text-base m:font-semibold ">
                                {formatDate(
                                  new Date(item.date),
                                  true
                                ).toUpperCase()}
                              </div>
                              <div className="text-secondary text-base font-light m:text-right  ">
                                @{item.username}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}

                    <Modal
                      isOpen={modalIsOpen}
                      shouldCloseOnOverlayClick={false}
                      onRequestClose={() => setModalIsOpen(false)}
                      style={{
                        overlay: {
                          zIndex: 100,
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
                                  onClick={() => setModalIsOpen(false)}
                                  className="cursor-pointer"
                                >
                                  <ImCancelCircle className="text-2xl text-secondary  hover:text-primary  tb:text-base m:text-base " />
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-12">
                              <div className="col-span-12 mt-8 pl-8 pr-8 m:pl-4 m:pr-4 tb:pl-5 tb:pr-5 tb:items-center tb:justify-center m:items-center m:justify-center">
                                <div className="flex justify-between tb:justify-center m:justify-center">
                                  <h1 className="mb-2 font-dm font-bold text-4xl  text-left  text-darkGrey tb:text-center m:text-center">
                                    Edit Blog
                                  </h1>
                                  <div className="mt-1 mr-5 tb:hidden m:hidden">
                                    <div className="absolute">
                                      <div
                                        onClick={() => setModalIsOpen(false)}
                                        className="cursor-pointer"
                                      >
                                        <ImCancelCircle className="text-2xl text-secondary  hover:text-primary  tb:text-base m:text-base " />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="font-lexend flex flex-col ">
                                  <form>
                                    <div className="text-secondary">
                                      <p className="text-xl font-light mb-6 tb:text-center tb:text-base m:text-center m:text-base ">
                                        Let's show the world what you have for
                                        them
                                      </p>
                                      <input
                                        className="text-darkGrey border-solid border-2 border-secondary pt-5 pb-5 pl-8 pr-8 mb-2 w-full focus:outline-none focus:border-primary tb:pl-4 tb:text-sm m:text-xs m:pl-4 "
                                        type="text"
                                        required
                                        placeholder="Title"
                                        value={text}
                                        onChange={(e) =>
                                          setText(e.target.value)
                                        }
                                      />
                                      <textarea
                                        className="text-darkGrey border-solid border-2 border-secondary p-5 mb-2 w-full focus:outline-none focus:border-primary tb:pl-4 tb:text-sm   m:text-xs m:pl-4"
                                        placeholder="Write Blog Details"
                                        required
                                        rows={12}
                                        cols={12}
                                        value={details}
                                        onChange={(e) =>
                                          setDetails(e.target.value)
                                        }
                                      />

                                      <b className=" text-sm text-errorMsg mb-5  ">
                                        {errorMsg}
                                      </b>
                                      <b className=" text-sm text-successMsg mb-5  ">
                                        {successMsg}
                                      </b>

                                      <div className=" flex justify-end tb:justify-center m:justify-center">
                                        <button
                                          className="text-white font-semibold bg-secondary border-solid border-2  border-secondary  h-14 w-44  hover:outline-none hover:bg-darkGrey hover:border-none  disabled:bg-gray-500  tb:h-10  m:w-full m:h-10 m:text-sm"
                                          type="submit"
                                          onClick={(e) => editBlog(e, itemID)}
                                        >
                                          UPDATE
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
                  </>
                ) : (
                  <LoaderSpinner />
                )}

                <Modal
                  isOpen={deleteClicked}
                  shouldCloseOnOverlayClick={false}
                  onRequestClose={() => setDeleteClicked(false)}
                  style={{
                    overlay: {
                      zIndex: 100,
                      right: "0",
                      left: "0",
                      top: "0",
                      backgroundColor: "rgb(0,0,0,0.5)",
                    },
                    content: {
                      padding: "0px",
                      borderColor: "rgb(0,0,0,.5)",
                      borderWidth: "1px",
                      borderRadius: "16px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      top: "30%",
                      marginTop: isPhone ? "0px" : "20px",
                      width: isPhone ? "65%" : "35%",
                      height: isPhone ? "35%" : "30%",
                    },
                  }}
                >
                  <>
                    {deleteButtonDisabled ? (
                      <DeleteLoaderSpinner />
                    ) : (
                      <>
                        <div className="flex justify-end tb:mt-4 m:mt-4 2xl:hidden xl:hidden lg:hidden md:hidden">
                          <div className="absolute tb:mr-3 tb:p-1 m:mr-3 m:p-0">
                            <div
                              onClick={() => setDeleteClicked(false)}
                              className="cursor-pointer"
                            >
                              <ImCancelCircle className="text-2xl text-secondary  hover:text-primary  tb:text-base m:text-base " />
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-12">
                          <div className="col-span-12 mt-8 pl-8 pr-8 m:pl-4 m:pr-4 tb:pl-5 tb:pr-5 tb:items-center tb:justify-center m:items-center m:justify-center">
                            <div className="flex justify-between tb:mt-5 tb:justify-center m:justify-center m:items-center">
                              <h1 className="mb-2 font-dm font-bold text-4xl  text-left  text-darkGrey tb:text-center m:text-center m:text-3xl">
                                Delete Blog
                              </h1>
                              <div className="mt-1 mr-5 tb:hidden m:hidden">
                                <div className="absolute">
                                  <div
                                    onClick={() => setDeleteClicked(false)}
                                    className="cursor-pointer"
                                  >
                                    <ImCancelCircle className="text-2xl text-secondary  hover:text-primary  tb:text-base m:text-base " />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="font-lexend flex flex-col ">
                              <form>
                                <div className="text-secondary">
                                  <p className="text-xl font-light mb-6 tb:text-center tb:text-base m:text-center m:text-base ">
                                    Are you sure you want to delete?
                                  </p>

                                  <div className=" flex justify-end tb:justify-center m:justify-center">
                                    <button
                                      className="font-semibold text-sm bg-primary text-white border-solid h-10 w-10 m:w-14 tb:w-14 hover:outline-none hover:bg-white hover:text-primary hover:border-primary hover:border-2 rounded-lg transition-all duration-200  disabled:bg-gray-500"
                                      onClick={(e) => deleteBlog(e, itemID)}
                                    >
                                      Yes
                                    </button>
                                    <button
                                      className="ml-4 font-semibold text-sm bg-errorMsg text-white border-solid h-10 w-10 m:w-14 tb:w-14 hover:outline-none hover:bg-white hover:text-errorMsg hover:border-errorMsg hover:border-2 rounded-lg transition-all duration-200"
                                      onClick={() => {
                                        setDeleteClicked(false);
                                      }}
                                    >
                                      No
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
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2"></div>
      </div>
    </>
  );
}
export default MyBlogs;
