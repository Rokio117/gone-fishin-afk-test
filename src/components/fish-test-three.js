import React, { Component } from "react";
import fishTestThreeStyles from "./fish-test-three-styles";

class FishTestThree extends Component {
  constructor(props) {
    super(props);
    this.state = { lureHeight: 6, lureWidth: 2, glasses: 50, lureTop: 0 };
  }

  render() {
    const lakeStyles = {
      height: "70vh",
      border: "1px solid black",
    };
    const topStyles = {
      height: "30vh",
      border: "1px solid blue",
    };
    const lureStyles = {
      display: "block",

      height: `${this.state.lureHeight}%`,
      width: `${this.state.lureWidth}%`,
      position: "relative",
      left: `${this.state.glasses - this.state.lureWidth}%`,
      top: `${this.state.lureTop}%`,
      backgroundColor: "black",
      zIndex: "2",
      // animation: animationFormat(),
      // animationTimingFunction: this.state.animationTimingFunction
    };
    const moveUp = () => {};
    const hashStyles = {
      position: "relative",
      display: "block",
      height: "10%",
      boxSizing: "border-box",
      borderBottom: "1px solid black",
      zIndex: "1",
    };
    const hashTest = () => {
      for (let i = 0; i <= 20; i++) {
        return <div style={hashStyles}></div>;
      }
    };
    return (
      <div id="border">
        <div id="top" style={topStyles}></div>
        <div
          id="buttonContainer"
          // style={fishTestThreeStyles.lureButtons}
        >
          <button
            class="lureButton"
            disabled={this.state.moveDisabled}
            onClick={(e) => {
              e.preventDefault();
              //this.setState({ moveDisabled: true });
              // animationDuration();

              // //window.setTimeout(raiseLure(), this.state.lureSpeed * 10);
              // raiseLure();
            }}
          >
            ^
          </button>
          <button
            class="lureButton"
            disabled={this.state.moveDisabled}
            onClick={(e) => {
              e.preventDefault();
              //this.setState({ moveDisabled: true });
              // animationDuration();
              // lowerLure();
            }}
          >
            v
          </button>
        </div>
        <div id="lake" style={lakeStyles}>
          <div id="lure" style={lureStyles}></div>
          <div style={hashStyles}></div>
          <div style={hashStyles}></div>
          <div style={hashStyles}></div>
          <div style={hashStyles}></div>
          <div style={hashStyles}></div>
          <div style={hashStyles}></div>
          <div style={hashStyles}></div>
          <div style={hashStyles}></div>
          <div style={hashStyles}></div>
          <div style={hashStyles}></div>
        </div>
      </div>
    );
  }
}

export default FishTestThree;
