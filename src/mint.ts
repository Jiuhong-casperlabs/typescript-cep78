import {
  DeployUtil,
  CasperClient,
  RuntimeArgs,
  CLString,
  CLPublicKey,
  CLByteArray,
  CLKey,
  CLAccountHash,
  Keys
} from 'casper-js-sdk';

import { getBinary } from './lib';
import * as constants from './constants';

const main = async () => {
  const casperClient: CasperClient = new CasperClient(constants.nctl_node);
  const loadedKeyPair: Keys.AsymmetricKey =
    casperClient.loadKeyPairFromPrivateFile(
      constants.PATH_TO_KEY,
      Keys.SignatureAlgorithm.Ed25519
    );

  const pk: Uint8Array = loadedKeyPair.publicKey.value();
  const sk: Uint8Array = loadedKeyPair.privateKey;

  // cep78 contract-hash
  const hash1: string =
    'fbf80361bdd0dc837d012ce8ec600b69da97ff9e5b938933531f6cfac890f6ea';
  const contracthashbytearray: CLByteArray = new CLByteArray(
    Uint8Array.from(Buffer.from(hash1, 'hex'))
  );

  const contracthash: CLKey = new CLKey(contracthashbytearray);

  // token_owner: key
  const hexstring: string =
    '01187a3f420e11affb20b51e69f32fb5f159f33aefd4c3dcd16b1dc12267ea259e';
  const accounthash: CLAccountHash = new CLAccountHash(
    CLPublicKey.fromHex(hexstring).toAccountHash()
  );

  const token_owner: CLKey = new CLKey(accounthash);

  // token_meta_data: string
  const meta_data_json: Object = {
    name: 'John Doe',
    symbol: 'abc',
    token_uri: 'https://www.barfoo.com'
  };

  const token_meta_data: CLString = new CLString(
    JSON.stringify(meta_data_json)
  );

  let deploy: DeployUtil.Deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      loadedKeyPair.publicKey,
      'casper-net-1',
      constants.DEPLOY_GAS_PRICE,
      constants.DEPLOY_TTL_MS
    ),
    DeployUtil.ExecutableDeployItem.newModuleBytes(
      getBinary(constants.PATH_TO_CONTRACT_MINT),
      RuntimeArgs.fromMap({
        nft_contract_hash: contracthash,
        token_owner: token_owner,
        token_meta_data: token_meta_data
      })
    ),
    DeployUtil.standardPayment(10000000000)
  );
  deploy = casperClient.signDeploy(deploy, loadedKeyPair);

  let deployHash: string = await casperClient.putDeploy(deploy);
  console.log(`deploy hash = ${deployHash}`);
};

main();
