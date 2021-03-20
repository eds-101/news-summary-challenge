"use strict";

class Articles {
  constructor() {
    this.stories = []
  }

  addArticle(story) {
    this.stories.push(story)
  }

  viewArticles() {
    return this.stories
  }

}