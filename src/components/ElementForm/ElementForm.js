import React, { Component } from 'react';
import { connect } from 'react-redux';

class ElementForm extends Component {
  state = {
    newElement: '',
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
      <div className="formWrap">
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
    );
  }
}

export default connect()(ElementForm);