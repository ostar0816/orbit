const singleLineString = require("single-line-string");

export const web3Errors = {
    UNABLE_TO_FIND_WEB3_PROVIDER: singleLineString`Make sure that you are using a Web3-enabled
        browser (such as Chrome with MetaMask installed or Toshi).`,

    UNABLE_TO_FIND_ACCOUNTS: singleLineString`Unable to find an active account on the
        Ethereum network you're on. Please check that MetaMask is properly configured and reload the page.`,

    UNSUPPORTED_NETWORK: singleLineString`The Dharma smart contracts are not available on the
        Ethereum network you're on. Please check that Dharma is available on your selected Ethereum network and
        reload the page.`,

    UNABLE_TO_CONNECT_TO_NETWORK: singleLineString`Please ensure that you are connecting
        to the appropriate Ethereum network and that your account is unlocked`,
};
