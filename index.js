const axios = require('axios')
const result = require('./data/scoresheet.json')
const map = require('./data/ge14-parliament.json')
const fs = require('fs')
const _ = require('lodash')
const { translateParty } = require('./utils/translation')

const getGeoJSON = async () => {
  try {
    const res = await axios.get('https://pages.malaysiakini.com/map/par.json')
    const map = await res.data

    map.features.forEach(feature => {
      result.forEach(constituency => {
        if (constituency.code === feature.properties.code) {
          feature.properties = {
            ...feature.properties,
            ...constituency
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

const mergeData = category => {
  const parData = result.filter(d => d.stream === category)

  const partyList = [...new Set(parData.map(d => d.coalition).sort())]
  console.log(partyList)

  const parGroups = _.groupBy(parData, 'pd_code')

  const output = _.map(parGroups, category => {
    const streamGroups = _.groupBy(category, 'category')

    return {
      code: category[0].par_code,
      name: category[0].parliament,
      effectiveVotePct: category[0].effective_vote_pct,
      categoryArr: _.map(streamGroups, streamGroup => {
        return {
          category: streamGroup[0].category,
          categoryEffectiveVotesPct:
            streamGroup[0].category_effective_votes_pct,
          totalVote: streamGroup[0].total,
          wonParty: streamGroup[0].won_party,
          wonCoalition: streamGroup[0].won_coalition,
          result: streamGroup.map(streamGroup => ({
            party: streamGroup.party,
            vote: streamGroup.vote,
            votePct: streamGroup.vote_pct
          }))
        }
      })
    }
  })
}

mergeData('par_all')

// const getList = async () => {
//   try {
//     const res = await axios.get('https://pages.malaysiakini.com/map/par.json')
//     const map = await res.data

//     const list = map.features.map(feature => ({
//       displayedValue: `${feature.properties.code} ${feature.properties.name}`,
//       name: feature.properties.name,
//       code: feature.properties.code
//     }))

//     fs.writeFile('./output/list.json', JSON.stringify(list), err => {
//       if (err) throw err
//       console.log('done')
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }
// getGeoJSON()

// getList()
