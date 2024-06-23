import { useGetMyFavoriteNewsApi } from '@/hooks/api/usePanelApi'
import React from 'react'
import SkeletonBlogOtherCard from '../../MainBlog/BlogOtherCard/SkeletonBlogOtherCard'
import BlogOtherCard from '../../MainBlog/BlogOtherCard/BlogOtherCard'

export default function NewsFavoritesBox() {
    const { data, isLoading } = useGetMyFavoriteNewsApi()
    console.log(data)

    return (
        <>
            <h2 className="font-peyda text-[20px] lg:text-[30px] text-primary dark:text-primary-lighter mt-12 mb-6">
                اخبار های مورد علاقه من
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lgb:grid-cols-3 gap-4'>
                {isLoading ? Array.from({ length: 4 }, (_, index) => (
                    <SkeletonBlogOtherCard key={index} />
                )) : data?.myFavoriteNews.map((news: any, index: number) => (
                    <BlogOtherCard key={index} {...news} />
                ))}
            </div>
        </>
    )
}
