import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { quote: "" };
  }
  getQuote() {
    fetch("/quote")
        .then(res => res.text())
        .then(res => this.setState({ quote: res }));
  }
  componentDidMount() {
    this.getQuote();
    this.interval = setInterval(() => this.getQuote(), 10000);

  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <p className="Title-text">Meditations</p>
        </div>
        <div className="App-body">
          <p className="Body-text">
            {this.state.quote}
          </p>
        </div>
        <div className="App-footer">
          <p className="Footer-text">Marcus Aurelius</p>
        </div>
      </div>
    );
  }
}

export default App;
