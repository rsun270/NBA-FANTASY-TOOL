import React, { Component } from "react";
import SelectYourTeam from "./components/SelectYourTeam";
import SelectTheirTeam from "./components/SelectTheirTeam";
import Results from "./components/Results";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamCode: "ATL",
    };
  }

  render() {
    return (
      <div className="App">
        <h1>NBA Fantasy 9-Cat Tool</h1>
        <h2>
          Enter your team and your opponent's team below and we will show you
          how you can improve your team!
        </h2>

        <div class="body">
          <div class="col">
            <h3>Team 1</h3>
            <SelectYourTeam />
          </div>
          <div class="col">
            <h3>Team 2</h3>
            <SelectTheirTeam />
          </div>
          <div>{/* <Results /> */}</div>
        </div>
      </div>
    );
  }
}

export default App;
