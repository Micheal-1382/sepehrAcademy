import PrimaryInput from "@/components/Modules/Input/PrimaryInput";
import Image from "next/image";
import React, { useEffect } from "react";
import searchIcon from "@/public/icons/filter/search.svg";
import { Divider } from "@nextui-org/react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { searchCourse } from "@/interfaces/searchCourse.interface";
import MainButton from "@/components/Modules/Button/MainButton";
import { useRouter } from "next/router";
import { horizontalFilter } from "@/interfaces/horizontalFilter.interface";
import MainSelect from "../MainSelect/MainSelect";

export default function HorizontalFilterBox({
  placeholder,
  sortingColArray,
  sortTypeArray
}: horizontalFilter) {
  const { register, reset, handleSubmit } = useForm<searchCourse>();

  const router = useRouter();

  const { pathname, query } = router;

  useEffect(() => {
    if (query.Query) {
      reset({
        Query: query.Query
      })
    }
  }, [query, reset])

  const submitFormHandler: SubmitHandler<searchCourse> = (data) => {
    let newQuery = { ...query }

    if (data.Query) {
      newQuery = {
        ...query,
        Query: data.Query,
        PageNumber: "1"
      }
    } else {
      delete newQuery.Query
    }

    router.push({
      pathname,
      query: newQuery
    });
  };
  return (
    <div className="bg-white dark:bg-dark-lighter flex items-center gap-2 flex-row rounded-xl p-2">
      <form
        className="relative w-[50%] sm:w-[35%] lg:w-[25%]"
        onSubmit={handleSubmit(submitFormHandler)}
      >
        <PrimaryInput
          placeholder={placeholder}
          variant="faded"
          className="text-2xl font-peyda w-full"
          hasBorder={false}
          register={{
            ...register("Query"),
          }}
        />
        <MainButton
          className="absolute left-0 top-3 bg-transparent min-w-unit-0"
          content={
            <Image alt="" src={searchIcon} className="cursor-pointer m-0" />
          }
          type="submit"
        />
      </form>
      <div className="hidden lg:flex items-center w-full gap-8">
        <ul className="items-center gap-x-6 font-peyda text-[13px] md:text-[15px] flex">
          <li className="w-3 h-5 flex justify-center items-center relative">
            <Divider className="w-8 md:w-12 absolute top-[50%] md:-left-[200%] lg:-left-[150%] rotate-90" />
          </li>
          <li>
            <p className="font-peyda">مرتب سازی براساس :</p>
          </li>
          {sortingColArray.map((item, index) => (
            <li
              key={index}
              className={`flex items-center justify-center flex-col xs:gap-1 ${query.SortingCol === item.query
                ? "text-primary dark:text-primary-lighter"
                : "text-gray-lighter"
                }`}
            >
              <Link
                href={{
                  pathname,
                  query: { ...query, SortingCol: item.query, PageNumber: "1" }
                }}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <MainSelect data={sortTypeArray} label="نوع مرتب سازی" queryName="SortType" className="w-[160px]" />
      </div>
      <div className="lg:hidden w-[50%] flex gap-2 items-center">
        <Divider className="w-8 md:w-12 rotate-90 -mr-4" />
        <div className="flex items-center gap-2 flex-wrap">
          <MainSelect data={sortingColArray} label="مرتب سازی براساس" queryName="SortingCol" className="w-[150px]" />
          <MainSelect data={sortTypeArray} label="نوع مرتب سازی" queryName="SortType" className="w-[150px]" />
        </div>
      </div>
    </div>
  );
}
