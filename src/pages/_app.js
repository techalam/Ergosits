import "../styles/globals.css";
import Layout from "../components/Layout";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

export default function MyApp({ Component, pageProps }) {
  return (
    <SmoothScroll>
      <Cursor />
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </SmoothScroll>
  );
}