const container = document.querySelector('.container')
const geoContainer = document.querySelector('.geo-container')
const imageCredit = document.querySelector('.image-credit')
const urls = []


const term = setUrlTerm()
const url = `https://api.unsplash.com/photos/random?query=${term}&per_page=1&orientation=landscape&client_id=${YOUR_CLIENT_ID}`

async function getImages(){
    const response = await axios.get(url)
    console.log(response)
    const { urls, location, user, links, liked_by_user, color } = await response.data
    console.log(liked_by_user)
    setBg(urls.regular)
    setTodoBtn(color, urls.regular)
    setImageLocation(location)
    setPhotoCredit(user.name, links.html)
    setImageLikes(liked_by_user)
    setOverlay(color)
}

function setUrlTerm(){
    let term
    let today = new Date(),
    hour = today.getHours()

    if(hour < 12 ){
        term = `morning sun`
    }else if(hour < 18){
        term = `green forest`
    }else{
        term = `starry night sky`
    }
    return term
}

function setBg(url){
   let today = new Date(),
    hour = today.getHours()

    if(hour){
       document.body.style.backgroundImage = `url(${url})`
       document.body.style.backgroundRepeat = "no-repeat"
       document.body.style.backgroundAttachment= "fixed"
       document.body.style.backgroundPosition= "center"
       document.body.style.backgroundSize = "cover"
    }
}

function setTodoBtn (color, url){
    const img = document.createElement("img")
    let todoBtn = document.querySelector('.todo-btn-center')
    
    let clr = tinycolor(color);
    let isColorLight =  clr.isLight(); 
    let darkerColor = tinycolor(`${color}`).darken(10).toString(); 

    img.addEventListener('load', () => {
        if(isColorLight){
            todoBtn.style.background = `${darkerColor}`
            console.log(`color was too light Im now ${darkerColor}`)
        }else{
            todoBtn.style.background = `${color}`
        }
    })

    img.crossOrigin = 'Anonymous';
    img.src = `${url}`
}

function setImageLocation(location){
    const { city, country} = location
    const imageLocation = document.createElement('div')
    imageLocation.classList.add('image-location')
    geoContainer.append(imageLocation)
    
    if (city === null && country === null){
        imageLocation.textContent = 'Somewhere, Universe'
    }
    else if(city === null){
        imageLocation.textContent = `${country}`
    }
    else if(country === null){
        imageLocation.textContent = `${city}`
    }
    else{
        imageLocation.textContent =`${city}, ${country}`
    }
}

function setPhotoCredit(user, links){
    const a = document.createElement('a')
    a.setAttribute('href', links)
    a.target= '_blank';
    a.classList.add('image-photographer')

    if(user == null){
        a.textContent = 'Anonymous'
    }else{
        a.textContent = user
    }

    imageCredit.append(a)
}

function setImageLikes(liked_by_user){
    const like = document.createElement('span')
    like.classList.add('image-like')
    like.innerHTML = `<i class="far fa-heart"></i>` 
    imageCredit.append(like)

    like.addEventListener('click', ()=>{
        if(liked_by_user === false){       
            like.innerHTML = `<i class="far fa-heart"></i>` 
            liked_by_user = true
        }else{
            like.innerHTML = `<i class="fas fa-heart"></i>`
            liked_by_user= false
        }
    })
}

function setOverlay(color){
    let container = document.querySelector('.container')

    let clr = tinycolor(color);
    let isColorLight =  clr.isLight(); 
    
    if(isColorLight){
        container.classList.add('container-bg-darken')
    }
}


getImages()
