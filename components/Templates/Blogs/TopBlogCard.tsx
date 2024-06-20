import Image from "next/image";
import React from "react";
import { Blog } from "@/interfaces/blog.interface";
import Link from "next/link";
import { validateImageAddress } from "@/utils/validateImageAdderss";
import fallbackImage from "@/public/pictures/blog/blogImage.jpg";
import {
  useAddNewsFavoriteApi,
  useDeleteNewsFavoriteApi,
} from "@/hooks/api/useNewsApi";
import { Spinner } from "@nextui-org/react";
import MainTooltip from "@/components/Modules/MainTooltip/MainTooltip";
import heart from "@/public/pictures/courses/heart.svg";
import fillHeart from "@/public/pictures/courses/fillHeart.svg";
import { useRouter } from "next/router";

export default function TopBlogCard(data: Blog) {
  const { mutate: addNewsFavoriteMutate, isPending: addNewsFavoriteIsPending } =
    useAddNewsFavoriteApi();

  const router = useRouter();

  const {
    mutate: deleteNewsFavoriteMutate,
    isPending: deleteNewsFavoriteIsPending,
  } = useDeleteNewsFavoriteApi();

  const newsId = data.id;
  const likeId = data.currentUserFavoriteId;

  const likeCommentHandler = (event: any) => {
    event.stopPropagation();
    addNewsFavoriteMutate({ NewsId: newsId });
  };

  const dislikeCommentHandler = (event: any) => {
    event.stopPropagation();
    deleteNewsFavoriteMutate({ deleteEntityId: likeId });
  };
  return (
    <div
      className="border-x-3 border-lightTitle dark:border-darkTitle px-2 relative overflow-hidden col-span-4 h-[400px]"
      onClick={() => router.push(`/blogs/${data.id}`)}
    >
      <div className="relative">
        <Image
          src={validateImageAddress(
            data.currentImageAddressTumb,
            fallbackImage
          )}
          width={1000}
          height={400}
          alt=""
          className="absolute w-full -top-[30%] lg:-top-[50%] left-0 z-0"
        />
      </div>
      <div className="absolute w-full h-full top-0 left-0 z-0 bg-[rgba(0,0,0,0.7)]"></div>
      <div className="z-10 relative w-full absolute top-0 left-0 flex flex-col items-center justify-center h-full p-5">
        <div className="p-3 absolute top-0 left-0">
          {!data.isCurrentUserFavorite ? (
            addNewsFavoriteIsPending ? (
              <Spinner size="sm" />
            ) : (
              <MainTooltip content="افزودن به علاقه مندی">
                <Image
                  src={heart}
                  alt=""
                  width={40}
                  height={40}
                  onClick={(event) => likeCommentHandler(event)}
                  className="h-full w-full"
                />
              </MainTooltip>
            )
          ) : deleteNewsFavoriteIsPending ? (
            <Spinner size="sm" />
          ) : (
            <MainTooltip content="حذف از علاقه مندی">
              <Image
                src={fillHeart}
                alt=""
                width={40}
                height={40}
                onClick={(event) => dislikeCommentHandler(event)}
                className="h-full w-full"
              />
            </MainTooltip>
          )}
        </div>
        <h2 className="text-darkTitle text-2xl font-kalamehBlack mb-1">
          {data.title}
        </h2>
        <p className="text-darkBody font-peyda">{data.miniDescribe}</p>
      </div>
    </div>
  );
}
