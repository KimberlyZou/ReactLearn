import React, { Component } from 'react';
import './App.scss';
import Mart from './component/Mart/Mart';
import Footer from './component/Footer/Footer'
import Login from './component/Login/Login'
import { Button } from 'react-bootstrap';
import AppIcon from './component/AppIcon/AppIcon'

class App extends Component {
  render() {
    return (
      <div className="App" >
        <Login/>
        {/* <Mart />
        <Button bsStyle="primary">Primary</Button> */}
        <div className='appContent'>
          <AppIcon/>
          <AppIcon/>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;