import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import CustomInput from "../components/CustomInput.component";
import { auth, db } from "../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

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

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

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
    <div className=" grid grid-cols-3 gap-4 justify-evenly not-italic w-full h-full md:grid-cols-4 tb:grid-cols-1 m:grid-cols-1">
      <div className="flex items-center justify-center w-full h-full md:col-span-2 ">
        <div className="flex items-center justify-center font-lexend absolute w-96 h-full left-0 top-0  bg-pawel-pattern  bg-cover object-fill bg-no-repeat tb:hidden m:hidden">
          <div className="inherit text-6xl text-white text-center rotate-270 font-bold ">
            Sign Up
          </div>
        </div>
      </div>
      <div className="col-span-2 flex items-center justify-center md:col-span-2 md:justify-center tb:col-span-auto tb:justify-center  m:justify-center">
        <div className=" mt-36 left-1/2 lg:ml-24 lg:mr-20 md:ml-8 md:mr-8 tb:items-center tb:justify-center tb:ml-48 tb:mr-48 tb:mt-24 m:ml-36 m:mr-36 m:mt-16 m:items-center m:justify-center ">
          <h1 className=" font-dm font-bold text-5xl  text-left  text-darkGrey tb:text-center m:text-center">
            Welcome
          </h1>
          <div className="font-lexend flex flex-col ">
            <form>
              <div className="text-secondary ">
                <p className="text-2xl font-light mb-5 tb:text-center m:text-center m:text-xl ">
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
                <b className="text-base text-errorMsg m:text-sm ">{errorMsg}</b>
              </div>
              <button
                className="text-white font-semibold bg-secondary border-solid border-2  border-secondary h-14  w-44 mb-9 hover:outline-none hover:bg-darkGrey hover:border-none  disabled:bg-gray-500 md:w-80 tb:w-96 tb:h-[52px] m:w-72 m:h-[52px] m:text-sm"
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
  );
};

export default Signup;
