import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './App.css';

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
        <button onClick={() => this.props.dispatch({ type: 'BUTTON_ONE' })}>Button One</button>
        <button onClick={() => this.props.dispatch({ type: 'BUTTON_TWO' })}>Button Two</button>
        <input value={this.state.newElement} onChange={this.handleChange} />
        <button onClick={this.handleClick}>Add Element</button>
        <pre>{JSON.stringify(this.props.reduxState)}</pre>
      </AppLayout>
    );
  }
}

const mapStoreToProps = store => ({
    store
});

export default connect(mapStoreToProps)(App);
