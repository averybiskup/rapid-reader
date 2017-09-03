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
    document.getElementById("slider-output").innerHTML = "WPM: " + document.getElementById("range").value
  }
  render() {
    return (
      <div>
        <div id="slider-output">WPM: 60</div>
        <div id="input-range"><input id="range" type="range" max="1000" min="1" step="10" onChange={this.changeValue}/></div>
      </div>
    )
  }
}
