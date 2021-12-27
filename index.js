const axios = require('axios')
const result = require('./data/result.json')
const fs = require('fs')

const getGeoJSON = async () => {
  try {
    const res = await axios.get('https://pages.malaysiakini.com/map/par.json')
    const map = await res.data

    map.features.forEach(feature => {
      result.forEach(constituency => {
        if (constituency.code === feature.properties.code) {
          feature.properties = {
            ...feature.properties,
            ...constituency,
            person: {
              age: Math.floor(Math.random(1) * 70),
              term: Math.floor(Math.random(1) * 3),
              manifesto: {
                first: 'lorem ipsum'
              }
            }
          }
        }
      })
    })

    fs.writeFile('./output/output.json', JSON.stringify(map), err => {
      if (err) throw err
      console.log('done')
    })
  } catch (error) {
    console.log(error)
  }
}

const getList = async () => {
  try {
    const res = await axios.get('https://pages.malaysiakini.com/map/par.json')
    const map = await res.data

    const list = map.features.map(feature => ({
      displayedValue: `${feature.properties.code} ${feature.properties.name}`,
      name: feature.properties.name,
      code: feature.properties.code
    }))

    fs.writeFile('./output/list.json', JSON.stringify(list), err => {
      if (err) throw err
      console.log('done')
    })
  } catch (error) {
    console.log(error)
  }
}
// getGeoJSON()

// getList()
