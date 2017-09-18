import React from 'react'
import './../stylesheets/index.css'
import './../stylesheets/slider.css'
const { Component } = React

export class Speed extends Component {
  constructor(props) {
    super()
  }
  calculate = (num) => {
    num = num / 60.00
    this.props.cb(parseFloat(1000.00 / num))
  }
  changeValue = () => {
    this.calculate(document.getElementById("range").value)
    document.getElementById("slider-output").innerHTML = "WPM: " + document.getElementById("range").value
  }
  render() {
    return (
      <div>
        <div>
          <div className="font" id="word-count">Word Count: {this.props.array.length} | {this.props.currentWord}</div>
          <div className="font" id="slider-output">WPM: 40</div>
        </div>
        <div id="input-range"><input id="range" type="range" max="1000" min="10" step="10" onChange={this.changeValue}/></div>
      </div>
    )
  }
}
