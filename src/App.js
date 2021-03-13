import './App.css';
import React from 'react';
import {CardFabric} from './CardFabric';

class App extends React.Component {
  
  render() {
    return (
      <div id="App" onClick={this.handleClick}>
        <CardFabric>
          
        </CardFabric>
      </div>
    );
  }
}



export default App;
