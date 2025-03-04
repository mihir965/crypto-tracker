import { useQuery } from "@tanstack/react-query";
import { getPrices, searchCoins } from "../lib/cryptoAPI";
import { useEffect, useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [coinIds, setCoinIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  //Searches for coins based on user input
  const { data: searchResults, refetch: searchCrypto } = useQuery({
    queryKey: ["search", search],
    queryFn: () => searchCoins(search),
    enabled: false,
  });

  //Fetches live prices of the resulting top 5 results
  const {
    data: prices,
    isLoading,
    error,
    refetch: refreshPrices,
  } = useQuery({
    queryKey: ["prices", coinIds],
    queryFn: () => getPrices(coinIds),
    enabled: coinIds.length > 0,
    refetchInterval: 10000,
  });

  useEffect(() => {
    if (searchResults) {
      setCoinIds(searchResults.map((coin: any) => coin.id));
    }
  }, [searchResults]);

  const handleSearch = async () => {
    setLoading(true);
    setShowResults(false);
    await searchCrypto();
    //I am artificially delaying the response to show the loading state
    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
    }, 1500);
  };

  const filteredResults = showResults //Only if the initial query is completed and the results are shown
    ? searchResults?.filter((coin: any) =>
        coin.name.toLowerCase().includes(filterQuery.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0f0d] text-[#00ff7f] p-6">
      {/* Header Panel */}
      <div className="w-full max-w-3xl bg-[#1a1a1a] text-[#00ff7f] text-center py-4 rounded-lg shadow-lg border border-[#00ff7f]">
        <h1 className="text-4xl font-bold">Live Crypto Price Tracker</h1>
      </div>

      {/* Search Panel */}
      <div className="w-full max-w-lg bg-[#121212] p-6 mt-6 rounded-lg shadow-md flex flex-col items-center border border-[#00ff7f]">
        <input
          type="text"
          placeholder="Search cryptocurrency..."
          className="p-3 w-full text-[#00ff7f] bg-[#1a1a1a] border border-[#00ff7f] rounded-lg text-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="mt-4 px-6 py-3 bg-[#0099ff] text-white rounded-lg w-full font-bold shadow-md hover:bg-[#00ccff] transition-transform transform hover:scale-105"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Results Panel */}
      <div className="w-full max-w-lg bg-[#121212] p-6 mt-6 rounded-lg shadow-lg text-center border border-[#00ff7f]">
        {loading ? (
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#00ff7f] border-t-transparent mx-auto"></div>
        ) : showResults && searchResults?.length > 0 ? (
          <>
            {/* Secondary Filter Search Bar (Filter Existing Results) */}
            <input
              type="text"
              placeholder="Filter results..."
              className="p-3 mb-4 w-full text-[#00ff7f] bg-[#1a1a1a] border border-[#00ff7f] rounded-lg text-lg"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
            />

            <ul className="space-y-3">
              {filteredResults.map((coin: any) => (
                <li
                  key={coin.id}
                  className="text-lg font-semibold bg-[#1a1a1a] p-4 rounded-lg shadow-sm border border-[#00ff7f]"
                >
                  {coin.name} ({coin.symbol.toUpperCase()}):
                  <span className="text-[#66ffcc] ml-2">
                    $
                    {prices && prices[coin.id]
                      ? prices[coin.id].usd.toFixed(2)
                      : "Loading..."}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-[#66ffcc]">
            Enter a search term to find cryptocurrencies.
          </p>
        )}
      </div>

      {/* Refresh Button */}
      {showResults && (
        <button
          className="mt-4 px-6 py-3 bg-[#0099ff] text-white rounded-lg shadow-md font-bold hover:bg-[#00ccff] transition-transform transform hover:scale-105"
          onClick={(e) => {
            e.preventDefault(); // Prevents any default behavior
            refreshPrices();
          }}
        >
          Refresh Prices
        </button>
      )}
    </div>
  );
}
