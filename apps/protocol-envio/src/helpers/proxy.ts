import type { Mutable, Stream } from "../types";

import { CacheCategory, StreamVersion, configuration } from "../constants";
import { Cache, framework } from "../utils";

type Entity = Partial<Mutable<Stream>>;

export async function bindProxy({
  chainId,
  parties,
  sender,
  version,
}: Pick<Stream, "chainId" | "parties" | "sender" | "version">) {
  if (version === StreamVersion.V20) {
    const cache = Cache.init(CacheCategory.Proxy, chainId);
    const entry = cache.read(sender);

    if (entry) {
      /** There's a cache entry for this proxy. We'll define the proxied aspect based on the entry containing an owner or not. */
      if (entry.owner && entry.owner.length > 0) {
        return {
          parties: entry.owner ? [...parties, entry.owner] : parties,
          proxender: entry.owner,
          proxied: true,
        } satisfies Entity;
      }
    } else {
      const client = framework.getClient(chainId);
      const chain = configuration(chainId);

      try {
        const proxy = framework.getPRBProxyContract(sender, client);
        const [owner_] = (await Promise.all([proxy.read.owner()])) as string[];

        if (owner_ && owner_.length) {
          const owner = owner_.toLowerCase();
          const registry = framework.getPRBProxyRegistryContract(
            chain.registry,
            client,
          );

          const [reverse_] = (await Promise.all([
            registry.read.getProxy([owner as `0x${string}`]),
          ])) as string[];

          const reverse = reverse_?.toLowerCase();

          if (reverse === sender.toLowerCase()) {
            cache.add({ [sender.toLowerCase()]: { owner } });

            return {
              parties: [...parties, owner],
              proxender: owner,
              proxied: true,
            } satisfies Entity;
          }
        }
      } catch (_error) {
        /** This throw can be caused by a non-proxy setup (a.k.a. trying to call the proxy method on an EOA). */
        cache.add({ [sender.toLowerCase()]: { owner: undefined } });
      }
    }
  }

  return {
    parties,
    proxender: undefined,
    proxied: false,
  } satisfies Entity;
}
