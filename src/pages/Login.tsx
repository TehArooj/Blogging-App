import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { auth } from "../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import CustomInput from "../components/CustomInput.component";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleChangeEmail = (e: FormEvent) => {
    e.preventDefault();
    setValues((prev) => ({
      ...prev,
      email: (e.target as HTMLInputElement).value,
    }));
  };

  const handleChangePassword = (e: FormEvent) => {
    e.preventDefault();
    setValues((prev) => ({
      ...prev,
      password: (e.target as HTMLInputElement).value,
    }));
  };

  const validations = () => {
    if (!values.email || !values.password) {
      setErrorMsg("Please Fill all the fields !");
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
      return;
    }
    setErrorMsg("");
  };

  const handleSubmission = async (e: FormEvent) => {
    e.preventDefault();

    // Validations
    validations();

    setSubmitButtonDisabled(true);

    //Sign in user

    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then(async () => {
        setSubmitButtonDisabled(false);
        navigate("/home");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message.slice(10));
        setTimeout(() => {
          setErrorMsg("");
        }, 3000);
      });
  };

  return (
    <div className=" grid grid-cols-3 justify-evenly not-italic w-full h-full md:grid-cols-4 tb:grid-cols-1 m:grid-cols-1">
      <div className="flex items-center justify-center w-full h-full md:col-span-2">
        <div className="flex items-center justify-center font-lexend absolute w-96  h-full left-0 top-0  bg-pawel-pattern bg-cover object-fill bg-no-repeat tb:hidden m:hidden">
          <div className="inherit text-6xl text-white text-center rotate-270  font-bold ">
            Login
            <div />
          </div>
        </div>
      </div>
      <div className=" col-span-2 flex items-center justify-center md:col-span-2 md:justify-center tb:col-span-auto tb:justify-center  m:justify-center ">
        <div className=" mt-40 left-1/2 lg:ml-24 lg:mr-20 md:ml-8 md:mr-8 tb:ml-48 tb:mr-48 tb:mt-24 tb:items-center tb:justify-center m:ml-36 m:mr-36 m:mt-36 m:items-center m:justify-center">
          <h1 className=" font-dm font-bold text-5xl  text-left  text-darkGrey  tb:text-center m:text-center">
            Welcome
          </h1>
          <div className="font-lexend flex flex-col ">
            <form>
              <div className="text-secondary ">
                <p className="text-2xl font-light  mb-5 tb:text-center m:text-center m:text-xl ">
                  Let's log you in quickly
                </p>

                <CustomInput
                  type="text"
                  placeholder="Email Address"
                  handleChange={handleChangeEmail}
                />
                <CustomInput
                  type="password"
                  placeholder="Password"
                  handleChange={handleChangePassword}
                />
              </div>
              <button
                className="text-white font-semibold bg-secondary border-solid border-2  border-secondary  h-14 w-44 mb-5  hover:outline-none hover:bg-darkGrey hover:border-none  disabled:bg-gray-500 md:w-80 tb:w-96 tb:h-10 m:w-64 m:h-10 m:text-sm"
                type="submit"
                onClick={handleSubmission}
                disabled={submitButtonDisabled}
              >
                LOGIN
              </button>
            </form>
            <div className="text-xl tb:text-base tb:text-center m:text-base m:text-center mb-5">
              <b className=" text-sm text-errorMsg ">{errorMsg}</b>
              <p className="text-darkGrey">
                Don't have an account?
                <Link to="/" className="text-primary  ml-1">
                  Sign-up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
