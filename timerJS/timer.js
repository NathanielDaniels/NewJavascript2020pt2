class Timer {
  constructor (durationInput, startBtn, pauseBtn, callbacks) {
    this.durationInput = durationInput
    this.startBtn = startBtn
    this.pauseBtn = pauseBtn
    this.resetBtn = resetBtn
    this.circle = circle
    if (callbacks) {
      this.onStart = callbacks.onStart
      this.onTick = callbacks.onTick
      this.onComplete = callbacks.onComplete
    }
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
    if (this.onStart) {
      this.onStart(this.timeRemaining)
      // console.log(this.onStart())
    }

    this.tick()
    this.interval = setInterval(this.tick, 20)
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
      if (this.onComplete) {
        this.onComplete()
      }
      // alert('Countdown Complete')
    } else {
      this.timeRemaining = timeRemaining - 0.02
      if (this.onTick) {
        this.onTick(this.timeRemaining)
      }
    }
  }
  //? Get and Set are used to store data in DOM
  get timeRemaining () {
    return parseFloat(this.durationInput.value)
  }
  set timeRemaining (time) {
    this.durationInput.value = time.toFixed(2)
    //! .toFixed(2) cuts the number down to the hundredth precentile
    // console.log(time)
  }
  reset = () => {
    console.log('Reset Button Clicked!')
    this.pause()
    this.durationInput.value = 30
    container.style.backgroundColor = 'White'
    durationInput.style.backgroundColor = 'White'
    // console.log(durationInput.textinput)
    // console.log(this.timeRemaining)
  }
}
