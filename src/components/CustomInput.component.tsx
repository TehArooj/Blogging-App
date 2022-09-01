import { FC, FormEvent } from "react";

interface CustomInputBoxProps {
  placeholder: string;
  type: string;
  handleChange: (e: FormEvent) => void;
}

const CustomInput: FC<CustomInputBoxProps> = ({
  placeholder,
  handleChange,
  type,
}) => (
  <input
<<<<<<< HEAD
    className="text-darkGrey border-solid border-2 border-secondary pl-8 mb-5 w-850 h-[60px] focus:outline-none focus:border-primary lg:w-600 md:w-80 tb:w-96  tb:pl-4 tb:text-sm m:w-72 m:text-sm m:pl-4 "
=======
    className="text-darkGrey border-solid border-2 border-secondary pt-5 pb-5 pl-8 mb-5 w-850 focus:outline-none focus:border-primary lg:w-600 md:w-80 tb:w-96 tb:h-8 tb:pl-4 tb:text-sm m:w-64 m:h-8 m:text-xs m:pl-4 "
>>>>>>> main
    type={type}
    required
    placeholder={placeholder}
    onChange={handleChange}
  />
);

export default CustomInput;
