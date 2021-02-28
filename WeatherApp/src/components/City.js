import React from 'react';
import Map from './Map';
import { useSelector } from 'react-redux';
import { getSelected } from '../features/weathcerSlice';
import '../../node_modules/react-vis/dist/style.css';
import _ from 'lodash';
import './style.css';
import SearchBar from './SearchBar';
import { withRouter } from 'react-router-dom';
import SwiperContainer from './SwiperContainer';
import { Statistic, Accordion, Icon } from 'semantic-ui-react'

const City = (props) => {
    
    const selected = useSelector(getSelected);
    const [activeIndex, setActiveIndex] = React.useState(0);

    if(!selected.weather){
        props.history.push('/');
        return <React.Fragment></React.Fragment>
    } else{

        var resArr = [];
        

        const avgTemp = _.round(selected.weather.reduce((total, next)=> total+next.main.temp-273, 0) / selected.weather.length);
        const avgWind =_.round(selected.weather.reduce((total, next)=> total+next.wind.speed, 0) / selected.weather.length);
        const avgHumidity =_.round(selected.weather.reduce((total, next)=> total+next.main.humidity, 0) / selected.weather.length);
        const avgPressure =_.round(selected.weather.reduce((total, next)=> total+next.main.pressure, 0) / selected.weather.length);
        const seaLevel = selected.weather[0].main.sea_level;

        selected.weather.filter((item) =>{
            var i = resArr.findIndex(x => x.dt_txt.substring(0, 10) === item.dt_txt.substring(0, 10));
            if(i <= -1) resArr.push(item);
            return null;
        });
        
        const country = selected.cityInformation.country;
        const {lat, lon} = selected.cityInformation.coord;
        const temp = resArr.map((each) => ({x: new Date(each.dt_txt.substring(0, 10)), y: _.round(each.main.temp - 273)}));
        const wind = resArr.map((each) => ({x: new Date(each.dt_txt.substring(0, 10)), y: _.round(each.wind.speed)}));
        const humidity = resArr.map((each) => ({x: new Date(each.dt_txt.substring(0, 10)), y: _.round(each.main.humidity)}));
        const pressure = resArr.map((each) => ({x: new Date(each.dt_txt.substring(0, 10)), y: _.round(each.main.pressure)}));

        const handleClick = (e, titleProps) => {
            const { index } = titleProps
            const newIndex = activeIndex === index ? -1 : index        
            setActiveIndex(newIndex);
        }
        

        return (
            <React.Fragment>
                <SearchBar />
                <div className="mt-5 py-4 d-flex flex-column cityContainer">
                    <div className="mapContainer row flex-row-reverse justify-content-center">
                        <Map lon={lon} lat={lat} />
                        <div className="col-4 mr-5">
                            <div className="list-group">        
                                <div className="display-4">
                                    {selected.cityInformation.name}
                                    <span className="ml-5">
                                        {country} <i className={`${country.toLowerCase()} flag`}></i>
                                    </span>
                                </div>

                                <Accordion className="mt-4">
                                    <Accordion.Title
                                        active={activeIndex === 0}
                                        index={0}
                                        onClick={handleClick}
                                    >
                                        <h3>Population</h3>
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 0}>
                                        <Statistic>
                                            <Statistic.Value>{selected.cityInformation.population.toLocaleString()}</Statistic.Value>
                                            <Statistic.Label>Population</Statistic.Label>
                                        </Statistic>
                                    </Accordion.Content>

                                    <Accordion.Title
                                        active={activeIndex === 1}
                                        index={1}
                                        onClick={handleClick}
                                    >
                                        <h3>Latitude</h3>
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 1}>
                                        <Statistic>
                                            <Statistic.Value>{lat}</Statistic.Value>
                                            <Statistic.Label>Latitude</Statistic.Label>
                                        </Statistic>
                                    </Accordion.Content>

                                    <Accordion.Title
                                        active={activeIndex === 2}
                                        index={2}
                                        onClick={handleClick}
                                    >
                                        <h3>Longtitude</h3>
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 2}>
                                        <Statistic>
                                            <Statistic.Value>{lon}</Statistic.Value>
                                            <Statistic.Label>Longtitude</Statistic.Label>
                                        </Statistic>
                                    </Accordion.Content>
                                    
                                    <Accordion.Title
                                        active={activeIndex === 3}
                                        index={3}
                                        onClick={handleClick}
                                    >
                                        <h3>Sea Level</h3>
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 3}>
                                        <Statistic>
                                            <Statistic.Value>{seaLevel} M</Statistic.Value>
                                            <Statistic.Label>Sea Level</Statistic.Label>
                                        </Statistic>
                                    </Accordion.Content>

                                    <Accordion.Title
                                        active={activeIndex === 4}
                                        index={4}
                                        onClick={handleClick}
                                    >
                                        <h3>Average Temperature</h3>
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 4}>
                                        <Statistic>
                                            <Statistic.Value>{avgTemp} °C</Statistic.Value>
                                            <Statistic.Label>Last Week Avg Temperature</Statistic.Label>
                                        </Statistic>
                                    </Accordion.Content>

                                    <Accordion.Title
                                        active={activeIndex === 5}
                                        index={5}
                                        onClick={handleClick}
                                    >
                                        <h3>Average Wind Speed</h3>
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 5}>
                                        <Statistic>
                                            <Statistic.Value>{avgWind} Mph</Statistic.Value>
                                            <Statistic.Label>Last Week Avg Wind Speed</Statistic.Label>
                                        </Statistic>
                                    </Accordion.Content>

                                    <Accordion.Title
                                        active={activeIndex === 6}
                                        index={6}
                                        onClick={handleClick}
                                    >
                                        <h3>Average Humidty</h3>
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 6}>
                                        <Statistic>
                                            <Statistic.Value>{avgHumidity} %</Statistic.Value>
                                            <Statistic.Label>Last Week Avg Humidty</Statistic.Label>
                                        </Statistic>
                                    </Accordion.Content>

                                    <Accordion.Title
                                        active={activeIndex === 7}
                                        index={7}
                                        onClick={handleClick}
                                    >
                                        <h3>Average Pressure</h3>
                                    </Accordion.Title>
                                    <Accordion.Content active={activeIndex === 7}>
                                        <Statistic>
                                            <Statistic.Value>{avgPressure} hPa</Statistic.Value>
                                            <Statistic.Label>Last Week Avg Pressure</Statistic.Label>
                                        </Statistic>
                                    </Accordion.Content>
                                </Accordion>                                
                            </div>
                        </div>   
                    </div>
                    <SwiperContainer 
                        temp={temp}
                        wind={wind}
                        humidity={humidity}
                        pressure={pressure}
                    />

                </div>
            </React.Fragment>
        )
    }
    
}

export default withRouter(City);
