let btnValHelper

let linksTitle = document.querySelector('.search-title'),
linksSearchIcon = document.querySelector('.search-icon'),
linkSearchForm = document.querySelector('.search-form'),
linksArrow = document.querySelector('.search-arrow'),
linksContainer= document.querySelector('.search-container'),
linksInput = document.querySelector('.search-input'),
linksCard = document.querySelector('.search-links-card'),
links = Array.from (document.querySelectorAll(".link")),
linkSubmitBtn = document.querySelector(".search-submit-btn"),
col1 = document.querySelector('.col-1')


linksTitle.addEventListener('click', showSearchForm)
linksSearchIcon.addEventListener('click', showSearchForm)
linksArrow.addEventListener('click', showLinksCard)
linkSubmitBtn.addEventListener('click', setUserSearch)

container.addEventListener('click', (event) => {

    const withinCard = event.composedPath().includes(linksCard)
    const withinArrow = event.composedPath().includes(linksArrow)

    if(withinCard){
        linksCard.classList.add('search-links-card-show')
    }
    else if(withinArrow){
        linksArrow.classList.toggle('search-links-card-show')
    }
    else{
        linksCard.classList.remove('search-links-card-show')
    }
    
})

function showSearchForm (){
    removeLinksCard()
    linkSearchForm.classList.toggle('search-form-show')
}

function showLinksCard(){
    linksCard.classList.toggle('search-links-card-show')
}

function removeLinksCard(){
    if(linksCard.classList.contains('search-links-card-show') && (linkSearchForm.classList.contains('search-form-show'))){
        linksCard.classList.remove('search-links-card-show')
    }
}

function changeSearchIcon(){
    let query = linksInput.value

    links.forEach(link => {

        link.addEventListener('click', (event)=>{
            
            event.preventDefault()
            localStorage.removeItem('searchStr')
            localStorage.removeItem('submitBtnIcon')

            if (link.classList.contains('google')){
                btnValue = 'Google'
                linkSubmitBtn.innerHTML = `<iconify-icon data-icon="gg:google"></iconify-icon>`
                localStorage.setItem('submitBtnIcon', linkSubmitBtn.innerHTML) 
                linkSubmitBtn.setAttribute('value', 'Google')
            }
            else if (link.classList.contains('yahoo')){
                btnValue = 'Yahoo'
                linkSubmitBtn.innerHTML = `<iconify-icon data-icon="fa-brands:yahoo"></iconify-icon>`
                localStorage.setItem('submitBtnIcon', linkSubmitBtn.innerHTML) 
                linkSubmitBtn.setAttribute('value', 'Yahoo')
            }
            else if (link.classList.contains('bing')){
                btnValue = 'Bing'
                linkSubmitBtn.innerHTML = `<iconify-icon data-icon="cib:bing"></iconify-icon>`
                localStorage.setItem('submitBtnIcon', linkSubmitBtn.innerHTML) 
                linkSubmitBtn.setAttribute('value', 'Bing')
            }

            btnValHelper =  getBtnValue(btnValue, query) 
        })  
    })
  
}

function getBtnValue(btnValue, query){
    return { btnValue, query }
}

function getUserSearch(){
    let searchURL
    let searchStr = localStorage.getItem('searchStr')
    let query = linksInput.value

    linkSubmitBtn.innerHTML = localStorage.getItem('submitBtnIcon')
    searchURL =`${searchStr}${query}`
    linkSearchForm.setAttribute('action', searchURL)
    window.open(searchURL,'_blank')
    linksInput.value =""
}

function setUserSearch(){
    let searchURL
    let searchStr 
    let { query, btnValue} = btnValHelper

    if(btnValue === 'Google'){
        query = linksInput.value
        searchStr = `http://www.google.com/search?q= `
        searchURL =`${searchStr}${query}`
    }
    else if(btnValue === 'Yahoo'){
        query = linksInput.value
        searchStr = `http://www.yahoo.com/search?q= `
        searchURL =`${searchStr}${query}`
    }
    else if(btnValue === 'Bing'){
        query = linksInput.value
        searchStr = `http://www.bing.com/search?q= `
        searchURL =`${searchStr}${query}`
    }

    localStorage.setItem('search', searchStr) 
    linkSearchForm.setAttribute('action', searchURL)
    window.open(searchURL,'_blank')
    linksInput.value =""
}


getUserSearch()
changeSearchIcon()





