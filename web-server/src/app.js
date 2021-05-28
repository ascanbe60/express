import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { forecast } from './utils/forecast.js';

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, './templates');

//setup handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return req.send({
      error: 'You must provide an address!',
    });
  }

  const location = req.query.address;

  forecast(location, (error, body) => {
    if (error) {
      return res.send({ error });
    }

    res.send({
      forecast: body,
      location,
      address: req.query.addess,
    });
  });
});

app.get('*', (req, res) => {
  res.send('404 page not found');
});

app.listen(3000, () => {

});
