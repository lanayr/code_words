import React, { Component } from 'react';
import './App.css';
import './Helper.js';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <h1> Code Words </h1>
        <Board />
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
      cardsProps: { value: randomizedCards, colors: randomizedColors },
      cards: []
    };
  }

  renderCardsRow(start, end) {
    var rows = [];
    for (let i = start; i < end; i++) {
      rows.push(<Card value={this.state.cardsProps.value[i]} color={this.state.cardsProps.colors[i]} />)
      this.state.cards.push(<Card value={this.state.cardsProps.value[i]} color={this.state.cardsProps.colors[i]} />)
    }
    
    return rows;
  }

  render() {
    var buttonStyle = {
      backgroundColor: "green",
      color: "white",
      padding: 15,
      textAlign: "center",
      display: "inline-block",
      fontSize: 16
    };

    return (
      <div>
        <div className='board-row'>
          {this.renderCardsRow(0, 5)}
        </div>
        <div className='board-row'>
          {this.renderCardsRow(5, 10)}
        </div>
        <div className='board-row'>
          {this.renderCardsRow(10, 15)}
        </div>
        <div className='board-row'>
          {this.renderCardsRow(15, 20)}
        </div>
        <div className='board-row'>
          {this.renderCardsRow(20, 25)}
        </div>
        <button style={buttonStyle} onClick={() => this.state.cards.map((card) => this.setState({color: card.color}))}> 
          SpyMaster
        </button>
      </div>
    );
  }
}

export default App;
