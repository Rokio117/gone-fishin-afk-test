import React, { Component } from "react";
import "./fishing-test.css";

class FishTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: 0,
      mouseDown: false,
      lineSpeed: 10,
      depth: 850,
      lureHeight: 10,
      fishDistance: 50,
      spawnFish: false
    };
  }

  render() {
    const styles = {
      display: "block",

      height: `${this.state.lureHeight}px`,
      width: "10px",
      position: "relative",
      left: "50%",
      top: `${this.state.top}px`,
      "background-color": "black"
    };
    let myTimeout;

    const holdTrigger = state => {
      myTimeout = window.setTimeout(holdDown, this.state.lineSpeed);
    };

    const holdDown = () => {
      this.setState({ top: this.state.top + 1 });
      const bottomDistance =
        this.state.depth - (this.state.top + this.state.lureHeight);
      if (this.state.mouseDown && bottomDistance > 0) {
        holdTrigger();
      }
    };

    const holdUpTrigger = state => {
      myTimeout = window.setTimeout(holdUp, this.state.lineSpeed);
    };

    const holdUp = () => {
      if (this.state.mouseDown && this.state.top > 0) {
        this.setState({ top: this.state.top - 1 });
        holdUpTrigger();
      }
    };
    const disabled = () => {
      if (this.state.top === 0) {
        return true;
      }
    };
    const lakeStyles = {
      height: `${this.state.depth}px`,
      //height: `${window.innerHeight}px`,
      border: "1px solid black"
    };

    // let fishSwim;

    // const swim = () => {
    //   if (this.state.fishDistance <= 0) {
    //     console.log("timeout cleared");
    //     window.clearTimeout(fishSwim);
    //   } else fishSwim = window.setTimeout(moveFish, 100);
    // };

    // const moveFish = () => {
    //   if (this.state.fishDistance === 0) {
    //   }
    //   this.setState({ fishDistance: this.state.fishDistance - 0.01 });
    //   swim();
    // };

    // const swimAnimation = `
    // @keyframes slidein
    // {
    //   from {
    //     left: 50%
    //   }
    //   to{
    //     left: 0%
    //   }
    // }
    // `;

    const fishStyles = {
      left: "-15%",
      height: "20px",
      width: "10%",
      "background-color": "blue",
      border: "1px solid black",
      position: "relative",
      top: "50%",
      //left: `${this.state.fishDistance}%`,
      animation: `swim 3s`,
      "animation-timing-function": "linear"
    };

    const fishTest = () => {
      if (this.state.fishDistance > 0) {
        console.log("fish spawned");
        //this.setState({ spawnFish: false });
        return <div id="testFish" style={fishStyles}></div>;
      }
    };

    const spawnStyles = height => {
      return {
        left: "-15%",
        height: "20px",
        width: "10%",
        "background-color": "blue",
        border: "1px solid black",
        position: "relative",
        top: `${height}%`,
        //left: `${this.state.fishDistance}%`,
        animation: `swim 3s`,
        "animation-timing-function": "linear"
      };
    };
    const fish = height => {
      if (this.state.spawnFish) {
        //this.setState({ spawnFish: false });
        const randomHeight = Math.floor(Math.random() * 100);
        console.log(randomHeight, "randomHeight");
        return <div id="testFish" style={spawnStyles(randomHeight)}></div>;
      }
    };

    return (
      <>
        <button
          onClick={e => {
            console.log("pressed");
            this.setState({ spawnFish: true });
          }}
        >
          Spawn
        </button>

        <button
          disabled={disabled()}
          id="upButton"
          onMouseDown={e => {
            if (this.state.top) {
              let top = this.state.top;
              this.setState({ top: top - 2, mouseDown: true });
              holdUpTrigger();
            }
          }}
          onMouseUp={e => {
            this.setState({ mouseDown: false });
            window.clearTimeout(myTimeout);
          }}
        >
          ^
        </button>
        <button
          id="downButton"
          onMouseDown={e => {
            console.log("down clicked", this.state.top);
            let top = this.state.top;
            this.setState({ top: top + 2, mouseDown: true });
            holdTrigger();
          }}
          onMouseUp={e => {
            console.log("timeout stopped");
            this.setState({ mouseDown: false });
            window.clearTimeout(myTimeout);
          }}
        >
          v
        </button>
        <div id="lakeContainer" style={lakeStyles}>
          <div
            id="lure"
            style={styles}
            onClick={e => {
              console.log("key struck", e.keyCode);
              let top = this.state.top;
              if (e.keyCode === "38") {
                if (this.state.top !== 0) {
                  this.setState({ top: top++ });
                }
              }
              if (e.keyCode === "40") {
                this.setState({ top: top-- });
              }
            }}
          ></div>
          {fish()}
          {fishTest()}
        </div>
      </>
    );
  }
}

export default FishTest;
