module.exports = class TransformArticleData {
  
  constructor(data) {
    this.data = data;
  }

  transform() {

    let recircArray = [];

    this.data.recirc.forEach( function (recirc) {
      if(recirc.lead && recirc.lead.href && recirc.headlines.headline) {

      let recircPath = recirc.href.replace('http://www.bostonglobe.com', '/article').replace('.html', '');

      let recircObject = {
        leadImage: {
          href: recirc.lead.href
        },
        headline: recirc.headlines.headline,
        href: recircPath
      };

      recircArray.push(recircObject);
      }

      
    } );
    
    
    return {
      headline: this.data.headlines.headline,
      author: this.data.attribution.author,
      authorType: this.data.attribution.authorType, // TODO: Handle more than one author
      leadImage: {
        href: this.data.lead.href, // TODO: Verify that this is an image
        caption: this.data.lead.caption,
        credit: this.data.lead.credit,
        alt: this.data.lead.alt
      },
      content: this.data.content,
      tagline: this.data.tagline,
      recirc: recircArray
    };
  }

};