import React from "react";
import CourseHorizontalFilterBox from "@/components/Templates/Courses/CourseHorizontalFilter/CourseHorizontalFilterBox";
import CourseVerticalFilterBox from "@/components/Templates/Courses/CourseVerticalFilter/CourseVerticalFilterBox";
import CoursesBox from "@/components/Templates/Courses/CoursesBox/CoursesBox";

export default function Courses() {
  return (
    <>
      <h2 className="font-peyda text-[20px] lg:text-[30px] text-primary dark:text-primary-lighter mt-12 mb-6">
        دوره ها
      </h2>
      <div className="space-y-6">
        <CourseHorizontalFilterBox />
        <div className="flex flex-col md:flex-row md:gap-x-6">
          <CourseVerticalFilterBox />
          <CoursesBox />
        </div>
      </div>
    </>
  );
}
