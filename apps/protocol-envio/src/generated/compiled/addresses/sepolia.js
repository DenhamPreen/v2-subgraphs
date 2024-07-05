"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializer_merkle = exports.initializer_protocol = exports.registry = exports.factory = exports.tranched = exports.dynamic = exports.linear = exports.startBlock_merkle = exports.startBlock_protocol = exports.chain = exports.chainId = void 0;
exports.chainId = 11155111;
exports.chain = "sepolia";
exports.startBlock_protocol = 4067889;
exports.startBlock_merkle = 4904890;
/** Rule: keep addresses lowercased */
/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */
exports.linear = [
    ["0xd4300c5bc0b9e27c73ebabdc747ba990b1b570db", "LL", "V20"],
    ["0x7a43f8a888fa15e68c103e18b0439eb1e98e4301", "LL2", "V21"],
];
exports.dynamic = [
    ["0x421e1e7a53ff360f70a2d02037ee394fa474e035", "LD", "V20"],
    ["0xc9940ad8f43aad8e8f33a4d5dbbf0a8f7ff4429a", "LD2", "V21"],
];
exports.tranched = [
    ["0xad8e8615585470be71301f8d090a26b4bcf8c8ab", "LT3", "V22"],
];
exports.factory = [
    ["0xbacc1d151a78eed71d504f701c25e8739dc0262d", "MSF2", "V21"],
];
/** PRBProxy registry */
exports.registry = "0x584009E9eDe26e212182c9745F5c000191296a78";
/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 [Protocol] On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */
exports.initializer_protocol = exports.linear[0][0];
exports.initializer_merkle = exports.factory[0][0];
