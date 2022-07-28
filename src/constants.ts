export const nctl_node = 'http://localhost:11101/rpc';
export const testnet_node = 'http://3.208.91.63:7777/rpc';
export const PATH_TO_KEY =
  '/home/jh/casper-node/utils/nctl/assets/net-1/nodes/node-1/keys/secret_key.pem';
export const PATH_TO_CONTRACT_MINT =
  '/home/jh/caspereco/cep-78-enhanced-nft/client/mint_session/target/wasm32-unknown-unknown/release/mint_call.wasm';

// Gas price to be offered.
export const DEPLOY_GAS_PRICE = process.env.CSPR_INTS_DEPLOY_GAS_PRICE
  ? parseInt(process.env.CSPR_INTS_DEPLOY_GAS_PRICE)
  : 1;

// Time interval in milliseconds after which deploy will not be processed by a node.
export const DEPLOY_TTL_MS: number = 1800000;
