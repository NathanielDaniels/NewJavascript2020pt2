const container = document.querySelector('#timerContainer')
const durationInput = document.getElementById('duration')
const btns = document.getElementById('btns')
const startBtn = document.getElementById('start')
const pauseBtn = document.getElementById('pause')
const resetBtn = document.getElementById('reset')

//! Styles =========================
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
durationInput.style.height = '8rem'
// durationInput.style.borderRadius = '40px'
pauseBtn.style.cursor = 'pointer'
startBtn.style.cursor = 'pointer'
//! ====================================

const timer = new Timer(durationInput, startBtn, pauseBtn, {
  onStart () {
    console.log('timer started')
  },
  onTick () {
    console.log('Ticking Down')
  },
  onComplete () {
    alert('Fin')
  }
})
