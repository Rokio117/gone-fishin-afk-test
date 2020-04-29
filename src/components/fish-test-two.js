import React, { Component } from "react";
import "./fish-test-two.css";
import "./upAnimations.css";
import "./fishAnimations.css";
import fish from "./fish";

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
      slot1: { visibility: "visible", fish: "" },
      slot2: { visibility: "visible", fish: "" },
      slot3: { visibility: "visible", fish: "" },
      slot4: { visibility: "visible", fish: "" },
      slot5: { visibility: "visible", fish: "" },
      slot6: { visibility: "visible", fish: "" },
      slot7: { visibility: "visible", fish: "" },
      slot8: { visibility: "visible", fish: "" },
      slot9: { visibility: "visible", fish: "" },
      slot11: { visibility: "visible", fish: "" },
      slot12: { visibility: "visible", fish: "" },
      slot13: { visibility: "visible", fish: "" },
      slot14: { visibility: "visible", fish: "" },
      slot15: { visibility: "visible", fish: "" },
      slot16: { visibility: "visible", fish: "" },
      slot17: { visibility: "visible", fish: "" },
      slot18: { visibility: "visible", fish: "" },
      slot19: { visibility: "visible", fish: "" },
      slot20: { visibility: "visible", fish: "" },
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
      animationTimingFunction: this.state.animationTimingFunction,
    };

    const animationChoice = (direction) => {
      console.log(direction);
      if (direction === "down") {
        console.log("d", this.state.lureTop + 5);
        return `d${this.state.lureTop + 5}`;
      } else return `u${this.state.lureTop}`;
    };

    const lakeStyles = {
      height: `70vh`,
      border: "1px solid black",
    };

    const raiseLure = () => {
      if (this.state.lureTop >= 0) {
        console.log("raised");
        this.setState({
          lureTop: this.state.lureTop - 5,
          lureAnimation: `${animationChoice("up")}`,
          animationTimingFunction: "linear",
        });
      }
    };

    const lowerLure = () => {
      if (this.state.lureTop <= 95) {
        console.log("lowered");
        this.setState({
          lureTop: this.state.lureTop + 5,
          lureAnimation: `${animationChoice("down")}`,
          animationTimingFunction: "linear",
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

    const fishHeight = (fishNumber) => {
      return fishNumber;
    };

    const fishStyles = (fishNumber) => {
      //retrieves slot fish is supposed to be in
      const slotNum = (fishNumber - 1) / 3 + 1;
      //console.log(this.state[`slot${fishNumb}`], fishNumb);
      const topHeight = fishHeight(fishNumber) - 5 / 2;
      return {
        visibility: this.state[`slot${slotNum}`],
        //display: `${this.state[`slot${fishNumber}`]}`,
        height: "10%",
        width: "100px",
        backgroundColor: "blue",
        animation: "swim1 16s",
        //marginTop: `${fishHeight(fishNumber)}%`,
        //position: "absolute",
        position: "relative",
        //top: `${fishHeight(fishNumber)}%`,
        top: `${topHeight}%`,
        left: "50%",
        animationTimingFunction: "linear",
      };
    };

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
        return fishPercent().map((fishNumber) => {
          number++;
          return (
            <div
              class={`fish`}
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
      console.log(this.state.moveDisabled, "moveDisabled");
      if (collideLure > 0) {
        if (
          this.state[`slot${collideLure}`].visibility === "visible" &&
          !this.state.moveDisabled
        ) {
          this.setState({ [`slot${collideLure}`.visibility]: "hidden" });
        }
      }
    };

    const spawnFish = () => {
      console.log("fish spawned");
      console.log(this.state.slot1.visibility, "this.state.slot1.visibility");
      if (!this.state.fishSpawn) {
        this.setState({ fishSpawn: true });
        window.setTimeout(collisionDetection, 8000);
      }
    };
    const backgroundStyles = {
      height: "30vh",
    };

    // const specialStyles = {
    //   height: "4%",
    //   width: "12%",
    //   backgroundColor: "orange",
    //   position: "absolute",
    //   top: "30vh",
    //   left: "50%",
    //   marginTop:`${70/}`
    // };

    return (
      <>
        <div id="background" style={backgroundStyles}>
          {spawnFish()}
          <button
            id="spawnButton"
            onClick={(e) => {
              e.preventDefault();
              this.setState({ fishSpawn: true });

              window.setTimeout(collisionDetection, 8000);
            }}
          >
            Spawn
          </button>
          <button
            class="lureButton"
            disabled={this.state.moveDisabled}
            onClick={(e) => {
              e.preventDefault();
              this.setState({ moveDisabled: true });
              animationDuration();

              //window.setTimeout(raiseLure(), this.state.lureSpeed * 10);
              raiseLure();
            }}
          >
            ^
          </button>
          <button
            class="lureButton"
            disabled={this.state.moveDisabled}
            onClick={(e) => {
              e.preventDefault();
              this.setState({ moveDisabled: true });
              animationDuration();
              lowerLure();
            }}
          >
            v
          </button>
        </div>
        <div id="lake" style={lakeStyles}>
          <div id="lure" style={lureStyles}></div>
          {allFish()}
          {/* <div style={specialStyles}></div> */}
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
