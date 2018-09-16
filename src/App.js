import React from "react";
import Userdata from "./Userdata";
import axios from "axios";
import "../css/App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "Bhanu",
      model: []
    };
  }

  render() {
    return (
      <div className="App">
        <Userdata
          className="form"
          name={this.state.name}
          title="Registration"
          model={[
            {
              label: "Email address",
              type: "email",
              isOptional: false,
              isHidden: false
            },
            {
              label: "Gender",
              type: "radio",
              value: [
                "M (Male)",
                "F (Female)",
                "X (Indeterminate/Intersex/Unspecified)"
              ],
              isOptional: true
            },
            {
              label: "State",
              type: "select",
              value: ["NSW", "QLD", "SA", "TAS", "VIC", "WA", "NT", "ACT"],
              default: "ACT"
            },
            { label: "Contact number", type: "telephone" },
            { type: "hidden", value: 1537076811235, isHidden: true }
          ]}
        />
      </div>
    );
  }
}
export default App;
