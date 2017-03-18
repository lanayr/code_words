import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Welcome to React</h2>
        </div>
        <p className='App-intro'>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div> 
          <Spy />
        </div>
        <div> 
          <Board />
        </div>
      </div>
    );
  }
}

function shuffle(array) {  
  var ctr = array.length, temp, index;  
  
  // While there are elements in the array  
  while (ctr > 0) {  
  // Pick a random index  
    index = Math.floor(Math.random() * ctr);  
  // Decrease ctr by 1  
    ctr--;  
  // And swap the last element with it  
     temp = array[ctr];  
     array[ctr] = array[index];  
     array[index] = temp;  
  }  
  return array;
}

function blueOrRed() {
  let colors = ['blue', 'red'];
  let index = Math.floor(Math.random() * 2);
  return colors[index]
}

const words = [
  'air', 
  'water', 
  'fire', 
  'earth', 
  'ang',
  'katara', 
  'zuko', 
  'suka', 
  'appa', 
  'momo',
  'iro', 
  'luffy', 
  'zoro', 
  'nami', 
  'robin',
  'chopper', 
  'sunny', 
  'franky', 
  'sanji', 
  'one piece',
  'naruto',
  'chakra', 
  'ninetails', 
  'sage mode', 
  'summon'
];

const colors = [
  'blue',
  'blue',
  'blue',
  'blue',
  'blue',
  'blue',
  'blue',
  'blue',
  'red',
  'red',
  'red',
  'red',
  'red',
  'red',
  'red',
  'red',
  'yellow',
  'yellow',
  'yellow',
  'yellow',
  'yellow',
  'yellow',
  'yellow',
  'grey',
  blueOrRed()
] 

class Card extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        value: null,
        color: 'grey'
      };
  }

  render() {
    var buttonStyle = {
           backgroundColor: this.state.color,
           color: "black",
           fontFamily: "monospace",
           fontSize: "28",
           textAlign: "center",
           height: 120,
           width: 180
        };

    return (
      <button className='card' style={buttonStyle} onClick={() => this.setState({color: this.props.color})}>
        {this.props.value} 
      </button>
    );
  }
}

class Board extends React.Component {
  constructor() {
    const randomizedCards = shuffle(words.slice(0));
    const randomizedColors = shuffle(colors.slice(0));
    super();
    this.state = {
      cards: { value: randomizedCards, colors: randomizedColors }
    };
  }

  renderCardsRow(position) {
    var rows = [];
    for (let i = position.start; i < position.end; i++) {
      rows.push(<Card value={this.state.cards.value[i]} color={this.state.cards.colors[i]} />)
    }
    return rows;
  }

  render() {
    const status = 'Card Name';
    return (
      <div>
        <div className='status'>{status}</div>
        <div className='board-row'>
          {this.renderCardsRow({start: 0, end: 5})}
        </div>
        <div className='board-row'>
          {this.renderCardsRow({start: 5, end: 10})}
        </div>
        <div className='board-row'>
          {this.renderCardsRow({start: 10, end: 15})}
        </div>
        <div className='board-row'>
          {this.renderCardsRow({start: 15, end: 20})}
        </div>
        <div className='board-row'>
          {this.renderCardsRow({start: 20, end: 25})}
        </div>
      </div>
    );
  }
}

class Spy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    const style = {
    height: 30,
    width: 60,
    };

    return (
      <button style={style} className='spy master' onClick={() => this.setState({value: 'X'})}>
        SpyMaster
      </button>
    );
  }
}


export default App;
