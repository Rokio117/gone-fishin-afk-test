import React, { Component } from "react";
import "./fish-test-two.css";
import "./upAnimations.css";

class FishTestTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lureTop: -2,
      glasses: 50,
      lureHeight: 2,
      lureAnimation: false,
      lureSpeed: 1,
      moveDisabled: false
    };
  }
  render() {
    const animationFormat = () => {
      if (this.state.lureAnimation) {
        return `${this.state.lureAnimation} ${this.state.lureSpeed}s`;
      } else return this.state.lureAnimation;
    };
    const lureStyles = {
      display: "block",

      height: `${this.state.lureHeight}%`,
      width: "10px",
      position: "relative",
      left: `${this.state.glasses}%`,
      top: `${this.state.lureTop}%`,
      backgroundColor: "black",
      animation: animationFormat(),
      animationTimingFunction: "linear"
    };

    const animationChoice = direction => {
      console.log(direction);
      if (direction === "down") {
        console.log("d", this.state.lureTop + 5);
        return `d${this.state.lureTop + 5}`;
      } else return `u${this.state.lureTop}`;
    };

    const lakeStyles = {
      height: `850px`,

      border: "1px solid black"
    };

    const raiseLure = () => {
      if (this.state.lureTop >= 0) {
        console.log("raised");
        this.setState({
          lureTop: this.state.lureTop - 5,
          lureAnimation: `${animationChoice("up")}`
        });
      }
    };

    const lowerLure = () => {
      if (this.state.lureTop <= 95) {
        console.log("lowered");
        this.setState({
          lureTop: this.state.lureTop + 5,
          lureAnimation: `${animationChoice("down")}`
        });
      }
    };

    const fishStyles = {};
    return (
      <>
        <button
          disabled={this.state.moveDisabled}
          onClick={e => {
            e.preventDefault();
            raiseLure();
          }}
        >
          ^
        </button>
        <button
          disabled={this.state.moveDisabled}
          onClick={e => {
            e.preventDefault();

            lowerLure();
          }}
        >
          v
        </button>
        <div id="lake" style={lakeStyles}>
          <div id="lure" style={lureStyles}></div>
        </div>
      </>
    );
  }
}

export default FishTestTwo;
