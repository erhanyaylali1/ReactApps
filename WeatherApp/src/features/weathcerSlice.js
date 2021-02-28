import { createSlice } from '@reduxjs/toolkit';

const API_KEY = '289c364fb2e1c12abac61d79ccfbb60c';

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        results: [],
        selected: {}
    },
    reducers: {
        setResults: (state, action) => {
            state.results.push(action.payload);
        },
        setSelected: (state, action) => {
            state.selected = action.payload;
        }
    },
});

export const fetchResults = (cityName) => async (dispatch) => {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`;
    const weathers = await fetch(url)
    const respond = await weathers.json();
    if(respond.cod === "404") return;
    dispatch(setResults({ cityInformation: respond.city, weather: respond.list }));
}

export const { setResults, setSelected } = weatherSlice.actions;
export const getResults = (state) => state.weather.results;
export const getSelected = (state) => state.weather.selected;
export default weatherSlice.reducer;
