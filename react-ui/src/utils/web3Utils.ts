const promisify = require("tiny-promisify");
import * as Web3 from "web3";

class Web3Utils {
    private web3: Web3;

    constructor(web3: Web3) {
        this.web3 = web3;
    }

    /**
     * Returns the current blocktime in seconds.
     *
     * @returns {Promise<number>}
     */
    public async getCurrentBlockTime(): Promise<number> {
        if (!this.web3) {
            return 0;
        }
        const latestBlock = await promisify(this.web3.eth.getBlock)("latest");

        return latestBlock.timestamp;
    }

    /**
     * Increases block time by the given number of seconds. Returns true
     * if the next block was mined successfully after increasing time.
     *
     * @param {number} seconds
     * @returns {Promise<boolean>}
     */
    public async increaseTime(seconds: number): Promise<boolean> {
        const increaseTimeResponse = await this.sendJsonRpcRequestAsync("evm_increaseTime", [
            seconds,
        ]);

        // A new block must be mined to make this effective.
        const blockMineResponse = await this.mineBlock();

        // tslint:disable-next-line
        return !increaseTimeResponse["error"] && !blockMineResponse["error"];
    }

    /**
     * Mines a single block.
     *
     * @returns {Promise<"web3".Web3.JSONRPCResponsePayload>}
     */
    public async mineBlock(): Promise<Web3.JSONRPCResponsePayload> {
        return this.sendJsonRpcRequestAsync("evm_mine", []);
    }

    private async sendJsonRpcRequestAsync(
        method: string,
        params: any[],
    ): Promise<Web3.JSONRPCResponsePayload> {
        return promisify(this.web3.currentProvider.sendAsync, {
            context: this.web3.currentProvider,
        })({
            jsonrpc: "2.0",
            method,
            params,
            id: new Date().getTime(),
        });
    }
}

module.exports = Web3Utils;
