import axios from 'axios'
import { useState, useEffect } from 'react'

// Ejercicio 7.7: Custom hook useCountry
// Este hook busca información de un país por su nombre
const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // useEffect con segundo parámetro para controlar cuándo ejecutar
  useEffect(() => {
    // Si el nombre está vacío, no buscar
    if (!name) {
      setCountry(null)
      setError(null)
      return
    }

    setLoading(true)
    setError(null)

    // Fetch a la API REST Countries
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => {
        // Éxito: guardar el país
        setCountry(response.data)
        setLoading(false)
      })
      .catch(error => {
        // Error: mostrar mensaje
        setError(`Country '${name}' not found`)
        setCountry(null)
        setLoading(false)
      })
  }, [name]) // Segundo parámetro: ejecutar solo cuando 'name' cambie

  return { country, loading, error }
}

const CountryInfo = ({ country }) => {
  // Si el país es null, no renderizar nada
  if (!country) {
    return null
  }

  return (
    <div>
      <h3>{country.name.common}</h3>
      <p>Capital: {country.capital?.[0]}</p>
      <p>Area: {country.area} km²</p>
      <p>Languages: {Object.values(country.languages || {}).join(', ')}</p>
      <img src={country.flags.svg} alt={country.name.common} width="100" />
    </div>
  )
}

const App = () => {
  const [input, setInput] = useState('')
  const { country, loading, error } = useCountry(input)

  return (
    <div>
      <h1>Country Information</h1>
      
      <div>
        <input
          type="text"
          placeholder="Enter country name..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {country && <CountryInfo country={country} />}
    </div>
  )
}

export default App
