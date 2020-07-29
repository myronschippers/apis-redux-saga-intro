import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './App.css';

// CUSTOM COMPONENTS
import AppLayout from '../AppLayout/AppLayout';

class App extends Component {
  state = {
    newElement: '',
  }

  //
  // COMPONENT LIFECYCLE
  // ------------------------------

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_ELEMENTS',
    });
  }

  //
  // EVENT HANDLERS
  // ------------------------------

  handleChange = (event) => {
    this.setState({
      newElement: event.target.value,
    });
  }

  handleClick = () => {
    this.props.dispatch({
      type: 'POST_ELEMENT',
      payload: this.state
    });
  }

  render() {
    return (
      <AppLayout>
        <div className="formWrap">
          {/* BUTTON ONE INCREMENTS */}
          {/* <button
            className="btn"
            onClick={() => this.props.dispatch({ type: 'BUTTON_ONE' })}
          >
            Button One
          </button> */}
          {/* BUTTON TWO DECREMENTS */}
          {/* <button
            className="btn"
            onClick={() => this.props.dispatch({ type: 'BUTTON_TWO' })}
          >
            Button Two
          </button> */}

          {/* ADDING ELEMENTS TO THE SERVER */}
          <input
            className="field"
            value={this.state.newElement}
            onChange={this.handleChange}
          />
          <button
            className="btn"
            onClick={this.handleClick}
          >
            Add Element
          </button>
        </div>

        <pre className="txt_lg">{JSON.stringify(this.props.store)}</pre>
      </AppLayout>
    );
  }
}

const mapStoreToProps = store => ({
    store
});

export default connect(mapStoreToProps)(App);
