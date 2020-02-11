const container = document.querySelector('#timerContainer')
const durationInput = document.getElementById('duration')
const btns = document.getElementById('btns')
const startBtn = document.getElementById('start')
const pauseBtn = document.getElementById('pause')
const resetBtn = document.getElementById('reset')
const circle = document.querySelector('circle')

//! Styles =========================

startBtn.style.padding = '10px 15px'
pauseBtn.style.padding = '10px 15px'
resetBtn.style.padding = '10px 15px'
resetBtn.style.fontWeight = 'bold'
durationInput.style.margin = '10px'
durationInput.style.fontSize = '5rem'
durationInput.style.textAlign = 'center'
durationInput.style.width = '15rem'
durationInput.style.height = '8rem'
durationInput.style.border = 'transparent'
pauseBtn.style.cursor = 'pointer'
startBtn.style.cursor = 'pointer'
//! ====================================

const perimeter = circle.getAttribute('r') * 2 * Math.PI
circle.setAttribute('stroke-dasharray', perimeter)

let duration
console.log(duration)

const timer = new Timer(durationInput, startBtn, pauseBtn, {
  onStart (totalDuration) {
    duration = totalDuration
  },
  onTick (timeRemaining) {
    circle.setAttribute(
      'stroke-dashoffset',
      (perimeter * timeRemaining) / duration - perimeter
    )
  },
  onComplete () {
    // alert('Fin')
    container.style.backgroundColor = 'hsla(1,100%,40%)'
    durationInput.style.backgroundColor = 'hsla(1,100%,40%)'
  }
})

// const fullParim = 2 * Math.PI * 190
// const halfParim = (2 * Math.PI * 190) / 2
// const quarterParim = 2 * Math.PI * 190 * 0.25
// console.log('full p =', fullParim)
// console.log('half p =', halfParim)
// console.log('quarter p =', quarterParim)

// circle.strokeDasharray = fullParim
// circle.strokeDashoffset = -20

// console.log(circle.strokeDashoffset)
