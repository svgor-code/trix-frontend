import { instance } from "./config";

export const generateNonce = async (walletAddress: string) => {
  if (!walletAddress) return;

  try {
    const result = await instance.post("auth/generate-nonce", {
      walletAddress,
    });

    return result.data.nonce;
  } catch (error) {
    console.error(error);
  }
};

export const login = async (walletAddress: string, signature: string) => {
  if (!walletAddress || !signature) return;

  try {
    const result = await instance.post("auth/login", {
      walletAddress,
      signature,
    });

    return result.data;
  } catch (error) {
    console.error(error);
  }
};
