import axios from 'axios';


const apiKey= "52dc35bb9662fc537aa00f0fc2c60a96";
const base= "https://api.openweathermap.org/data/2.5/weather?q";

export const WeatherData = async (cityname) => {
  try{
    const {data} = await axios.get(base + `=${cityname}&appid=${apiKey}&units=metric`);
    return data;
  }catch(error) {
    throw error;
  };
};

