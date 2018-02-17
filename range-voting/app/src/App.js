import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Aragon from '@aragon/client';
import { AragonApp } from '@aragon/ui'

const app = new Aragon();

// Listen to events and build app state
app.store((state, event) => {
  debugger;
  // Initial state
  if (state === null) state = 0

  // Build state
  if (event.event === 'Decrement') {
    state--

    // Send notification
    app.notify('Counter decremented', `The counter was decremented to ${state}`)
  }
  if (event.event === 'Increment') {
    state++
    app.notify('Counter incremented', `The counter was incremented to ${state}`)
  }

  return state
})

app.state().subscribe((state) => {
  debugger;
  console.log(state);
});

class App extends Component {
  render() {
    const ob = app.call('add', 'foo');
    debugger;
    return (
      <AragonApp publicUrl="/">
        Hello
      </AragonApp>
    );
  }
}

export default App;
