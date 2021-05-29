const time = document.getElementById('time'),
    greeting = document.getElementById('greeting'),
    period = document.getElementById('period'),
    userName = document.getElementById('name'),
    userFocus = document.querySelector('.focus')

userName.addEventListener('keypress', setName)
userName.addEventListener('blur', setName)
userFocus.addEventListener('keypress', setFocus)
userFocus.addEventListener('blur', setFocus)
    

function showTime(){
    let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds()
    
    //12hr Format
    hour = hour % 12 || 12 
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}`;
    setTimeout(showTime, 1000)
}

function addZero(n){
    return (parseInt(n, 10) < 10 ? '0': '')  + n 
}

function setBgGreet(){
    let today = new Date(),
        hour = today.getHours()

    if(hour < 12 ){
        greeting.textContent = 'Good morning,'
    }else if (hour < 18){
        greeting.textContent = 'Good afternoon,'
    }else{
        greeting.textContent = 'Good evening,'
        document.body.style.color = '#fff'
    }
}

function setName(event){
    if(event.type === 'keypress'){
        if(event.which === 13 || event.keyCode === 13){
            localStorage.setItem('name', event.target.innerText)
            userName.blur()
            period.style.visibility = 'visible'
        }
    }else{
        localStorage.setItem('name', event.target.innerText) 
    }
}

function getName() {
    if (localStorage.getItem('name') === null) {
      period.style.visibility = 'hidden'
      userName.textContent = 'Enter Name';
      userName.style.color = '#fff'
      userName.addEventListener('click', clearInput)
    } else {
      userName.textContent = localStorage.getItem('name');
      userName.addEventListener('click', clearInput)
    }
  }

function getFocus(){
    let hours = 2
    let saved = localStorage.getItem('focus')
    if (saved && (new Date().getTime() - saved > hours * 60 * 60 * 1000)) {
        //localStorage.clear()
        localStorage.removeItem('focus')
    }

    if(localStorage.getItem('focus') === null){
        userFocus.style.color = '#fff'
        userFocus.classList.remove('focus-border-hide')
        userFocus.addEventListener('click', (e)=> {
            e.target.textContent = ''
            userFocus.classList.remove('focus-border-hide')
        })
    }
    else{
        userFocus.textContent = localStorage.getItem('focus')
        userFocus.classList.add('focus-border-hide')
        userFocus.addEventListener('click', (e)=> {
            e.target.textContent = ''
            userFocus.classList.remove('focus-border-hide')
        })
    }
}

function setFocus(event){
    if(event.type === 'keypress'){
        if(event.which === 13 || event.keyCode === 13){
            localStorage.setItem('focus', event.target.innerText)
            userFocus.classList.add('focus-border-hide')
            userFocus.blur()
        }
    }else{
        localStorage.setItem('focus', event.target.innerText) 
        userFocus.classList.add('focus-border-hide')
    }
}

function clearInput(event){
    event.target.textContent = ''
    period.style.visibility = 'hidden'
}

showTime()
setBgGreet()
getName()
getFocus()