import React, { useEffect, useState } from "react";
import { isUserAuthenticated } from "@/utils/isUserAuthenticated";
import MainButton from "@/components/Modules/Button/MainButton";
import { useRouter } from "next/router";
import { useAddCourseReserveApi, useAddStarsApi } from "@/hooks/api/useCoursesApi";
import { Skeleton } from "@nextui-org/react";

function CourseRate() {
  return (
    <div className="shadow-2xl w-full flex justify-between items-center shadow-shadowColor dark:shadow-none p-6 dark:bg-dark-lighter rounded-xl">
      <Skeleton className="w-[250px] h-10 rounded-xl">
        
      </Skeleton>
      <Skeleton className="w-[150px] h-10 rounded-xl">
        
      </Skeleton>
    </div>
  );
}

export default CourseRate;
