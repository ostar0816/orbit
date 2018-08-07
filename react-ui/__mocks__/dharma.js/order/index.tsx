export const mockGetIssuanceHash = jest.fn(async (debtOrder) => {
	return 'issuancehash';
});

export const mockFillAsync = jest.fn(async (debtOrder, txData) => {
	if (debtOrder.debtor) {
		if (debtOrder.debtor === '0x00000') {
			return 'hasError';
		} else {
			return 'noError';
		}
	} else {
		throw new Error('No Debtor');
	}
});
