require("dotenv").config();
const ROOT_DIR = __dirname + "/../../../";
const Web3 = require("web3");
const { Dharma } = require("@dharmaprotocol/dharma.js");
const {
    DebtRegistry,
    DebtKernel,
    RepaymentRouter,
    TokenTransferProxy,
    TokenRegistry,
    DebtToken,
    SimpleInterestTermsContract,
    CollateralizedSimpleInterestTermsContract,
} = require("@dharmaprotocol/dharma.js/node_modules/@dharmaprotocol/contracts");
const promisify = require("tiny-promisify");
const { BigNumber } = require("bignumber.js");
const ABIDecoder = require("abi-decoder");
const compact = require("lodash.compact");
const Web3Utils = require("../utils/web3Utils");

// Sample data
const sampleDebtOrders = require(ROOT_DIR + "src/migrations/sampleDebtOrders.json");

const normalizeDebtOrder = (debtOrder: any) => {
    const _debtOrder = {
        ...debtOrder,
        principalAmount: debtOrder!.principalAmount!.toNumber(),
        debtorFee: debtOrder!.debtorFee!.toNumber(),
        creditorFee: debtOrder!.creditorFee!.toNumber(),
        relayerFee: debtOrder!.relayerFee!.toNumber(),
        underwriterFee: debtOrder!.underwriterFee!.toNumber(),
        underwriterRiskRating: debtOrder!.underwriterRiskRating!.toNumber(),
        expirationTimestampInSec: debtOrder!.expirationTimestampInSec!.toNumber(),
        salt: debtOrder!.salt!.toNumber(),
        debtorSignature: JSON.stringify(debtOrder.debtorSignature),
        creditorSignature: JSON.stringify(debtOrder.creditorSignature),
        underwriterSignature: JSON.stringify(debtOrder.underwriterSignature),
    };
    return _debtOrder;
};

let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const web3Utils = new Web3Utils(web3);
let defaultAccount: string = "";
let dharma: any = null;

// Add abi to ABIDecoder
ABIDecoder.addABI(DebtKernel.abi);
ABIDecoder.addABI(RepaymentRouter.abi);

if (web3.isConnected()) {
    instantiateDharma();
}

const log = (output: string) => {
    console.log(output);
};

async function instantiateDharma() {
    try {
        const networkId = await promisify(web3.version.getNetwork)();
        const accounts = await promisify(web3.eth.getAccounts)();
        if (!accounts.length) {
            throw new Error("ETH account not available");
        }
        defaultAccount = accounts[0];

        if (
            !(
                networkId in DebtKernel.networks &&
                networkId in RepaymentRouter.networks &&
                networkId in TokenTransferProxy.networks &&
                networkId in TokenRegistry.networks &&
                networkId in DebtToken.networks &&
                networkId in DebtRegistry.networks &&
                networkId in SimpleInterestTermsContract.networks &&
                networkId in CollateralizedSimpleInterestTermsContract.networks
            )
        ) {
            throw new Error("Unable to connect to the blockchain");
        }

        const dharmaConfig = {
            kernelAddress: DebtKernel.networks[networkId].address,
            repaymentRouterAddress: RepaymentRouter.networks[networkId].address,
            tokenTransferProxyAddress: TokenTransferProxy.networks[networkId].address,
            tokenRegistryAddress: TokenRegistry.networks[networkId].address,
            debtTokenAddress: DebtToken.networks[networkId].address,
            debtRegistryAddress: DebtRegistry.networks[networkId].address,
            simpleInterestTermsContractAddress:
                SimpleInterestTermsContract.networks[networkId].address,
            collateralizedSimpleInterestTermsContractAddress:
                CollateralizedSimpleInterestTermsContract.networks[networkId].address,
        };

        dharma = new Dharma(web3.currentProvider, dharmaConfig);
        await fillDebtOrders();
        await web3Utils.mineBlock();
        log("Increasing blockchain time by 3 hours");
        await web3Utils.increaseTime(3 * 60 * 60);
    } catch (e) {
        throw new Error(e);
    }
}

async function fillDebtOrders() {
    try {
        if (!web3 || !dharma) {
            throw new Error("Unable to connect to blockchain");
        }
        if (!sampleDebtOrders) {
            throw new Error("Unable to find sample debt order data");
        }

        for (let debtOrder of sampleDebtOrders) {
            const simpleInterestLoan = {
                principalTokenSymbol: debtOrder.principalTokenSymbol,
                principalAmount: new BigNumber(debtOrder.principalAmount),
                interestRate: new BigNumber(debtOrder.interestRate),
                amortizationUnit: debtOrder.amortizationUnit,
                termLength: new BigNumber(debtOrder.termLength),
            };
            const dharmaDebtOrder = await dharma.adapters.simpleInterestLoan.toDebtOrder(
                simpleInterestLoan,
            );
            dharmaDebtOrder.debtor = defaultAccount;

            // Set the token allowance to unlimited
            await dharma.token.setUnlimitedProxyAllowanceAsync(dharmaDebtOrder.principalToken);
            dharmaDebtOrder.debtorSignature = await dharma.sign.asDebtor(dharmaDebtOrder);

            // Get issuance hash for this debt order
            const issuanceHash = await dharma.order.getIssuanceHash(dharmaDebtOrder);

            log("Issuance Hash: " + issuanceHash);
            if (debtOrder.fill) {
                // Sign as creditor
                dharmaDebtOrder.creditor = defaultAccount;
                dharmaDebtOrder.creditorSignature = await dharma.sign.asCreditor(dharmaDebtOrder);

                const txHash = await dharma.order.fillAsync(dharmaDebtOrder, {
                    from: dharmaDebtOrder.creditor,
                });
                const receipt = await promisify(web3.eth.getTransactionReceipt)(txHash);
                const [debtOrderFilledLog] = compact(ABIDecoder.decodeLogs(receipt.logs));
                if (debtOrderFilledLog.name === "LogDebtOrderFilled") {
                    log("- Debt order filled");

                    // Pay the debt order
                    const repaymentAmount = new BigNumber(debtOrder.repaymentAmount);
                    const repaymentSuccess = await makeRepayment(
                        issuanceHash,
                        repaymentAmount,
                        dharmaDebtOrder.principalToken,
                        { from: dharmaDebtOrder.debtor },
                    );
                    if (repaymentSuccess) {
                        log("- Repayment success");
                    } else {
                        log("- Repayment failed");
                    }
                } else {
                    log("- Unable to fill debt order");
                }
            } else {
                log("- Skipping filling debt order");
            }
            log("\n");
        }
    } catch (e) {
        throw new Error(e);
    }
}

async function makeRepayment(
    issuanceHash: string,
    amount: any,
    principalToken: string,
    options: any,
): Promise<boolean> {
    try {
        const txHash = await dharma.servicing.makeRepayment(
            issuanceHash,
            amount,
            principalToken,
            options,
        );
        const receipt = await promisify(web3.eth.getTransactionReceipt)(txHash);
        const [logs] = compact(ABIDecoder.decodeLogs(receipt.logs));
        return logs.name === "LogRepayment";
    } catch (e) {
        throw new Error(e);
    }
}

function encodeUrlParams(params: any): string {
    const encodedParams = Object.keys(params)
        .map(function(k: string) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
        })
        .join("&");
    return encodedParams;
}
