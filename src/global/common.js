const UFIX64_PRECISION = 8;

// UFix64 values shall be always passed as strings
export const parseUFix64 = (value) => value.toFixed(UFIX64_PRECISION);

export const parseDate = (time = + new Date()) => {
  const date = new Date(time);
  return date.toString();
}
