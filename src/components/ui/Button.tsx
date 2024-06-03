import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  type: "submit" | "reset" | "button";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className: string;
  children: ReactNode;
}

const Button = ({ type, onClick, className, children }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} flex flex-row items-center justify-center px-4 py-2   rounded-md `}
    >
      {children}
    </button>
  );
};

export default Button;
