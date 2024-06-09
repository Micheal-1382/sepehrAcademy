import { Divider } from "@nextui-org/react";
import React from "react";
import BlogCard from "./BlogCard";
import TopBlogCard from "./TopBlogCard";
import StandardPagination from "@/components/Modules/Pagination/StandardPagination";
import { Blog } from "@/interfaces/blog.interface";
import SkeletonBlogCard from "@/components/Templates/Blogs/SkeletonBlogCard";
import SkeletonTopBlogCard from "@/components/Templates/Blogs/SkeletonTopBlogCard";

interface BlogsBoxProps {
  data: Blog[];
  isLoading: boolean;
  totalCount: number;
}

export default function BlogsBox({
  data,
  isLoading,
  totalCount
}: BlogsBoxProps) {

  const presentDate = new Date().toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "2-digit"
  })

  return (
    <>
      <div className="mt-6 flex flex-col gap-10">
        <div className="flex flex-col mt-5">
          <div className="flex justify-between items-center text-lightBody dark:text-darkBody">
            <p className="font-peyda">خبرنامه سپهر</p>
            <p className="font-peyda">{presentDate}</p>
          </div>
          <div className="flex items-center">
            <Divider className="w-[35%] md:w-[40%] h-[3px] rounded-md bg-lightTitle dark:bg-darkTitle" />
            <h1 className="w-[30%] md:w-[20%] text-center font-kalamehBlack text-lightTitle dark:text-darkTitle text-2xl md:text-3xl lg:text-4xl">
              روزنامه سپهر
            </h1>
            <Divider className="w-[35%] md:w-[40%] h-[3px] bg-lightTitle dark:bg-darkTitle" />
          </div>
        </div>
        <div className="bg-white dark:bg-dark-lighter p-10">
          {isLoading ?
            <div className="grid grid-cols-4 gap-3 lg:gap-4 lgb:gap-8 lg:[&>*:nth-child(odd)]:flex-col-reverse">
              {Array.from({ length: 4 }, (_, index) => (
                <SkeletonBlogCard key={index} />
              ))}
              <SkeletonTopBlogCard />
              {Array.from({ length: 4 }, (_, index) => (
                <SkeletonBlogCard key={index} />
              ))}
            </div> :
            <div className="grid grid-cols-4 gap-3 lg:gap-4 lgb:gap-8 lg:[&>*:nth-child(odd)]:flex-col-reverse">
              {data.slice(0, 4).map((blog, index) => (
                <BlogCard {...blog} key={index} />
              ))}
              {data.slice(4, 5).map((blog, index) => (
                <TopBlogCard {...blog} key={index} />
              ))}
              {data.slice(5, 9).map((blog, index) => (
                <BlogCard {...blog} key={index} />
              ))}
              <StandardPagination totalCount={totalCount} />
            </div>}
        </div>
      </div>
    </>
  );
}
