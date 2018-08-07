import { BigNumber } from 'bignumber.js';

export const mockGetValueRepaid = jest.fn(async (issuanceHash) => {
	switch (issuanceHash) {
		case 'active':
			return 1;
		case 'inactive':
		default:
			return 999999;
	}
});

export const mockGetDebtRegistryEntry = jest.fn(async (issuanceHash) => {
	return {};
});

export const mockGetExpectedValueRepaid = jest.fn(async (issuanceHash, paymentTime) {
	switch (issuanceHash) {
		case 'paid':
			return 0;
		case 'delinquent':
		default:
			return 999999999999;
	}
});

export const mockGetTotalExpectedRepayment = jest.fn(async (issuanceHash) {
    switch (issuanceHash) {
        case 'paid':
            return 0;
        case 'delinquent':
        default:
            return 999999999999;
    }
});
