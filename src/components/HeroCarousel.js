import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function HeroCarousel() {
  return (
    <div className="max-w-7xl mx-auto px-6 mt-6">

      <Swiper spaceBetween={20} slidesPerView={1} loop>

        {/* SLIDE 1 */}
        <SwiperSlide>
            <img src="/images/stand.png" className="h-40" />
        </SwiperSlide>

        {/* SLIDE 2 */}
        <SwiperSlide>
            <img src="/mobile.png" className="h-40" />
        </SwiperSlide>

      </Swiper>

    </div>
  );
}