import Navbar from "./Navbar";
import Footer from "./Footer";
import StickyCart from "./StickyCart";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
       <StickyCart />
    </>
  );
}