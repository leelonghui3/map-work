const axios = require('axios').default
const fs = require('fs')
const _ = require('lodash')
const { translateState } = require('./utils/translation')
const data = require('./data/weather-stations.json')

const getData = async () => {
  const parsedData = data.map(d => {
    const coordinates = d.coordinates.split(', ')

    return {
      id: d.id,
      name: d.name,
      state: d.state,
      isAirport: d.isAirport,
      coordinates: [+coordinates[1], +coordinates[0]]
    }
  })

  fs.writeFile('./output/stations.json', JSON.stringify(parsedData), err => {
    if (err) throw err
    console.log('done')
  })
}

getData()
