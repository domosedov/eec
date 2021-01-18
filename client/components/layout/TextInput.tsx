import { forwardRef } from "react";

type Props = {
  name: string;
  id: string;
  hasError: boolean;
  errorMessage?: string;
  label: string;
  defaultValue?: string;
};

type Ref = HTMLInputElement;

const TextInput = forwardRef<Ref, Props>((props, ref) => {
  const { id, name, label, hasError, errorMessage, defaultValue } = props;
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block font-medium mb-1">
        {label}
      </label>
      <input
        className={`w-64 relative border p-1 outline-none focus:outline-none duration-200 focus:border-transparent focus:ring-4 focus:ring-lime-500 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 ${
          hasError ? "border-red-500" : "border-indigo-700"
        }`}
        type="text"
        name={name}
        ref={ref}
        id={id}
        defaultValue={defaultValue}
      />
      <div className="relative">
        {errorMessage ? (
          <div className="absolute top-0 left-0 w-64 text-xs rounded px-1 py-1 bg-red-500 text-white z-10">
            {errorMessage}
          </div>
        ) : null}
      </div>
    </div>
  );
});

export default TextInput;
