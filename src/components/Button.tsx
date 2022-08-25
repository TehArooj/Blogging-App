import React, { FC } from "react";

interface ButtonProps {
  text: string;
}

const Button: FC<ButtonProps> = ({ text }) => {
  return (
    <div>
      <button
        className="text-white bg-secondary border-solid border-2  border-secondary mb-5 h-14 w-44 hover:outline-none hover:bg-darkGrey hover:border-none"
        type="submit"
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
