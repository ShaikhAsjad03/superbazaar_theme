const cleanFilters = (filters) => {
  const cleaned = {};
  if (filters.attributes) {
    Object.keys(filters.attributes).forEach((key) => {
      if (filters.attributes[key] && filters.attributes[key].length > 0) {
        cleaned[key] = filters.attributes[key]
          .map((item) => item.value)
          .join(",");
      }
    });
  }

  if (
    filters.price &&
    filters.price.length === 2 &&
    filters.price[0] !== null &&
    filters.price[1] !== null
  ) {
    cleaned.minPrice = filters.price[0];
    cleaned.maxPrice = filters.price[1];
  }

  return cleaned;
};

export default cleanFilters;
