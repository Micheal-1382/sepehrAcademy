import MainButton from "@/components/Modules/Button/MainButton";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import fallbackImage from "@/public/pictures/courses/redux.webp";
import { courseDetailsBoxProps } from "@/interfaces/courseDetails.interface";
import { validateImageAddress } from "@/utils/validateImageAdderss";
import convertToPersianDigit from "@/utils/convertToPersianDigit";
import addCommasToPersianNumber from "@/utils/addCommasToPersianDigit";
import {
  useAddCourseFavoriteApi,
  useAddCourseReserveApi,
  useDeleteCourseFavoriteApi,
} from "@/hooks/api/useCoursesApi";
import { isUserAuthenticated } from "@/utils/isUserAuthenticated";
import { useRouter } from "next/router";
import outlinedHeartIcon from "@/public/icons/outlined/heart.svg";
import solidHeartIcon from "@/public/icons/solid/heart.svg";
import MainTooltip from "@/components/Modules/MainTooltip/MainTooltip";
import { Spinner } from "@nextui-org/react";

export default function CourseDetailsBox({
  title,
  currentRate,
  miniDescribe,
  imageAddress,
  cost,
  isUserFavorite,
  userFavoriteId,
}: courseDetailsBoxProps) {
  const router = useRouter();
  const { asPath, query } = router;

  const {
    mutate: addCourseReserveMutate,
    isPending: addCourseReserveIsPending,
  } = useAddCourseReserveApi();

  const {
    mutate: addCourseFavoriteMutate,
    isPending: addCourseFavoriteIsPending,
  } = useAddCourseFavoriteApi();

  const {
    mutate: deleteCourseFavoriteMutate,
    isPending: deleteCourseFavoriteIsPending,
  } = useDeleteCourseFavoriteApi();

  const reserveCourseHandler = () => {
    addCourseReserveMutate({ courseId: query.courseId });
  };

  const addCourseFavoriteHandler = () => {
    addCourseFavoriteMutate({ courseId: query.courseId });
  };

  const deleteCourseFavoriteHandler = () => {
    deleteCourseFavoriteMutate({ CourseFavoriteId: userFavoriteId });
  };
  return (
    <div className="relative h-[300px] lg:h-[350px] lgb:h-[450px] mb-20 text-DarkBody rounded-3xl">
      <Image
        src={validateImageAddress(imageAddress, fallbackImage)}
        className="absolute top-0 left-0 w-full h-full z-0 rounded-3xl"
        alt=""
        width={0}
        height={0}
        sizes="100vw"
      />
      <div className="flex w-full bg-gradient-to-r from-[rgba(0,0,0,0.6)] via-[rgba(0,0,0,0.9)] to-[#000] lg:from-[rgba(0,0,0,0.2)] lg:via-[rgba(0,0,0,0.92)] lg:to-[#000] z-10 absolute top-0 left-0 h-full rounded-3xl">
        <div className="flex items-center h-full p-5 pr-8 w-full">
          <div className="flex flex-col gap-8 lgb:gap-16 w-full sm:w-4/7">
            <div className="flex flex-col gap-3">
              <h1 className="text-primary-lighter text-center sm:text-right text-[20px] md:text-[25px] lgb:text-[30px] xl:text-[34px] mb-1 font-bold font-peyda">
                {title}
              </h1>
              <p className="text-darkTitle w-full text-sm lgb:text-lg hidden sm:block">
                {miniDescribe}
              </p>
            </div>
            <div className="flex flex-col-reverse sm:flex-row gap-5 justify-between items-center sm:items-end w-full">
              {isUserAuthenticated() ? (
                <MainButton
                  className="bg-primary dark:bg-primary-darker text-btnText px-8 py-4 lgb:px-10 lgb:py-6 rounded-3x text-md"
                  content={<p>رزرو دوره</p>}
                  isLoading={addCourseReserveIsPending}
                  onClick={reserveCourseHandler}
                />
              ) : (
                <div className="space-y-2">
                  <MainButton
                    className="bg-primary dark:bg-primary-darker text-btnText px-8 py-4 lgb:px-10 lgb:py-6 rounded-3x text-md"
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
              <div className="flex flex-col gap-1 md:gap-2 lg:gap-3 font-peyda text-2xl text-white">
                {addCommasToPersianNumber(convertToPersianDigit(cost))} تومان
              </div>
            </div>
            <div>
              {isUserFavorite ? (
                addCourseFavoriteIsPending ? (
                  <Spinner size="lg"/>
                ) : (
                  <MainTooltip content="این دوره مورد علاقه شماست">
                    <Image
                      alt=""
                      src={solidHeartIcon}
                      onClick={deleteCourseFavoriteHandler}
                      className="cursor-pointer w-[70px] h-[70px]"
                    />
                  </MainTooltip>
                )
              ) : deleteCourseFavoriteIsPending ? (
                <Spinner size="lg"/>
              ) : (
                <MainTooltip content="افزودن به مورد علاقه">
                  <Image
                    alt=""
                    src={outlinedHeartIcon}
                    onClick={addCourseFavoriteHandler}
                    className="cursor-pointer w-[70px] h-[70px]"
                  />
                </MainTooltip>
              )}
            </div>
          </div>
          <div className="-translate-x-10 w-3/7 hidden lg:block h-[300px]">
            <Image
              src={validateImageAddress(imageAddress, fallbackImage)}
              className="rounded-3xl h-full"
              alt=""
              width={600}
              height={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
