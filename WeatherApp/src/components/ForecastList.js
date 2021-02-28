import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getResults, setSelected } from '../features/weathcerSlice';
import { Link } from 'react-router-dom';
import Chart from './Chart';
import './style.css';

const ForecastList = (props) => {
    
    const weather = useSelector(getResults);
    const dispatch = useDispatch();

    const renderWeatherList = () => {
        return weather?.map((res, index) => {
            const temp = res.weather.map((each) => (each.main.temp - 273));
            const wind = res.weather.map((each) => (each.wind.speed));
            const humidity = res.weather.map((each) => (each.main.humidity));
            const pressure = res.weather.map((each) => (each.main.pressure));

            return (                
                <tr key={index} onClick={() => dispatch(setSelected(res))}>
                    <td><Link to="/detail">{res.cityInformation.name}</Link></td>
                    <td>
                        <Chart data={temp} color="red" unit="°C" />
                    </td>
                    <td>
                        <Chart data={wind} color="black" unit="Mph" />
                    </td>
                    <td>
                        <Chart data={pressure} color="orange" unit="hPa" />
                    </td>
                    <td>
                        <Chart data={humidity} color="blue" unit="%" />
                    </td>
                </tr>
            )
        });
    };

    return (
        <React.Fragment>
            <table className="table mt-4 table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temp (°C)</th>
                        <th>Wind (Mph)</th>
                        <th>Pressure (hPa)</th>
                        <th>Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {renderWeatherList()}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default ForecastList