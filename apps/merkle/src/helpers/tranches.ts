import { BigInt } from "@graphprotocol/graph-ts";
import { Campaign, Tranche } from "../generated/types/schema";
import { CreateMerkleLT as EventCreateTranched } from "../generated/types/templates/ContractMerkleLockupFactory/SablierV2MerkleLockupFactory";
import { zero } from "../constants";

export class TrancheInput {
  percentage: BigInt;
  duration: BigInt;

  constructor(percentage: BigInt, duration: BigInt) {
    this.percentage = percentage;
    this.duration = duration;
  }
}

export function createTranche(
  id: string,
  last: TrancheInput,
  current: TrancheInput,
): Tranche {
  let tranche = new Tranche(id);
  tranche.percentage = current.percentage;
  tranche.duration = current.duration;

  tranche.startDuration = last.duration;
  tranche.endDuration = last.duration.plus(current.duration);

  tranche.startPercentage = last.percentage;
  tranche.endPercentage = last.percentage.plus(current.percentage);

  return tranche;
}

export function createTranches(
  campaign: Campaign,
  event: EventCreateTranched,
): Campaign {
  let tranches = event.params.tranchesWithPercentages;

  let last = new TrancheInput(zero, zero);

  for (let i = 1; i < tranches.length; i++) {
    let id = campaign.id.concat("-").concat(i.toString());
    let current = new TrancheInput(
      tranches[i].unlockPercentage,
      tranches[i].duration,
    );
    let tranche: Tranche = createTranche(id, last, current);

    tranche.campaign = campaign.id;
    tranche.position = BigInt.fromI32(i - 1);
    tranche.save();

    last = current;
  }

  return campaign;
}
