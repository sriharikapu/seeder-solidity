import React, { Component } from 'react';
import './App.css';
import { AragonApp, AppBar, Countdown } from '@aragon/ui'
import HybridWeb3 from './utils/HybridWeb3';
import { epochToDate, mapCandidates } from './utils/parsers';
import AppLayout from './components/AppLayout'
import VotesTable from './components/VotesTable';

const GAS = 200000;
const GAS_PRICE = 2000000000;

const getWeb3Instance = (web3, contract) => {
  if (!web3) {
    return null;
  }

  return new web3.eth.Contract(contract.abi, contract.address);
};

class App extends Component {
  state = {
    candidates: [],
    contractAddress: null,
    network: null,
    account: null,
    endTime: null,
  }

  componentDidMount() {
    // create metamask rpc/seedom ws web3 object
    this.hybridWeb3 = new HybridWeb3(this.handleHybridWeb3Event);
    // hybrid web3 polls for metamask changes
    this.setupContract(() => {
      this.hybridWeb3.init();
    });
  }

  handleHybridWeb3Event = (event, value) => {
    const newState = this.state;
    if (event === 'network') {
      newState.network = value;
    } else if (event === 'account') {
      newState.account = value;
    }

    this.setState(newState, this.retrieveData);
  }


  handleRetrieve(method) {
    const { account } = this.state;
    return method.call({ from: account })
  }

  async retrieveData() {
    const { contract, network, account } = this.state;
    if (contract && network && account) {
      const candidateData = await this.handleRetrieve(contract.ws.methods.getCharities());
      const userVoteData = await this.handleRetrieve(contract.ws.methods.getVotes());
      const candidates = mapCandidates(candidateData, userVoteData);
      const endTime = await this.handleRetrieve(contract.ws.methods.endTime());
      this.setState({
        candidates,
        endTime
      });
    }
  }

  handleSend = (method) => {
    const { account } = this.state;
    const { contract } = this.state;
    const options = {
      to: contract.address,
      from: account,
      gas: GAS,
      gasPrice: GAS_PRICE,
    };

    method.send(options).then(receipt => {
      console.log('send');
    });
  }

  setupContract(done) {
    /* global ETH_CONTRACTS */
    let firstContract = ETH_CONTRACTS[0];

    let contract = {
      address: firstContract.address,
      ws: getWeb3Instance(this.hybridWeb3.wsWeb3, firstContract),
      rpc: getWeb3Instance(this.hybridWeb3.rpcWeb3, firstContract),
    }

    this.setState({
      contract
    }, done);
  }

  handleVote = ({ id, score }) => {
    const { contract } = this.state;

    this.handleSend(contract.rpc.methods.vote(id, score));
  }

  handleRemoveVote = ({ id }) => {
    console.log(id);
  }

  render() {
    const {
      candidates,
      endTime
    } = this.state;

    return (
      <AragonApp publicUrl="/">
        <AppLayout>
          <AppLayout.Header>
            <AppBar
              title="Seedom"
              endContent={
                <Countdown end={epochToDate(endTime)} />
              }
            />

          </AppLayout.Header>
          <AppLayout.ScrollWrapper>
            <AppLayout.Content>
              <VotesTable
                candidates={candidates}
                onSelectVote={this.handleVote}
                onRemoveVote={this.handleRemoveVote}
              />
            </AppLayout.Content>
          </AppLayout.ScrollWrapper>
        </AppLayout>
      </AragonApp>
    );
  }
}

export default App;
