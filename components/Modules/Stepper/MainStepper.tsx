import convertToPersianDigit from "@/utils/convertToPersianDigit";
import { Divider } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";

export default function MainStepper({ steps }: { steps: number }) {
  const [scrollToStep, setScrollToStep] = useState<number>(0);

  const positions = useRef<{ y: number }[]>([]);

  const spanRefs = useRef<any>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      positions.current.forEach((position, index) => {
        if (
          scrollPosition >= position.y - 350 &&
          scrollPosition < position.y + 350 &&
          scrollPosition !== index + 1
        ) {
          setScrollToStep(index + 1);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollToStep]);

  useEffect(() => {
    const initialPositions = spanRefs.current.map((span: any) => {
      if (span) {
        const rect = span.getBoundingClientRect();
        return { y: rect.top + window.scrollY };
      }
      return { y: 0 };
    });
    positions.current = initialPositions;
  }, [steps]);

  return (
    <div className="hidden lg:block pt-20 -translate-x-20">
      {Array.from({ length: steps }, (_, index) => (
        <div className="relative h-[441px] flex" key={index}>
          {steps - 1 !== index && (
            <Divider className="border-dashed border-[1px] border-[#999] dark:border-white rotate-90 absolute -right-[160px] top-[250px] w-[449px]" />
          )}
          <Divider className="border-dashed border-[1px] border-[#999] dark:border-white absolute w-52 top-[28px] right-[60px]" />
          <span
            ref={(span) => (spanRefs.current[index] = span)}
            className={`${scrollToStep === index + 1 ? "base-scale" : ``
              } rounded-full relative border-[2px] border-[#ccc] mr-10 bg-mainBodyBg dark:bg-dark dark:text-DarkTitle z-10 font-peyda inline-flex justify-center items-center w-[50px] h-[50px]`}
          >
            <div className={`absolute top-0 left-0 w-full h-full flex items-center justify-center`}>{convertToPersianDigit(index + 1)}</div>
            <div className={`${scrollToStep === index + 1 ? "step-animation" : ``
              } border-[1px] border-[#ccc] w-full h-full rounded-full flex justify-center items-center`}>
            </div>
          </span>
        </div>
      ))}
    </div>
  );
}
