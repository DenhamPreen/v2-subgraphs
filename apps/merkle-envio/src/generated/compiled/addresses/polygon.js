"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializer_merkle = exports.initializer_protocol = exports.registry = exports.factory = exports.tranched = exports.dynamic = exports.linear = exports.startBlock_merkle = exports.startBlock_protocol = exports.chain = exports.chainId = void 0;
exports.chainId = 137;
exports.chain = "matic";
exports.startBlock_protocol = 44637120;
exports.startBlock_merkle = 51245830;
/** Rule: keep addresses lowercased */
/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */
exports.linear = [
    ["0x67422c3e36a908d5c3237e9cffeb40bde7060f6e", "LL", "V20"],
    ["0x5f0e1dea4a635976ef51ec2a2ed41490d1eba003", "LL2", "V21"],
    ["0x8d87c5eddb5644d1a714f85930ca940166e465f0", "LL3", "V22"],
];
exports.dynamic = [
    ["0x7313addb53f96a4f710d3b91645c62b434190725", "LD", "V20"],
    ["0xb194c7278c627d52e440316b74c5f24fc70c1565", "LD2", "V21"],
    ["0x8d4ddc187a73017a5d7cef733841f55115b13762", "LD3", "V22"],
];
exports.tranched = [
    ["0xbf67f0a1e847564d0efad475782236d3fa7e9ec2", "LT3", "V22"],
];
exports.factory = [
    ["0xf4906225e783fb8977410bdbfb960cabed6c2ef4", "MSF2", "V21"],
    ["0xc28872e0c1f3633eed467907123727ac0155029d", "MSF3", "V22"],
];
/** PRBProxy registry */
exports.registry = "0x584009e9ede26e212182c9745f5c000191296a78";
/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 [Protocol] On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */
exports.initializer_protocol = exports.linear[0][0];
exports.initializer_merkle = exports.factory[0][0];
