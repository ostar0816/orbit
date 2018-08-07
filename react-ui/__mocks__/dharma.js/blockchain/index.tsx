export const mockAwaitTransactionMinedAsync = jest.fn( async(txHash, pollingTime, timeout) => {
	const receipt = {
		logs: []
	};
	return receipt;
});

export const mockGetErrorLogs = jest.fn( async(txHash) => {
	return [];
});

