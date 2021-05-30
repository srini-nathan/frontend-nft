const ETHERSCAN_PREFIXES: Record<number, string> = {
	1: '',
	3: 'ropsten.',
	4: 'rinkeby.',
	5: 'goerli.',
	42: 'kovan.'
};
  
  const formatEtherscanLink = (
    type: "Account" | "Transaction",
    data: [number, string]
  ): string => {
    switch (type) {
      case "Account": {
        const [chainId, address] = data
        return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/address/${address}`
      }
      case "Transaction": {
        const [chainId, hash] = data
        return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/tx/${hash}`
      }
    }
  }
  
  export default formatEtherscanLink