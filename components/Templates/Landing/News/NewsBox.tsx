import React from "react";
import NewsCard from "./NewsCard";
import EffectCardSlider from "@/components/Modules/Slider/EffectCardSlider";
import BoxHeader from "@/components/Modules/BoxHeader/BoxHeader";
import { useGetLatestNewsApi } from "@/hooks/api/useNewsApi";
import SkeletonNewsCard from "./SkeletonNewsCard";

export default function NewsBox() {
  const { data, isLoading } = useGetLatestNewsApi(7)
  return (
    <div className="lg:mt-36 mt-24">
      <BoxHeader title="آخرین اخبار" hasLink={false} />
      <EffectCardSlider
        href="/blogs"
        linkTitle="مشاهده همه اخبار"
        Content={isLoading ? SkeletonNewsCard : NewsCard} 
        data={data?.news ?? Array.from({ length: 6 })}
      />
    </div>
  );
}
