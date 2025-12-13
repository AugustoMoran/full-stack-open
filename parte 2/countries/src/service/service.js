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
	const apiKey = "4359dc82257ab46512e9eecfc3296b36"
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
