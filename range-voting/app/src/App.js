import Web3 from 'web3';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Aragon from '@aragon/client';
import { AragonApp, AppBar, Card } from '@aragon/ui'
import AppLayout from './components/AppLayout'
import VotesTable from './components/VotesTable';

const wrapper = new Aragon(
  '0x94b8a1c323ef9da0b9df74ba0edb45fd7ddd8151',
  {
    provider: new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws'),
    ensRegistryAddress: '0xf242918942086016bbeb036ce93a9b42124016ef'
  }
)

// Listen to events and build app state
// app.store((state, event) => {
//   debugger;
//   // Initial state
//   if (state === null) state = 0

//   // Build state
//   if (event.event === 'Decrement') {
//     state--

//     // Send notification
//     app.notify('Counter decremented', `The counter was decremented to ${state}`)
//   }
//   if (event.event === 'Increment') {
//     state++
//     app.notify('Counter incremented', `The counter was incremented to ${state}`)
//   }

//   return state
// })

// app.state().subscribe((state) => {
//   debugger;
//   console.log(state);
// });

const CANDIDATES = [
  {
    id: '12345',
    name: 'EFF',
  },
  {
    id: '67890',
    name: 'Wikipedia'
  }
];

class App extends Component {
  state = {
    candidates: CANDIDATES,
    createVoteVisible: false,
    currentVote: null,
    voteVisible: false,
    voteSidebarOpened: false,
  }

  render() {
    const {
      candidates
    } = this.state;

    return (
      <AragonApp publicUrl="/">
        <AppLayout>
          <AppLayout.Header>
            <AppBar title="Seedom">
            </AppBar>

          </AppLayout.Header>
          <AppLayout.ScrollWrapper>
            <AppLayout.Content>
              <VotesTable
                candidates={candidates}
              />
            </AppLayout.Content>
          </AppLayout.ScrollWrapper>
        </AppLayout>
      </AragonApp>
    );
  }
}

export default App;
