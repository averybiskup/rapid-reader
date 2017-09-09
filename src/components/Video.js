import React from 'react'
import './../stylesheets/index.css'
const { Component } = React

export class Video extends Component {
  render() {
    return (
      <div>
      <iframe id="vid" width="420" height="345" src="https://www.youtube.com/embed/J---aiyznGQ?autoplay=1"></iframe>
      </div>
    )
  }
}
