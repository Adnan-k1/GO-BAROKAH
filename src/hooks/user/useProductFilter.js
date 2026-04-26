export const useProductFilter = (products, search, category) => {
  return products.filter((p) => {
    const matchCat = category === "Semua" || p.category === category;
    const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });
};