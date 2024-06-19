import Image from "next/image";
import React from "react";
import dashboard from "@/public/pictures/userPanel/p1.svg";
import courses from "@/public/pictures/userPanel/p2.svg";
import tikets from "@/public/pictures/userPanel/p3.svg";
import profile from "@/public/pictures/userPanel/p4.svg";
import exite from "@/public/pictures/userPanel/p5.svg";
import heartIcon from "@/public/icons/solid/heart.svg";
import navbarLogo from "@/public/icons/logo/navbarLogo.svg";
import Link from "next/link";
import MainButton from "@/components/Modules/Button/MainButton";
import { revokeToken } from "@/utils/revokeToken";
import { useRouter } from "next/router";

function Sidedar() {
  const router = useRouter();

  const logoutUserHandler = () => {
    revokeToken();
    router.reload();
  };
  return (
    <div className="bg-white dark:bg-dark-lighter w-[28%] h-[90vh] p-10 rounded-3xl flex flex-col gap-10 sticky top-10 right-0">
      <div className="flex items-center gap-x-10 p-5">
        <Image
          src={navbarLogo}
          priority={true}
          alt=""
          className="scale-150"
          style={{ width: "auto" }}
        />
        <p className="font-kalamehBlack text-lightTitle dark:text-darkTitle text-[25px]">
          آکادمی سپهر
        </p>
      </div>
      <ul className="text-[16px] text-lightBody dark:text-darkBody font-peyda flex flex-col gap-5">
        <li>
          <Link className="flex gap-2 items-center" href={"/userpanel"}>
            <span className="w-10 flex justify-center">
              <Image
                src={dashboard}
                priority={true}
                alt=""
                className="scale-80"
                style={{ width: "auto" }}
              />
            </span>
            پیشخوان
          </Link>
        </li>
        <li>
          <Link
            className="flex gap-2 items-center"
            href={"/userpanel/myCourses"}
          >
            <span className="w-10 flex justify-center">
              <Image
                src={courses}
                priority={true}
                alt=""
                className="scale-80"
                style={{ width: "auto" }}
              />
            </span>
            دوره های من
          </Link>
        </li>
        <li>
          <Link
            className="flex gap-2 items-center"
            href={"/userpanel/favorites/favoritCourse"}
          >
            <span className="w-10 flex justify-center">
              <Image
                src={heartIcon}
                priority={true}
                alt=""
                className="scale-75"
                style={{ width: "auto" }}
              />
            </span>
            دوره های مورد علاقه
          </Link>
        </li>
        <li>
          <Link
            className="flex gap-2 items-center"
            href={"/userpanel/favorites/favoritNews"}
          >
            <span className="w-10 flex justify-center">
              <Image
                src={heartIcon}
                priority={true}
                alt=""
                className="scale-75"
                style={{ width: "auto" }}
              />
            </span>
            اخبار های مورد علاقه
          </Link>
        </li>
        <li>
          <Link
            className="flex gap-2 items-center"
            href={"/userpanel/myTikets"}
          >
            <span className="w-10 flex justify-center">
              <Image
                src={tikets}
                priority={true}
                alt=""
                className="scale-80"
                style={{ width: "auto" }}
              />
            </span>
            تیکت ها
          </Link>
        </li>
        <li>
          <Link className="flex gap-2 items-center" href={"/userpanel/profile"}>
            <span className="w-10 flex justify-center">
              <Image
                src={profile}
                priority={true}
                alt=""
                className="scale-80"
                style={{ width: "auto" }}
              />
            </span>
            پروفایل
          </Link>
        </li>
        <li>
          <Link className="flex gap-2 items-center" href={"/"}>
            <span className="w-10 flex justify-center">
              <Image
                src={exite}
                priority={true}
                alt=""
                className="scale-80"
                style={{ width: "auto" }}
              />
            </span>
            <MainButton
              content={<div className="text-[17px]">خروج از حساب</div>}
              onClick={logoutUserHandler}
              variant="light"
              color="danger"
            />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidedar;
