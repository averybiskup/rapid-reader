import React from 'react'
import './../stylesheets/index.css'
const { Component } = React

export class Speed extends Component {
  constructor(props) {
    super()
  }
  calculate = (num) => {
    num = num / 60.00
    this.props.cb(parseFloat(1000.00 / num))
  }
  sendData = () => {
    let temp = document.getElementById("speed-input").value.replace(/\D+/g, '')
    if (temp.length <= 0) {
      alert("Invalid input")
    } else {
      this.calculate(parseFloat(temp))
    }
    document.getElementById("speed-input").className = "in"
    console.log('hello')
  }
  render() {
    return (
      <div>
        <div id="speed-container">
          <input id="speed-input" type="text" onBlur={() => { if (document.getElementById("speed-input").value.length > 0) this.sendData() }} placeholder="New WPM" onKeyPress={(e) => {
            if (!e) e = window.event
            var keyCode = e.keyCode || e.which
            if (keyCode == '13') {
              this.sendData()
              return false
            }
          }} />
        </div>
      </div>
    )
  }
}
