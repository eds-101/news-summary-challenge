'use strict';

var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}

const articles = new Articles()

ready(() => {  
  getHeadlines()
  console.log(articles.viewArticles())
});


function getHeadlines() {
  //get date i.e.new Date() and convert
  fetch("http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search?q=article&query-fields=type&from-date=2021-03-19&use-date=newspaper-edition&q=news")
  .then(response => response.json())
  .then( body => {
    for(let i = 0; i < body.response.results.length; i++){
      if(body.response.results[i].type === "article") {
        let webTitle = body.response.results[i].webTitle
        let apiUrl = body.response.results[i].apiUrl
        let webUrl = body.response.results[i].webUrl

        let story = new Story(webTitle)
        story.apiUrl = apiUrl
        story.webUrl = webUrl
        articles.addArticle(story)

        // console.log(body.response.results[i])
      }

    }
    
    // console.log(articles) 
    console.log(body.response.results) 
  })
}
