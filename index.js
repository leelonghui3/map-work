const axios = require('axios')
const result = require('./data/scoresheet.json')
const fs = require('fs')
const _ = require('lodash')
const { translateParty } = require('./utils/translation')
const ge14Race = require('./data/par-ge14-race.json')

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

const parseCategoryDataForPar = (constituency, category) => {
  if (category === 'youngest' || category === 'oldest') {
    if (_.includes(exemptedConstituency, constituency[0].par_code)) {
      return null
    }
  }

  const constituencyFilteredByCategory = _.filter(constituency, [
    'category',
    category
  ])

  // get majority //
  const constituencySortedByVote = constituencyFilteredByCategory.sort(
    (a, b) => b.vote - a.vote
  )

  const majority =
    constituencySortedByVote[0].vote - constituencySortedByVote[1].vote
  // -------------------------------- //

  const { won_party, won_coalition } = _.find(constituencySortedByVote, [
    'category',
    category
  ])

  if (category === 'par_total') {
    return {
      ge14WonParty: won_party,
      ge14WonCoalition: won_coalition,
      ge14Majority: majority,
      ge14Result: {
        totalVote: constituencySortedByVote[0].total,
        categoryEffectiveVotePct:
          constituencySortedByVote[0].category_effective_votes_pct,
        result: _.map(constituencySortedByVote, constituency => ({
          coalition: constituency.coalition,
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
      totalVote: constituencySortedByVote[0].total,
      categoryEffectiveVotePct:
        constituencySortedByVote[0].category_effective_votes_pct,
      result: _.map(constituencySortedByVote, constituency => ({
        coalition: constituency.coalition,
        party: constituency.party,
        vote: constituency.vote,
        votePct: constituency.vote_pct
      }))
    }
  }
}

const parseCategoryDataForPD = (pd, category) => {
  if (category === 'youngest' || category === 'oldest') {
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
        totalVote: pdSortedByVote[0].total,
        categoryPct: pdSortedByVote[0].category_pct,
        totalValidVote: pdSortedByVote[0].total_valid_votes,
        stream: pdSortedByVote[0].stream,
        result: _.map(pdSortedByVote, constituency => ({
          coalition: constituency.coalition,
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
      totalVote: pdSortedByVote[0].total,
      categoryPct: pdSortedByVote[0].category_pct,
      totalValidVote: pdSortedByVote[0].total_valid_votes,
      stream: pdSortedByVote[0].stream,
      result: _.map(pdSortedByVote, constituency => ({
        coalition: constituency.coalition,
        party: constituency.party,
        vote: constituency.vote,
        votePct: constituency.vote_pct
      }))
    }
  }
}

const mergeData = async category => {
  try {
    const res = await axios.get(
      'https://pages.malaysiakini.com/map/ge14-parliament-p.json'
    )
    const map = await res.data

    const parData = result.filter(d => d.stream === category)

    // filter by state
    const filteredData = _.filter(parData, { stream: 'par_all' })

    const parGroups = _.groupBy(filteredData, 'pd_code')

    const parsedConstituencies = _.map(parGroups, constituency => ({
      code: constituency[0].par_code,
      effectiveVotePct: constituency[0].effective_vote_pct,
      effectiveVote: constituency[0].effective_vote,
      totalValidVote: constituency[0].total_valid_votes,
      ...parseCategoryDataForPar(constituency, 'par_total'),
      ...parseCategoryDataForPar(constituency, 'youngest'),
      ...parseCategoryDataForPar(constituency, 'oldest')
    }))

    const output = []

    _.forEach(parsedConstituencies, d => {
      _.forEach(ge14Race, j => {
        if (j.parCode === d.code) {
          const mergedData = {
            ...d,
            malay: j.malay,
            chinese: j.chinese,
            indian: j.indian,
            muslimBumiputera: j.muslimBumiputera,
            'non-MuslimBumiputera': j['non-MuslimBumiputera'],
            sabahBumiputera: j.sabahBumiputera,
            others: j.others
          }

          output.push(mergedData)
        }
      })
    })

    map.features.forEach(feature => {
      output.forEach(constituency => {
        if (constituency.code === feature.properties.code) {
          feature.properties = {
            ...feature.properties,
            // pName: feature.properties.name.toUpperCase(),
            // pCode: feature.properties.code,
            // state: feature.properties.state.toUpperCase(),
            ...constituency
          }
        }
      })
    })

    // fs.writeFile('./output/parliament.json', JSON.stringify(map), err => {
    //   if (err) throw err
    //   console.log('done')
    // })
  } catch (error) {
    console.log(error)
  }
}

// mergeData('par_all')

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
        pName: pd[0].parliament.toUpperCase(),
        code: pd[0].pd_code,
        state: pd[0].state.toUpperCase(),
        ...parseCategoryDataForPD(pd, 'dm_total'),
        ...parseCategoryDataForPD(pd, 'youngest'),
        ...parseCategoryDataForPD(pd, 'oldest')
      }
    })

    // console.log(parsedPDs[0]);

    map.features.forEach(feature => {
      parsedPDs.forEach(pd => {
        if (pd.code === feature.properties.code) {
          feature.properties = {
            name: feature.properties.name,
            ...pd
          }
        }
      })
    })

    console.log(map.features.length)

    // fs.writeFile('./output/polling-district.json', JSON.stringify(map), err => {
    //   if (err) throw err
    //   console.log('done')
    // })
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
//       categoryArr: _.map(streamGroups, streamGroup => {
//         return {
//           category:
//             streamGroup[0].category === 'eldest'
//               ? 'oldest'
//               : streamGroup[0].category,
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

//   const test = []

//   _.forEach(output, d => {
//     _.forEach(ge14Race, j => {
//       if (j.parCode === d.code) {
//         const output = {
//           ...d,
//           malay: j.malay,
//           chinese: j.chinese,
//           indian: j.indian,
//           muslimBumiputera: j.muslimBumiputera,
//           'non-MuslimBumiputera': j['non-MuslimBumiputera'],
//           sabahBumiputera: j.sabahBumiputera,
//           others: j.others
//         }

//         test.push(output)
//       }
//     })
//   })

//   fs.writeFile('./output/abc.json', JSON.stringify(test), err => {
//     if (err) throw err
//     console.log('done')
//   })
// }

const getList = () => {
  const list = ge14Race.map(c => ({
    name: c.name,
    zhName: c.zhName,
    value: c.parCode,
    state: c.state
  }))

  fs.writeFile('./output/list.json', JSON.stringify(list), err => {
    if (err) throw err
    console.log('done')
  })

  // try {
  //   const res = await axios.get('https://pages.malaysiakini.com/map/par.json')
  //   const map = await res.data

  //   const list = map.features.map(feature => ({
  //     name: feature.properties.name,
  //     value: feature.properties.code
  //   }))

  //   fs.writeFile('./output/list.json', JSON.stringify(list), err => {
  //     if (err) throw err
  //     console.log('done')
  //   })
  // } catch (error) {
  //   console.log(error)
  // }
}

// getList()
