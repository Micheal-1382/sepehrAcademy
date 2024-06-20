import React from 'react'
import SkeletonMainBlogDetails from './SkeletonMainBlogBox'
import { useGetNewsDetailsApi } from '@/hooks/api/useNewsApi'
import { useRouter } from 'next/router';
import MainBlogDetailsCard from './MainBlogDetailsCard/MainBlogDetailsCard';

export default function MainBlogDetailsBox() {
    const router = useRouter();
    const { query } = router

    const { data, isLoading } = useGetNewsDetailsApi(query?.blogId)

    return (
        isLoading || !query?.blogId ? (
            <SkeletonMainBlogDetails />
        ) : (
            <MainBlogDetailsCard {...data?.detailsNewsDto} />
        )
    )
}
