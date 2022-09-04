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
    className="text-darkGrey border-solid border-2 border-secondary pl-8 mb-5 w-700 h-[60px] focus:outline-none focus:border-primary lg:w-[90%] md:w-4/5 tb:w-full tb:pl-4 tb:text-sm m:w-full m:text-sm m:pl-4 "
    type={type}
    required
    placeholder={placeholder}
    onChange={handleChange}
  />
);

export default CustomInput;
