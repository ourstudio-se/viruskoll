export const numberSeparator = (value: number, n = 0, x = 3, s = ' ', c = '.') => {
  if (value === null || value === undefined) {
    return null;
  }

  const re = `\\d(?=(\\d{${x || 3}})+${n > 0 ? '\\D' : '$'})`;
  const num = value.toFixed(Math.max(0, ~~n));

  return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), `$&${s || ','}`);
};
