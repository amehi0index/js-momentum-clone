const FORECAST_API= '194dfa90ccbb96fcc6154cbc814497cd'

window.addEventListener('load', () => {
    let long, lat

    let currentIcon = document.getElementById('forecast-current-icon'),
        currentSpan = document.querySelector('.forecast-current-span'),
        currentCity = document.querySelector('.forecast-current-city'),
        currentDescription = document.querySelector('.forecast-current-description'),
        currentDay = document.querySelector('.forecast-current-day'),
        currentDegree = document.querySelector('.forecast-current-degree'),
        currentToggle = document.querySelector('.forecast-current-toggle')

    let cardForecast = document.querySelector('.forecast-five')
    //find location of user
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition
        (position => {
            long = position.coords.longitude
            lat = position.coords.latitude

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${FORECAST_API}`
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${FORECAST_API}`
           
            async function getWeather(){
                let response = await fetch(weatherUrl)
                let data = await response.json()
                console.log(data)

                const { temp } = await data.main
                const name = data.name
                const { description,  id }  = await data.weather[0]
                const { dt } = await data

                let date = new Date(dt * 1000);
                let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
                let dow = days[date.getDay()]

                const currentTemp = convertKelvin(temp)
                currentDegree.textContent = currentTemp
                currentSpan.textContent = "°F"

                toggleDegree(currentTemp, currentToggle)
                setLocation(name, description, dow)
                setIcon(currentIcon, id)
            }
         
            getWeather()
        
            async function getForecast(){

                let response = await fetch(forecastUrl)
                let data = await response.json()
                let { timezone } = await data.city
                const { name } = await data.city 
                console.log(data)
                console.log(name)
            
                const forecastData = await data.list.filter((fc) => getTimezone(timezone, fc.dt_txt))
                console.log(forecastData)
                
                const forecastList  = forecastData.map(fc => {
                    const data = { main: fc.main, weather: fc.weather}
                    const day = fc.dt

                    const { temp_max, temp_min } = data.main
                    const { description, id } =  data.weather[0] 
                    const hi = convertKelvin(temp_max)
                    const lo = convertKelvin(temp_min)

                    let date = new Date(day * 1000)
                    let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
                    let dayName = days[date.getDay()]

                    const forecast = {
                      forecastDay: dayName,
                      forecastIcon: id,
                      forecastDescription: description,
                      forecastHi: hi,
                      forecastLo: lo
                    }
                  
                    return forecast
                })
                
                setForecast(forecastList)
            }
            
            getForecast()
        })

    }//else condition

    function convertKelvin(temp){
        //Convert to F
        let fTemp = Math.round(1.8 * (temp - 273) + 32)
        return fTemp
    }

    function toggleDegree(current, el){
        let celcius = (current- 32) / 1.8 

             el.addEventListener('click', () => {
        
                if(el.lastElementChild.textContent === "°F"){  
                    el.lastElementChild.textContent = "°C"   
                    el.firstElementChild.textContent = Math.round(celcius) 
                    
                }else{
                    el.lastElementChild.textContent ="°F"
                    el.firstElementChild.textContent = current
                }
            })

        }

    function setIcon(el, id){
       el.classList.add('wi', `wi-owm-${id}`)
    }
    
    function setLocation(name, description, day){
        currentCity.textContent = name
        currentDescription.textContent = description
        currentDay.textContent = day
    }

    function setForecast(forecastList){

        forecastList.forEach(item => {

            let forecastItem = document.createElement('div')
            forecastItem.classList.add('forecast-item')
            cardForecast.appendChild(forecastItem)

            let forecastDay = document.createElement('span')
            forecastDay.classList.add('forecast-day')
            forecastDay.textContent = `${item.forecastDay}`
            forecastItem.appendChild(forecastDay)

            let forecastIc = document.createElement('i')
            let id = item.forecastIcon
            forecastIc.classList.add('wi', `wi-owm-${item.forecastIcon}`)
            forecastItem.appendChild(forecastIc)

            //HiLo Container
            let forecastHiLo = document.createElement('div') 
            forecastHiLo.classList.add('forecast-hilo')
            forecastItem.appendChild(forecastHiLo)

            //Hi
            let forecastHi = document.createElement('span') 
            forecastHi.classList.add('forecast-hi')
            forecastHiLo.appendChild(forecastHi)

            let forecastHiDegree = document.createElement('span') 
            forecastHiDegree.classList.add('forecast-hi-degree')
            forecastHiDegree.textContent = `${item.forecastHi}` 
            forecastHi.appendChild(forecastHiDegree)

            let forecastHiSymbol = document.createElement('span')
            forecastHiSymbol.classList.add('forecast-hi-symbol')
            forecastHiSymbol.textContent = "°F"
            forecastHi.appendChild(forecastHiSymbol)

            //Lo
            let forecastLo= document.createElement('span') 
            forecastLo.classList.add('forecast-lo')
            forecastHiLo.appendChild(forecastLo)

            let forecastLoDegree = document.createElement('span')
            forecastLoDegree.classList.add('forecast-lo-degree')
            forecastLoDegree.textContent = `${item.forecastLo}`
            forecastLo.appendChild(forecastLoDegree)

            let forecastLoSymbol = document.createElement('span') 
            forecastLoSymbol.classList.add('forecast-lo-symbol')
            forecastLoSymbol.textContent = "°F" 
            forecastLo.appendChild(forecastLoSymbol)
            
            toggleDegree(item.forecastHi, forecastHi)
            toggleDegree(item.forecastLo, forecastLo)
        })
    }

   function getTimezone(timezone, dTxt){

      const AST	= -10800 , EST= -14400, CST = -18000, MST =	-21600 , PST = -25200,
            AKST = -28800, HAST = -36000, WST = -46800

        switch(timezone){
            case AST: 
            return dTxt.includes("15:00:00")//12pm
              
            case EST: 
            return dTxt.includes("18:00:00")//2pm

            case CST:
            return dTxt.includes("18:00:00")//1pm
         
            case PST: 
            return dTxt.includes("21:00:00")//2pm 

            case AKST: 
            return dTxt.includes("21:00:00")//12pm

            case HAST: 
            return dTxt.includes("00:00:00")//2pm

            case MST: 
            return dTxt.includes("18:00:00")//12pm
        }
    }
})
