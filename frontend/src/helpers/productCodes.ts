const PRODUCT_CODES = {
  Panama: "MPA",
  Cuba: "MCU",
  Chile: "MLC",
  Dominicana: "MRD",
  Uruguay: "MLU",
  Colombia: "MCO",
  Ecuador: "MEC",
  Brasil: "MLB",
  Peru: "MPE",
  Bolivia: "MBO",
  Mexico: "MLM",
  Honduras: "MHN",
  Guatemala: "MGT",
  Nicaragua: "MNI",
  ElSalvador: "MSV",
  Argentina: "MLA",
  Paraguay: "MPY",
  CostaRica: "MCR",
  Venezuela: "MLV",
};

export const SITE_ID_TO_LOCALE: Record<string, string> = {
  MPA: "es-PA",
  MCU: "es-CU",
  MLC: "es-CL",
  MRD: "es-DO",
  MLU: "es-UY",
  MCO: "es-CO",
  MEC: "es-EC",
  MLB: "pt-BR",
  MPE: "es-PE",
  MBO: "es-BO",
  MLM: "es-MX",
  MHN: "es-HN",
  MGT: "es-GT",
  MNI: "es-NI",
  MSV: "es-SV",
  MLA: "es-AR",
  MPY: "es-PY",
  MCR: "es-CR",
  MLV: "es-VE",
};

export const validateProductId = (id: string) => {
  return Object.values(PRODUCT_CODES).some((code) => id.startsWith(code));
};
