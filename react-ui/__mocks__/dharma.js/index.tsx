import mockTokenRegistry from "./contracts/tokenRegistry";
import { mockGetTermsContractType } from "./contracts";
import {
    mockGetProxyAllowanceAsync,
    mockSetProxyAllowanceAsync,
    mockSetUnlimitedProxyAllowanceAsync,
    mockGetBalanceAsync,
    mockGetNumDecimals,
} from "./token";
import {
    mockFromDebtOrder,
    mockGetRepaymentSchedule,
    mockToDebtOrder,
} from "./adapters/simpleInterestLoan";
import { mockGetAdapterByTermsContractAddress } from "./adapters";
import {
    mockGetValueRepaid,
    mockGetDebtRegistryEntry,
    mockGetExpectedValueRepaid,
    mockGetTotalExpectedRepayment,
} from "./servicing";
import { mockAwaitTransactionMinedAsync, mockGetErrorLogs } from "./blockchain";
import { mockGetIssuanceHash, mockFillAsync } from "./order";
import { mockAsDebtor } from "./sign";

const contracts = {
    loadTokenRegistry: mockTokenRegistry,
    getTermsContractType: mockGetTermsContractType,
};

const token = {
    getProxyAllowanceAsync: mockGetProxyAllowanceAsync,
    setProxyAllowanceAsync: mockSetProxyAllowanceAsync,
    setUnlimitedProxyAllowanceAsync: mockSetUnlimitedProxyAllowanceAsync,
    getBalanceAsync: mockGetBalanceAsync,
    getNumDecimals: mockGetNumDecimals,
};

const adapters = {
    getAdapterByTermsContractAddress: mockGetAdapterByTermsContractAddress,
    simpleInterestLoan: {
        fromDebtOrder: mockFromDebtOrder,
        getRepaymentSchedule: mockGetRepaymentSchedule,
        toDebtOrder: mockToDebtOrder,
    },
    collateralizedSimpleInterestLoan: {
        fromDebtOrder: mockFromDebtOrder,
        toDebtOrder: jest.fn(async (collateralizedLoanOrder) => {
            return { ...collateralizedLoanOrder };
        }),
    },
};

const servicing = {
    getValueRepaid: mockGetValueRepaid,
    getDebtRegistryEntry: mockGetDebtRegistryEntry,
    getExpectedValueRepaid: mockGetExpectedValueRepaid,
    getTotalExpectedRepayment: mockGetTotalExpectedRepayment,
};

const blockchain = {
    awaitTransactionMinedAsync: mockAwaitTransactionMinedAsync,
};

const order = {
    getIssuanceHash: mockGetIssuanceHash,
    fillAsync: mockFillAsync,
};

const sign = {
    asDebtor: mockAsDebtor,
};

const logs = {
    getErrorLogs: mockGetErrorLogs,
};

const mockDharma = jest.fn().mockImplementation(() => {
    return {
        contracts,
        token,
        adapters,
        servicing,
        blockchain,
        order,
        sign,
        logs,
    };
});

export default mockDharma;
