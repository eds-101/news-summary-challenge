'use strict';

class Story {
  constructor (title) {
    this.webTitle = title
    this.apiUrl = ""
    this.cleanApiUrl = ""
    this.img = ""
    this.text = ""
  }

  cleanUrl() {
    this.cleanApiUrl = this.apiUrl.replace("https", "http")
  }

}

// get stories linked to for loop
// get url
// see if you can get the image onto this obj