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


type variantClassesTypes = {
  primary: string;
  secondary: string;
};
const variantClasses: variantClassesTypes = {
  primary:
    "bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus-visible:ring-blue-500",
  secondary:
    "bg-white text-slate-700 text-sm font-medium border border-slate-200 hover:bg-slate-50 focus-visible:ring-slate-300",
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
