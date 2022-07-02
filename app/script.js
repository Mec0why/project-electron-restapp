import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  state = {
    timerOn: false,
    timerStart: 4000,
    timerTime: 4000, // 1200000 for 20 min. 20000 for 20 sec.
    timerRest: false,
    timerRestTime: 20000,
  };

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      // timerStart: this.state.timerTime,
    });
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime,
        });
      } else if (!this.state.timerRest) {
        // clearInterval(this.timer);
        this.setState({
          timerRest: true,
          timerTime: this.state.timerRestTime,
          // timerStart: this.state.timerRestTime,
        });
      } else if (this.state.timerRest) {
        // clearInterval(this.timer);
        this.setState({
          timerRest: false,
          timerTime: this.state.timerStart,
          // timerStart: this.state.timerRestTime,
        });
      }
    }, 10);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({
      timerOn: false,
      timerRest: false,
      timerTime: this.state.timerStart,
    });
  };

  render() {
    const { timerTime, timerOn, timerRest } = this.state;

    let minutes = ('0' + Math.floor((timerTime / 60000) % 60)).slice(-2);
    let seconds = ('0' + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);

    return (
      <div>
        <h1>Protect your eyes</h1>
        {timerOn === false && (
          <div>
            <p>
              According to optometrists in order to save your eyes, you should
              follow the 20/20/20. It means you should to rest your eyes every
              20 minutes for 20 seconds by looking more than 20 feet away.
            </p>
            <p>
              This app will help you track your time and inform you when it's
              time to rest.
            </p>
          </div>
        )}
        {timerOn === true && (
          <div>
            {timerRest === false && <img src='./images/work.png' />}
            {timerRest === true && <img src='./images/rest.png' />}
            <div className='timer'>
              {minutes} : {seconds}
            </div>
          </div>
        )}
        {timerOn === false && (
          <button className='btn' onClick={this.startTimer}>
            Start
          </button>
        )}
        {timerOn === true && (
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
