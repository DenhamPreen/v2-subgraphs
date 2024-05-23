import {
  LockupV20Contract_CreateLockupLinearStream_handlerAsync as HandlerLinearAsync_V20,
  LockupV20Contract_CreateLockupLinearStream_loader as LoaderLinear_V20,
  LockupV21Contract_CreateLockupLinearStream_handlerAsync as HandlerLinearAsync_V21,
  LockupV21Contract_CreateLockupLinearStream_loader as LoaderLinear_V21,
  LockupV22Contract_CreateLockupLinearStream_handlerAsync as HandlerLinearAsync_V22,
  LockupV22Contract_CreateLockupLinearStream_loader as LoaderLinear_V22,
  LockupV20Contract_CreateLockupDynamicStream_handlerAsync as HandlerDynamicAsync_V20,
  LockupV20Contract_CreateLockupDynamicStream_loader as LoaderDynamic_V20,
  LockupV21Contract_CreateLockupDynamicStream_handlerAsync as HandlerDynamicAsync_V21,
  LockupV21Contract_CreateLockupDynamicStream_loader as LoaderDynamic_V21,
  LockupV22Contract_CreateLockupDynamicStream_handlerAsync as HandlerDynamicAsync_V22,
  LockupV22Contract_CreateLockupDynamicStream_loader as LoaderDynamic_V22,
  LockupV22Contract_CreateLockupTranchedStream_handlerAsync as HandlerTranchedAsync_V22,
  LockupV22Contract_CreateLockupTranchedStream_loader as LoaderTranched_V22,
} from "../../generated/src/Handlers.gen";

import type {
  CreateDynamicLoader,
  CreateDynamicHandler,
  CreateLinearLoader,
  CreateLinearHandler,
  CreateTranchedLoader,
  CreateTranchedHandler,
  Action,
  CreateLinearHandler22,
  CreateDynamicHandler22,
} from "../types";

import {
  createAction,
  createDynamicStream,
  createLinearStream,
  createTranchedStream,
  generateAssetId,
  generateBatchId,
  generateBatcherId,
  generateContractIdFromEvent,
  getOrCreateAsset_async,
  getOrCreateBatch_async,
  getOrCreateBatcher_async,
  initialize_async,
} from "../helpers";
import { ActionCategory } from "../constants";

function loader(
  input: CreateLinearLoader | CreateDynamicLoader | CreateTranchedLoader,
) {
  const { context, event } = input;

  const assetId = generateAssetId(event, event.params.asset);
  const batchId = generateBatchId(event);
  const batcherId = generateBatcherId(event, event.params.sender);
  const contractId = generateContractIdFromEvent(event);
  const watcherId = event.chainId.toString();

  context.Asset.load(assetId);
  context.Batch.load(batchId, {});
  context.Batcher.load(batcherId);
  context.Contract.load(contractId);
  context.Watcher.load(watcherId);
}

async function handlerDynamic(input: CreateDynamicHandler) {
  const { context, event } = input;

  /** ------- Initialize -------- */

  let { watcher, contract, contracts } = await initialize_async(
    event,
    context.Watcher.get,
    context.Contract.get,
  );

  /** ------- Fetch -------- */

  let asset = await getOrCreateAsset_async(
    event,
    event.params.asset,
    context.Asset.get,
  );
  let batcher = await getOrCreateBatcher_async(
    event,
    event.params.sender,
    context.Batcher.get,
  );
  let batch = await getOrCreateBatch_async(event, batcher, context.Batch.get);

  /** ------- Process -------- */

  let { stream, segments, ...post_create } = await createDynamicStream(event, {
    asset,
    batch,
    batcher,
    contract,
    watcher,
  });

  batch = post_create.batch;
  batcher = post_create.batcher;
  watcher = post_create.watcher;

  const post_action = createAction(event, watcher);

  const action: Action = {
    ...post_action.entity,
    category: ActionCategory.Create,
    stream_id: stream.id,
    /** --------------- */
    addressA: event.params.sender.toLowerCase(),
    addressB: event.params.recipient.toLowerCase(),
    amountA: event.params.amounts[0],
  };

  watcher = post_action.watcher;

  /** ------- Non-Cancelable -------- */

  if (stream.cancelable == false) {
    stream = {
      ...stream,
      renounceAction_id: action.id,
      renounceTime: BigInt(event.blockTimestamp),
    };
  }

  /** ------- Update -------- */

  await context.Asset.set(asset);
  if (contracts.length) {
    for (let i = 0; i < contracts.length; i++) {
      if (contracts[i].id === contract.id) {
        await context.Contract.set(contract);
      }
      await context.Contract.set(contracts[i]);
    }
  }

  if (segments.length) {
    for (let i = 0; i < segments.length; i++) {
      await context.Segment.set(segments[i]);
    }
  }

  await context.Action.set(action);
  await context.Batch.set(batch);
  await context.Batcher.set(batcher);
  await context.Stream.set(stream);
  await context.Watcher.set(watcher);
}

async function handlerDynamic22(input: CreateDynamicHandler22) {
  const { context, event } = input;

  const { timestamps, amounts, ...params_no_timestamps } = event.params;
  await handlerDynamic({
    context,
    event: {
      ...event,
      params: {
        ...params_no_timestamps,
        range: timestamps,
        amounts: [...amounts, BigInt(0)],
      },
    },
  });
}

