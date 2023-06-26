import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";

export const createFlow = async (
  sender: string,
  receiver: string,
  flowRate: string
) => {
  //@ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  try {
    const sf = await Framework.create({
      chainId: 80001,
      provider: provider,
    });

    const DAIxContract = await sf.loadSuperToken("fDAIx");
    const DAIx = DAIxContract.address;

    const flowOp = DAIxContract.createFlow({
      sender,
      receiver,
      flowRate,
    });

    await flowOp.exec(signer);
  } catch (err) {
    console.log(err);
  }
};

export const updateFlow = async (sender: string, receiver: string, flowRate: string) => {
    //@ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  try {
    const sf = await Framework.create({
      chainId: 80001,
      provider: provider,
    });

    const DAIxContract = await sf.loadSuperToken("fDAIx");
    const DAIx = DAIxContract.address;
    
    const flowOp = DAIxContract.updateFlow({
      sender,
      receiver,
      flowRate,
    });

    await flowOp.exec(signer);

  } catch (err) {
    console.log(err);
  }
};

export const deleteFlow = async (sender: string, receiver: string) => {
      //@ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  try {
    const sf = await Framework.create({
      chainId: 80001,
      provider: provider,
    });

    const DAIxContract = await sf.loadSuperToken("fDAIx");
    const DAIx = DAIxContract.address;
    
    const flowOp = DAIxContract.deleteFlow({
      sender,
      receiver,
    });

    await flowOp.exec(signer);

  } catch (err) {
    console.log(err);
  }
}

export const authorizeFullControl = async (operator: string) => {
  //@ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const sf = await Framework.create({
    chainId: 80001,
    provider: provider,
  });

  const DAIxContract = await sf.loadSuperToken("fDAIx");
  const DAIx = DAIxContract.address;

  try {
    const fullControlOperation = sf.cfaV1.authorizeFlowOperatorWithFullControl({
      superToken: DAIx,
      flowOperator: operator,
    });

    console.log("Updating your flow permissions...");

    const result = await fullControlOperation.exec(signer);
    console.log(result);

    console.log("Congrats, you have authorized flow permission");
  } catch (err) {}
};

export const revokeFullControl = async (operator: string) => {
  //@ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const sf = await Framework.create({
    chainId: 80001,
    provider: provider,
  });

  const DAIxContract = await sf.loadSuperToken("fDAIx");
  const DAIx = DAIxContract.address;

  try {
    const updateFlowOperatorOperation =
      sf.cfaV1.revokeFlowOperatorWithFullControl({
        superToken: DAIx,
        flowOperator: operator,
      });

    console.log("Revoking your flow permissions...");

    const result = await updateFlowOperatorOperation.exec(signer);
    console.log(result);

    console.log(`Congrats - you've just revoked  flow permissions`);
  } catch (err) {
    console.log(err);
  }
};

export const createOrRevokePermission = async (
  flowRate: string,
  operator: string,
  permission: number
) => {
  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const sf = await Framework.create({
    chainId: 80001,
    provider: provider,
  });

  const DAIxContract = await sf.loadSuperToken("fDAIx");
  const DAIx = DAIxContract.address;
  try {
    const updateFlowOperatorOperation = sf.cfaV1.updateFlowOperatorPermissions({
      flowOperator: operator,
      permissions: permission,
      flowRateAllowance: flowRate,
      superToken: DAIx,
    });

    console.log("Updating your flow permissions...");

    const result = await updateFlowOperatorOperation.exec(signer);
    console.log(result);

    console.log(`Congrats - you've just updated flow permissions`);
  } catch (error) {
    console.log(
      "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
  }
};
