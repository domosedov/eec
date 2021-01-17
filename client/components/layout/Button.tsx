import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

type Ref = HTMLButtonElement;

const Button = forwardRef<Ref, Props>(
  ({ children, type, onClick = (f) => f }, ref) => {
    return (
      <button
        className="flex items-center px-4 py-2 uppercase rounded bg-indigo-700 text-gray-50 duration-200 outline-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lime-500"
        type={type}
        ref={ref}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);

export default Button;
