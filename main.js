let computerNumber = 0;
let btnGo = document.querySelector('.btnGo');
let btnRe = document.querySelector('.btnRe');
let userNumber = document.querySelector('.inputArea');
let thumb = document.querySelector('.thumb')
let chanceNumber = document.querySelector('.chance')
let warningText = document.querySelector('.warning')
let topText = document.querySelectorAll('.txResult')
let thumbs;
const thumbRect = thumb.getBoundingClientRect()
let thumbArr = []
let history = [];
let chances = 5;
let gameOver = false;
let expA = '1부터 100까지의 수를 입력해주세요!'
let expB = '이미 입력한 숫자입니다. 다른 숫자를 입력해주세요!'

btnGo.addEventListener('click', play)
btnRe.addEventListener('click', reset)
userNumber.addEventListener('focus', function(){
  userNumber.value = '';
})

function pickNumber(){
  computerNumber = Math.floor(Math.random() * 100) + 1
  console.log(computerNumber)
}
pickNumber()

function play () {
  let userValue = userNumber.value; 

  if(userValue<1 || userValue>100) {
    warning(expA)
    return;
  } 

  if(history.includes(userValue)) { 
    warning(expB) 
    return
  }
  
  chances--;
  chanceNumber.textContent = `남은 기회: ${chances}번`

  if(userValue < computerNumber) {
    for(let i=0; i< topText.length; i++){
      topText[i].textContent = 'WRONG!'
      topText[i].style.color = 'orangered'
      topText[i].style.backgroundColor = '#eee'
    }
    thumbUp('UP!')
    textUp (-50)
  
  } else if (userValue > computerNumber) {
    for(let i=0; i< topText.length; i++){
      topText[i].textContent = 'WRONG!'
      topText[i].style.color = 'orangered'
      topText[i].style.backgroundColor = '#eee'
    }
    thumbUp('DOWN!')
    textUp (50)
  } else {
    for(let i=0; i< topText.length; i++){
      topText[i].textContent = 'CORRECT!'
      topText[i].style.color = 'green'
      topText[i].style.backgroundColor = 'wheat'
    }
    gameOver = true;
  }

  history.push(userValue);

  if(chances < 1 && userValue != computerNumber) {
    gameOver = true;
    for(let i=0; i< topText.length; i++){
      topText[i].textContent = 'Try Again'
      topText[i].style.color = '#aaa'
      topText[i].style.backgroundColor = '#ddd'
    }
  }
  

  if(gameOver == true) {
    btnGo.disabled = true;
    btnGo.style.backgroundColor = '#ddd'
    btnGo.style.color = 'black'
  }
  
}

function reset() {
  userNumber.value = '';
  pickNumber();
  gameOver = false;
  btnGo.disabled = false;
  btnGo.style.backgroundColor = 'orangeRed'
  btnGo.style.color = 'wheat'
  chances = 5;
  chanceNumber.textContent = `남은 기회: ${chances}번`
  for(let i=0; i< topText.length; i++){
    topText[i].textContent = 'Welcome!'
    topText[i].style.color = 'wheat'
    topText[i].style.backgroundColor = 'orangered'
  }
  history = []
}

function thumbUp(text) {
  for(let i = 0; i < 10; i++) {
    const x = Math.random() * (thumbRect.width - 20) * 1.1;
    const y = Math.random() * (thumbRect.height - 50) * 1.1;
    thumbs = document.createElement('div')
    thumbs.classList.add('thumbs')
    thumbs.textContent = text
    thumbs.style.color = 'orangered'
    thumbs.style.left = `${x}px`
    thumbs.style.top = `${y}px`
    thumb.append(thumbs);
    thumbArr.push(thumbs)
  }
}

function textUp (num){
  const keyframes = [
    {transform: 'translateY(0)', opacity: 1},
    {transform: 'translateY(' + num +'px)', opacity: 0}
  ]
  
  const options = {
    duration: 500,
    fill: 'forwards',
    easing: 'ease'
  }
  thumbArr.forEach((thumbs, index) => {
    thumbs.animate(keyframes, {...options, delay: index * 50})
  })
  thumbArr = []
}

function warning(text) {
  warningText.textContent = text;

  const keyframes = [
    {color: 'red'}, 
    {color: 'black'} 
  ]
  const options = {
    duration: 500,
    iterations: '3',
    easing: 'ease-in'
  }
  warningText.animate(keyframes, options)
}

function editText() {
    warningText.textContent = '1부터 100까지의 수를 입력해주세요!'
}