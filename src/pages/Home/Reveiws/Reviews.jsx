import React, { use } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard from './ReviewCard';

const Reviews = ({review}) => {
    const reviews = use(review)
    
    return (
      <div className="my-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold my-8">Review</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla rem,
            alias quasi ratione voluptatibus reprehenderit omnis id earum maxime
            aliquam?
          </p>
        </div>
        <div className='mt-5'>
          <Swiper
                    effect={"coverflow"}
                    loop={true}
                    autoplay={true}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"3"}
            coverflowEffect={{
              rotate: 30,
              stretch: '50%',
                depth: 200,
              scale: 0.75,
              modifier: 1,
              slideShadows: true,
            }}
                    pagination={true}
            modules={[EffectCoverflow, Pagination,Autoplay]}
            className="mySwiper"
          >
            {reviews.map((r, i) => (
              <SwiperSlide key={i}>
                <ReviewCard r={r}></ReviewCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
};

export default Reviews;