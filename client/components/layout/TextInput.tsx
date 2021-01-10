import { forwardRef } from "react";

type Props = {
  name: string;
  hasError: boolean;
};

type Ref = HTMLInputElement;

const TextInput = forwardRef<Ref, Props>((props, ref) => {
  return (
    <input
      className={`border-2 ${
        props.hasError ? "border-red-500" : "border-green-500"
      }`}
      type="text"
      name={props.name}
      ref={ref}
    />
  );
});

export default TextInput;
