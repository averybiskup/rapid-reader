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
    let sliderNum = document.getElementById("range").value
    this.calculate(sliderNum)
    document.getElementById("slider-output").innerHTML = "WPM: 40" + document.getElementById("range").value
  }
  render() {
    return (
      <div>
        <div>
          <div id="word-count">Word Count: {this.props.array.length}</div>
          <div id="slider-output">WPM: </div>
        </div>
        <div id="input-range"><input id="range" type="range" max="1000" min="10" step="10" onChange={this.changeValue}/></div>
      </div>
    )
  }
}
