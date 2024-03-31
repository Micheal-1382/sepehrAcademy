import { Textarea } from "@nextui-org/react";
import React from "react";

export default function PrimaryTextarea({
  placeholder,
  variant,
  className,
  register,
}: {
  placeholder: string;
  variant: "bordered" | "faded" | "flat" | "underlined";
  className: string;
  register: any;
}) {
  return (
    <Textarea
      className={className}
      disableAnimation
      disableAutosize
      placeholder={placeholder}
      variant={variant}
      {...register}
      classNames={{
        base: "max-w-full",
        input: [
          "text-black/90",
          "dark:text-white/90",
          "placeholder:text-default-700/50",
          "dark:placeholder:text-white/60",
          "resize-y min-h-[130px]",
        ],
        mainWrapper: ["overflow-hidden"],
        inputWrapper: [
          "!duration-500",
          "transition",
          "ease-in-out",
          "rounded-[20px]",
          "bg-white",
          "dark:bg-dark-lighter",
          "backdrop-blur-xl",
          "backdrop-saturate-200",
          "group-data-[focus=true]:bg-white",
          "dark:group-data-[focus=true]:bg-dark-lighter",
        ],
      }}
    />
  );
}
