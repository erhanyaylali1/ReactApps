import React from 'react';
import { Carousel } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { Statistic } from 'semantic-ui-react';

export default function Informations({population, lat, lon, seaLevel, avgTemp, avgWind, avgHumidity, avgPressure}) {
    return (
        <div>
             <Carousel autoplay arrows nextArrow={<RightOutlined />} prevArrow={<LeftOutlined/>} dotPosition="bottom" effect="fade">
                <div>
                    <div className="statCard">
                        <Statistic>
                            <Statistic.Value>{population}</Statistic.Value>
                            <Statistic.Label>Population</Statistic.Label>
                        </Statistic>
                    </div>                                        
                </div>
                <div>
                    <div className="statCard">
                        <Statistic>
                            <Statistic.Value>{lat}</Statistic.Value>
                            <Statistic.Label>Latitude</Statistic.Label>
                        </Statistic>
                    </div>                                        
                </div>
                <div>
                    <div className="statCard">
                        <Statistic>
                            <Statistic.Value>{lon}</Statistic.Value>
                            <Statistic.Label>Longtitude</Statistic.Label>
                        </Statistic>
                    </div>                                        
                </div>
                <div>
                    <div className="statCard">
                    <Statistic>
                        <Statistic.Value>{seaLevel} M</Statistic.Value>
                        <Statistic.Label>Sea Level</Statistic.Label>
                    </Statistic>
                    </div>                                        
                </div>
                <div>
                    <div className="statCard">
                        <Statistic>
                            <Statistic.Value>{avgTemp} °C</Statistic.Value>
                            <Statistic.Label>Last Week Avg Temperature</Statistic.Label>
                        </Statistic>
                    </div>                                        
                </div>
                <div>
                    <div className="statCard">
                        <Statistic>
                            <Statistic.Value>{avgWind} Mph</Statistic.Value>
                            <Statistic.Label>Last Week Avg Wind Speed</Statistic.Label>
                        </Statistic>
                    </div>                                        
                </div>
                <div>
                    <div className="statCard">
                        <Statistic>
                            <Statistic.Value>{avgHumidity} %</Statistic.Value>
                            <Statistic.Label>Last Week Avg Humidty</Statistic.Label>
                        </Statistic>
                    </div>                                        
                </div>
                <div>
                    <div className="statCard">
                        <Statistic>
                            <Statistic.Value>{avgPressure} hPa</Statistic.Value>
                            <Statistic.Label>Last Week Avg Pressure</Statistic.Label>
                        </Statistic>
                    </div>                                        
                </div>                                    
            </Carousel>          
        </div>
    )
}
