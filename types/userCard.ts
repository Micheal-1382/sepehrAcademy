import { StaticImageData } from "next/image";

type UserCardType = {
  title: string;
  description: string;
  image: StaticImageData;
  size: number;
};

export type { UserCardType };
