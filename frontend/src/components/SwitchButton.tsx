import type { ReactElement } from "react";

type variants = "primary" | "secondary";
interface ButtonProps {
  variant: variants;
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

//global object
type variantClassesTypes = {
  primary: string;
  secondary: string;
};
const variantClasses: variantClassesTypes = {
  primary:
    "bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 focus-visible:ring-purple-500",
  secondary:
    "bg-purple-50 text-purple-700 text-sm font-medium border border-purple-200 hover:bg-purple-100 focus-visible:ring-purple-300",
};
const defaultStyles =
  "px-4 py-2 rounded-full cursor-pointer flex items-center shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-default disabled:opacity-60 transition";
export function SwitchButton(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={variantClasses[props.variant] + " " + defaultStyles}
    >
      <div className="pr-2">{props.startIcon}</div>
      {props.text}
    </button>
  );
}
