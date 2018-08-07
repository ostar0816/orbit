export const mockGetAccounts = jest.fn((callback) => {
	callback(null, ['account0']);
});

export const mockGetBlock = jest.fn();
