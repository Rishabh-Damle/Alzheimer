import type { ReactElement } from "react";
type variants = "primary" | "secondary";

interface ButtonProps {
  variant: variants;
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}
const buttonVariants = {
  primary:
    "bg-purple-600 text-white hover:bg-purple-700 focus-visible:ring-purple-500",
  secondary:
    "bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 focus-visible:ring-purple-300",
};
const defaultStyles =
  "inline-flex items-center justify-center rounded-lg cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-default disabled:opacity-60 transition";
const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};
export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`${buttonVariants[props.variant]} ${defaultStyles} ${
        sizeStyles[props.size]
      } ${props.fullWidth ? "w-full flex justify-center items-center" : ""} ${
        props.loading ? "opacity-45" : ""
      }`}
      disabled={props.loading}
    >
      <div className="flex items-center">
        <div className="px-1">{props.startIcon}</div>
        <div className="px-1">{props.text}</div>
      </div>
    </button>
  );
};
