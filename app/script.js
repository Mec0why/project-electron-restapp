import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 1200000,
  };

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime,
    });
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime,
        });
      } else {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
        alert('Countdown ended');
      }
    }, 10);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };

  resetTimer = () => {
    if (this.state.timerOn === false) {
      this.setState({
        timerTime: this.state.timerStart,
      });
    }
  };

  render() {
    const { timerTime, timerOn } = this.state;

    let minutes = ('0' + Math.floor((timerTime / 60000) % 60)).slice(-2);
    let seconds = ('0' + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);

    return (
      <div>
        <h1>Protect your eyes</h1>
        <p>
          According to optometrists in order to save your eyes, you should
          follow the 20/20/20. It means you should to rest your eyes every 20
          minutes for 20 seconds by looking more than 20 feet away.
        </p>
        <p>
          This app will help you track your time and inform you when it's time
          to rest.
        </p>
        <img src='./images/work.png' />
        <img src='./images/rest.png' />
        <div className='timer'>
          {minutes} : {seconds}
        </div>
        {timerOn === false && (
          <button className='btn' onClick={this.startTimer}>
            Start
          </button>
        )}
        {timerOn === true && timerTime >= 1000 && (
          <button className='btn' onClick={this.stopTimer}>
            Stop
          </button>
        )}
        <button className='btn btn-close'>X</button>
      </div>
    );
  }
}

render(<App />, document.querySelector('#app'));
