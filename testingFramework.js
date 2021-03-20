'use strict';

function expect(a) {
  return {
    toEqual: function(b){

      if(a === b)
        console.log('Pass')
      else
        console.log('Fail')
    }
  }
}

function it(label, callback ) {
  console.log(`Test: ${label}`)
  callback()
}

console.log("Articles tests")

it('can store a story in an article grouping ', function() {
  var articles = new Articles
  var story = new Story("test story")
  articles.addArticle(story)
  expect(articles.viewArticles()[0].title).toEqual('test story');
})

console.log("Story tests")

it('can add further meta details', function() {
  var apiUrl = "https://content.guardianapis.com/media/2021/mar/15/daily-telegraph-plans-link-journalists-pay-article-popularity"
  var webUrl = "https://www.theguardian.com/media/2021/mar/15/daily-telegraph-plans-link-journalists-pay-article-popularity"
  var story = new Story("test story")
  story.apiUrl = apiUrl
  story.webUrl = webUrl
  expect(story.apiUrl).toEqual("https://content.guardianapis.com/media/2021/mar/15/daily-telegraph-plans-link-journalists-pay-article-popularity");
  expect(story.webUrl).toEqual("https://www.theguardian.com/media/2021/mar/15/daily-telegraph-plans-link-journalists-pay-article-popularity");
})

it('can update an api url ready fetch an article', function() {
  var apiUrl = "https://content.guardianapis.com/media/2021/mar/15/daily-telegraph-plans-link-journalists-pay-article-popularity"
  var story = new Story("test story")
  story.apiUrl = apiUrl
  story.cleanUrl() 
  expect(story.cleanApiUrl).toEqual("http://content.guardianapis.com/media/2021/mar/15/daily-telegraph-plans-link-journalists-pay-article-popularity");
})

// id: "media/2021/mar/15/daily-telegraph-plans-link-journalists-pay-article-popularity"

