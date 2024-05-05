import React, {useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/swiper-bundle.css'; // Import Swiper CSS after adding SwiperCore styles
import banner1 from "../../assets/slider-images/banner-1.png";
import banner2 from "../../assets/slider-images/banner-2.png";
import banner3 from "../../assets/slider-images/banner-3.png";
import banner4 from "../../assets/slider-images/banner-4.png";
import banner5 from "../../assets/slider-images/banner-5.png";
import {Autoplay, Navigation} from "swiper/modules";
import '../Carousel/Carousel.css';

SwiperCore.use([Navigation, Autoplay]); // Enable Swiper navigation and autoplay

const Carousel = () => {
    const [activeSlide, setActiveSlide] = useState(0);

    const handleSlideChange = (swiper) => {
        setActiveSlide(swiper.realIndex);
    };

    return (
        <div className="carousel-container">
            <Swiper
                spaceBetween={30}
                slidesPerView={1}
                navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
                loop
                autoplay={{ delay: 3000 }}
                onSlideChange={handleSlideChange}
            >
                <SwiperSlide className='swiper-slide'>
                    <img src={banner1} alt="Banner 1" />
                </SwiperSlide>
                <SwiperSlide className='swiper-slide'>
                    <img src={banner2} alt="Banner 2" />
                </SwiperSlide>
                <SwiperSlide className='swiper-slide'>
                    <img src={banner3} alt="Banner 3" />
                </SwiperSlide>
                <SwiperSlide className='swiper-slide'>
                    <img src={banner4} alt="Banner 4" />
                </SwiperSlide>
                <SwiperSlide className='swiper-slide'>
                    <img src={banner5} alt="Banner 5" />
                </SwiperSlide>
            </Swiper>
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
            <div className="slide-buttons">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className={`slide-button ${activeSlide === index ? 'active' : ''}`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
