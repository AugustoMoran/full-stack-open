import axios from 'axios'

const API_BASE = 'https://studies.cs.helsinki.fi/restcountries'
const WEATHER_BASE = 'https://api.openweathermap.org/data/2.5/weather'

const getAllCountries = () => {
	return axios.get(`${API_BASE}/api/all`)
}

const getCountryByCode = (code) => {
	return axios.get(`${API_BASE}/api/alpha/${code}`)
}

const getWeather = (city) => {
	const apiKey = import.meta.env.VITE_WEATHER_API_KEY
	if (!apiKey) {
		return Promise.reject(new Error('No weather API key configured'))
	}
	return axios.get(`${WEATHER_BASE}?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`)
}

export default {
	getAllCountries,
	getCountryByCode,
	getWeather,
}
