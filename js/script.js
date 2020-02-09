const container = document.querySelector('#timerContainer')
const count = document.getElementById('count')
const durationInput = document.getElementById('duration')
const btns = document.getElementById('btns')
const startBtn = document.getElementById('start')
const pauseBtn = document.getElementById('pause')

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
startBtn.style.padding = '10px 15px'
pauseBtn.style.padding = '10px 15px'
durationInput.style.margin = '10px'
durationInput.style.fontSize = '2.5rem'
durationInput.style.width = '8rem'
pauseBtn.style.cursor = 'pointer'

class Timer {
  constructor (durationInput, startBtn, pauseBtn) {
    this.durationInput = durationInput
    this.startBtn = startBtn
    this.pauseBtn = pauseBtn

    // Call, Bind, Apply
    // Call + Apply both run the function
    // Bind only runs after the event is called (in the case, clicked)
    //! Binding "this" connects "this" to start()
    this.durationInput.addEventListener('input', this.ondurationchange)
    // this.startBtn.addEventListener('click', this.start.bind(this))
    this.startBtn.addEventListener('click', this.start)
    this.pauseBtn.addEventListener('click', this.pause)
  }
  start = () => {
    // this.importantMethodCall()
    // THIS would not work without binding "this" to startBtn event listener
    // Otherwise Arrow Function would do the same
    console.log('Play Button Clicked!')
  }
  // importantMethodCall () {
  //   console.log('Play Button Clicked!')
  // }
  pause () {
    console.log('Pause Button Clicked!')
  }
  ondurationchange () {
    console.log('Input Clicked!')
    // console.log(durationInput.value)
    for (let i = durationInput.value; i > 0; i--) {
      // set a timer to reduce durationInput every 1000ms
      // console.log(i)
    }
    count.append(durationInput.value)
  }
  tick () {}
}

const timer = new Timer(durationInput, startBtn, pauseBtn)
