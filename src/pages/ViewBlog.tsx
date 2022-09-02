import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowIcon } from "../assests/Arrow";
import { auth, db } from "../utils/firebase/firebase.utils";
import LoaderSpinner from "../components/LoaderSpinner.component";

function ViewBlog() {
  const navigate = useNavigate();
  const { blogId }: any = useParams();
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [blog, setBlog] = useState("");
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");
  useEffect(() => {
    const getBlog = async () => {
      const docRef = doc(db, "blogs", blogId);
      try {
        const data: any = (await getDoc(docRef)).data();
        setTitle(data.title);
        setBlog(data.blog);
        setDate(data.date);
        setAuthor(data.username);

        console.log(data);
      } catch (err) {
        alert(err);
      }
    };
    getBlog();
  }, []);

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

  // Format date
  const formatDate = (d: Date) => {
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "long" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

    return `${da} ${mo} ${ye}`;
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
        {title ? (
          <div className="w-full col-span-8 flex flex-col mt-10 mb-20 md:mb-20 tb:mb-16 tb:ml-14 m:mb-14  m:ml-11">
            <div className="flex flex-col items-left  m:mt-10 tb:mt-12 ">
              <h1 className="text-4xl text-justify text-primary mb-5 font-dm font-normal tb:text-left m:text-left m:text-3xl m:mt-10">
                {title}
              </h1>
              <div className="flex justify-between">
                <div className="text-secondary mb-10 text-xl font-extralight  m:text-base">
                  written by @{author} <br />
                  on {formatDate(new Date(date)).toLowerCase()}
                </div>
              </div>
              <p className="text-xl font-normal text-justify first-letter:text-7xl  m:text-base m:font-normal">
                {blog}
              </p>
            </div>
          </div>
        ) : (
          <LoaderSpinner />
        )}
        <div className="col-span-2"></div>
      </div>
    </>
  );
}

export default ViewBlog;
