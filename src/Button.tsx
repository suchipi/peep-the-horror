import React from "react";
import Box, { BoxxyProps } from "react-boxxy";

const Button = (
  props: { secondary?: boolean; outline?: boolean; contrast?: boolean } & Omit<
    BoxxyProps<"button">,
    "secondary" | "outline" | "contrast"
  >
) => {
  const { secondary, outline, contrast, className, ...others } = props;

  const newClassName = [
    secondary ? "secondary" : null,
    outline ? "outline" : null,
    contrast ? "contrast" : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    // @ts-ignore
    <Box
      tagName="button"
      className={newClassName}
      marginBottom={0}
      {...others}
    />
  );
};

export default Button;
