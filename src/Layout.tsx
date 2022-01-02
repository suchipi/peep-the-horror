import React from "react";
import Box, { BoxxyProps } from "react-boxxy";

export const Row = Box.withProps({
  display: "flex",
  flexDirection: "row",
  className: "row",
});
Row.displayName = "Row";

export const Column = Box.withProps({
  display: "flex",
  flexDirection: "column",
  className: "column",
});
Column.displayName = "Column";

const parseCssInput = (value: number | string): string => {
  if (value === "") {
    return "0";
  }

  if (typeof value === "number") {
    return value + "px";
  } else {
    return value;
  }
};

export const Padding = (
  props: {
    value?: number | string;
    x?: number | string;
    y?: number | string;
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
  } & BoxxyProps<"div">
) => {
  let otherProps: BoxxyProps<"div">;
  {
    const { value, x, y, top, right, bottom, left, ...others } = props;
    otherProps = others;
  }

  let top = props.top ?? props.y ?? props.value ?? 0;
  let right = props.right ?? props.x ?? props.value ?? 0;
  let bottom = props.bottom ?? props.y ?? props.value ?? 0;
  let left = props.left ?? props.x ?? props.value ?? 0;

  if (!props.children) {
    top = `calc(${parseCssInput(top)} / 2)`;
    right = `calc(${parseCssInput(right)} / 2)`;
    bottom = `calc(${parseCssInput(bottom)} / 2)`;
    left = `calc(${parseCssInput(left)} / 2)`;
  }

  return (
    <Box
      className="padding"
      padding={[top, right, bottom, left].join(" ")}
      {...otherProps}
    />
  );
};
