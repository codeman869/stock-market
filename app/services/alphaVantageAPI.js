'use strict';
const axios = require('axios');

const apiKey = process.env.avAPIKey || 'catsAreGreat';
const uri = 'https://www.alphavantage.co/';

const params = {
  function: 'TIME_SERIES_DAILY',
  apikey: apiKey
};

function getStockInfo(company) {
  const specificParams = Object.assign({}, params);
  specificParams.symbol = company;
  axios
    .get(`${uri}/query`, {
      params: specificParams
    })
    .then(resp => console.log(resp))
    .catch(err => console.warn(err));
}

module.exports = {
  getStockInfo
};
