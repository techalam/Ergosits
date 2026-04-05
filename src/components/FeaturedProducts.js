"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ProductCard from "./ProductCard";

import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false });

  if (!error) {
    setProducts(data || []);
  }
};

useEffect(() => {
fetchProducts();
},[]);

  return ( <>
      {products?.length > 0 && (
    <section className="py-32 bg-[#F5F5F7]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-16">

          <div>
            <h2 className="text-4xl md:text-5xl font-semibold">
              Featured Products
            </h2>

            <p className="text-gray-500 mt-4">
              Upgrade your workspace with ergonomic essentials.
            </p>
          </div>

          {/* Arrows */}
          <div className="flex gap-4">

            <button className="prev w-12 h-12 rounded-full bg-white shadow flex items-center justify-center hover:bg-black hover:text-white transition">
              <FaChevronLeft />
            </button>

            <button className="next w-12 h-12 rounded-full bg-white shadow flex items-center justify-center hover:bg-black hover:text-white transition">
              <FaChevronRight />
            </button>

          </div>

        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={4}
          loop={true}
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {products?.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} height={'h-60'} />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
      
      </section>
    )}
  </>
  );
}