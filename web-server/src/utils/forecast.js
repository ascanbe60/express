import request from 'request';

import { kelToCel } from './helpers.js';

export const forecast = (location, callback) => {
  const apiKey = '373997b7584cfef67d65fb4e28fff1b1';
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to the weather service!', undefined);
    }
    
    if (body.error) {
      callback('Unable to find location!', undefined);
    }

    callback(
      undefined,
      `In ${body.name}, it is currently ${kelToCel(body.main.temp)}C out, with ${body.weather[0].description}. The high today is ${kelToCel(body.main.temp_max)}C, with a low of ${kelToCel(body.main.temp_min)}C.`
    );
  });
};
