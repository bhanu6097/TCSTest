import React, { Component } from "react";
import "../css/Form.css";

class Userdata extends Component {
  constructor() {
    super();
    this.state = {
      Email: "",
      phone: "",
      stateValue: "ACT",
      gender: "",
      error: ""
    };
  }

  onChange = (event, type) => {
    var errorValue;
    if (type === "email") {
      this.setState({ Email: event.target.value });
    }
    if (type === "select") {
      this.setState({ stateValue: event.target.value });
    }

    if (type === "radio") {
      this.setState({ radio: event });
    }
    if (type === "telephone") {
      this.setState({ phone: event.target.value });
    }
  };

  validationCheck = () => {
    var errorValue;
    let validEmail = this.state.Email;
    let validPhone = this.state.phone;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var phnRegex = /^[0-9]{10}$/;
    if (validEmail !== null && validEmail !== undefined) {
      if (re.test(validEmail)) {
        errorValue = false;
        return errorValue;
      }
    } else {
      errorValue = true;
      return errorValue;
    }
    if (validPhone !== null) {
      if (phnRegex.test(validPhone)) {
        errorValue = false;
        return errorValue;
      }
      errorValue = true;
      return errorValue;
    }
  };

  onSubmit = e => {
    e.preventDefault();
    var check = this.validationCheck();
    this.setState({ error: check });
    if (!check) {
      var j = {
        Email: this.state.Email
      };
      var formData = JSON.stringify($("#Form").serializeArray());

      alert(formData);
    }
  };

  renderForm = () => {
    let model = this.props.model;

    let formUI = model.map(m => {
      let type = m.type || "text";
      let props = m.props || {};
      let isOptional = m.isOptional;
      let value = m.value;
      let isHidden = m.isHidden;
      let defaultkey = m.default;
      var error;

      //console.log("Printing M:::"+m.label)

      let input = (
        <input
          className="form-input"
          type={type}
          value={value}
          isOptional={isOptional}
          isHidden={isHidden}
          onError={Error}
          error={false}
          onChange={e => {
            this.onChange(event, type);
          }}
        />
      );
      if (type == "radio") {
        input = m.value.map(o => {
          let checked = o == value;
          // console.log("Checking checked o:" + o);
          // console.log("Checking checked value:" + value);
          return (
            <React.Fragment>
              <input
                {...props}
                className="form-input"
                type={type}
                value={value}
                isOptional={isOptional}
                isHidden={isHidden}
                value={o.value}
                onChange={e => {
                  this.onChange(o, type);
                }}
              />
              <label>{o}</label>
            </React.Fragment>
          );
        });
        input = <div className="form-group-radio">{input}</div>;
      }
      if (type == "select") {
        input = m.value.map(o => {
          let checked = o == defaultkey;
          //console.log("select: ", o, defaultkey);
          return (
            <option {...props} className="form-input" value={o}>
              {o}
            </option>
          );
        });

        // console.log("Select default: ", value);
        input = (
          <select
            value={this.state.stateValue}
            onChange={e => {
              this.onChange(event, type);
            }}
          >
            {input}
          </select>
        );
      }

      return (
        <div className="form-group">
          <label className="form-label">{m.label}</label>
          {input}
        </div>
      );
    });
    return formUI;
  };

  render() {
    let title = this.props.title || "Dynamic Form";
    return (
      <div className="form">
        <form
          className="dynamic-form"
          onSubmit={e => {
            this.onSubmit(e);
          }}
        >
          <h3 className="form-title">{title}</h3>
          {this.state.error ? <div>Please enter valid data</div> : <div />}
          {this.renderForm()}
          <div className="form-actions">
            <button type="submit">submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Userdata;
