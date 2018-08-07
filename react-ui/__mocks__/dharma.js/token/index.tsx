import { BigNumber } from "bignumber.js";

const hashedString = (s: string) => {
  var hash = 0,
    i,
    chr;
  if (s.length === 0) return hash;
  for (i = 0; i < s.length; i++) {
    chr = s.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

export const mockGetProxyAllowanceAsync = jest.fn(async (tokenAddress, ownerAddress) => {
  return new Number(hashedString(`{${tokenAddress}-${ownerAddress}`));
});
export const mockSetProxyAllowanceAsync = jest.fn();
export const mockSetUnlimitedProxyAllowanceAsync = jest.fn();
export const mockGetBalanceAsync = jest.fn();
export const mockGetNumDecimals = jest.fn(() => {
  return new BigNumber(18);
});
