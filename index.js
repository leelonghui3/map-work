const axios = require('axios').default
const fs = require('fs')
const _ = require('lodash')
const { translateState } = require('./utils/translation')

const getData = async () => {
  try {
    const res = await axios.get(
      'https://newslabapi.malaysiakini.com/api/sheets/climate-change/climate-data',
      {
        responseType: 'json'
      }
    )

    const data = await res.data.data

    // const output = [{
    //   state: 'Perak',
    //   zhState: '霹雳',
    //   stations: [{
    //     name: 'Ipoh',
    //     zhName: '怡保',
    //     id: '486250-99999'
    //   }]
    // }]

    const states = _.uniq(_.map(data, 'state').sort())

    const parsedData = []

    _.forEach(states, state => {
      const stations = _(data)
        .filter(d => d.state === state)
        .map(d => ({
          id: d.id,
          name: d.name,
          zhName: d.zhName
        }))
        .uniqBy('id')
        .value()

      parsedData.push({
        enState: state,
        zhState: translateState('zh', state),
        msState: translateState('ms', state),
        stations
      })
    })

    // console.log(parsedData)

    fs.writeFile(
      './output/weather-stations.json',
      JSON.stringify(parsedData),
      err => {
        if (err) throw err
        console.log('done')
      }
    )
  } catch (error) {
    console.log(error)
  }
}

getData()
