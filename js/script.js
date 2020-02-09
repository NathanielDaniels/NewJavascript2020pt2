const durationInput = document.querySelector('input')
const startBtn = document.querySelector('.fa-play')
const pauseBtn = document.querySelector('.fa-pause')
startBtn.style.cursor = 'pointer'
pauseBtn.style.cursor = 'pointer'

class Timer {
  constructor (durationInput, startBtn, pauseBtn) {
    this.durationInput = durationInput
    this.startBtn = startBtn
    this.pauseBtn = pauseBtn

    this.durationInput.addEventListener('input', this.ondurationchange)
    this.startBtn.addEventListener('click', this.start)
    this.pauseBtn.addEventListener('click', this.pause)
  }
  start () {
    console.log('Play Button Clicked!')
  }
  pause () {
    console.log('Pause Button Clicked!')
  }
  ondurationchange () {
    console.log('Input Clicked!')
    console.log(inputType)
  }
  tick () {}
}

const time = new Timer(durationInput, startBtn, pauseBtn)
