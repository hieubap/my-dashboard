export const drawAddress = (address, length = 6) => {
  if (address.length < length) return address;
  return address.slice(0, length + 2) + "..." + address.slice(-length);
};
