import {
  LockupV20Contract_Approval_handler as HandlerLinear_V20,
  LockupV20Contract_Approval_loader as LoaderLinear_V20,
  LockupV21Contract_Approval_handler as HandlerLinear_V21,
  LockupV21Contract_Approval_loader as LoaderLinear_V21,
} from "../../generated/src/Handlers.gen";

import type { Action, ApprovalHandler, ApprovalLoader } from "../types";

import {
  createAction,
  generateStreamId,
  getOrCreateWatcher,
  getStream,
} from "../helpers";
import { ActionCategory } from "../constants";

function loader(input: ApprovalLoader) {
  const { context, event } = input;

  const streamId = generateStreamId(
    event,
    event.srcAddress,
    event.params.tokenId,
  );
  const watcherId = event.chainId.toString();

  context.Stream.load(streamId, {});
  context.Watcher.load(watcherId);
}

function handler(input: ApprovalHandler) {
  const { context, event } = input;

  /** ------- Fetch -------- */

  let watcher = getOrCreateWatcher(event, context.Watcher.get);
  let stream = getStream(event, event.params.tokenId, context.Stream.get);

  const post_action = createAction(event, watcher);

  const action: Action = {
    ...post_action.entity,
    category: ActionCategory.Approval,
    stream: stream.id,

    /** --------------- */
    addressA: event.params.owner.toLowerCase(),
    addressB: event.params.approved.toLowerCase(),
  };

  watcher = post_action.watcher;

  context.Action.set(action);
  context.Stream.set(stream);
  context.Watcher.set(watcher);
}

LoaderLinear_V20(loader);
HandlerLinear_V20(handler);

LoaderLinear_V21(loader);
HandlerLinear_V21(handler);
