import React from "react";

import { SITE_ID_TO_LOCALE } from "./productCodes";

export const formatCategories = (categories: string): string[] => {
  return categories.split("|");
};

export const formatPrice = (
  price: number,
  currency: string,
  site_id: string,
) => {
  const locale = SITE_ID_TO_LOCALE[site_id] ?? "es-AR";
  return Math.round(price).toLocaleString(locale, {
    style: "currency",
    currency: currency,
  });
};

export const formatText = (text: string) => {
  const formattedText = text.split("\n").map((line) => (
    <React.Fragment key={line}>
      {line}
      <br />
    </React.Fragment>
  ));

  return formattedText;
};
