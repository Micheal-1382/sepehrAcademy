import UserCard from "@/components/Modules/UserCard/UserCard";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  User,
} from "@nextui-org/react";
import React from "react";
import logout from "@/public/icons/theme/logout.svg";
import Image from "next/image";
import MainButton from "@/components/Modules/Button/MainButton";
import { teacherDetailsProps } from "@/interfaces/teacherDetails.interface";
import { useRouter } from "next/router";

export default function TeacherDetailsBox({ teacherId, teacherName }: teacherDetailsProps) {
  const router = useRouter()

  return (
    <Card
      dir="rtl"
      className="dark:bg-dark-lighter rounded-3xl px-8 py-4 shadow-2xl shadow-shadowColor dark:shadow-none"
    >
      <CardHeader className="pb-6 px-0">
        <UserCard
          title={teacherName}
          description="مدرس دوره"
          image={""}
          size={50}
        />
      </CardHeader>
      <Divider />
      <CardBody dir="rtl" className="text-right px-0 mt-4 mb-8">
        <p className="text-lightBody dark:text-darkBody text-sm lgb:text-[16px] leading-7">
          از سال 92 که وارد حوزه نرم افزار و برنامه نویسی شدم... طی 10 سال گذشته
          تجربه کار با زبانها و پلتفرمهای مختلفی رو دارم ولی 4 سال اخیر به شکل
          متمرکز به عنوان فول استک وب دولوپر مشغول به کار بودم و در حال حاضر
          استک اصلیم لاراول و ری اکت هست اما خب میتونم بگم این روز...
        </p>
      </CardBody>
      <Divider />
      <CardFooter className="justify-center">
        <MainButton
          className="text-lightTitle dark:text-darkTitle"
          content={<p>مشاهده همه دوره های استاد</p>}
          variant="light"
          startIcon={<Image src={logout} alt="" />}
          onClick={() => router.push(`/teachers/${teacherId}`)}
        />
      </CardFooter>
    </Card>
  );
}
