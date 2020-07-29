import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './App.css';

// CUSTOM COMPONENTS
import AppLayout from '../AppLayout/AppLayout';
import ElementForm from '../ElementForm/ElementForm';

class App extends Component {

  //
  // COMPONENT LIFECYCLE
  // ------------------------------

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_ELEMENTS',
    });
  }

  render() {
    return (
      <AppLayout>
        <ElementForm />

        <pre className="txt_lg">{JSON.stringify(this.props.store)}</pre>
      </AppLayout>
    );
  }
}

const mapStoreToProps = store => ({
    store
});

export default connect(mapStoreToProps)(App);
