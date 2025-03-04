---
id: api-integration
title: API Integration
---

# API Integration

This app fetches **live cryptocurrency prices** using the **CoinGecko API**.

## API Endpoints Used

| **API Endpoint**                                                                               | **Purpose**                                           |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| [`/search`](https://api.coingecko.com/api/v3/search?query=bitcoin)                             | Finds cryptocurrencies matching a **search query**    |
| [`/simple/price`](https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd) | Fetches **live prices** for selected cryptocurrencies |

---

## **Searching for Cryptocurrencies**

The app allows users to enter a **search query** (e.g., "bitcoin") and retrieve matching cryptocurrencies.

### ** API Request**

```ts
const SEARCH_URL = "https://api.coingecko.com/api/v3/search";

export const searchCrypto = async (query: string) => {
  const response = await axios.get(SEARCH_URL, { params: { query } });
  return response.data.coins.slice(0, 5); // Returns the top 5 results
};
```
