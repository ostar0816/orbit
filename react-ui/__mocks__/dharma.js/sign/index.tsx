export const mockAsDebtor = jest.fn(async (debtOrder) => {
	return {
		v: 1,
		r: 'sometext',
		s: 'sometext'
	};
});
