const axios = require('axios')
const result = require('./data/scoresheet2.json')
const fs = require('fs')
const _ = require('lodash')
const { translateParty } = require('./utils/translation')

// const outcome = {
//   state: 'state',
//   code: 'P098',
//   name: 'GOMBAK',
//   effectiveVotePct: 95.19,
//   youngestWonParty: 'youngParty',
//   youngestWonCoalition: 'youngCoalition',
//   youngestMajority: 1234,
//   eldestWonParty: 'oldParty',
//   eldestWonCoalition: 'oldCoalition',
//   eldestMajority: 1234,
//   ge14WonParty: 'ge14Party',
//   ge14WonCoalition: 'ge14Coalition',
//   ge14Majority: 1234,
//   eldestResult: {
//     categoryEffectiveVotesPct: 19.35,
//     totalVote: 6325,
//     result: [
//       { party: 'bersatu', vote: 1656, votePct: 26.18 },
//       { party: 'umno', vote: 3360, votePct: 53.12 },
//       { party: 'pas', vote: 1309, votePct: 20.7 }
//     ]
//   },
//   youngestResult: {
//     categoryEffectiveVotesPct: 19.35,
//     totalVote: 6325,
//     result: [
//       { party: 'bersatu', vote: 1656, votePct: 26.18 },
//       { party: 'umno', vote: 3360, votePct: 53.12 },
//       { party: 'pas', vote: 1309, votePct: 20.7 }
//     ]
//   },
//   ge14Result: {
//     categoryEffectiveVotesPct: 19.35,
//     totalVote: 6325,
//     result: [
//       { party: 'bersatu', vote: 1656, votePct: 26.18 },
//       { party: 'umno', vote: 3360, votePct: 53.12 },
//       { party: 'pas', vote: 1309, votePct: 20.7 }
//     ]
//   }
// }

const exemptedConstituency = ['P202', 'P209', 'P210', 'P220']

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

    // fs.writeFile('./output/output.json', JSON.stringify(map), err => {
    //   if (err) throw err
    //   console.log('done')
    // })
  } catch (error) {
    console.log(error)
  }
}

// const parseCategoryDataForMap = (constituency, category) => {
//   if (category === 'youngest' || category === 'eldest') {
//     if (_.includes(exemptedConstituency, constituency[0].par_code)) {
//       return null
//     }
//   }

//   const constituencyFilteredByCategory = _.filter(constituency, [
//     'category',
//     category
//   ])

//   // get majority //
//   const constituencySortedByVote = constituencyFilteredByCategory.sort(
//     (a, b) => b.vote - a.vote
//   )

//   const majority =
//     constituencySortedByVote[0].vote - constituencySortedByVote[1].vote
//   // -------------------------------- //

//   const { won_party, won_coalition } = _.find(constituencySortedByVote, [
//     'category',
//     category
//   ])

//   if (category === 'par_total') {
//     return {
//       ge14WonParty: won_party,
//       ge14WonCoalition: won_coalition,
//       ge14Majority: majority,
//       ge14Result: {
//         totalVotes: constituencySortedByVote[0].total,
//         categoryEffectiveVotesPct:
//           constituencySortedByVote[0].category_effective_votes_pct,
//         result: _.map(constituencySortedByVote, constituency => ({
//           party: constituency.party,
//           vote: constituency.vote,
//           votePct: constituency.vote_pct
//         }))
//       }
//     }
//   }

//   return {
//     [`${category}WonParty`]: won_party,
//     [`${category}WonCoalition`]: won_coalition,
//     [`${category}Majority`]: majority,
//     [`${category}Result`]: {
//       totalVotes: constituencySortedByVote[0].total,
//       categoryEffectiveVotesPct:
//         constituencySortedByVote[0].category_effective_votes_pct,
//       result: _.map(constituencySortedByVote, constituency => ({
//         party: constituency.party,
//         vote: constituency.vote,
//         votePct: constituency.vote_pct
//       }))
//     }
//   }
// }

