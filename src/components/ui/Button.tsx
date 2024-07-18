import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  type: "submit" | "reset" | "button";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className: string;
  children: ReactNode;
  disabled?: boolean;
}

const Button = ({
  type,
  onClick,
  className,
  children,
  disabled,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`${className} flex flex-row items-center justify-center px-4 py-2   rounded-md `}
    >
      {children}
    </button>
  );
};

export default Button;
