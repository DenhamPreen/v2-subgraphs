export let chainId = 11155111;
export let chain = "sepolia";
export let startBlock = 4067889;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let linear: string[][] = [
  ["0xd4300c5bc0b9e27c73ebabdc747ba990b1b570db", "LL", "V20"],
  ["0x7a43f8a888fa15e68c103e18b0439eb1e98e4301", "LL2", "V21"],
  ["0x25637F3834854F6013d34b8F37bE48951F26a074", "LL3", "V22"],
];

export let dynamic: string[][] = [
  ["0x421e1e7a53ff360f70a2d02037ee394fa474e035", "LD", "V20"],
  ["0xc9940ad8f43aad8e8f33a4d5dbbf0a8f7ff4429a", "LD2", "V21"],
  ["0x3b653D40467EfE57f9d0EdEb01505C16f6231653", "LD3", "V22"],
];

export let tranched: string[][] = [
  ["0xd416A4fEF4Db3207084fa242C7ed36265b23609f", "LT3", "V22"],
];

/** PRBProxy registry */
export let registry = "0x584009E9eDe26e212182c9745F5c000191296a78";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer = linear[0][0];
