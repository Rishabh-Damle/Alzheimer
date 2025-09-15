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

export const Button = (props: ButtonProps) => {
  return (
    <button className={buttonVariants[props.variant]}>{props.text}</button>
  );
};
