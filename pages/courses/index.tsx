import React from "react";
import CoursesBox from "@/components/Templates/Courses/CoursesBox";
import HorizontalFilterBox from "@/components/Modules/HorizontalFilter/HorizontalFilterBox";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { getCoursesWithPaginationApi } from "@/services/api/coursesApi";
import { GetServerSideProps } from "next";
import courseSortingColItems from "@/constants/courseSortingColItems";
import { sortTypeItems } from "@/constants/sortTypeItems";


export default function Courses() {
  return (
    <>
      <h2 className="font-peyda text-[20px] lg:text-[30px] text-primary dark:text-primary-lighter mt-12 mb-6">
        دوره ها
      </h2>
      <div className="space-y-6">
        <HorizontalFilterBox
          placeholder="جستجو دوره"
          sortingColArray={courseSortingColItems}
          sortTypeArray={sortTypeItems}
        />
        <CoursesBox />
      </div>
    </>
  );
}

export const getServerSideProps = (async (context) => {
  const queryClient = new QueryClient();
  const { query } = context

  await queryClient.prefetchQuery({
    queryKey: ["coursesWithPagination", query],
    queryFn: async () => {
      const response = await getCoursesWithPaginationApi(query);
      return response.data;
    },
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}) satisfies GetServerSideProps