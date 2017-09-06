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
      running: true,
      set: false,
      chars: ["!", ".", ",", "*", "&", "^", "%", "$", "#", "@", "-", "_", "(", ")", "="]
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
    let str2 = str.replace(/[""]/gi, '')
    let longestWord = ""
    str2.split(' ').map((i) => {
      if (i.length > longestWord) {
        longestWord = i
        console.log(longestWord, longestWord.length * 2)
        document.getElementById("num-player").style.fontSize = longestWord.length * 10 + "px"
        console.log(window.innerWidth, 'test')
      }
      return mainList.push(i)
    })
    if (mainList.length) {
      this.setState({ wordList: mainList, running: true }, () => {
        this.displayWords(this.state.wordList)
        console.log(mainList.length)
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
     return true
    } else { return false }
  }
  mobileCheck = () => {
    if (this.detectmob()) {
      document.activeElement.blur();
      setTimeout(() => { this.getContent("text-area") }, 1000)
    } else { this.getContent("text-area") }
  }
  setWordList = () => {
    let temp = document.getElementById("text-area").value.split(' ')
    temp = temp.filter((item) => { return item.length > 0 && this.state.chars.indexOf(item) <= 0 })
    this.setState({ wordList: temp })
  }
  addEventListener = () => {
    document.getElementById("text-area").addEventListener('keydown', (e) => {
      this.setState({ set: true })
      var keyCode = e.keyCode || e.which
      if (keyCode == '8') { this.setWordList() }
    })
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
          } else if (keyCode == '32') {
            if (this.state.set === false) { this.addEventListener() }
            this.setWordList()
          }
        }}>
        </textarea>
        <div id="button-div">
          <button onClick={() => {this.mobileCheck()}}>Run</button>
          <button onClick={() => {this.clearContent()}}>Clear</button>
          <Speed cb={this.myCallback} array={this.state.wordList}/>
        </div>
        <div id="num-player"></div>
      </div>
    )
  }
}
