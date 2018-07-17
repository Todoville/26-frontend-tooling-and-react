import React from 'react';
import ReactDom from 'react-dom';
import cowsay from 'cowsay-browser';
import Header from './components/Header/Header';
import './style/main.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      message: 'Hi! This is what I say on startup. Play with the input fields to change it up!',
      first: '',
      second: '',
      firstItems: [],
      secondItems: [],
    };
  }

  handleCounterIncrement = () => {
    this.setState((previousState) => {
      if (typeof previousState.counter === 'string') {
        previousState.counter = parseInt(previousState.counter, 10);
      }
      return {
        counter: previousState.counter + 1,
      };
    });
  }

  handleCounterDecrement = () => {
    this.setState((previousState) => {
      return {
        counter: previousState.counter -1, 
      };
    });
  }

  setCounter = (e) => {
    const { value } = e.target;
    this.setState({ counter: value });
  }

  handleInputChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState((previousState) => {
      const firstItems = previousState.firstItems.concat(this.state.first);
      const secondItems = previousState.secondItems.concat(this.state.second);
      return {
        firstItems,
        secondItems,
        first: '',
        second: '',
      };
    });
  }

  // getIntersection = (firstItems, secondItems) => {

  // }

  render() {
    return (
      <div className="cowsay">
        <Header></Header>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="first">Type something here.</label>
          <input
            type="text"
            name="first"
            onChange={ this.handleInputChange }
            value={ this.state.first }
          />
          <label htmlFor="second">Type something here.</label>
          <input 
            type="text"
            name="second"
            onChange={ this.handleInputChange }
            value={ this.state.second }
          />
          <button type="submit">Submit Form</button>
          </form>
          <ul className="first-list">
            <h2>List no. 1</h2>
            {
              this.state.firstItems.map((item, index) => <li key={index}>{item}</li>)
            }
            </ul>
            <ul className="second-list">
              <h2>List no. 2</h2>
              {
                this.state.secondItems.map((item, index) => <li key={index}>{item}</li>)
              }
            </ul>
            <pre>
              {
                cowsay.say({
                  text: this.state.message,
                })
              }
            </pre>
            <div className="counter">
              <h2>The counter is at: { this.state.counter }</h2>
              <button onClick={ this.handleCounterIncrement}>Increment the Counter!</button>
              <button onClick={ this.handleCounterDecrement}>Decrement the Counter!</button>
              <input  
                type="number" onChange={ this.setCounter }
                value={ this.state.counter }
              />
            </div>
          </div>
    );
  }
}

const rootNode = document.createElement('div');
document.body.appendChild(rootNode);
ReactDom.render(<App />, rootNode);
