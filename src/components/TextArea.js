import React from 'react'
import { Speed } from './Speed'
import './../stylesheets/index.css'

const { Component } = React

export class TextArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      speedData: 1000,
      wordList: [],
      running: true
    }
  }
  myCallback = (dataFromChild) => {
    this.setState({ speedData: dataFromChild }, () => {
      console.log(this.state.speedDataFromChild)
    })
  }
  displayWords = (arr) => {
    let i = 0
    let show = () => {
      if (i < arr.length && this.state.running === true) {
        document.getElementById("num-player").innerHTML = arr[i]
        console.log(i)
        i++
        setTimeout(show, this.state.speedData)
      }
    }
    show()
  }
  showContent = (str) => {
    let mainList = []
    let str2 = str.replace(/["!:'"]/gi, '')
    str2.split(' ').map((i) => {
      return mainList.push(i)
    })
    if (mainList.length) {
      this.setState({ wordList: mainList, running: true }, () => {
        this.displayWords(this.state.wordList)
      })
    }
  }
  getContent = (element) => {
    document.activeElement.blur();
    if (document.getElementById(element).value.length > 0) {
      this.showContent(document.getElementById(element).value)
    }
    else {
      document.getElementById("text-area").className = "shake"
      setTimeout(() => { document.getElementById("text-area").className = "noShake" }, 500)
    }
  }
  clearContent = () => {
    this.setState({ wordList: [], running: false })
    document.getElementById("text-area").value = ""
    document.getElementById("num-player").innerHTML = ""
  }
  detectmob = () => {
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
   || navigator.userAgent.match(/iPhone/i)
   || navigator.userAgent.match(/iPad/i)
   || navigator.userAgent.match(/iPod/i)
   || navigator.userAgent.match(/BlackBerry/i)
   || navigator.userAgent.match(/Windows Phone/i)
   ){
     return true;
    } else {
      return false;
    }
  }
  mobileCheck = () => {
    if (this.detectmob()) {
      document.getElemenyById("text-area").innerHTML = ""
      document.activeElement.blur();
      setTimeout(() => {
        this.getContent("text-area")
      }, 1000)
    } else {
      this.getContent("text-area")
    }
  }
  render() {
    return (
      <div>
        <textarea id="text-area" placeholder="Paste text here" maxLength="10000" wrap="soft" onKeyPress={(e) => {
          if (!e) e = window.event
          var keyCode = e.keyCode || e.which
          if (keyCode == '13') {
            this.mobileCheck()
            return false
          }
        }}>
        </textarea>
        <div id="button-div">
          <button onClick={() => {this.mobileCheck()}}>Run</button>
          <button onClick={() => {this.clearContent()}}>Clear</button>
          <Speed cb={this.myCallback}/>
        </div>
        <div id="num-player"></div>
      </div>
    )
  }
}
