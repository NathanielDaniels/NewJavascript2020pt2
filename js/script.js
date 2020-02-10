const container = document.querySelector('#timerContainer')
// const count = document.getElementById('count')
const durationInput = document.getElementById('duration')
const btns = document.getElementById('btns')
const startBtn = document.getElementById('start')
const pauseBtn = document.getElementById('pause')
const resetBtn = document.getElementById('reset')

//! Styles
document.body.style.height = '100vh'
document.body.style.padding = '0'
document.body.style.margin = '0'
document.body.style.display = 'flex'
document.body.style.alignItems = 'center'
document.body.style.justifyContent = 'center'
container.style.borderRadius = '50%'
container.style.border = '2px solid black'
container.style.height = '300px'
container.style.width = '300px'
container.style.display = 'flex'
container.style.flexDirection = 'column'
container.style.alignItems = 'center'
container.style.justifyContent = 'center'
// container.style.backgroundColor = 'hsla(190,50%,50%)'
startBtn.style.padding = '10px 15px'
pauseBtn.style.padding = '10px 15px'
resetBtn.style.padding = '10px 15px'
resetBtn.style.fontWeight = 'bold'
durationInput.style.margin = '10px'
durationInput.style.fontSize = '5rem'
durationInput.style.textAlign = 'center'
durationInput.style.width = '8rem'
durationInput.style.height = '6rem'
pauseBtn.style.cursor = 'pointer'
startBtn.style.cursor = 'pointer'

class Timer {
  constructor (durationInput, startBtn, pauseBtn) {
    this.durationInput = durationInput
    this.startBtn = startBtn
    this.pauseBtn = pauseBtn
    this.resetBtn = resetBtn
    //? Call, Bind, Apply
    //? Call + Apply both run the function immediately
    //? Bind only runs after the event is called (in this case, clicked)
    //? Binding "this" connects "this" to start()
    this.durationInput.addEventListener('input', this.ondurationchange)
    this.startBtn.addEventListener('click', this.start)
    this.pauseBtn.addEventListener('click', this.pause)
    this.resetBtn.addEventListener('click', this.reset)
  }
  start = () => {
    //? THIS would not work without binding "this" to startBtn event listener
    //? Otherwise Arrow Function would do the same
    // console.log('Play Button Clicked!')
    this.tick()
    this.interval = setInterval(this.tick, 1000)
  }
  pause = () => {
    // console.log('Pause Button Clicked!')
    clearInterval(this.interval)
  }
  ondurationchange = () => {
    // console.log('Input Clicked!')
    // console.log(durationInput.value)
    // durationInput.value = this.timeLeft
  }
  tick = () => {
    const timeRemaining = this.timeRemaining
    if (this.timeRemaining <= 0) {
      this.pause()
      alert('Countdown Complete')
    } else {
      this.timeRemaining = timeRemaining - 1
    }
  }
  //? Get and Set are used to store data in DOM
  get timeRemaining () {
    return parseFloat(this.durationInput.value)
  }
  set timeRemaining (time) {
    this.durationInput.value = time
  }
  reset = () => {
    //! Broken, need to reset Time after btn click
    console.log('Reset Button Clicked!')
    this.pause()
    this.timeRemaining = durationInput.value
    console.log(durationInput.value)
  }
}

const timer = new Timer(durationInput, startBtn, pauseBtn)
