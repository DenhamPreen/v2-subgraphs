import { Address, ethereum } from "@graphprotocol/graph-ts";
import { Campaign } from "../generated/types/schema";
import {
  CreateMerkleStreamerLL as EventCreateCampaignLL_V21,
  CreateMerkleLL as EventCreateCampaignLL_V22,
  CreateMerkleLT as EventCreateCampaignLT_V22,
} from "../generated/types/templates/ContractMerkleLockupFactory/SablierV2MerkleLockupFactory";
import {
  StreamVersion_V21,
  StreamVersion_V22,
  getChainId,
  log_exit,
  one,
  zero,
} from "../constants";
import { getOrCreateAsset } from "./asset";
import { getFactoryByAddress } from "./factory";
import { createTranches } from "./tranches";
import { getOrCreateWatcher } from "./watcher";

export function getCampaignById(id: string): Campaign | null {
  return Campaign.load(id);
}

function createCampaign(id: string, event: ethereum.Event): Campaign | null {
  let entity = getCampaignById(id);
  if (entity != null) {
    log_exit("Campaign already registered at this address");
    return null;
  }

  /** --------------- */
  let watcher = getOrCreateWatcher();

  /** --------------- */
  entity = new Campaign(id);
  entity.chainId = getChainId();
  entity.subgraphId = watcher.campaignIndex;
  entity.hash = event.transaction.hash;
  entity.timestamp = event.block.timestamp;
  entity.name = "";

  entity.clawbackAction = null;
  entity.clawbackTime = null;

  entity.claimedAmount = zero;
  entity.claimedCount = zero;

  entity.streamCliff = false;
  entity.streamCliffDuration = zero;
  entity.streamTotalDuration = zero;

  /** --------------- */
  let factory = getFactoryByAddress(event.address);
  if (factory == null) {
    log_exit("Factory not yet registered at this address");
    return null;
  }
  entity.factory = factory.id;
  let index = factory.campaignIndex.plus(one);
  factory.campaignIndex = index;
  factory.save();

  entity.position = index;

  /** --------------- */

  watcher.campaignIndex = watcher.campaignIndex.plus(one);
  watcher.save();

  return entity;
}

export function createCampaignLinear_V21(
  event: EventCreateCampaignLL_V21,
): Campaign | null {
  let id = generateCampaignId(event.params.merkleStreamer);
  let entity = createCampaign(id, event);

  if (entity == null) {
    log_exit("Campaign is missing.");
    return null;
  }

  entity.address = event.params.merkleStreamer;
  entity.category = "LockupLinear";

  entity.admin = event.params.admin;
  entity.lockup = event.params.lockupLinear;

  entity.expires = !event.params.expiration.isZero();
  entity.expiration = event.params.expiration;

  entity.root = event.params.merkleRoot;
  entity.ipfsCID = event.params.ipfsCID;
  entity.aggregateAmount = event.params.aggregateAmount;
  entity.totalRecipients = event.params.recipientsCount;

  entity.streamCliff = !event.params.streamDurations.cliff.isZero();
  entity.streamCliffDuration = event.params.streamDurations.cliff;
  entity.streamTotalDuration = event.params.streamDurations.total;
  entity.streamCancelable = event.params.cancelable;
  entity.streamTransferable = event.params.transferable;

  entity.version = StreamVersion_V21;

  /** --------------- */
  let asset = getOrCreateAsset(event.params.asset);
  entity.asset = asset.id;

  /** --------------- */
  return entity;
}

export function createCampaignLinear_V22(
  event: EventCreateCampaignLL_V22,
): Campaign | null {
  let id = generateCampaignId(event.params.merkleLL);
  let entity = createCampaign(id, event);

  if (entity == null) {
    log_exit("Campaign is missing.");
    return null;
  }

  entity.address = event.params.merkleLL;
  entity.category = "LockupLinear";

  entity.lockup = event.params.lockupLinear;
  entity.aggregateAmount = event.params.aggregateAmount;
  entity.totalRecipients = event.params.recipientCount;

  entity.streamCliff = !event.params.streamDurations.cliff.isZero();
  entity.streamCliffDuration = event.params.streamDurations.cliff;
  entity.streamTotalDuration = event.params.streamDurations.total;

  entity.name = event.params.baseParams.name;
  entity.admin = event.params.baseParams.initialAdmin;
  entity.expires = !event.params.baseParams.expiration.isZero();
  entity.expiration = event.params.baseParams.expiration;
  entity.root = event.params.baseParams.merkleRoot;
  entity.ipfsCID = event.params.baseParams.ipfsCID;
  entity.streamCancelable = event.params.baseParams.cancelable;
  entity.streamTransferable = event.params.baseParams.transferable;

  entity.version = StreamVersion_V22;

  /** --------------- */
  let asset = getOrCreateAsset(event.params.baseParams.asset);
  entity.asset = asset.id;

  /** --------------- */
  return entity;
}

export function createCampaignTranched_V22(
  event: EventCreateCampaignLT_V22,
): Campaign | null {
  let id = generateCampaignId(event.params.merkleLT);
  let entity = createCampaign(id, event);

  if (entity == null) {
    log_exit("Campaign is missing.");
    return null;
  }

  entity.address = event.params.merkleLT;
  entity.category = "LockupTranched";

  entity.lockup = event.params.lockupTranched;
  entity.aggregateAmount = event.params.aggregateAmount;
  entity.totalRecipients = event.params.recipientCount;

  entity.name = event.params.baseParams.name;
  entity.admin = event.params.baseParams.initialAdmin;
  entity.expires = !event.params.baseParams.expiration.isZero();
  entity.expiration = event.params.baseParams.expiration;
  entity.root = event.params.baseParams.merkleRoot;
  entity.ipfsCID = event.params.baseParams.ipfsCID;
  entity.streamCancelable = event.params.baseParams.cancelable;
  entity.streamTransferable = event.params.baseParams.transferable;
  entity.streamTotalDuration = event.params.totalDuration;

  entity.version = StreamVersion_V22;

  /** --------------- */
  let asset = getOrCreateAsset(event.params.baseParams.asset);
  entity.asset = asset.id;

  /** --------------- */
  entity = createTranches(entity, event);

  /** --------------- */
  return entity;
}

export function generateCampaignId(address: Address): string {
  let id = ""
    .concat(address.toHexString())
    .concat("-")
    .concat(getChainId().toString());

  return id;
}
