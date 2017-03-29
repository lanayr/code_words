import React, { Component } from 'react';
import './App.css';
import file from './data.js';

class App extends Component {
  render() {
    return (
      <div className='App'>
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

function defaultCardColor() {
  return Array(25).fill('grey')
}

const words = file.data.slice(0)
const cardColors = [
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

const randomizedCards = shuffle(words.slice(0));
const randomizedColors = shuffle(cardColors.slice(0));

class Card extends React.Component {
  constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this)
  }

  
  handleChange() {
    const position = this.props.position
    this.props.onColorChange(position);
  }

  render() {
    var buttonStyle = {
           backgroundColor: this.props.color,
           color: "black",
           fontFamily: "monospace",
           fontSize: "28",
           textAlign: "center",
           height: 120,
           width: 240
        };

    return (
      <button className='card' style={buttonStyle} onClick={this.handleChange}>
        {this.props.value} 
      </button>
    );
  }
}

class Board extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      cards: randomizedCards, 
      colors: defaultCardColor
    };
  }

  handleClick(i) {
    const colors = this.state.cards.slice(0);
    colors[i] = randomizedColors[i];
    this.setState({colors: colors});
  }

  renderCardsRow(start, end) {
    const cards = this.state.cards;
    const colors = this.state.colors;
    var rows = [];
    for (let i = start; i < end; i++) {
      rows.push(<Card value={cards[i]} color={colors[i]} position={i} onColorChange={this.handleClick}/>)
    }
    
    return rows;
  }

  render() {
    var spyMasterButtonStyle = {
      backgroundColor: "green",
      color: "white",
      padding: 15,
      textAlign: "center",
      display: "inline-block",
    };

    var resetButtonStyle = {
      backgroundColor: "red",
      color: "white",
      padding: 15,
      textAlign: "center",
      display: "inline-block",
    };

    var newGameButtonStyle = {
      backgroundColor: "black",
      color: "white",
      padding: 15,
      textAlign: "center",
      display: "inline-block",
    };

    var headerStyle = {
      backgroundColor: "white",
      color: "black",
      textAlign: "center",
      display: "inline-block",
      fontSize: 16
    };

    return (
      <div>
        <header style={headerStyle}>
          <h1> CodeWords </h1>
          <button style={resetButtonStyle} onClick={() => this.setState({colors: defaultCardColor, cards: shuffle(randomizedCards.slice(0))})}> 
            NewGame
          </button>
          <button style={spyMasterButtonStyle} onClick={() => this.setState({colors: randomizedColors})}> 
            SpyMaster
          </button>
          <button style={newGameButtonStyle} onClick={() => this.setState({colors: defaultCardColor})}> 
            ResetColor
          </button>
        </header>
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
      </div>
    );
  }
}

export default App;
