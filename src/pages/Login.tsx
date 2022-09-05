import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { auth } from "../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import CustomInput from "../components/CustomInput.component";
import LoaderSpinner from "../components/LoaderSpinner.component";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  // Change input of user credentials
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

  // Validation checks
  const validations = () => {
    if (!values.email || !values.password) {
      setErrorMsg("Please fill all the fields.");
      return;
    }
    setErrorMsg("");
  };

  // Submit user data to login / signin
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
        if (values.email && values.password) {
          setErrorMsg("Invalid email / password.");
        }
      });
  };

  return (
    <>
      {submitButtonDisabled ? (
        <LoaderSpinner />
      ) : (
        <>
          <div className=" flex not-italic w-full h-full">
            <div className="flex items-start justify-center w-[426px] lg:w-[400px]  md:w-[380px] h-full tb:hidden m:hidden">
              <div className="flex items-center justify-center font-lexend w-[426px] lg:w-[400px] md:w-[380px]  h-screen left-0 top-0  bg-pawel-pattern  bg-cover object-fill bg-no-repeat tb:hidden m:hidden">
                <div className="inherit text-6xl text-white text-center rotate-270  font-bold ">
                  Login
                  <div />
                </div>
              </div>
            </div>
            <div className="flex  flex-col w-full tb:w-full m:w-full h-full">
              <div className="mt-48 tb:mt-48 m:mt-48 2xl:pl-[100px] xl:pl-24 xl:pr-24 lg:mr-0 md:ml-0 md:mr-0 lg:ml-0 lg:pr-32 lg:pl-32 md:pr-20 md:pl-20 tb:pl-10 tb:pr-10 tb:items-center tb:justify-center tb:ml-0 tb:mr-0  m:ml-0 m:mr-0 m:pl-8 m:pr-8 m:items-center m:justify-center">
                <h1 className=" font-dm font-bold text-5xl  text-left  text-darkGrey tb:text-center m:text-center">
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
                    <div className="mb-5">
                      <b className="text-base text-errorMsg m:text-sm ">
                        {errorMsg}
                      </b>
                    </div>
                    <button
                      className="text-white font-semibold bg-secondary border-solid border-2  border-secondary h-14  w-44 mb-9 hover:outline-none hover:bg-darkGrey hover:border-none  disabled:bg-gray-500  md:w-full tb:w-full tb:h-[52px] m:w-full m:h-[52px] m:text-sm"
                      type="submit"
                      onClick={handleSubmission}
                      disabled={submitButtonDisabled}
                    >
                      LOGIN
                    </button>
                  </form>
                  <div className="text-xl  tb:text-center m:text-base m:text-center">
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
        </>
      )}
    </>
  );
};

export default Login;
