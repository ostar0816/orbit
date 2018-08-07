import * as React from 'react';
import { shallow } from 'enzyme';
import { TradingPermissions } from '../../../../src/components/TradingPermissions/TradingPermissions';
import { Dharma } from '@dharmaprotocol/dharma.js';
import MockWeb3 from '../../../../__mocks__/web3';
import MockDharma from '../../../../__mocks__/dharma.js';
import { BigNumber } from 'bignumber.js';
const promisify = require('tiny-promisify');
import {
	TradingPermissionsWrapper,
	TradingPermissionsTitle,
	TokenSymbol,
	TokenBalance,
	FaucetButton,
	ShowMoreButton,
	Arrow
} from '../../../../src/components/TradingPermissions/styledComponents';
import { Collapse } from 'reactstrap';
import { Toggle } from '../../../../src/components/Toggle';

describe('TradingPermissions (Unit)', () => {
	let web3;
	let dharma;
	let props;

	beforeEach(() => {
		web3 = new MockWeb3();
		dharma = new MockDharma();
		props = {
			web3,
			dharma,
			tokens: [],
			handleSetAllTokensTradingPermission: jest.fn(),
			handleToggleTokenTradingPermission: jest.fn(),
			handleSetError: jest.fn(),
			handleFaucetRequest: jest.fn(),
			toggleTokenLoadingSpinner: jest.fn(),
			agreeToTerms: true
		};
	});

	describe('#render', () => {
		it('should render', () => {
			const tradingPermissions = shallow(<TradingPermissions {...props} />);
			expect(tradingPermissions.length).toEqual(1);
		});

		it('should not render <TradingPermissionsWrapper /> if there is no tokens', () => {
			props.tokens = null;
			const tradingPermissions = shallow(<TradingPermissions {...props} />);
			expect(tradingPermissions.find(TradingPermissionsWrapper).length).toEqual(0);
			tradingPermissions.setProps({ tokens: [] });
			expect(tradingPermissions.find(TradingPermissionsWrapper).length).toEqual(0);
		});

		describe('#only 1 token', () => {
			beforeEach(() => {
				props.tokens = [
					{
						address: 'address1',
						tokenSymbol: 'REP',
						name: 'REP',
						tradingPermitted: true,
						balance: new BigNumber(0),
						numDecimals: new BigNumber(18),
					}
				];
			});

			it('should render <TradingPermissionsWrapper />', () => {
				const tradingPermissions = shallow(<TradingPermissions {...props} />);
				expect(tradingPermissions.find(TradingPermissionsWrapper).length).toEqual(1);
			});
		});
	});

	describe('#getTokenAllowance', () => {
		test('returns token allowance with appropriate parameters', async () => {
			const tradingPermissions = shallow(<TradingPermissions {...props} />);
			const tokenAddress = '0x000000000';
			const ownerAddress = (await promisify(props.web3.eth.getAccounts)())[0];
			const receivedTokenAllowance = await tradingPermissions.instance().getTokenAllowance(tokenAddress);

			await expect(receivedTokenAllowance).toEqual(new BigNumber(await props.dharma.token.getProxyAllowanceAsync(tokenAddress, ownerAddress)));
		});

		it('returns -1 when there is no account', async () => {
			props.web3.eth.getAccounts = jest.fn((callback) => { callback(null, []) });
			const tradingPermissions = shallow(<TradingPermissions {...props} />);
			const tokenAddress = '0x000000000';
			const ownerAddress = (await promisify(props.web3.eth.getAccounts)())[0];
			const receivedTokenAllowance = await tradingPermissions.instance().getTokenAllowance(tokenAddress);
			await expect(receivedTokenAllowance).toEqual(new BigNumber(-1));
			props.web3.eth.getAccounts = jest.fn((callback) => { callback(null, ['account0']) });
		});
	});

	describe('#getTokenBalance', () => {
		it('calls dharma#getBalanceAsync', async () => {
			const tradingPermissions = shallow(<TradingPermissions {...props} />);
			const ownerAddress = (await promisify(props.web3.eth.getAccounts)())[0];
			const tokenAddress = '0x000000000';
			await tradingPermissions.instance().getTokenBalance(tokenAddress);
			await expect(dharma.token.getBalanceAsync).toHaveBeenCalledWith(tokenAddress, ownerAddress);
		});
	});

	describe('#getTokenData', () => {
		test('returns without setting state if dharma is not defined', async () => {
			const tradingPermissions = shallow(<TradingPermissions {...props} />);
			const spy = jest.spyOn(tradingPermissions.instance(), 'setState');

			tradingPermissions.instance().getTokenData(null);

			await expect(spy).not.toHaveBeenCalled();

			spy.mockReset();
			spy.mockRestore();
		});

		test('returns without setting state if handleSetAllTokensTradingPermission is not defined', async () => {
			props.handleSetAllTokensTradingPermission = null;
			const tradingPermissions = shallow(<TradingPermissions {...props} />);
			const spy = jest.spyOn(tradingPermissions.instance(), 'setState');

			tradingPermissions.instance().getTokenData(null);

			await expect(spy).not.toHaveBeenCalled();

			spy.mockReset();
			spy.mockRestore();
		});

		it('calls props.handleSetError when there is an error', async() => {
			const tradingPermissions = shallow(<TradingPermissions {...props} />);
			dharma.contracts.loadTokenRegistry = jest.fn(async () => throw new Error());
			await tradingPermissions.instance().getTokenData(props.dharma);
			await expect(props.handleSetError).toHaveBeenCalledWith('Unable to get token data');
		});
	});

	describe('#isAllowanceUnlimited', () => {
		test('returns false if allowance is limited', () => {
			const tradingPermissions = shallow(<TradingPermissions {...props} />);
			const allowance = new BigNumber(2);

			expect(tradingPermissions.instance().isAllowanceUnlimited(allowance)).toBeFalsy();
		});

		test('returns true if allowance is unlimited', () => {
			const tradingPermissions = shallow(<TradingPermissions {...props} />);
			const allowance = (new BigNumber(2)).pow(256).minus(new BigNumber(1))

			expect(tradingPermissions.instance().isAllowanceUnlimited(allowance)).toBeTruthy();
		});
	});

	describe('#updateProxyAllowance', () => {
		describe('trading is permitted', () => {
			beforeEach(() => {
				props.tokens = [
					{
						address: 'address1',
						tokenSymbol: 'REP',
						tradingPermitted: true,
						balance: new BigNumber(0),
						awaitingTransaction: false
					}
				];
				dharma.token.setProxyAllowanceAsync.mockReset();
			});

			it('calls Dharma#setProxyAllowanceAsync', async () => {
				const tradingPermissions = shallow(<TradingPermissions {...props} />);
				await tradingPermissions.instance().updateProxyAllowanceAsync(true, props.tokens[0].address);
				await expect(dharma.token.setProxyAllowanceAsync).toHaveBeenCalledWith(props.tokens[0].address, new BigNumber(0));
			});

			it('calls Dharma#awaitTransactionMinedAsync', async () => {
				const tradingPermissions = shallow(<TradingPermissions {...props} />);
				await tradingPermissions.instance().updateProxyAllowanceAsync(true, props.tokens[0].address);
				await expect(dharma.blockchain.awaitTransactionMinedAsync).toHaveBeenCalled();
			});

			it('calls getTokenAllowance', async () => {
				const tradingPermissions = shallow(<TradingPermissions {...props} />);
				const spy = jest.spyOn(tradingPermissions.instance(), 'getTokenAllowance');
				await tradingPermissions.instance().updateProxyAllowanceAsync(true, props.tokens[0].address);
				await expect(spy).toHaveBeenCalledWith(props.tokens[0].address);
			});

			it('calls isAllowanceUnlimited', async () => {
				const tradingPermissions = shallow(<TradingPermissions {...props} />);
				tradingPermissions.instance().getTokenAllowance = jest.fn((tokenAllowance => new BigNumber(0)));
				const spy = jest.spyOn(tradingPermissions.instance(), 'isAllowanceUnlimited');
				await tradingPermissions.instance().updateProxyAllowanceAsync(true, props.tokens[0].address);
				await expect(spy).toHaveBeenCalledWith(new BigNumber(0));
			});

			it('calls props.handleToggleTokenTradingPermission', async () => {
				const tradingPermissions = shallow(<TradingPermissions {...props} />);
				await tradingPermissions.instance().updateProxyAllowanceAsync(true, props.tokens[0].address);
				await expect(props.handleToggleTokenTradingPermission).toHaveBeenCalledWith(props.tokens[0].address, false);
			});

			it('calls props.handleSetError when there is an error', async() => {
				const tradingPermissions = shallow(<TradingPermissions {...props} />);
				dharma.token.setProxyAllowanceAsync = jest.fn(async (tokenAddress, value) => throw new Error());
				await tradingPermissions.instance().updateProxyAllowanceAsync(true, props.tokens[0].address);
				await expect(props.handleSetError).toHaveBeenCalled();
			});
		});

		describe('trading is not permitted', () => {
			beforeEach(() => {
				props.tokens = [
					{
						address: 'address1',
						tokenSymbol: 'REP',
						tradingPermitted: false,
						balance: new BigNumber(0),
						awaitingTransaction: false
					}
				];
				dharma.token.setProxyAllowanceAsync.mockReset();
			});

			it('calls Dharma#setUnlimitedProxyAllowanceAsync', async () => {
				const tradingPermissions = shallow(<TradingPermissions {...props} />);
				await tradingPermissions.instance().updateProxyAllowanceAsync(false, props.tokens[0].address);
				await expect(dharma.token.setUnlimitedProxyAllowanceAsync).toHaveBeenCalledWith(props.tokens[0].address);
			});

			it('calls Dharma#awaitTransactionMinedAsync', async () => {
				const tradingPermissions = shallow(<TradingPermissions {...props} />);
				await tradingPermissions.instance().updateProxyAllowanceAsync(false, props.tokens[0].address);
				await expect(dharma.blockchain.awaitTransactionMinedAsync).toHaveBeenCalled();
			});

			it('calls getTokenAllowance', async () => {
				const tradingPermissions = shallow(<TradingPermissions {...props} />);
				const spy = jest.spyOn(tradingPermissions.instance(), 'getTokenAllowance');
				await tradingPermissions.instance().updateProxyAllowanceAsync(false, props.tokens[0].address);
				await expect(spy).toHaveBeenCalledWith(props.tokens[0].address);
			});

			it('calls isAllowanceUnlimited', async () => {
				const tradingPermissions = shallow(<TradingPermissions {...props} />);
				tradingPermissions.instance().getTokenAllowance = jest.fn((tokenAllowance => new BigNumber(0)));
				const spy = jest.spyOn(tradingPermissions.instance(), 'isAllowanceUnlimited');
				await tradingPermissions.instance().updateProxyAllowanceAsync(false, props.tokens[0].address);
				await expect(spy).toHaveBeenCalledWith(new BigNumber(0));
			});

			it('calls props.handleToggleTokenTradingPermission', async () => {
				const tradingPermissions = shallow(<TradingPermissions {...props} />);
				await tradingPermissions.instance().updateProxyAllowanceAsync(false, props.tokens[0].address);
				await expect(props.handleToggleTokenTradingPermission).toHaveBeenCalledWith(props.tokens[0].address, true);
			});
		});

		describe('there is no matching token', () => {
			beforeEach(() => {
				props.tokens = [
					{
						address: 'address3',
						tokenSymbol: 'MKR',
						tradingPermitted: true,
						balance: new BigNumber(0)
					}
				];
				dharma.token.setProxyAllowanceAsync.mockReset();
				dharma.token.setUnlimitedProxyAllowanceAsync.mockReset();
				dharma.blockchain.awaitTransactionMinedAsync.mockReset()
			});

			it('should not call dharma functions', async () => {
				const tradingPermissions = shallow(<TradingPermissions {...props} />);
				await tradingPermissions.instance().updateProxyAllowanceAsync(true, 'BLAH');
				await expect(dharma.token.setProxyAllowanceAsync).not.toHaveBeenCalled();
				await expect(dharma.token.setUnlimitedProxyAllowanceAsync).not.toHaveBeenCalled();
				await expect(dharma.blockchain.awaitTransactionMinedAsync).not.toHaveBeenCalled();
			});
		});

		describe('there is no matching token', () => {
			beforeEach(() => {
				props.tokens = [
					{
						address: 'address3',
						tokenSymbol: 'MKR',
						tradingPermitted: true,
						balance: new BigNumber(0)
					}
				];
				dharma.token.setProxyAllowanceAsync.mockReset();
				dharma.token.setUnlimitedProxyAllowanceAsync.mockReset();
				dharma.blockchain.awaitTransactionMinedAsync.mockReset()
			});

			it('should not call dharma functions', async () => {
				const tradingPermissions = shallow(<TradingPermissions {...props} />);
				await tradingPermissions.instance().updateProxyAllowanceAsync(true, 'BLAH');
				await expect(dharma.token.setProxyAllowanceAsync).not.toHaveBeenCalled();
				await expect(dharma.token.setUnlimitedProxyAllowanceAsync).not.toHaveBeenCalled();
				await expect(dharma.blockchain.awaitTransactionMinedAsync).not.toHaveBeenCalled();
			});
		});
	});
});
