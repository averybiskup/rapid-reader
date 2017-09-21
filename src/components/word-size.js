let d = require('./detectMobile')

module.exports.editSize = (arr, wordList) => {
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
    let sub = (d.detectmob()) ? -100 : 0
    if ((changeOut(tempWord).length <= 4 || wordList.length < 3) && changeOut(tempWord).length <= 15) {
      wordTest.style.display = 'none'
      return (d.detectmob()) ? '25px' : '100px'
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
