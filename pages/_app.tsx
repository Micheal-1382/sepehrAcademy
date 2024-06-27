import { queriesOptions } from "@/configs/queriesOption";
import DefautLayout from "@/layouts/DefautLayout";
import EmptyLayout from "@/layouts/EmptyLayout";
import UserPanelLayout from "@/layouts/UserPanelLayout"
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const loginRoutes = ["/login", "/register", "/resetPassword"];

  const panelRoutes = ["/userpanel", "/userpanel/myCourses", "/userpanel/myTikets", "/userpanel/profile", "/userpanel/favorites/favoritCourse", "/userpanel/favorites/favoritNews"]

  const queryClient = new QueryClient(queriesOptions);

  let Layout = loginRoutes.includes(router.pathname)
    ? EmptyLayout
    : DefautLayout;

  if (panelRoutes.includes(router.pathname)) {
    Layout = UserPanelLayout
  }

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider attribute="class" defaultTheme="light">
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={pageProps.dehydratedState}>
            <Layout>
              <Component {...pageProps} />
              <Toaster
                position="top-center"
                toastOptions={{
                  className: "font-peyda text-sm !text-white !bg-primary-lighter dark:!bg-primary-darker",
                }}
              />
            </Layout>
          </HydrationBoundary>
        </QueryClientProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}