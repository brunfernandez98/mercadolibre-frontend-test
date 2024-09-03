const PRODUCT_CODES = {
  Panama: 'MPA',
  Cuba: 'MCU',
  Chile: 'MLC',
  Dominicana: 'MRD',
  Uruguay: 'MLU',
  Colombia: 'MCO',
  Ecuador: 'MEC',
  Brasil: 'MLB',
  Peru: 'MPE',
  Bolivia: 'MBO',
  Mexico: 'MLM',
  Honduras: 'MHN',
  Guatemala: 'MGT',
  Nicaragua: 'MNI',
  ElSalvador: 'MSV',
  Argentina: 'MLA',
  Paraguay: 'MPY',
  CostaRica: 'MCR',
  Venezuela: 'MLV'
}

export const validateProductId = (id: string) => {
  return Object.values(PRODUCT_CODES).some((code) => id.startsWith(code))
}