const parseCategoryDataForMap = (pd, category) => {
  if (category === 'youngest' || category === 'eldest') {
    // if (_.includes(exemptedConstituency, constituency[0].par_code)) {
    //   return null
    // }
    // const pdArr = []
    // _.forEach(pd, p => pdArr.push(p))

    const check = []

    _.each(pd, p => {
      if (p.category === category) {
        check.push('yes')
      } else {
        check.push('no')
      }
    })

    if (check.indexOf('yes') === -1) {
      return null
    }
  }

  const pdFilteredByCategory = _.filter(pd, ['category', category])

  // console.log(pdFilteredByCategory[0])

  // get majority //
  const pdSortedByVote = pdFilteredByCategory.sort((a, b) => b.vote - a.vote)

  const majority = pdSortedByVote[0].vote - pdSortedByVote[1].vote
  // // -------------------------------- //

  const { won_party, won_coalition } = _.find(pdSortedByVote, [
    'category',
    category
  ])

  if (category === 'par_total' || category === 'dm_total') {
    return {
      ge14WonParty: won_party,
      ge14WonCoalition: won_coalition,
      ge14Majority: majority,
      ge14Result: {
        totalVotes: pdSortedByVote[0].total,
        categoryPct: pdSortedByVote[0].category_pct,
        result: _.map(pdSortedByVote, constituency => ({
          party: constituency.party,
          vote: constituency.vote,
          votePct: constituency.vote_pct
        }))
      }
    }
  }

  return {
    [`${category}WonParty`]: won_party,
    [`${category}WonCoalition`]: won_coalition,
    [`${category}Majority`]: majority,
    [`${category}Result`]: {
      totalVotes: pdSortedByVote[0].total,
      categoryPct: pdSortedByVote[0].category_pct,
      result: _.map(pdSortedByVote, constituency => ({
        party: constituency.party,
        vote: constituency.vote,
        votePct: constituency.vote_pct
      }))
    }
  }
}

// const mergeData = async category => {
//   try {
//     const res = await axios.get(
//       'https://pages.malaysiakini.com/map/ge14-parliament-p.json'
//     )
//     const map = await res.data

//     const parData = result.filter(d => d.stream === category)

//     // filter by state
//     const filteredData = _.filter(parData, { stream: 'par_all' })

//     const parGroups = _.groupBy(filteredData, 'pd_code')

//     const parsedConsituencies = _.map(parGroups, constituency => ({
//       code: constituency[0].par_code,
//       name: constituency[0].parliament,
//       effectiveVotePct: constituency[0].effective_vote_pct,
//       ...parseCategoryDataForMap(constituency, 'par_total'),
//       ...parseCategoryDataForMap(constituency, 'youngest'),
//       ...parseCategoryDataForMap(constituency, 'eldest')
//     }))

//     map.features.forEach(feature => {
//       parsedConsituencies.forEach(constituency => {
//         if (constituency.code === feature.properties.code) {
//           feature.properties = {
//             ...feature.properties,
//             ...constituency
//           }
//         }
//       })
//     })

//     // fs.writeFile('./output/parliament.json', JSON.stringify(map), err => {
//     //   if (err) throw err
//     //   console.log('done')
//     // })
//   } catch (error) {
//     console.log(error)
//   }
// }

const mergePDData = async () => {
  try {
    const res = await axios.get(
      'https://pages.malaysiakini.com/map/ge14-polling-district-p.json'
    )
    const map = await res.data

    const filteredData = _.filter(result, p => p.stream !== 'par_all')

    const pdGroups = _.groupBy(filteredData, 'pd_code')

    const parsedPDs = _.map(pdGroups, pd => {
      return {
        pCode: pd[0].par_code,
        name: pd[0].parliament.toUpperCase(),
        pdCode: pd[0].pd_code,
        state: pd[0].state.toUpperCase(),
        ...parseCategoryDataForMap(pd, 'dm_total'),
        ...parseCategoryDataForMap(pd, 'youngest'),
        ...parseCategoryDataForMap(pd, 'eldest')
      }
    })

    map.features.forEach(feature => {
      parsedPDs.forEach(pd => {
        if (pd.pdCode === feature.properties.code) {
          feature.properties = {
            ...feature.properties,
            ...pd
          }
        }
      })
    })

    fs.writeFile('./output/polling-district.json', JSON.stringify(map), err => {
      if (err) throw err
      console.log('done')
    })
  } catch (error) {
    console.log(error)
  }
}

mergePDData()

// const mergeData = category => {
//   const parData = result.filter(d => d.stream === category)

//   const parGroups = _.groupBy(parData, 'pd_code')

//   const output = _.map(parGroups, category => {
//     const streamGroups = _.groupBy(category, 'category')

//     return {
//       code: category[0].par_code,
//       name: category[0].parliament,
//       effectiveVotePct: category[0].effective_vote_pct,
//       // wonCoalition:
//       categoryArr: _.map(streamGroups, streamGroup => {
//         return {
//           category: streamGroup[0].category,
//           categoryEffectiveVotesPct:
//             streamGroup[0].category_effective_votes_pct,
//           totalVote: streamGroup[0].total,
//           wonParty: streamGroup[0].won_party,
//           wonCoalition: streamGroup[0].won_coalition,
//           result: streamGroup.map(streamGroup => ({
//             party: streamGroup.party,
//             vote: streamGroup.vote,
//             votePct: streamGroup.vote_pct
//           }))
//         }
//       })
//     }
//   })

//   console.log(output[0]['categoryArr'][0]['result'])
// }

// mergeData('par_all')

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

// getList()
