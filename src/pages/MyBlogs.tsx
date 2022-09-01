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
import { ImCross } from "react-icons/im";
import LoaderSpinner from "../components/LoaderSpinner.component";

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
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [gotData, setgotData] = useState(false);

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

  const back = () => {
    navigate("/home");
  };

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
      setSubmitButtonDisabled(false);
    } catch (err) {
      alert(err);
    }
    console.log("edit");
  };

  const deleteBlog = async (id: any) => {
    const docRef = doc(db, "blogs", id);
    try {
      await deleteDoc(docRef);
    } catch (err) {
      alert(err);
    }
    getMyBlogsData();
  };

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-2 tb:col-span-1 tb:z-50 m:col-span-1 m:z-50">
          <div className="mt-10">
            <div className=" ml-20 top-11">
              <div onClick={back}>
                <span className="text-xl cursor-pointer">Back</span>
              </div>
            </div>
            <div className="absolute top-14 ml-14">
              <div onClick={back} className="cursor-pointer">
                <ArrowIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full col-span-8 flex flex-col mt-10  md:mb-20 tb:mb-16 tb:ml-14 m:mb-14  m:ml-11">
          <div className="flex flex-col items-left  m:mt-10 tb:mt-12 ">
            <div className="bg-primary pt-1 pb-1 w-6 "></div>
            <div className="text-xl font-lexend">My Blogs</div>

            <div className="flex flex-col items-left ">
              <div className="flex flex-col mt-10  items-left ">
                {gotData ? (
                  <>
                    {myBlogs.length > 0 &&
                      myBlogs.map((item) => {
                        return (
                          <div key={item.id}>
                            <div className="flex justify-between m:justify-end">
                              <h1 className="text-2xl font-semibold m:hidden">
                                {item.date}
                              </h1>
                              <div className="flex justify-end m:z-50">
                                <div
                                  className="hover:bg-primary hover:text-white p-3 rounded-lg transition-all duration-200"
                                  onClick={() => {
                                    setModalIsOpen(true);
                                    setText(item.title);
                                    setDetails(item.blog);
                                  }}
                                >
                                  <AiOutlineEdit className="text-2xl"></AiOutlineEdit>
                                </div>

                                <div
                                  className="ml-2 hover:bg-errorMsg hover:text-white p-3 rounded-lg transition-all duration-200"
                                  onClick={() => deleteBlog(item?.id)}
                                >
                                  <AiOutlineDelete className="text-2xl"></AiOutlineDelete>
                                </div>
                              </div>
                            </div>

                            <Link to={`/viewblog/${item.id}`} className="">
                              <h1 className="text-3xl text-primary font-dm font-normal m:text-2xl">
                                {item.title}
                              </h1>
                              <p className="line-clamp-5 font-normal text-justify m:text-base m:font-extralight m:line-clamp-6">
                                {item.blog}
                              </p>
                              <div className="text-primary font-normal">
                                read more
                              </div>
                            </Link>
                            <div className="flex justify-between mb-14 ">
                              <div className=" 2xl:hidden xl:hidden lg:hidden md:hidden tb:hidden m:visible m:text-base m:font-semibold ">
                                {item.date}
                              </div>
                              <div className="text-secondary text-base font-light m:text-right  ">
                                @{item.username}
                              </div>
                            </div>
                            <Modal
                              isOpen={modalIsOpen}
                              shouldCloseOnOverlayClick={false}
                              onRequestClose={() => setModalIsOpen(false)}
                              style={{
                                overlay: {
                                  zIndex: 100,
                                },
                                content: {
                                  borderColor: "black",
                                  borderWidth: "1px",
                                  borderRadius: "16px",
                                },
                              }}
                            >
                              <>
                                {submitButtonDisabled ? (
                                  <LoaderSpinner />
                                ) : (
                                  <div className="grid grid-cols-12">
                                    <div className="col-span-2 m:col-span-1">
                                      <div className="mt-8">
                                        <div className="absolute ml-14 tb:ml-8 m:ml-6">
                                          <div
                                            onClick={() =>
                                              setModalIsOpen(false)
                                            }
                                          >
                                            <ImCross className="text-base text-secondary tb:text-sm m:text-sm " />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className=" col-span-8 mt-8 tb:items-center tb:justify-center tb:mt-24  m:mt-24 m:items-center m:justify-center m:col-span-10 ">
                                      <h1 className=" font-dm font-bold text-4xl  text-left  text-darkGrey tb:text-center m:text-center">
                                        Edit Blog
                                      </h1>
                                      <div className="font-lexend flex flex-col ">
                                        <form>
                                          <div className="text-secondary ">
                                            <p className="text-xl font-light mb-5 tb:text-center m:text-center m:text-xl ">
                                              Let's show the world what you have
                                              for them
                                            </p>
                                            <input
                                              className="text-darkGrey border-solid border-2 border-secondary pt-5 pb-5 pl-8 pr-8 mb-5 w-full focus:outline-none focus:border-primary tb:pl-4 tb:text-sm m:text-xs m:pl-4 "
                                              type="text"
                                              required
                                              placeholder="Title"
                                              value={text}
                                              onChange={(e) =>
                                                setText(e.target.value)
                                              }
                                            />
                                            <textarea
                                              className="text-darkGrey border-solid border-2 border-secondary p-5 mb-5 w-full focus:outline-none focus:border-primary tb:pl-4 tb:text-sm   m:text-xs m:pl-4"
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
                                                onClick={(e) =>
                                                  editBlog(e, item.id)
                                                }
                                              >
                                                UPDATE
                                              </button>
                                            </div>
                                          </div>
                                        </form>
                                      </div>
                                    </div>
                                    <div className="col-span-2 m:col-span-1"></div>
                                  </div>
                                )}
                              </>
                            </Modal>
                          </div>
                        );
                      })}
                  </>
                ) : (
                  <LoaderSpinner />
                )}
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
