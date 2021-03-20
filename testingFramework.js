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


it('can store article meta details ', function() {
  var articles = new Articles
  var story = new Story("test story")
  articles.addArticle(story)
  expect(articles.viewArticles()[0].title).toEqual('test story');
})

