import { Address, BigInt, Bytes, log } from "@graphprotocol/graph-ts";
import {
  chainId,
  factory,
  linear,
  dynamic,
  tranched,
  initializer_lockup as initializer,
} from "../generated/env";

export let zero = BigInt.fromI32(0);
export let one = BigInt.fromI32(1);
export let two = BigInt.fromI32(2);
export let d18 = BigInt.fromI32(18);

export let put = 0;
export let call = 1;

export let ADDRESS_ZERO = Bytes.fromHexString(
  "0x0000000000000000000000000000000000000000",
);

export let StreamVersion_V20 = "V20"; /** Not in use */
export let StreamVersion_V21 = "V21";
export let StreamVersion_V22 = "V22";

export function getContractInitializer(): string {
  return initializer.toLowerCase();
}

export function getContractsFactory(): string[][] {
  if (factory.length === 0) {
    return [];
  }
  return factory.map<string[]>((item) => [
    item[0].toString().toLowerCase(),
    item[1].toString().toLowerCase(),
    item.length >= 3 ? item[2].toString() : StreamVersion_V21,
  ]);
}

export function getContractsShapes(): string[][] {
  let aggregate: string[][] = [];

  if (linear.length !== 0) {
    aggregate = aggregate.concat(linear);
  }
  if (dynamic.length !== 0) {
    aggregate = aggregate.concat(dynamic);
  }
  if (tranched.length !== 0) {
    aggregate = aggregate.concat(tranched);
  }

  return aggregate.map<string[]>((item) => [
    item[0].toString().toLowerCase(),
    item[1].toString().toLowerCase(),
    item.length >= 3 ? item[2].toString() : StreamVersion_V21,
  ]);
}

export function isWhitelistedShape(address: Address): bool {
  let shapes = getContractsShapes();
  let addresses = shapes.map<string>((item) =>
    item[0].toString().toLowerCase(),
  );

  return addresses.includes(address.toHexString().toLowerCase());
}

export function getChainId(): BigInt {
  return BigInt.fromI32(chainId);
}

export function log_exit(message: string, dependencies: string[] = []): void {
  log.debug(`[SABLIER] ${message}`, dependencies);
  log.error(`[SABLIER] ${message}`, dependencies);
  // log.critical("[SABLIER] Critical exit.", []);
}

export function log_debug(message: string, dependencies: string[] = []): void {
  log.debug(`[SABLIER] ${message}`, dependencies);
}
