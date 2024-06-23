import BoxHeader from "@/components/Modules/BoxHeader/BoxHeader";
import { Course } from "@/interfaces/course.interface";
import { Divider } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

export default function TeacherCourses({
  data,
  Content,
}: {
  data: Course[];
  Content: React.ElementType;
}) {
  return (
    <div className="-translate-y-[200px] z-10 relative w-[90%] mx-auto">
      <BoxHeader
        title="دوره های فعال استاد"
        hasLink={false}
        titleColor="text-white"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {data.length > 0 ? data.slice(0, 4)
          .map((item, index) => (
            <div key={index}>
              <Content {...item} />
            </div>
          )) : <p className="font-peyda text-secondary col-span-full text-center text-2xl">این استاد هنوز هیچ دوره ای نداره</p>}
      </div>
      <Link
        href={`#`}
        className="flex items-center gap-x-2 text-lightTitle dark:text-darkTitle justify-end mt-4"
      >
        مشاهده همه
        <Divider className="w-[30px] h-1 bg-primary dark:bg-primary-lighter" />
      </Link>
    </div>
  );
}