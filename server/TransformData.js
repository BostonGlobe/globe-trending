"use strict";
module.exports = class TransformData {
  
  constructor(data) {
    this.data = data;
  }

  transform() {
    // console.log('data---', this.data);
    // 
    //
    //  
    
    return {
      headline: this.data.headlines.headline,
      author: this.data.attribution.author,
      authorType: this.data.attribution.authorType, // TODO: Handle more than one author
      leadImage: {
        href: this.data.lead.href, // TODO: Verify that this is an image
        alt: this.data.lead.alt
      },
      content: this.data.content,
      tagline: 'Author tagline here'
    };
  }

};