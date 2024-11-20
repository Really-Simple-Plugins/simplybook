// src/api/helpers/nonce.js
import { NONCE } from "../config";

const getNonceParam = () => `nonce=${NONCE}`;
export default getNonce;
