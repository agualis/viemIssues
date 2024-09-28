
import { useState } from 'react';
import { Address, createPublicClient, encodeFunctionData, http } from 'viem';
import { gnosis } from 'viem/chains';
import { balancerRelayerAbi } from './abis/balancerRelayerAbi';
import { gnosisRelayerAddress, relayerCalls } from './constants';

export function Examples() {

  const [result, setResult] = useState<Address | undefined>();
  const [error, setError] = useState<Error | undefined>();

  const encodedMulticall = encodeFunctionData({
    abi: balancerRelayerAbi,
    functionName: 'vaultActionsQueryMulticall',
    args: [relayerCalls],
  });


  const publicRpcUrl = 'https://rpc.gnosischain.com'
  // Use your ALCHEMY_API_KEY
  const ALCHEMY_API_KEY = undefined
  const alchemyRpcUrl = `https://gnosis-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`

  function multicall(rpcUrl: string) {
    setError(undefined)
    if (rpcUrl.includes('alchemy') && !ALCHEMY_API_KEY) return setError(new Error('You must set ALCHEMY_API_KEY'))
    const client = createPublicClient({
      transport: http(rpcUrl),
      chain: gnosis,
    })

    const zeroAddress: Address = '0x0000000000000000000000000000000000000000'
    client.call({
      // account: zeroAddress, // Uncomment this line to avoid alchemy rpc error
      to: gnosisRelayerAddress,
      data: encodedMulticall,
    }).then((res) => {
      setResult(res?.data)
    }).catch((error) => {
      setError(error)
    })
  }

  return (
    <>
      <h3>Viem multicall demo</h3>
      <div>
        <div>
          <h4>multicall with public rpc url</h4>
          <button onClick={() => multicall(publicRpcUrl)}>run public multicall</button>
        </div>
        <div>
          <h4>multicall with private rpc url (alchemy)</h4>
          <button onClick={() => multicall(alchemyRpcUrl)}>run private multicall</button>
        </div>
        {!error && result && <div className="container success"> Result: {result}</div>}
        {error && <div className="container error"> Error: {error.message}</div>}
      </div >
    </>
  )
}






