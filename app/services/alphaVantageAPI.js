'use strict'
const axios = require('axios')

const apiKey = process.env.avAPIKey || 'catsAreGreat'
const uri = 'https://www.alphavantage.co'

const params = {
  function: 'TIME_SERIES_DAILY',
  apikey: apiKey
}

function getStockInfo(company, cb) {
  const specificParams = Object.assign({}, params)
  specificParams.symbol = company

  axios
    .get(`${uri}/query`, {
      params: specificParams
    })
    .then(resp => {
      if (resp.data['Error Message']) {
        return cb(resp.data)
      }
      return cb(null, resp.data)
    })
    .catch(err => cb(err))
}

module.exports = {
  getStockInfo
}
