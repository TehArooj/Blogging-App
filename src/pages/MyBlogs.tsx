import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../utils/firebase/firebase.utils";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { ArrowIcon } from "../assests/Arrow";

function MyBlogs() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [uid, setUid] = useState("");
  const [blogs, setBlogs] = useState<string[]>([]);

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
    querySnapshot.forEach((doc) => {
      //setBlogs([...blogs, doc.data()]);
      console.log(doc.id, " => ", doc.data());
    });
  };

  const editBlog = () => {
    console.log("edit");
  };

  const deleteBlog = () => {
    console.log("delete");
  };
  let count = [1, 2, 3, 4, 5];
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
            <div className="absolute top-14 ml-14 tb:ml-8">
              <div onClick={back}>
                <ArrowIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-8 flex flex-col mt-10  md:mb-20 tb:mb-16 m:mb-14  m:ml-11">
          <div className="flex flex-col items-left  m:mt-10">
            <div className="bg-primary pt-1 pb-1 w-6 "></div>
            <div className="text-xl font-lexend">My Blogs</div>

            <div className="flex flex-col items-left ">
              <div className="flex flex-col mt-10  items-left ">
                {count &&
                  count.map((item) => {
                    return (
                      <>
                        <div className="flex justify-between">
                          <h1 className="text-2xl font-semibold m:hidden">
                            26 August
                          </h1>
                          <div className="flex justify-end z-50">
                            <div className="hover:bg-primary hover:text-white p-3 rounded-lg transition-all duration-200">
                              <AiOutlineEdit
                                className="text-2xl"
                                onClick={editBlog}
                              ></AiOutlineEdit>
                            </div>
                            <div className="ml-2 hover:bg-errorMsg hover:text-white p-3 rounded-lg transition-all duration-200">
                              <AiOutlineDelete
                                className="text-2xl"
                                onClick={deleteBlog}
                              ></AiOutlineDelete>
                            </div>
                          </div>
                        </div>

                        <Link to="/viewblog" className="">
                          <h1 className="text-3xl text-primary font-dm font-normal m:text-2xl">
                            15 Disadvantages Of Freedom And How You Can
                            Workaround It.
                          </h1>
                          <p className="line-clamp-5 font-normal text-justify m:text-base m:font-extralight m:line-clamp-6">
                            Et molestiae hic earum repellat aliquid est
                            doloribus delectus. Enim illum odio porro ut omnis
                            dolor debitis xnatus. Voluptas possimus deserunt sit
                            delectus est saepe nihil. Qui voluptate possimus et
                            quia. Eligendi voluptas voluptas dolor cum. Rerum
                            est quos quos id ut molestiae fugit. Et molestiae
                            hic earum repellat aliquid est doloribus delectus.
                            Enim illum odio porro ut omnis dolor debitis natus.
                            Voluptas possimus deserunt sit delectus est saepe
                            nihil. Qui voluptate possimus et quia. Eligendi
                            voluptas voluptas dolor cum. Rerum est quos quos id
                            ut molestiae fugit. Et molestiae hic earum repellat
                            aliquid est doloribus delectus. Enim illum odio
                            porro ut Tehreems. Voluptas possimus deserunt sit
                            delectus est saepe nihil. Qui voluptate possimus et
                            quia. Eligendi voluptas voluptas dolor cum. Rerum
                            est quos quos id ut molestiae fugit.
                          </p>
                          <div className="text-primary font-normal">
                            read more
                          </div>
                        </Link>
                        <div className="flex justify-between mr-12 mb-14 ">
                          <div className=" 2xl:hidden xl:hidden lg:hidden md:hidden tb:hidden m:visible m:text-base m:font-semibold ">
                            26 August 2022
                          </div>
                          <div className="text-secondary text-base font-light m:text-right ">
                            @{username}
                          </div>
                        </div>
                      </>
                    );
                  })}
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
