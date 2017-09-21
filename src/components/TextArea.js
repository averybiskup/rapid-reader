import React from 'react'
import { Speed } from './Speed'
import './../stylesheets/index.css'
let d = require('./detectMobile')
let e = require('./word-size.js')

const { Component } = React

export class TextArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      speedData: 1000,
      wordList: [],
      running: true,
      set: false,
      chars: ['!', '.', ',', '*', '&', '^', '%', '$', '#', '@', '-', '_', '(', ')', '='],
      total: 0,
      firstClick: false,
      currentWord: 0,
      currentHolder: 0
    }
  }

  myCallback = (dataFromChild) => {
    this.setState({ speedData: dataFromChild }, () => {
      console.log(this.state.speedData)
    })
  }

  displayWords = (arr) => {
    let i = 0, textArea = document.getElementById('text-area'), run = document.getElementById('run')

    this.setState({ firstClick: true, total: 0 })

    textArea.disabled = true
    textArea.style.display = 'none'

    let show = () => {
      if (i < arr.length && this.state.running === true) {
        document.getElementById('num-player').innerHTML = arr[i]
        i++
        setTimeout(show, this.state.speedData)
        this.setState({ currentWord: i + this.state.currentHolder })
        window.onresize = () => { document.getElementById('num-player').style.fontSize = e.editSize(document.getElementById('text-area').value.split(' '), this.state.wordList) }
        run.disabled = true
        run.className = ''
      } else {
        this.setState({ total: this.state.total + i})

        run.disabled = false
        run.className = 'hoverable'

        textArea.disabled = false
        textArea.style.display = 'inline'
      }
    }
    show()
  }

  showContent = (str) => {
    let str2 = str.replace(/[.]/gi, '. ').split(' ')
    if (str2.length) {
      this.setState({ wordList: str2, running: true }, () => {
        this.displayWords(this.state.wordList)
      })
    }
  }

  getContent = (element) => {
    document.activeElement.blur();
    if (document.getElementById(element).value.length > 0) {
      this.showContent(document.getElementById(element).value)
    } else {
      document.getElementById('text-area').classList.add('no-input')
      setTimeout(() => {
        document.getElementById('text-area').classList.remove('no-input')
        document.getElementById('run').disabled = false
      }, 500)
    }
  }

  clearContent = () => {
    this.setState({ wordList: [], running: false })
    document.getElementById('text-area').value = ''
    document.getElementById('num-player').innerHTML = ''
  }

  mobileCheck = () => {
    if (document.getElementById('run').innerHTML === 'Restart') { document.getElementById('run').innerHTML = 'Run' }
    this.setState({ currentWord: 0, currentHolder: 0})
    let test = window.getSelection().toString().split(' ').filter((test) => { return test.length > 1 })

    let setTime = (timewait) => {
      if (timewait >= 10) document.activeElement.blur();
      (test.length >= 2) ? this.showContent(test.join(' ')) : setTimeout(() => { this.getContent('text-area') }, timewait)
    }
    setTime((d.detectmob()) ? 1000 : 0)

    document.getElementById('num-player').style.fontSize = e.editSize(document.getElementById('text-area').value.split(' '), this.state.wordList)
    document.getElementById('run').disabled = true
  }

  setWordList = () => {
    let temp = document.getElementById('text-area').value.split(' ')
    temp = temp.filter((item) => { return item.length > 0 && this.state.chars.indexOf(item) <= 0 })
    this.setState({ wordList: temp })
  }

  pause = () => {
    this.setState({ currentHolder: this.state.currentWord })
    window.getSelection().empty() // So we don't show the previously highlighted part of text
    if (this.state.firstClick === true) {
      document.getElementById('text-area').disabled = false
      document.getElementById('run').innerHTML = 'Restart'
      document.getElementById('pause').disabled = true

      setTimeout(() => { document.getElementById('pause').disabled = false }, 500)
      if (this.state.running === true) { this.setState({ running: false })}
      else {
        this.setState({ running: true }, () => {
          this.displayWords(this.state.wordList.slice(this.state.total, this.state.wordList.length))
          document.getElementById('text-area').disabled = true
        })
      }
    }
  }

  color(element) {
    element.className = 'unhoverable'
    setTimeout(() => { element.className = 'hoverable' }, 500)
  }

  render() {
    return (
      <div>
        <textarea onFocus={() => { document.getElementById("text-area").style.fontSize = "15px" }} id="text-area" placeholder="Paste text here" maxLength="10000" wrap="soft" onKeyPress={(e) => {
          if (!e) e = window.event
          var keyCode = e.keyCode || e.which
          if (keyCode === 13) {
            this.mobileCheck()
            return false
          }
        }} onKeyUp={() => {
          this.setWordList()
        }}>
        </textarea>
        <div id="button-div">
          <button className="hoverable" onClick={() => {this.mobileCheck(); this.color(document.getElementById("run"))}} id="run">Run</button>
          <button className="hoverable" onClick={() => {this.clearContent(); this.color(document.getElementById("clear"))}} id="clear">Clear</button>
          <button className="hoverable" onClick={() => {this.pause(); this.color(document.getElementById("pause"))}} id="pause">Pause</button>
          <Speed cb={this.myCallback} array={this.state.wordList} currentWord={this.state.currentWord}/>
        </div>
        <div id="num-player"></div>
        <div id="word-test"></div>
      </div>
    )
  }
}
