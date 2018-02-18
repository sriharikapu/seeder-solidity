/* eslint import/no-mutable-exports: 0 */

import Web3 from 'web3';

const getNetworkName = (id) => {
  switch (id) {
    case 1:
      return 'mainnet';
    case 2:
      return 'morden';
    case 3:
      return 'ropsten';
    case 4:
      return 'rinkeby';
    case 42:
      return 'kovan';
    default:
      return 'localhost';
  }
};

class HybridWeb3 {
  constructor(onChange) {
    this.onChange = onChange;
    this.setupWeb3s();
  }

  setupWeb3s() {
    this.setupRpcWeb3();
    this.setupWsWeb3();
  }

  setupRpcWeb3() {
    if (typeof window !== 'undefined') {
      // set MetaMask web3 at v1.0
      if (typeof window.web3 !== 'undefined' && typeof window.web3.currentProvider !== 'undefined') {
        this.rpcWeb3 = new Web3(window.web3.currentProvider);
      }
    }
  }

  setupWsWeb3() {
    /* global ETH_URL */
    this.wsWeb3 = new Web3(ETH_URL);
  }

  init() {
    // set ws network
    this.wsWeb3.eth.net.getId((error, id) => {
      this.wsNetworkId = id;
      // if no rpc, no need to set up the interval
      if (!this.rpcWeb3) {
        return;
      }

      setInterval(() => {
        this.checkNetwork();
        this.checkAccount();
      }, 1000);
    });
  }

  checkNetwork() {
    this.rpcWeb3.eth.net.getId((error, id) => {
      if (this.rpcNetworkId !== id) {
        this.rpcNetworkId = id;
        this.onChange('network', getNetworkName(id));
        this.onChange('isCorrectNetwork', id === this.wsNetworkId);
      }
    });
  }

  checkAccount() {
    this.rpcWeb3.eth.getAccounts((error, accounts) => {
      const [account] = accounts;
      if (account !== this.account) {
        this.account = account;
        this.onChange('account', account);
      }
    });
  }
}

export default HybridWeb3;