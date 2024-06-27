import React from "react";
import ProfileBox from "@/components/Templates/UserPanel/ProfileBox/ProfileBox";
import PersonalInfoBox from "@/components/Templates/UserPanel/PersonalInfoBox/PersonalInfoBox";
import { useGetProfileInfoApi } from "@/hooks/api/usePanelApi";
import { GetServerSideProps } from "next";
import { getProfileInfoApi } from "@/services/api/panelApi";
import ChangePasswordBox from "@/components/Templates/UserPanel/PasswordBox/PasswordBox";

export default function Index() {
  const { data, isLoading } = useGetProfileInfoApi();
  return (
    <div className="flex gap-8">
      <div className="flex flex-col bg-white dark:bg-dark-lighter w-[60%] rounded-3xl overflow-hidden p-5">
        <ProfileBox userImage={data?.userImage[data?.userImage.length - 1]} isLoading={isLoading} />
        <PersonalInfoBox isLoading={isLoading} data={data} />
      </div>
      <div className="flex flex-col bg-white dark:bg-dark-lighter w-[40%] h-max rounded-3xl p-5">
        <ChangePasswordBox />
      </div>
    </div>
  );
}

export const getServerSideProps = (async (context) => {
  const { cookies } = context.req

  try {
    await getProfileInfoApi(cookies?.token);
    return {
      props: {}
    }

  } catch (error) {
    return {
      redirect: {
        destination: "/"
      },
      props: {},
    };
  }
}) satisfies GetServerSideProps