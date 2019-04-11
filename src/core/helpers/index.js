
export const sortByPrice = (list, sign) => list.sort((a, b) => sign * (a.price - b.price));
