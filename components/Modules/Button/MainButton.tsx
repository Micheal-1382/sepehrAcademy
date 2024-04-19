import React from "react";
import { Button } from "@nextui-org/react";
import { button } from "@/interfaces/button.interface";

function MainButton({
  className,
  content,
  type = "button",
  variant = "solid",
  startIcon,
  endIcon,
  color = "default",
  onClick,
  isDisabled,
}: button) {
  return (
    <Button
      className={className}
      type={type}
      variant={variant}
      startContent={startIcon}
      endContent={endIcon}
      onClick={onClick}
      color={color}
      isDisabled={isDisabled}
    >
      {content}
    </Button>
  );
}

export default MainButton;
