import type { ReactElement } from "react";

type variants = "primary" | "secondary";

interface ButtonProps {
  variant: variants;
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onclick?: () => void;
}
const buttonVariants = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-600",
};
const defaultStyles = "rounded-md";
const sizeStyles = {
  sm: "py-1 px-2",
  md: "py-2 px-4",
  lg: "py-4 px-6",
};
export const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${buttonVariants[props.variant]} ${defaultStyles} ${
        sizeStyles[props.size]
      }`}
    >
      {props.text}
    </button>
  );
};
