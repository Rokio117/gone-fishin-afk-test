import React, { Component } from "react";
import "./fish-test-two.css";
import "./upAnimations.css";
import "./fishAnimations.css";

class FishTestTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lureTop: -2,
      glasses: 50,
      lureHeight: 2,
      lureWidth: 1.5,
      lureAnimation: false,
      lureSpeed: 0.75,
      moveDisabled: false,
      animationTimingFunction: false,
      fishSpawn: false,
      slot1: "visible",
      slot2: "visible",
      slot3: "visible",
      slot4: "visible",
      slot5: "visible",
      slot6: "visible",
      slot7: "visible",
      slot8: "visible",
      slot9: "visible",
      slot11: "visible",
      slot12: "visible",
      slot13: "visible",
      slot14: "visible",
      slot15: "visible",
      slot16: "visible",
      slot17: "visible",
      slot18: "visible",
      slot19: "visible",
      slot20: "visible"
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
      width: `${this.state.lureWidth}%`,
      position: "relative",
      left: `${this.state.glasses - this.state.lureWidth}%`,
      top: `${this.state.lureTop}%`,
      backgroundColor: "black",
      animation: animationFormat(),
      animationTimingFunction: this.state.animationTimingFunction
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
          lureAnimation: `${animationChoice("up")}`,
          animationTimingFunction: "linear"
        });
      }
    };

    const lowerLure = () => {
      if (this.state.lureTop <= 95) {
        console.log("lowered");
        this.setState({
          lureTop: this.state.lureTop + 5,
          lureAnimation: `${animationChoice("down")}`,
          animationTimingFunction: "linear"
        });
      }
    };

    let animationTimeout;

    const animationDuration = () => {
      animationTimeout = window.setTimeout(
        enableMovements,
        this.state.lureSpeed * 1000
      );
    };

    const enableMovements = () => {
      console.log("movements enabled");
      this.setState({ moveDisabled: false, animationTimingFunction: false });
    };

    const fishHeight = fishNumber => {
      return fishNumber;
    };

    const fishStyles = fishNumber => {
      const slotNum = (fishNumber - 1) / 3 + 1;
      //console.log(this.state[`slot${fishNumb}`], fishNumb);
      return {
        visibility: this.state[`slot${slotNum}`],
        //display: `${this.state[`slot${fishNumber}`]}`,
        height: "2%",
        width: "100px",
        backgroundColor: "blue",
        animation: "swim1 16s",
        //marginTop: `${fishHeight(fishNumber)}%`,
        position: "relative",
        top: `${fishHeight(fishNumber)}%`,
        //top: "1%",
        left: "50%",
        animationTimingFunction: "linear"
      };
    };
    // const fish1 = () => {
    //   return <div id="fish" style={fishStyles(1)}></div>;
    // };
    // const fish2 = () => {
    //   return <div id="fish" style={fishStyles(4)}></div>;
    // };
    // const fish3 = () => {
    //   return <div id="fish" style={fishStyles(7)}></div>;
    // };
    // const fish4 = () => {
    //   return <div id="fish" style={fishStyles(25)}></div>;
    // };
    // const fish5 = () => {
    //   return <div id="fish" style={fishStyles(33)}></div>;
    // };
    // const fish6 = () => {
    //   return <div id="fish" style={fishStyles(41)}></div>;
    // };
    // const fish7 = () => {
    //   return <div id="fish" style={fishStyles(49)}></div>;
    // };
    // const fish8 = () => {
    //   return <div id="fish" style={fishStyles(57)}></div>;
    // };
    // const fish9 = () => {
    //   return <div id="fish" style={fishStyles(65)}></div>;
    // };
    // const fish10 = () => {
    //   return <div id="fish" style={fishStyles(73)}></div>;
    // };

    const fishPercent = () => {
      let fishList = [1];
      let growth = 1;
      for (let i = 1; i <= 19; i++) {
        fishList.push(growth + 3);
        growth = growth + 3;
      }
      return fishList;
    };

    const allFish = () => {
      if (this.state.fishSpawn) {
        let number = 0;
        return fishPercent().map(fishNumber => {
          number++;
          return (
            <div
              class={`fish${number}`}
              id={`fish${number}`}
              style={fishStyles(fishNumber)}
            ></div>
          );
        });
      }
    };

    const collisionDetection = () => {
      const collideLure = (this.state.lureTop - 3) / 5 + 1;
      console.log(this.state.lureTop, collideLure);
      if (this.state[`slot${collideLure}`] === "visible") {
        this.setState({ [`slot${collideLure}`]: "hidden" });
      }
    };

    return (
      <>
        <button
          onClick={e => {
            e.preventDefault();
            this.setState({ fishSpawn: true });

            window.setTimeout(collisionDetection, 8000);
          }}
        >
          Spawn
        </button>
        <button
          disabled={this.state.moveDisabled}
          onClick={e => {
            e.preventDefault();
            this.setState({ moveDisabled: true });
            animationDuration();
            raiseLure();
          }}
        >
          ^
        </button>
        <button
          disabled={this.state.moveDisabled}
          onClick={e => {
            e.preventDefault();
            this.setState({ moveDisabled: true });
            animationDuration();
            lowerLure();
          }}
        >
          v
        </button>
        <div id="lake" style={lakeStyles}>
          <div id="lure" style={lureStyles}></div>
          {allFish()}
          {/* {fish1()}
          {fish2()}
          {fish3()}
          {fish4()}
          {fish5()}
          {fish6()}
          {fish7()}
          {fish8()}
          {fish9()}
          {fish10()} */}
        </div>
      </>
    );
  }
}

export default FishTestTwo;
