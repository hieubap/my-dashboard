export const drawAddress = (address, length = 6) => {
  if (address.length < length) return address;
  return address.slice(0, length + 2) + "..." + address.slice(-length);
};

export const formatPrice = (str) => {
  try {
    return parseInt(str)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
      .replace(".00", "")
      .replace(/,/g, ",");
  } catch (error) {}
  return str;
};
