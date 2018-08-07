import { BigNumber } from 'bignumber.js';

export const mockFromDebtOrder = jest.fn(async (debtOrder) => {
	return {
		termLength: new BigNumber(10),
		amortizationUnit: 'days',
		interestRate: new BigNumber(3)
	};
});

export const mockGetRepaymentSchedule = jest.fn(async (debtRegistry) => {
	return [1553557371, 1585093371, 1616629371, 1648165371, 1679701371, 1711237371];
});

export const mockToDebtOrder = jest.fn(async (simpleInterestLoan) => {
	return {};
});
