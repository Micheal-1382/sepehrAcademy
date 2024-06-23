import React from "react";
import Image from "next/image";
import { Course } from "@/interfaces/course.interface";
import clock from "@/public/icons/courses/clock.svg";
import { Chip, Divider, Spinner } from "@nextui-org/react";
import { useRouter } from "next/router";
import convertToPersianDigit from "@/utils/convertToPersianDigit";
import addCommasToPersianNumber from "@/utils/addCommasToPersianDigit";
import calculateTimeAgo from "@/utils/calculateTimeAgo";
import { validateImageAddress } from "@/utils/validateImageAdderss";
import fallbackImage from "@/public/pictures/courses/next.webp";
import heart from "@/public/pictures/courses/heart.svg";
import fillHeart from "@/public/pictures/courses/fillHeart.svg";
import { useAddCourseFavoriteApi, useDeleteCourseFavoriteApi } from "@/hooks/api/useCoursesApi";
import MainTooltip from "../MainTooltip/MainTooltip";

function CourseCard({
  title,
  tumbImageAddress,
  describe,
  teacherName,
  cost,
  lastUpdate,
  courseId,
  userFavoriteId,
  userFavorite,
  isUserFavorite
}: Course) {
  const router = useRouter();
  const { } = router

  const { mutate: addCourseFavoriteMutate, isPending: addCourseFavoriteIsPending } = useAddCourseFavoriteApi()

  const { mutate: deleteCourseFavoriteMutate, isPending: deleteCourseFavoriteIsPending } = useDeleteCourseFavoriteApi()

  const isUserFavorites = router.pathname.includes("courses") || router.pathname.includes("teachers") ? userFavorite : isUserFavorite

  const likeCommentHandler = (event: any) => {
    event.stopPropagation()
    addCourseFavoriteMutate({ courseId });
  };

  const dislikeCommentHandler = (event: any) => {
    event.stopPropagation()
    deleteCourseFavoriteMutate({ CourseFavoriteId: userFavoriteId });
  };

  return (
    <div
      className="pt-[55px] h-[435px] cursor-pointer"
      onClick={() => router.push(`/courses/${courseId}`)}
    >
      <div className="flex py-6 bg-white dark:bg-dark-lighter rounded-3xl h-full">
        <div className="w-full flex flex-col gap-5">
          <div className="rounded-3xl w-[85%] mx-auto -mt-20 h-[160px] relative">
            <div className="p-3 absolute top-0 left-0">
              {!isUserFavorites ? (
                addCourseFavoriteIsPending ? <Spinner size="sm" /> : <MainTooltip content="افزودن به علاقه مندی"><Image
                  src={heart}
                  alt=""
                  width={40}
                  height={40}
                  onClick={(event) => likeCommentHandler(event)}
                  className="h-full w-full"
                /></MainTooltip>
              ) : (
                deleteCourseFavoriteIsPending ? <Spinner size="sm" /> : <MainTooltip content="حذف از علاقه مندی"><Image
                  src={fillHeart}
                  alt=""
                  width={40}
                  height={40}
                  onClick={(event) => dislikeCommentHandler(event)}
                  className="h-full w-full"
                /></MainTooltip>
              )}
            </div>
            <Image
              src={validateImageAddress(tumbImageAddress, fallbackImage)}
              alt=""
              width={400}
              height={400}
              className="h-full w-full rounded-3xl"
            />
          </div>
          <div className="w-[85%] mx-auto flex flex-col gap-4">
            <h2
              className="text-[20px] font-peyda font-bold text-lightTitle dark:text-darkTitle">
              {title}
            </h2>
            <p className="text-[15px] font-vazir font-bold text-lightBody dark:text-darkBody line-clamp-2">
              {describe}
            </p>
          </div>
          <div className="mt-auto w-[85%] mx-auto">
            <Chip
              classNames={{
                dot: ["bg-primary dark:bg-primary-lighter px-1.5"],
                base: [
                  "border-none font-vazir text-primary dark:text-primary-lighter",
                ],
              }}
              variant="dot"
            >
              {teacherName}
            </Chip>
            <Divider className="bg-gray-lighter mb-4 mt-1" />
            <div className="flex justify-between items-center">
              <Chip
                startContent={<Image src={clock} alt="" />}
                variant="solid"
                className="font-vazir text-lightTitle dark:text-darkTitle bg-mainBodyBg dark:bg-dark"
              >
                {calculateTimeAgo(lastUpdate)}
              </Chip>
              {cost && <p className="text-md text-primary dark:text-primary-lighter font-peyda">
                {addCommasToPersianNumber(convertToPersianDigit(cost))} تومان
              </p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
