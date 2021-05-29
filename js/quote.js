
const quote = document.getElementById('quote'),
   author = document.getElementById('author')

const quoteUrl = "https://quotes.rest/qod?category=inspire"
//const quoteUrl ="http://quotes.rest/quote/search?maxlength=100&category=inspire"


async function dailyQuote(){
   let response = await fetch(quoteUrl);
   let data = await response.json();
   console.log(data)

   let str = data.contents.quotes[0].quote
   let res = str.substr(0, 75); //max length

   await Promise.all(
      quote.textContent = res,
      author.textContent = data.contents.quotes[0].author
   )

   setInterval(dailyQuote, 24 * 60 * 60 * 1000)
}

dailyQuote()