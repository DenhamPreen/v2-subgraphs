export let chainId = 42161;
export let chain = "arbitrum-one";
export let startBlock_protocol = 107509950;
export let startBlock_merkle = 161026550;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let linear: string[][] = [
  ["0x197d655f3be03903fd25e7828c3534504bfe525e", "LL", "V20"],
  ["0xfdd9d122b451f549f48c4942c6fa6646d849e8c1", "LL2", "V21"],
];

export let dynamic: string[][] = [
  ["0xa9efbef1a35ff80041f567391bdc9813b2d50197", "LD", "V20"],
  ["0xf390ce6f54e4dc7c5a5f7f8689062b7591f7111d", "LD2", "V21"],
];

export let tranched: string[][] = [];

export let factory: string[][] = [
  ["0x237400ef5a41886a75b0e036228221df075b3b80", "MSF2", "V21"],
];

/** PRBProxy registry */
export let registry = "0x584009e9ede26e212182c9745f5c000191296a78";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 [Protocol] On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer_protocol = linear[0][0];
export let initializer_merkle = factory[0][0];
