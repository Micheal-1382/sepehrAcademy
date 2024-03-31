import React from "react";
import Image from "next/image";
import bgNav from "@/public/icons/theme/phoneNavbarBackground.svg";
import Link from "next/link";
import { NavbarInPhoneProps } from "@/interfaces/navbarInPhone.interface";
import { useRouter } from "next/router";

const BottomNavigation = ({ mainRoutes }: NavbarInPhoneProps) => {
  const router = useRouter();

  const { pathname } = router;

  return (
    <nav className="flex justify-center sm:hidden fixed bottom-3 px-3 w-full z-20">
      <div className="phoneNav relative -mb-2 xs:mb-0">
        <Image
          className="-mb-[70px]"
          alt=""
          src={bgNav}
          style={{
            width: "auto",
            height: "100px",
            display: "flex",
            justifyItems: "center",
          }}
        />
        <ul className="flex justify-around mb-4 text-small z-50">
          {mainRoutes.map((route, index) => {
            const isActive = pathname === route.href;
            return (
              <li
                key={index}
                className={`flex items-center justify-center flex-col xs:gap-1 ${
                  isActive ? " text-white" : "text-gray-lighter"
                }`}
              >
                <Link className="xs:text-sm text-[9px]" href={route.href}>
                  <Image src={route.icon} alt="" width={24} height={24} />
                </Link>
                <Link className="xs:text-sm text-[9px]" href={route.href}>
                  {route.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default BottomNavigation;
