const _ = require('lodash');

module.exports = class TransformIndexData {
  
  constructor(data, chartbeatData, commentData) {
    this.data = data;
    this.chartbeatData = chartbeatData.pages;
    this.commentData = commentData.page;
  }

  transform() {

    var that = this;

    // loop over bg formatted chartbeat data
    for ( var i = 0; i < this.data.length; i++ ) {

      this.data[i].chartbeat = null;
      this.data[i].refs = { fb: 0, tw: 0, g: 0 };

      this.data[i].hotRef = null;
      this.data[i].comments = null;

      // loop over raw chartbeat data
      for ( var j = 0; j < this.chartbeatData.length; j++ ) {

        // if formatted path matches raw path, do some stuff
        if ( this.chartbeatData[j].path === this.data[i].path ) {

          this.data[i].chartbeat = this.chartbeatData[j].stats;
          var toprefs = this.chartbeatData[j].stats.toprefs;

          // loop over the top referrers
          for ( var k = 0; k < toprefs.length; k++ ) {

            // facebook
            if ( toprefs[k].domain === 'facebook.com' || toprefs[k].domain === 'm.facebook.com' ) {
              this.data[i].refs.fb  += toprefs[k].visitors;
            }

            // twitter
            if ( toprefs[k].domain === 't.co' ) {
              this.data[i].refs.tw += toprefs[k].visitors;
            }

            // google
            if ( toprefs[k].domain === 'google.com' ) {
              this.data[i].refs.g += toprefs[k].visitors;
            }

          }

          // set the hot referrer 
          if ( this.data[i].refs.fb > 20 ) {
            this.data[i].hotRef = 'on Facebook';
          }

          if ( this.data[i].refs.tw > 20 ) {
            this.data[i].hotRef = 'on Twitter';
          }

          if ( this.data[i].refs.tw > 20 ) {
            this.data[i].hotRef = 'Google search';
          }

        }

      }

      // loop over raw comment data
      _.each( this.commentData, function( article, key ) {
        if ( article.path === that.data[i].path ) {
          that.data[i].comments = article.comments;
        }
      });

      // re-format some of the pre-formatted data
      this.data[i].image = this.data[i].image.replace('//www.bostonglobe.com/', '//c.o0bg.com/');
      this.data[i].image = this.data[i].image.replace('image_585w', 'image_1200w');
      this.data[i].path = this.data[i].path.replace('bostonglobe.com', '/article');
      this.data[i].path = this.data[i].path.replace('.html', '');
      this.data[i].title = this.data[i].title.replace(' - The Boston Globe', '');

    }

    return this.data;

  }

};