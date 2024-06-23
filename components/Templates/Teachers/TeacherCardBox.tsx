import React from "react";
import { teachers } from "@/interfaces/teacher.interface";

function TeacherCardBox({
  data,
  Content,
}: {
  data: teachers[];
  Content: React.ElementType;
}) {
  return (
    <div className="flex justify-center items-center flex-col gap-10 w-[88%]">
      {data?.map((teacher: teachers, index: number) => (
        <Content key={index} {...teacher} />
      ))}
    </div>
  );
}

export default TeacherCardBox;
