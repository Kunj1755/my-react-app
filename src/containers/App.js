import React, { PureComponent } from "react";
import classes from "../containers/App.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
// withClass doe not qualify for a component as it just returns another function, not JSX
import withClass from "../hoc/withClass";
import Auxi from "../hoc/Auxi";

// false is the default value for the context
// AuthContext is a component (createContext create a component)
export const AuthContext = React.createContext(false);

class App extends PureComponent {
  constructor(props) {
    super(props);
    console.log("[App.js] Inside Constructor", props);
    this.state = {
      persons: [
        { id: "dudu", name: "Ram", age: 20 },
        { id: "wjow", name: "Shyam", age: 25 },
        { id: "ywey", name: "Mohan", age: 28 }
      ],
      otherState: "some other value",
      showPersons: false,
      toggleClicked: 0,
      authenticated: false
    };
  }

  componentWillMount() {
    console.log("[App.js] Inside componentWillMount()");
  }

  componentDidMount() {
    console.log("[App.js] Inside componentDidMount()");
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(
  //     "[UPDATE App.js] Inside shouldComponentUpdate",
  //     nextProps,
  //     nextState
  //   );
  //   return nextState.persons !== this.state.persons ||
  //     nextState.showPersons !== this.state.showPersons;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log(
      "[UPDATE App.js] Inside componentWillUpdate",
      nextProps,
      nextState
    );
  }

  componentDidUpdate() {
    console.log("[UPDATE App.js] Inside componentDidUpdate");
  }

  /*state = {
    persons: [
      { id: "dudu", name: "Ram", age: "20" },
      { id: "wjow", name: "Shyam", age: "25" },
      { id: "ywey", name: "Mohan", age: "28" }
    ],
    otherState: "Default state",
    showPersons: false
  };*/
  // The event object is automatically passed by javascript.
  nameChangedHandler = (event, id) => {
    // We want to update the state of the person but only for one into which input field we typed
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // Not a good practice to mutate state directly. A person in persons array is a javascript object. Javascript objects are reference types. So we should not mutate them directly bcz we only get a pointer when we reach put to person in the next statement. Hence we would mutate the original object to which a pointer points.
    //const person = this.state.persons[personIndex];
    // Better approach (ES6)
    const person = {
      ...this.state.persons[personIndex]
    };
    // Alternative approach
    //const person = Object.assign({}, this.state.persons[personIndex]);
    // Manipulating the copied object, not the original one
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  };

  deletePersonHandler = personIndex => {
    //const persons = this.state.persons.slice(); //--> Approach 1
    const persons = [...this.state.persons]; // --> Approach 2 (ES6)
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState((prevState, props) => {
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      }
    });
  }

  loginHandler = () => {
    this.setState({ authenticated: true });
  }

  render() {
    console.log("[App.js] Inside render()");
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
        // isAuthenticated={this.state.authenticated}
        />
      );
    }

    // let classes = ['red', 'bold'].join(); // "red bold"
    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red); // classes=['red']
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold); // classes=['red', 'bold']
    }

    return (
      <Auxi>
        <button onClick={() => { this.setState({ showPersons: true }) }}>Show Persons</button>
        <Cockpit
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          login={this.loginHandler}
          clicked={this.togglePersonsHandler}
        />
        <AuthContext.Provider value={this.state.authenticated}>{persons}</AuthContext.Provider>
      </Auxi>
    );
  }
}
export default withClass(App, classes.App);
