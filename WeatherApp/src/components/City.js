import React from 'react';
import Map from './Map';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWiki, getSelected, getWiki } from '../features/weathcerSlice';
import '../../node_modules/react-vis/dist/style.css';
import _ from 'lodash';
import './style.css';
import SearchBar from './SearchBar';
import { withRouter } from 'react-router-dom';
import SwiperContainer from './SwiperContainer';
import Informations from './Informations';


const City = (props) => {
    

    const dispath = useDispatch();
    const selected = useSelector(getSelected);
    const wiki = useSelector(getWiki);

    React.useState(() => {
        selected.cityInformation && dispath(fetchWiki(selected.cityInformation.name));
    },[selected]);


    if(!selected.weather){
        props.history.push('/');
        return <React.Fragment></React.Fragment>
    } else{

        var resArr = [];
        
        const population = selected.cityInformation.population.toLocaleString();
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

        return (
            <React.Fragment>
                <SearchBar />
                <div className="mt-5 py-4 d-flex flex-column cityContainer">
                    <div className="mapContainer row flex-row-reverse justify-content-center">
                        <Map lon={lon} lat={lat} />
                        <div className="col-4 mr-5">
                            <div className="list-group">        
                                <div className="mb-5">
                                    <h2 className="ui header">City: { selected.cityInformation.name } </h2>
                                    <h4 className="ui header">Country: { country } </h4>
                                </div>
                                <Informations 
                                    population={population}
                                    lat={lat}
                                    lon={lon}
                                    seaLevel={seaLevel}
                                    avgHumidity={avgHumidity}
                                    avgTemp={avgTemp}
                                    avgPressure={avgPressure}
                                    avgWind={avgWind}
                                />                               
                            </div>
                            <div className="mt-5" dangerouslySetInnerHTML={{__html: wiki}}>
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
