"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializer_merkle = exports.initializer_lockup = exports.registry = exports.factory = exports.tranched = exports.dynamic = exports.linear = exports.startBlock_merkle = exports.startBlock_lockup = exports.chain = exports.chainId = void 0;
exports.chainId = 84532;
exports.chain = "base-sepolia";
exports.startBlock_lockup = 12641000;
exports.startBlock_merkle = 12641000;
/** Rule: keep addresses lowercased */
/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */
exports.linear = [
    ["0xfe7fc0bbde84c239c0ab89111d617dc7cc58049f", "LL3", "V22"],
];
exports.dynamic = [
    ["0x6dcb73e5f7e8e70be20b3b9cf50e3be4625a91c3", "LD3", "V22"],
];
exports.tranched = [
    ["0xb8c724df3ec8f2bf8fa808df2cb5dbab22f3e68c", "LT3", "V22"],
];
exports.factory = [
    ["0x899a05feb160fe912f621733a1d0b39c1446b3eb", "MSF3", "V22"],
];
/** PRBProxy registry */
exports.registry = "";
/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 [Lockup] On any new chain, please create a Lockup Linear stream to kick-off indexing
 */
exports.initializer_lockup = exports.linear[0][0];
exports.initializer_merkle = exports.factory[0][0];
