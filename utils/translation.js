// 'amanah',         'anak negeri', 'berjasa',
// 'bersatu',        'dap',         'gerakan',
// 'harapan rakyat', 'ikatan',      'ind',
// 'ind(pkr)',       'ind2',        'ldp',
// 'mca',            'mic',         'mu',
// 'myppp',          'pap',         'pas',
// 'pbb',            'pbdsb',       'pbk',
// 'pbrs',           'pbs',         'pcm',
// 'pcs',            'pdp',         'peace',
// 'perpaduan',      'pfp',         'pkr',
// 'pprs',           'prm',         'prs',
// 'psm',            'sapp',        'star',
// 'supp',           'umno',        'upko',
// 'warisan'

const translateParty = (party, lang) => {
  if (lang === 'en') {
    switch (party) {
      case 'amanah':
        return 'Amanah'
      case 'anak negeri':
        return 'Parti Anak Negeri'
      case 'berjasa':
        return 'Berjasa'
      case 'bersatu':
        return 'Bersatu'
      case 'dap':
        return 'DAP'
      case 'gerakan':
        return 'Gerakan'
      case 'harapan rakyat':
        return 'Parti Harapan Rakyat Sabah'
      case 'ikatan':
        return 'Ikatan'
      case 'ind':
      case 'ind2':
        return 'Independent'
      case 'ind(pkr)':
        return 'Independent (PKR)'
      case 'ldp':
        return 'LDP'
      case 'mca':
        return 'MCA'
      case 'mic':
        return 'MIC'
      case 'mu':
        return 'Parti Rakyat Malaysia Bersatu'
      case 'myppp':
        return 'MyPPP'
      case 'pap':
        return 'Parti Alternatif Rakyat'
      case 'pas':
        return 'PAS'
      case 'pbb':
        return 'PBB'
      case 'pbdsb':
        return 'Parti Bansa Dayak Sarawak Baru'
      case 'pbk':
        return 'Parti Bumi Kenyalang'
      case 'pbrs':
        return 'PBRS'
      case 'pbs':
        return 'PBS'
      case 'pcm':
        return 'Parti Cinta Malaysia'
      case 'pcs':
        return 'Parti Cinta Sabah'
      case 'pdp':
        return 'PDP'
      case 'peace':
        return 'Sarawak Peace Party'
      case 'perpaduan':
        return 'Perpaduan Anak Negeri Sabah'
      case 'pfp':
        return 'Penang Front Party'
      case 'pkr':
        return 'PKR'
      case 'pprs':
        return 'PPRS'
      case 'prm':
        return 'PRM'
      case 'prs':
        return 'PRS'
      case 'psm':
        return 'PSM'
      case 'sapp':
        return 'SAPP'
      case 'star':
        return 'Star'
      case 'supp':
        return 'SUPP'
      case 'umno':
        return 'Umno'
      case 'upko':
        return 'Upko'
      case 'warisan':
        return 'Warisan'
      default:
        return party.toUpperCase()
    }
  }
}

// 'bn', 'gagasan', 'gbs', null, 'ph', 'ph_ally'

const translateCoallition = (coallition, lang) => {
  if (lang === 'en') {
    switch (party) {
      case 'bn':
        return 'BN'
      case 'gagasan':
        return 'Gagasan Sejahtera'
      case 'gbs':
        return 'Gabungan Bersatu Sabah'
      case 'ph':
        return 'Pakatan Harapan'
      case 'ph_ally':
        return 'Warisan'
      default:
        return coallition
    }
  }
}

const translateState = (lang, state) => {
  if (lang === 'zh') {
    if (state.toLowerCase() === 'johor') {
      return '柔佛'
    }
    if (state.toLowerCase() === 'kuala lumpur') {
      return '吉隆坡'
    }
    if (
      state.toLowerCase() === 'federal territory' ||
      state.toLowerCase() === 'federal territories'
    ) {
      return '联邦直辖区'
    }
    if (state.toLowerCase() === 'kedah') {
      return '吉打'
    }
    if (state.toLowerCase() === 'kelantan') {
      return '吉兰丹'
    }
    if (state.toLowerCase() === 'labuan') {
      return '纳闽'
    }
    if (state.toLowerCase() === 'melaka' || state.toLowerCase() === 'malacca') {
      return '马六甲'
    }
    if (
      state.toLowerCase() === 'n sembilan' ||
      state.toLowerCase() === 'negeri sembilan'
    ) {
      return '森美兰'
    }
    if (state.toLowerCase() === 'pahang') {
      return '彭亨'
    }
    if (state.toLowerCase() === 'perak') {
      return '霹雳'
    }
    if (state.toLowerCase() === 'perlis') {
      return '玻璃市'
    }
    if (
      state.toLowerCase() === 'penang' ||
      state.toLowerCase() === 'p pinang'
    ) {
      return '槟城'
    }
    if (state.toLowerCase() === 'putrajaya') {
      return '布城'
    }
    if (state.toLowerCase() === 'sabah') {
      return '沙巴'
    }
    if (state.toLowerCase() === 'sarawak') {
      return '砂拉越'
    }
    if (state.toLowerCase() === 'selangor') {
      return '雪兰莪'
    }
    if (state.toLowerCase() === 'terengganu') {
      return '登嘉楼'
    }
  }

  if (lang === 'ms') {
    if (
      state.toLowerCase() === 'penang' ||
      state.toLowerCase() === 'p pinang'
    ) {
      return 'Pulau Pinang'
    }
    if (
      state.toLowerCase() === 'federal territory' ||
      state === 'federal territories'
    ) {
      return 'Wilayah Persekutuan'
    }
    if (state.toLowerCase() === 'malacca') {
      return 'Melaka'
    }
  }

  if (lang === 'en') {
    if (
      state.toLowerCase() === 'federal territory' ||
      state === 'federal territories'
    ) {
      return 'FT'
    }

    if (state.toLowerCase() === 'melaka') {
      return 'Malacca'
    }
  }

  return state
}

exports.translateParty = translateParty
exports.translateCoallition = translateCoallition
exports.translateState = translateState
