import CourseCard from "@/components/Modules/CourseCard/CourseCard";
import SkeletonCourseCard from "@/components/Modules/CourseCard/SkeletonCourseCard";
import CurvedPagination from "@/components/Modules/Pagination/CurvedPagination";
import { useGetCoursesWithPaginationApi } from "@/hooks/api/useCoursesApi";
import { Course } from "@/interfaces/course.interface";
import { useRouter } from "next/router";
import React from "react";
import CourseVerticalFilterBox from "./CourseVerticalFilter/CourseVerticalFilterBox";

export default function CoursesBox() {
  const router = useRouter();
  const { query } = router;

  const { data, isLoading } = useGetCoursesWithPaginationApi({ RowsOfPage: 9, ...query });
  return (
    <>
      <div className="flex flex-col md:flex-row md:gap-x-6">
        <CourseVerticalFilterBox />
        <div className="grid grid-cols-1 sm:grid-cols-2 lgb:grid-cols-3 gap-4 lg:gap-6 w-full">
          {isLoading ? Array.from({ length: 9 }, (_, index) => (
            <SkeletonCourseCard key={index} />
          )) : data?.courseFilterDtos.length > 0 ? data?.courseFilterDtos.map((item: Course, index: number) => (
            <CourseCard {...item} key={index} />
          )) : <h2 className="font-peyda text-2xl text-secondary">هیچ دوره ای یافت نشد</h2>}
        </div>
      </div>
      <div className="pt-6">
        <CurvedPagination total={data?.totalCount ?? 1} rowsOfPage={9} />
      </div>
    </>
  );
}