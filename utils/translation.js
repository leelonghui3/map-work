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

exports.translateParty = translateParty
exports.translateCoallition = translateCoallition
