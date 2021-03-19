import axios from 'axios'
const url = "https://covid19.mathdro.id/api"

export const fetchData = async () => {
	try {
		const { data: { confirmed, recovered, deaths, lastUpdate} } = await axios.get(url)
		return  { confirmed, recovered, deaths, lastUpdate };
	} catch (error) {
		console.error(error);
	}
}

export const fetchDailyDate = async () => {
	try {
		const { data } = await axios.get(`${url}/daily`);
		return data.map((item) => ({
			confirmed: item.confirmed.total,
			deaths: item.deaths.total,
			date: item.reportDate
		}));
	} catch (error) {
		console.error(error)
	}
}

export const fetchCountry = async () => {
	try {
		const { data: { countries }} = await axios.get(`${url}/countries`)
		return countries.map((country) => country.name)
	} catch (error) {
		console.error(error)
	}
}

export const fetchCountryData = async (country) => {
	try {
		const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(`${url}/countries/${country}`)
		return { confirmed, recovered, deaths, lastUpdate }
	} catch (error) {
		console.error(error)
	}
}