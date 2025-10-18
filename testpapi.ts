// testPapi.ts
import { dot } from "@polkadot-api/descriptors";
import { createClient } from "polkadot-api";
import { getSmProvider } from "polkadot-api/sm-provider";
import { chainSpec } from "polkadot-api/chains/polkadot";
import { startFromWorker } from "polkadot-api/smoldot/from-worker";
import SmWorker from "polkadot-api/smoldot/worker?worker";

(async () => {
  const worker = new SmWorker();
  const smoldot = startFromWorker(worker);
  const chain = await smoldot.addChain({ chainSpec });

  const client = createClient(getSmProvider(chain));
  const dotApi = client.getTypedApi(dot);

  const version = await dotApi.constants.System.Version();
  console.log("✅ Connected to Polkadot via Smoldot, version:", version);
})();
