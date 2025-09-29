import type { ReactElement } from "react";

type variants = "primary" | "secondary";
interface ButtonProps {
  variant: variants;
  text: string;
  startIcon?: ReactElement;
}

//global object
type variantClassesTypes = {
  primary: string;
  secondary: string;
};
const variantClasses: variantClassesTypes = {
  primary: "bg-purple-600 text-white text-md ",
  secondary: "bg-purple-200 text-purple-600 text-md ",
};
const defaultStyles =
  "px-4 py-2 rounded-md cursor-pointer font-light flex items-center";
export function SwitchButton(props: ButtonProps) {
  return (
    <button className={variantClasses[props.variant] + " " + defaultStyles}>
      <div className="pr-2">{props.startIcon}</div>
      {props.text}
    </button>
  );
}
