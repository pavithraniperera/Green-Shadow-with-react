import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Import other icons as needed

const WeatherForecast = () => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                // Replace YOUR_API_KEY with your actual API key
                const response = await axios.get(
                    'https://api.openweathermap.org/data/2.5/weather',
                    {
                        params: {
                            q: 'Colombo,Sri Lanka', // Location
                            appid: 'bae6e515f708bd07df598163c8e07210', // Your API key
                            units: 'metric', // Use 'metric' for Celsius
                        },
                    }
                );

               // console.log(response.data);
                setWeatherData(response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeather();
    }, []);

    const getWeatherIcon = (condition) => {
        switch (condition.toLowerCase()) { // Normalize condition to lowercase for case-insensitivity
            case 'clear sky':
                return '☀️'; // Sunny icon
            case 'few clouds':
                return '🌤️'; // Few clouds icon
            case 'scattered clouds':
                return '☁️'; // Scattered clouds icon
            case 'broken clouds':
                return '🌥️'; // Broken clouds icon
            case 'overcast clouds':
                return '☁️'; // Overcast clouds icon
            case 'light rain':
                return '🌦️'; // Light rain icon
            case 'moderate rain':
                return '🌧️'; // Moderate rain icon
            case 'heavy intensity rain':
                return '🌧️'; // Heavy rain icon
            case 'thunderstorm':
                return '⛈️'; // Thunderstorm icon
            case 'drizzle':
                return '🌦️'; // Drizzle icon
            case 'mist':
            case 'fog':
                return '🌫️'; // Mist/Fog icon
            default:
                return '❓'; // Default icon for unknown conditions
        }
    };



    if (!weatherData) {
        return <div className="text-center mt-10">Loading weather data...</div>;
    }

    const weatherIcon = getWeatherIcon(weatherData.weather[0].description);

    return (
        <div className="max-w-sm bg-white/30 backdrop-blur-lg shadow-lg rounded-lg p-6 mt-10 min-h-96 mx-auto md:mx-80 border border-white/20 ">
            <div className="flex justify-between items-center">
                <div className="text-center mx-auto">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 font-itim">
                        Weather in {weatherData.name}
                    </h2>
                    <div className="text-8xl mb-6">{weatherIcon}</div>
                    <p className="text-center mt-4 text-gray-600 capitalize">
                        {weatherData.weather[0].description}
                    </p>


                </div>

            </div>

            <div className="flex  justify-evenly items-center mt-10">
                <div className="flex items-center">
                    <img src="src/assets/images/temp.png" alt="Temperature" className="w-10 h-10 mr-2"/>
                    <p className="text-lg md:text-2xl font-medium">{weatherData.main.temp}°C</p>

                </div>

                <div className="flex items-center">
                    <img src="src/assets/images/wind.png" alt="Humidity" className="w-12 h-12 mr-2"/>
                    <p className="text-lg md:text-2xl font-medium">{weatherData.main.humidity}%</p>

                </div>

            </div>


        </div>
    );

};

export default WeatherForecast;
