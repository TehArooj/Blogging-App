import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import CustomInput from "../components/CustomInput.component";
import { auth, db } from "../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import LoaderSpinner from "../components/LoaderSpinner.component";

const Signup = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  // Change input of user credentials
  const handleChangeName = (e: FormEvent) => {
    e.preventDefault();
    setValues((prev) => ({
      ...prev,
      fullName: (e.target as HTMLInputElement).value,
    }));
  };

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

  const handleChangeConfirmPassword = (e: FormEvent) => {
    e.preventDefault();
    setValues((prev) => ({
      ...prev,
      confirmPassword: (e.target as HTMLInputElement).value,
    }));
  };

  // Check Valid Email
  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // Validation checks
  const validations = () => {
    if (
      !values.fullName ||
      !values.email ||
      !values.password ||
      !values.confirmPassword
    ) {
      setErrorMsg("Please fill all the fields.");
      return;
    }
    setErrorMsg("");

    if (!isValidEmail(values.email)) {
      setErrorMsg("Invalid Email.");
      return;
    } else {
      setErrorMsg("");
    }

    values.password.length < 6
      ? setErrorMsg("Password must be atleast six characters.")
      : values.password !== values.confirmPassword
      ? setErrorMsg("Passwords didn't match please try again.")
      : setErrorMsg("");
  };

  // Submit user data to signup
  const handleSubmission = (e: FormEvent) => {
    e.preventDefault();

    // Validations
    validations();

    setSubmitButtonDisabled(true);

    //Sign up user
    createUserWithEmailAndPassword(auth, values.email, values.confirmPassword)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, { displayName: values.fullName });

        if (!user) return;

        const userDocRef = doc(db, "users", user.uid);

        const userSnapshot = await getDoc(userDocRef);

        if (!userSnapshot.exists()) {
          const { displayName, email } = user;
          const createdAt = new Date();

          try {
            await setDoc(userDocRef, {
              displayName,
              email,
              createdAt,
              userId: user.uid,
            });
          } catch (error) {
            console.log("error creating the user", error);
          }
          console.log(user);
          navigate("/home");
        }
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
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
                  Sign Up
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full tb:w-full m:w-full h-full">
              <div className=" mt-36 2xl:pl-[100px] xl:pl-24 xl:pr-24 lg:mr-0 md:ml-0 md:mr-0 lg:ml-0 lg:pr-32 lg:pl-32 md:pr-20 md:pl-20 tb:pl-10 tb:pr-10 tb:items-center tb:justify-center tb:ml-0 tb:mr-0  tb:mt-24 m:ml-0 m:mr-0 m:pl-8 m:pr-8 m:mt-24 m:items-center m:justify-center ">
                <h1 className=" font-dm font-bold text-5xl  text-left  text-darkGrey tb:text-center m:text-center">
                  Welcome
                </h1>
                <div className="font-lexend flex flex-col">
                  <form>
                    <div className="text-secondary">
                      <p className="text-2xl font-light mb-5 tb:text-center m:text-center m:text-xl">
                        Let's sign you up quickly
                      </p>
                      <CustomInput
                        type="text"
                        placeholder="Full Name"
                        handleChange={handleChangeName}
                      />
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
                      <CustomInput
                        type="password"
                        placeholder="Confirm Password"
                        handleChange={handleChangeConfirmPassword}
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
                      SUBMIT
                    </button>
                  </form>
                  <div className="text-xl  tb:text-center m:text-base m:text-center">
                    <p className="text-darkGrey">
                      Already have an account?
                      <Link to="/login" className="text-primary  ml-1">
                        Log-in
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

export default Signup;
