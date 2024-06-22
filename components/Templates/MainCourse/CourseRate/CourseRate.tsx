import React, { useEffect, useState } from "react";
import { isUserAuthenticated } from "@/utils/isUserAuthenticated";
import MainButton from "@/components/Modules/Button/MainButton";
import { useRouter } from "next/router";
import {
  useAddCourseReserveApi,
  useAddStarsApi,
} from "@/hooks/api/useCoursesApi";
import SkeletonCourseRate from "@/components/Templates/MainCourse/CourseRate/SkeletonCourseRate";

function CourseRate({
  currentRate,
  courseDetailsIsLoading,
}: {
  currentRate: number;
  courseDetailsIsLoading: boolean;
}) {
  const [stars, setStars] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  console.log(currentRate);

  useEffect(() => {
    // Initialize stars based on currentRate
    const initialStars = stars.map((_, index) => index < currentRate);
    setStars(initialStars);
  }, [currentRate]);

  const rate = stars.reduce((count, value) => {
    return value === true ? count + 1 : count;
  }, 0);

  console.log(rate);

  const router = useRouter();
  const { asPath, query } = router;

  const handleStarClick = (index: number) => {
    const newStars = stars.map((star, i) => i <= index);
    setStars(newStars);
  };

  const { mutate: addCourseStarMutate, isPending: addCourseStarIsPending } =
    useAddStarsApi();

  const starCourseHandler = () => {
    addCourseStarMutate({ courseId: query.courseId, rate: Number(rate) });
  };

  return (
    <div className="shadow-2xl flex justify-between items-center shadow-shadowColor dark:shadow-none p-6 bg-white dark:bg-dark-lighter rounded-xl">
      {!courseDetailsIsLoading ? (
        <>
          <div>
            {stars.map((star, index) => (
              <span
                key={index}
                onClick={() => handleStarClick(index)}
                className="text-[30px] font-bold"
                style={{ cursor: "pointer", color: star ? "gold" : "gray" }}
              >
                ★{" "}
              </span>
            ))}
          </div>
          <div>
            {isUserAuthenticated() ? (
              <MainButton
                className="bg-primary dark:bg-primary-darker text-btnText w-[150px] px-7 py-5 rounded-3x text-md"
                content={<p>ثبت امتیاز</p>}
                isLoading={addCourseStarIsPending}
                onClick={starCourseHandler}
              />
            ) : (
              <div className="space-y-2">
                <MainButton
                  className="bg-primary dark:bg-primary-darker text-btnText px-7 py-5 rounded-3x text-md"
                  content={<p>ورود به حساب</p>}
                  onClick={() =>
                    router.push({
                      pathname: "/login",
                      query: {
                        callbackUrl: asPath,
                      },
                    })
                  }
                />
                <p className="font-peyda text-secondary">
                  برای رزرو دوره باید وارد حسابت بشی
                </p>
              </div>
            )}
          </div>
        </>
      ) : (
        <SkeletonCourseRate />
      )}
    </div>
  );
}

export default CourseRate;
