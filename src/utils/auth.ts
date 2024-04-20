import { JsonRpcSigner } from "ethers";

export const isTokenValid = (token: string, signer: JsonRpcSigner | null) => {
  if (!signer) {
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return (
      payload.exp > Date.now() / 1000 &&
      payload.walletAddress === signer.address
    );
  } catch (e) {
    return false;
  }
};
