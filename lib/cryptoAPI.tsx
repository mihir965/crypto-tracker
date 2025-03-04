import axios from "axios";

const SEARCH_URL = "https://api.coingecko.com/api/v3/search"; // source https://docs.coingecko.com/v3.0.1/reference/search-data
const PRICE_URL = "https://api.coingecko.com/api/v3/simple/price"; // https://docs.coingecko.com/v3.0.1/reference/simple-price

export const searchCoins = async (query: string) => {
  if (!query) return [];
  try {
    const res = await axios.get(SEARCH_URL, {
      params: {
        query,
      },
    });
    return res.data.coins.slice(0, 5); //
  } catch (error) {
    console.error("Error searching for coins", error);
    throw error;
  }
};

export const getPrices = async (coinIds: string[]) => {
  if (coinIds.length === 0) return {};
  try {
    const res = await axios.get(PRICE_URL, {
      params: {
        ids: coinIds.join(","),
        vs_currencies: "usd",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching crypto prices", error);
    throw error;
  }
};
