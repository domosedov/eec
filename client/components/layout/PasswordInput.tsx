import { forwardRef, useReducer } from "react";
import HeroIcon from "./HeroIcon";

type Props = {
  name: string;
  id: string;
  hasError: boolean;
  errorMessage?: string;
  label: string;
  defaultValue?: string;
};

type Ref = HTMLInputElement;

const PasswordInput = forwardRef<Ref, Props>((props, ref) => {
  const { id, name, label, hasError, errorMessage, defaultValue } = props;
  const [showPassword, toggle] = useReducer((t) => !t, false);
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block font-medium mb-1">
        {label}
      </label>
      <div
        className={`flex w-64 rounded border-2 duration-200 outline-none focus:outline-none focus-within:ring-4 focus-within:ring-indigo-500 focus-within:border-transparent ${
          hasError ? "border-red-500" : "border-indigo-700"
        }`}
      >
        <input
          className="w-56 relative p-1 outline-none focus:outline-none bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          type={showPassword ? "text" : "password"}
          name={name}
          ref={ref}
          id={id}
          defaultValue={defaultValue}
        />
        <button
          type="button"
          className="w-8 h-8 inline-flex items-center justify-center outline-none focus:outline-none bg-gray-100 dark:bg-gray-800"
          onClick={() => toggle()}
        >
          <HeroIcon
            name={showPassword ? "eye-off" : "eye"}
            className="w-6 h-6 pointer-events-none text-indigo-300"
            strokeWidth={2}
          />
        </button>
      </div>
      <div className="relative text-xs">
        {errorMessage ? (
          <div className="absolute top-0 left-0 w-64 rounded px-1 py-1 bg-red-500 text-white">
            {errorMessage}
          </div>
        ) : null}
      </div>
    </div>
  );
});

export default PasswordInput;