async function handlerLinear(input: CreateLinearHandler) {
  const { context, event } = input;

  /** ------- Initialize -------- */

  let { watcher, contract, contracts } = await initialize_async(
    event,
    context.Watcher.get,
    context.Contract.get,
  );

  /** ------- Fetch -------- */

  let asset = await getOrCreateAsset_async(
    event,
    event.params.asset,
    context.Asset.get,
  );
  let batcher = await getOrCreateBatcher_async(
    event,
    event.params.sender,
    context.Batcher.get,
  );
  let batch = await getOrCreateBatch_async(event, batcher, context.Batch.get);

  /** ------- Process -------- */

  let { stream, ...post_create } = await createLinearStream(event, {
    asset,
    batch,
    batcher,
    contract,
    watcher,
  });

  batch = post_create.batch;
  batcher = post_create.batcher;
  watcher = post_create.watcher;

  const post_action = createAction(event, watcher);

  const action: Action = {
    ...post_action.entity,
    category: ActionCategory.Create,
    stream_id: stream.id,
    /** --------------- */
    addressA: event.params.sender.toLowerCase(),
    addressB: event.params.recipient.toLowerCase(),
    amountA: event.params.amounts[0],
  };

  watcher = post_action.watcher;

  /** ------- Non-Cancelable -------- */

  if (stream.cancelable == false) {
    stream = {
      ...stream,
      renounceAction_id: action.id,
      renounceTime: BigInt(event.blockTimestamp),
    };
  }

  /** ------- Update -------- */

  await context.Asset.set(asset);
  if (contracts.length) {
    for (let i = 0; i < contracts.length; i++) {
      if (contracts[i].id === contract.id) {
        await context.Contract.set(contract);
      }
      await context.Contract.set(contracts[i]);
    }
  }

  await context.Action.set(action);
  await context.Batch.set(batch);
  await context.Batcher.set(batcher);
  await context.Stream.set(stream);
  await context.Watcher.set(watcher);
}

async function handlerLinear22(input: CreateLinearHandler22) {
  const { context, event } = input;

  const { timestamps, amounts, ...params_no_timestamps } = event.params;
  await handlerLinear({
    context,
    event: {
      ...event,
      params: {
        ...params_no_timestamps,
        range: timestamps,
        amounts: [...amounts, BigInt(0)],
      },
    },
  });
}

async function handlerTranched(input: CreateTranchedHandler) {
  const { context, event } = input;
  /** ------- Initialize -------- */

  let { watcher, contract, contracts } = await initialize_async(
    event,
    context.Watcher.get,
    context.Contract.get,
  );

  /** ------- Fetch -------- */

  let asset = await getOrCreateAsset_async(
    event,
    event.params.asset,
    context.Asset.get,
  );
  let batcher = await getOrCreateBatcher_async(
    event,
    event.params.sender,
    context.Batcher.get,
  );
  let batch = await getOrCreateBatch_async(event, batcher, context.Batch.get);

  /** ------- Process -------- */

  let { stream, tranches, ...post_create } = await createTranchedStream(event, {
    asset,
    batch,
    batcher,
    contract,
    watcher,
  });

  batch = post_create.batch;
  batcher = post_create.batcher;
  watcher = post_create.watcher;

  const post_action = createAction(event, watcher);

  const action: Action = {
    ...post_action.entity,
    category: ActionCategory.Create,
    stream_id: stream.id,
    /** --------------- */
    addressA: event.params.sender.toLowerCase(),
    addressB: event.params.recipient.toLowerCase(),
    amountA: event.params.amounts[0],
  };

  watcher = post_action.watcher;

  /** ------- Non-Cancelable -------- */

  if (stream.cancelable == false) {
    stream = {
      ...stream,
      renounceAction_id: action.id,
      renounceTime: BigInt(event.blockTimestamp),
    };
  }

  /** ------- Update -------- */

  await context.Asset.set(asset);
  if (contracts.length) {
    for (let i = 0; i < contracts.length; i++) {
      if (contracts[i].id === contract.id) {
        await context.Contract.set(contract);
      }
      await context.Contract.set(contracts[i]);
    }
  }

  if (tranches.length) {
    for (let i = 0; i < tranches.length; i++) {
      await context.Tranche.set(tranches[i]);
    }
  }

  await context.Action.set(action);
  await context.Batch.set(batch);
  await context.Batcher.set(batcher);
  await context.Stream.set(stream);
  await context.Watcher.set(watcher);
}

LoaderDynamic_V20(loader);
HandlerDynamicAsync_V20(handlerDynamic);

LoaderLinear_V20(loader);
HandlerLinearAsync_V20(handlerLinear);

LoaderDynamic_V21(loader);
HandlerDynamicAsync_V21(handlerDynamic);

LoaderLinear_V21(loader);
HandlerLinearAsync_V21(handlerLinear);

LoaderDynamic_V22(loader);
HandlerDynamicAsync_V22(handlerDynamic22);

LoaderLinear_V22(loader);
HandlerLinearAsync_V22(handlerLinear22);

LoaderTranched_V22(loader);
HandlerTranchedAsync_V22(handlerTranched);
