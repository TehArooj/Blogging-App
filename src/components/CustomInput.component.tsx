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
    className="text-darkGrey block border-solid border-2 border-secondary pl-8 mb-5 w-2/3 xl:w-full h-[60px] focus:outline-none focus:border-primary lg:w-full md:w-full tb:w-full tb:pl-4 tb:text-sm m:w-full m:text-sm m:pl-4 "
    type={type}
    required
    placeholder={placeholder}
    onChange={handleChange}
  />
);

export default CustomInput;
