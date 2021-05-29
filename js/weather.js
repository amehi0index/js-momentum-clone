
const API_KEY = 'YOUR KEY'

window.addEventListener('load', () => {
    let long, lat

    let card = document.querySelector('.forecast-card-container'),
        temperatureSection = document.querySelector('.temperature'),
        temperatureSpan = document.querySelector('.temperature span')
        temperatureDescription = document.querySelector('.temperature-description'),
        temperatureDegree = document.querySelector('.temperature-degree'),
        locationCity = document.querySelector('.temperature-city'),
        locationIcon = document.getElementById('temperature-icon'),

        cardForecast = document.querySelector('.forecast-card')

    //find location of user
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition
        (position => {

            long = position.coords.longitude
            lat = position.coords.latitude

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`
            
            async function getWeather(){
                const response = await fetch(weatherUrl)
                const data = await response.json()
                const{ temp } = await data.main
                const name = await data.name
                const { description, main, id }  = await data.weather[0]
                let temperature =  convertKelvinToFarenheit(temp)

                setTemperature(temperature)
                toggleDegree(temperature)
                setLocation(name, description)
                setIcon(id)
            }

            getWeather()
        })

        locationCity.addEventListener('click', () => {
            card.classList.toggle('forecast-card-container-show')
        })

        container.addEventListener('click', (event) => {
        
            const withinForecast= event.composedPath().includes(card)
            const withinCurrentCity= event.composedPath().includes(locationCity)
            
            if(withinForecast){
                card.classList.add('forecast-card-container-show')
            }
            else if(withinCurrentCity){
                locationCity.classList.toggle('forecast-card-container-show')
            }
            else{
                card.classList.remove('forecast-card-container-show')
            }
        })

    }//else condition

    function convertKelvinToFarenheit(kTemp){
       return  Math.round(1.8 * (kTemp - 273) + 32)
    }

    function convertFarenheitToCelcius (fTemp){
        return  (fTemp - 32) / 1.8 
    }

    function setTemperature(temperature){
        temperatureDegree.textContent = temperature
        temperatureSpan.textContent = "°F"
    }

    function toggleDegree(temperature){
        let celcius = convertFarenheitToCelcius(temperature)
        
        temperatureDegree.addEventListener('click', () => {
            if(temperatureSpan.textContent === "°F"){
                temperatureSpan.textContent = "°C"
                temperatureDegree.textContent = Math.round(celcius)
                
            }else{
                temperatureSpan.textContent = "°F"
                temperatureDegree.textContent = temperature
            }
        })
    }

    function setIcon(id){
        locationIcon.classList.add('wi', `wi-owm-${id}`)
    }
    
    function setLocation(name, description){
        const location = {
            name: name,
            description: description
        }
        locationCity.textContent = `${location.name}`
    }

})
