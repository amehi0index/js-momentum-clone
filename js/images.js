let container = document.querySelector('.container')
const urls = []

const term = setUrlTerm()
const url = `https://pixabay.com/api/?key=16121394-73f45ded4171c91fdf0005cb5&q=${term}&image_type=photo`

async function getImages(){
    setUrlTerm()

    const response = await axios.get(url)
    const images = response.data.hits

    await Promise.all(
        images.map((image) => urls.push(image.webformatURL))
    )
    setBg()
}

function setUrlTerm(){
    let term
    let today = new Date(),
    hour = today.getHours()

    if(hour < 12 ){
        term = 'ocean'
    }else if(hour < 18){
        term = 'bird'
    }else{
        term = 'night' + 'sky'
    }
    return term
}

function setBg(){
    let today = new Date(),
    hour = today.getHours()

    if(hour){
        let url = urls[Math.floor(Math.random() * urls.length)];
        console.log(url)
        container.style.backgroundImage = `url(${url})`
        container.style.backgroundRepeat = "no-repeat"
        container.style.backgroundAttachment= "fixed"
        container.style.backgroundSize = "cover"
    }
}

getImages()