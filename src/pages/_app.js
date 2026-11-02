import "../styles/globals.css";
import Layout from "../components/Layout";
import SmoothScroll from "@/components/SmoothScroll";
import ThemeProvider from "@/components/ThemeProvider";
import AdminBoundary from "@/components/AdminBoundary";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const page = <Component {...pageProps} />;
  const adminRoute = pathname === "/admin" || pathname.startsWith("/admin/");
  return (
    <ThemeProvider>
      <AdminBoundary>
        {adminRoute ? page : <SmoothScroll><Layout>{page}</Layout></SmoothScroll>}
      </AdminBoundary>
    </ThemeProvider>
  );
}
