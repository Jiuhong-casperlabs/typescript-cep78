import fs from 'fs';
import { Keys } from 'casper-js-sdk';
import { AsymmetricKey } from 'casper-js-sdk/dist/lib/Keys';

export const getAccountHash = (
  KeyPair: Keys.Ed25519 | Keys.Secp256K1
): String => {
  return Buffer.from(KeyPair.accountHash()).toString('hex');
};

export const getKeyPairOfContract = (pathToKey: string): AsymmetricKey => {
  return Keys.Ed25519.parseKeyFiles(
    `${pathToKey}/public_key.pem`,
    `${pathToKey}/secret_key.pem`
  );
};

export const getBinary = (pathtoBinary: string): Uint8Array => {
  return new Uint8Array(fs.readFileSync(pathtoBinary, null).buffer);
};
