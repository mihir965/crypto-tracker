---
## **`state-management.md`**
---

id: state-management
title: State Management

---

# ⚡ State Management with React Query

The **Crypto Price Tracker** uses **React Query** for:

- **Efficient API requests**
- **Data caching**
- **Auto-refreshing every 10 seconds**

---

## **How React Query Works**

React Query **fetches, caches, and updates** API data automatically.

### **Fetching Prices (Auto-Refreshing)**

```ts
const { data: prices, refetch: refreshPrices } = useQuery({
  queryKey: ["cryptoPrices", coinIds],
  queryFn: () => fetchCryptoPrices(coinIds),
  enabled: coinIds.length > 0,
  refetchInterval: 10000, // Auto-refresh every 10s
});
```
