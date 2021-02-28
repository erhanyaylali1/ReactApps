import { createSlice } from '@reduxjs/toolkit';

const API_KEY = '289c364fb2e1c12abac61d79ccfbb60c';

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        results: [],
        selected: {},
        wiki: {}
    },
    reducers: {
        setResults: (state, action) => {
            state.results.push(action.payload);
        },
        setSelected: (state, action) => {
            state.selected = action.payload;
        },
        setWiki: (state, action) => {
            state.wiki = action.payload;
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

export const fetchWiki = (cityName) => async (dispatch) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&srsearch=${cityName}&utf8=&format=json`;
    const res = await fetch(url);    
    const wikiResult = await res.json();
    const final = wikiResult.query.search[0].snippet + `&nbsp;<a href='https://en.wikipedia.org?curid=${wikiResult.query.search[0].pageid}'>See More</a>`;
    dispatch(setWiki(final));
}

export const { setResults, setSelected, setWiki } = weatherSlice.actions;
export const getResults = (state) => state.weather.results;
export const getSelected = (state) => state.weather.selected;
export const getWiki = (state) => state.weather.wiki;
export default weatherSlice.reducer;
