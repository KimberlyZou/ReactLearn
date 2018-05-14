import React, { Component } from 'react';
import './App.scss';
import Mart from './component/Mart/Mart'
import { Button } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App" >
        <Mart />
        <Button bsStyle="primary">Primary</Button>
      </div>
    );
  }
}

export default App;
