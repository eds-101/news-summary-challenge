class Story {
  constructor (title) {
    this.title = title
    this.apiUrl = ""
    this.cleanApiUrl = ""
    this.webTitle = ""
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