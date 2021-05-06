import React, { Component } from "react";
import { Link } from "react-router-dom";
import board from "./assets/img/board.svg";
import Square from "./Square";
import Dbcon from "./Dbcon";

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [
        { place: 1, data: 0, turn: 0 },
        { place: 2, data: 0, turn: 0 },
        { place: 3, data: 0, turn: 0 },
        { place: 4, data: 0, turn: 0 },
        { place: 5, data: 0, turn: 0 },
        { place: 6, data: 0, turn: 0 },
        { place: 7, data: 0, turn: 0 },
        { place: 8, data: 0, turn: 0 },
        { place: 9, data: 0, turn: 0 },
      ],
      turn: 0,
      result: 0,
    };
    this.userinput = this.userinput.bind(this);
    this.reset = this.reset.bind(this);
    this.ifwon = this.ifwon.bind(this);
  }
  userinput(place) {
    var promise = new Promise((resolve) => {
      if (this.state.arr[place].data === 0 && this.state.result === 0) {
        let arr = [...this.state.arr];
        let move = { ...arr[place] };
        if (this.state.turn % 2 === 0) move.data = 1;
        else move.data = 2;
        move.turn = this.state.turn + 1;
        arr[place] = move;
        this.setState({ arr });
        this.setState({ turn: this.state.turn + 1 });
      }
      resolve(1);
    });
    promise.then((bool) => this.ifwon());
  }
  async ifwon(place) {
    let this1 = this.state.arr;
    let result = { a: 0, b: 0, c: 0, mark: 0 };
    if (this.state.turn >= 5) {
      if (
        this1[0].data === this1[1].data &&
        this1[1].data === this1[2].data &&
        this1[0].data !== 0
      )
        result = { a: 0, b: 1, c: 2, mark: this1[0].data };
      if (
        this1[3].data === this1[4].data &&
        this1[4].data === this1[5].data &&
        this1[3].data !== 0
      )
        result = { a: 3, b: 4, c: 5, mark: this1[3].data };
      if (
        this1[6].data === this1[7].data &&
        this1[7].data === this1[8].data &&
        this1[6].data !== 0
      )
        result = { a: 6, b: 7, c: 8, mark: this1[6].data };
      if (
        this1[0].data === this1[3].data &&
        this1[3].data === this1[6].data &&
        this1[0].data !== 0
      )
        result = { a: 0, b: 3, c: 6, mark: this1[0].data };
      if (
        this1[1].data === this1[4].data &&
        this1[4].data === this1[7].data &&
        this1[1].data !== 0
      )
        result = { a: 1, b: 4, c: 4, mark: this1[1].data };
      if (
        this1[2].data === this1[5].data &&
        this1[5].data === this1[8].data &&
        this1[2].data !== 0
      )
        result = { a: 2, b: 5, c: 8, mark: this1[2].data };
      if (
        this1[0].data === this1[4].data &&
        this1[4].data === this1[8].data &&
        this1[0].data !== 0
      )
        result = { a: 0, b: 4, c: 8, mark: this1[0].data };
      if (
        this1[2].data === this1[4].data &&
        this1[4].data === this1[6].data &&
        this1[2].data !== 0
      )
        result = { a: 2, b: 4, c: 6, mark: this1[2].data };

      if (result.mark !== 0) this.winnerdeclare(result);
    }
  }
  winnerdeclare(result) {
    let data = this.state;
    Dbcon.transdata(data, function (res) {
      console.log(res);
    });
    this.setState({ result: result.mark });
    let arr = [
      { place: 1, data: 0 },
      { place: 2, data: 0 },
      { place: 3, data: 0 },
      { place: 4, data: 0 },
      { place: 5, data: 0 },
      { place: 6, data: 0 },
      { place: 7, data: 0 },
      { place: 8, data: 0 },
      { place: 9, data: 0 },
    ];
    arr[result.a].data = result.mark;
    arr[result.b].data = result.mark;
    arr[result.c].data = result.mark;
    this.setState({ arr });
  }
  reset() {
    let arr = [
      { place: 1, data: 0 },
      { place: 2, data: 0 },
      { place: 3, data: 0 },
      { place: 4, data: 0 },
      { place: 5, data: 0 },
      { place: 6, data: 0 },
      { place: 7, data: 0 },
      { place: 8, data: 0 },
      { place: 9, data: 0 },
    ];
    this.setState({ arr, turn: 0, result: 0 });
  }
  squaredisp() {
    return this.state.arr.map((slide, index) => {
      return (
        <Square
          key={index}
          key1={index}
          arr={this.state.arr}
          userinput={this.userinput}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <section
          className="u-align-center u-clearfix u-custom-color-2 u-section-2"
          id="sec-2bf1"
        >
          <div className="u-clearfix u-sheet u-sheet-1">
            <Link
              to="/"
              className="u-border-3 u-border-active-palette-2-dark-1 u-border-custom-color-2 u-border-hover-custom-color-1 u-btn u-button-style u-none u-text-custom-color-1 u-text-hover-custom-color-1 u-btn-1"
            >
              BACK
            </Link>
            <Link
              className="u-border-3 u-border-active-palette-2-dark-1 u-border-custom-color-2 u-border-hover-custom-color-1 u-btn u-button-style u-none u-text-custom-color-1 u-text-hover-custom-color-1 u-btn-2"
              onClick={this.reset}
            >
              Reset
            </Link>
            <img
              src={board}
              alt=""
              className="u-expanded-width-md u-expanded-width-xs u-image u-image-default u-image-1"
              data-image-width="666"
              data-image-height="666"
            />
            <div className="u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-gallery u-layout-grid u-show-text-on-hover u-gallery-1">
              <div className="u-gallery-inner u-gallery-inner-1">
                {this.squaredisp()}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Game;
