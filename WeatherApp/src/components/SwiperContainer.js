import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectCoverflow, Navigation, Pagination } from 'swiper';
import 'swiper/components/effect-fade/effect-fade.scss';
import DetailChart from './DetailChart';

const SwiperContainer = ({temp, wind, humidity, pressure}) => {

    SwiperCore.use([EffectCoverflow, Navigation, Pagination]);

    return (
        <div>
            <Swiper 
                spaceBetween={10}
                slidesPerView="auto"
                navigation
                pagination
                loop
                effect="coverflow"
            >
                <SwiperSlide>
                    <div className="graph">
                        <h3 className="ui header mb-5">Last Week Temperature</h3>
                        <DetailChart data={temp} unit="°C" />
                    </div> 
                </SwiperSlide>
                <SwiperSlide>
                    <div className="graph">
                        <h3 className="ui header mb-5">Last Week Wind Speed</h3>
                        <DetailChart data={wind} unit="Mph" />
                    </div> 
                </SwiperSlide>
                <SwiperSlide>
                    <div className="graph">
                        <h3 className="ui header mb-5">Last Week Humidity</h3>
                        <DetailChart data={humidity} unit="%" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="graph">
                        <h3 className="ui header mb-5">Last Week Air Pressure</h3>
                        <DetailChart data={pressure} unit="hPa" />
                    </div>
                </SwiperSlide>
            </Swiper>         
        </div>
    )
}

export default SwiperContainer