const mockShorten = jest.fn((value) => {
	const response = {
		status_code: 200,
		data: {
			url: 'someurl'
		}
	}
	return response;
});

const mockBitlyClient = jest.fn().mockImplementation((accessToken) => {
	return {
		shorten: mockShorten
  };
});

export default mockBitlyClient;
