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
      chars: ['!', '.', ',', '*', '&', '^', '%', '$', '#', '@', '-', '_', '(', ')', '='],
      total: 0,
      firstClick: false
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
        document.getElementById('num-player').innerHTML = arr[i]
        i++
        setTimeout(show, this.state.speedData)
        window.onresize = () => { document.getElementById('num-player').style.fontSize = this.editSize(document.getElementById('text-area').value.split(' ')) }
        document.getElementById('run').disabled = true
      } else {
        this.setState({ total: this.state.total + i})
        document.getElementById('run').disabled = false
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
    document.getElementById('num-player').style.fontSize = this.editSize(document.getElementById('text-area').value.split(' '))
    this.setState({ firstClick: true, total: 0 })
    document.getElementById('run').disabled = true
    if (this.detectmob()) {
      document.activeElement.blur();
      setTimeout(() => { this.getContent('text-area') }, 1000)
    } else { this.getContent('text-area') }
  }

  setWordList = () => {
    let temp = document.getElementById('text-area').value.split(' ')
    temp = temp.filter((item) => { return item.length > 0 && this.state.chars.indexOf(item) <= 0 })
    this.setState({ wordList: temp })
  }

  addEventListener = () => {
    document.getElementById('text-area').addEventListener('keydown', (e) => {
      this.setState({ set: true })
      var keyCode = e.keyCode || e.which
      if (keyCode === 8) { this.setWordList() }
    })
  }

  pause = () => {
    if (this.state.firstClick === true) {
      document.getElementById('pause').disabled = true
      setTimeout(() => { document.getElementById('pause').disabled = false }, 500)
      if (this.state.running === true) {
        this.setState({ running: false })
      } else {
        this.setState({ running: true }, () => {
          this.displayWords(this.state.wordList.slice(this.state.total, this.state.wordList.length))
        })
      }
    }
  }

  editSize = (arr) => {
    let wordTest = document.getElementById('word-test')
    let edit = document.getElementById('num-player')
    let width = wordTest.offsetWidth
    let n = 0, tempWord = '', done = false, style, fontSize

    wordTest.style.display = 'inline'
    wordTest.style.fontSize = '1px'
    wordTest.style.margin = '0px'
    wordTest.style.padding = '0px'

    let changeOut = (str) => {
      let newStr = []
      str.split('').map(() => { newStr.push('W') })
      return newStr.join('')
    }

    arr.map((word) => {
      n++
      if (word.length > tempWord.length) { tempWord = word }
      if (n === arr.length) { done = true }
    })

    if (done === true) {
      wordTest.innerHTML = changeOut(tempWord)
      let sub = (this.detectmob()) ? -100 : 0
      if (changeOut(tempWord).length <= 4 || this.state.wordList.length < 3 && changeOut(tempWord).length <= 15) {
        wordTest.style.display = 'none'
        return (this.detectmob()) ? '25px' : '100px'
      }
      else {
        for (var i = width; i < window.innerWidth; i += 10) {
          if (changeOut(tempWord).length >= 25) {
            edit.style.fontSize = '3vw'
            wordTest.style.display = 'none'
          } else if (width >= window.innerWidth - sub) {
            edit.style.fontSize = fontSize + 'px'
            wordTest.style.display = 'none'
            return fontSize + 'px'
          } else if (n <= 1) {
            wordTest.style.display = 'none'
          }
          wordTest.style.fontSize = i + 'px'
          width = wordTest.offsetWidth
          style = window.getComputedStyle(wordTest, null).getPropertyValue('font-size')
          fontSize = parseFloat(style)
        }
      }
    }
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
          } else if (keyCode === 32) {
            if (this.state.set === false) { this.addEventListener() }
            this.setWordList()
          }
        }}>
        </textarea>
        <div id="button-div">
          <button onClick={() => {this.mobileCheck()}} id="run">Run</button>
          <button onClick={() => {this.clearContent()}}>Clear</button>
          <button onClick={() => {this.pause()}} id="pause">Pause</button>
          <Speed cb={this.myCallback} array={this.state.wordList}/>
        </div>
        <div id="num-player"></div>
        <div id="word-test"></div>
      </div>
    )
  }
}
