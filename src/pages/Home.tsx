import { signOutUser, auth } from "../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { HiViewList } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";

const Home = () => {
  const navigate = useNavigate();

  const handleSession = async () => {
    try {
      await signOutUser().then(() => {
        navigate("/");
        console.log(auth);
      });
    } catch (error) {
      console.log(error);
    }
    console.log("session end");
  };

  return (
    <div>
      <div className=" grid grid-cols-12 justify-evenly not-italic w-full h-full">
        <div className="flex items-start w-full h-full">
          <div className="flex flex-col items-center font-lexend absolute w-24 h-full left-0 top-0  bg-darkGrey bg-cover object-fill bg-no-repeat">
            <div>
              <div className="text-2xl  text-white text-center mt-10 mb-14 rounded-50 bg-primary  p-2">
                S
              </div>
            </div>

            <HiSearch className=" text-3xl text-primary  mb-14" />
            <IoMdAddCircleOutline className=" text-3xl text-primary mb-14" />
            <HiViewList className=" text-3xl text-primary mb-14" />
            <FiLogOut className=" text-3xl text-primary mb-14" />
          </div>
        </div>
        <div className=" col-span-11 flex items-left ">
          <div>
            <h1>Hi You have succesfully logged In Welcome Home</h1>
            <button
              className="text-white font-semibold bg-secondary border-solid border-2  border-secondary  h-14 w-44  mb-5 hover:outline-none hover:bg-darkGrey hover:border-none  disabled:bg-gray-500"
              type="submit"
              onClick={handleSession}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
