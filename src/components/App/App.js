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
    this.getElements();
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
    this.postElement();
  }

  //
  // API CALLS
  // ------------------------------

  getElements() {
    axios.get('/api/element')
      .then(response => {
        this.props.dispatch({ type: 'SET_ELEMENTS', payload: response.data });
      })
      .catch(error => {
          console.log('error with element get request', error);
      });
  }

  postElement() {
    axios.post('/api/element', this.state)
      .then(() => {
          this.getElements();
          this.setState({
            newElement: '',
        });
      })
      .catch(error => {
        console.log('error with element get request', error);
      });
  }

  render() {
    return (
      <AppLayout>
        <div className="formWrap">
          <button
            className="btn"
            onClick={() => this.props.dispatch({ type: 'BUTTON_ONE' })}
          >
            Button One
          </button>
          <button
            className="btn"
            onClick={() => this.props.dispatch({ type: 'BUTTON_TWO' })}
          >
            Button Two
          </button>

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
