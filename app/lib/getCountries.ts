const getCountries = async () => {
  const url = `https://country-state-city-search-rest-api.p.rapidapi.com/allcountries`;
  const res = await fetch(url, {
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
      "X-RapidAPI-Host": "country-state-city-search-rest-api.p.rapidapi.com",
    },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data;
};

export default getCountries;
