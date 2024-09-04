import { config } from "@endpoints/config";

export const coreFetch = async (
  url: string,
  options: RequestInit = {},
): Promise<Response> => {
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": config.api_key,
      ...(options.headers || {}),
    },
  });
};
