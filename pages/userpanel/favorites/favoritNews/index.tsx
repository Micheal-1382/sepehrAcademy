import CourseFavoritesBox from '@/components/Templates/UserPanel/Favorites/CourseFavoritesBox';
import NewsFavoritesBox from '@/components/Templates/UserPanel/Favorites/NewsFavoritesBox';
import { getProfileInfoApi } from '@/services/api/panelApi';
import { GetServerSideProps } from 'next';
import React from 'react'

export default function UserFavoritesPage() {
    return (
        <>
            <NewsFavoritesBox />
        </>
    )
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