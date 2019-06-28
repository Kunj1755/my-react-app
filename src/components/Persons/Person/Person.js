import React, { Component } from "react";
import withClass from "../../../hoc/withClass";
import classes from "../../../components/Persons/Person/Person.css";
import Auxi from "../../../hoc/Auxi";
import PropTypes from 'prop-types';

class Person extends Component {
  constructor(props) {
    super(props);
    console.log("[Person.js] Inside Constructor", props);
    this.inputElement = React.createRef();
  }

  componentWillMount() {
    console.log("[Person.js] Inside componentWillMount()");
  }

  componentDidMount() {
    console.log('[Person.js] Inside componentDidMount()');
    if (this.props.position === 0) {
      // this.inputElement.focus();
      // current holds the reference to the element we assign the reference to
      this.inputElement.current.focus();
    }
  }
  focus() {
    this.inputElement.current.focus();
  }

  render() {
    console.log("[Person.js] Inside render()");
    return (
      <Auxi>
        <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
        <p>{this.props.children}</p>
        <input
          // ref={(inp) => { this.inputElement = inp }}
          ref={this.inputElement}
          type="text"
          onChange={this.props.changed}
          value={this.props.name} />
      </Auxi>
    )
  }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
}

export default withClass(Person, classes.Person);
