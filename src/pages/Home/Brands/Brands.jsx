import React from 'react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import amazon from '../../../assets/brands/amazon.png'
import amazon_vector from '../../../assets/brands/amazon_vector.png'
import casio from '../../../assets/brands/casio.png'
import moonstar from '../../../assets/brands/moonstar.png'
import ranstad from '../../../assets/brands/randstad.png'
import star from '../../../assets/brands/star.png'
import start from '../../../assets/brands/start_people.png'

const brandLogos = [amazon, amazon_vector, casio,moonstar,ranstad,star,start]
const Brands = () => {
    return (
      <Swiper
        slidesPerView={2}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
            loop={true}
            autoplay={{
                delay: 1000,
                disableOnInteraction: false
            }}
       
        modules={[Autoplay]}
        className="mySwiper"
      >
        {brandLogos.map((logo,i) => (
          <SwiperSlide key={i}>
            <img src={logo} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    );
};

export default Brands;