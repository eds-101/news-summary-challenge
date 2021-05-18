'use strict';

var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback)
}

ready(() => {  
  let dateUpdate = document.getElementById('updated')
  // get today and yesterday's date
  let today = new Date()
  let todayFormatted = today.toISOString().slice(0,10)
  let yesterday = new Date( today.setDate(today.getDate()-5) ).toISOString().slice(0,10)
  dateUpdate.innerHTML = todayFormatted

  fetch(`https://content.guardianapis.com/search?from-date=${yesterday}&to-date=${todayFormatted}&show-fields=headline%20thumbnail&q=uk&api-key=test`)
  .then(response => response.json())
  .then( body => {
    let div = document.getElementById('headlines')

    for(let i = 0; i < body.response.results.length; i++){
      if(body.response.results[i].type === "article") {
        const article = new Article(body.response.results[i])
        div.appendChild(article.toNode())
      }
    }
  })

});

class Article {
  constructor(data) {
    this.title = data.webTitle
    this.url = data.webUrl
  }

  toNode() {
    let node = document.createElement('div')
    node.id = "articleSummary"
    let title = document.createElement('h2')
    title.innerText = this.title
    node.appendChild(title)

    this.fetchPictures(function(data){
      let divImg = document.createElement('div')
      divImg.id = "imgContainer"
      let img = document.createElement('img')
      img.src = data.response.content.fields.thumbnail
      divImg.appendChild(img)
      node.appendChild(divImg)
    })

    let link = document.createElement('a')
    link.innerText = 'View original article'
    link.setAttribute('href', this.url)
    node.appendChild(link)
    
    this.fetchSummary(function(data){
      let summaryDiv = document.createElement('div')
      node.appendChild(summaryDiv)
      
      let text = document.createElement('p')
      text.innerText = data.sentences.join(" ")
      summaryDiv.appendChild(text)
      text.style.display = "none"

      const buttonToHide = document.createElement("button")
      buttonToHide.innerText = "Show summary";
      summaryDiv.appendChild(buttonToHide);

      buttonToHide.addEventListener("click", (e) => {
        //memoisation via arrow function
        if(text.style.display === "block"){
          buttonToHide.innerText = "Show summary"
          text.style.display = "none"
        }
        else {
          buttonToHide.innerText = "Hide summary"
          text.style.display = "block"
        }
      })
    })

    return node
  }

 fetchSummary(callback) {
   fetch(`http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=${this.url}`)
   .then(response => {return response.json() })
   .then(callback)
  }

 fetchPictures(callback){
   const picUrl = this.url.replace('https://www.theguardian.com/','')
   const url = `http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/${picUrl}?show-fields=thumbnail`
   fetch(url)
   .then(response => { return response.json() })
   .then(callback)
 }

}
