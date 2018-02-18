import React, { Component } from 'react';
import './App.css';
import { AragonApp, AppBar, Countdown } from '@aragon/ui'
import HybridWeb3 from './utils/HybridWeb3';
import { epochToDate } from './utils/parsers';
import AppLayout from './components/AppLayout'
import VotesTable from './components/VotesTable';

const CANDIDATES = [
  {
    id: '1',
    name: 'EFF',
    hasVoted: false
  },
  {
    id: '2',
    name: 'Wikipedia',
    score: 7,
    hasVoted: true
  },
  {
    id: '3',
    name: 'Jones Creme Soda',
    score: 7,
    hasVoted: true
  }
];

const endTime = (new Date().getTime() / 1000) + 1000;

const getWeb3Instance = (web3, contract) => {
  if (!web3) {
    return null;
  }

  return new web3.eth.Contract(contract.abi, contract.address);
};

class App extends Component {
  state = {
    candidates: CANDIDATES,
    createVoteVisible: false,
    currentVote: null,
    voteVisible: false,
    voteSidebarOpened: false,
  }

  componentDidMount() {
    this.hybridWeb3 = new HybridWeb3(this.handleHybridWeb3Event);
    this.setupContract(() => {
      console.log('yay');
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
    console.log(id);
    console.log(score);
  }

  handleRemoveVote = ({ id }) => {
    console.log(id);
  }

  render() {
    const {
      candidates
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
