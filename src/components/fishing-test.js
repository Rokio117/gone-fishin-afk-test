import React, { Component } from "react";
import "./fishing-test.css";

class FishTest extends Component {
  constructor(props) {
    super(props);
    this.state = { top: 0, mouseDown: false, lineSpeed: 10 };
  }

  render() {
    const styles = {
      display: "block",

      height: "10px",
      width: "10px",
      position: "absolute",
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
      if (this.state.mouseDown) {
        holdTrigger();
      }
    };

    const holdUpTrigger = state => {
      myTimeout = window.setTimeout(holdUp, this.state.lineSpeed);
    };

    const holdUp = () => {
      if (this.state.mouseDown) {
        this.setState({ top: this.state.top - 1 });
        holdUpTrigger();
      }
    };

    return (
      <>
        <button
          id="upButton"
          onMouseDown={e => {
            if (this.state.top >= 0) {
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
      </>
    );
  }
}

export default FishTest;
