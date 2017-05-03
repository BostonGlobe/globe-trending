module.exports = class TransformIndexData {
  
  constructor(data, chartbeatData) {
    this.data = data;
    this.chartbeatData = chartbeatData.pages;
  }

  transform() {

    for ( var i = 0; i < this.data.length; i++ ) {

      this.data[i].chartbeat = null;
      this.data[i].refs = { fb: 0, tw: 0 };

      for ( var j = 0; j < this.chartbeatData.length; j++ ) {

        if ( this.chartbeatData[j].path === this.data[i].path ) {
          this.data[i].chartbeat = this.chartbeatData[j].stats;
          var toprefs = this.chartbeatData[j].stats.toprefs;

          for ( var k = 0; k < toprefs.length; k++ ) {

            if ( toprefs[k].domain === 'facebook.com' || toprefs[k].domain === 'm.facebook.com' ) {
              this.data[i].refs.fb  += toprefs[k].visitors;
            }

            if ( toprefs[k].domain === 't.co' ) {
              this.data[i].refs.tw += toprefs[k].visitors;
            }

          }

        }

      }

      this.data[i].image = this.data[i].image.replace('//www.bostonglobe.com/', '//c.o0bg.com/');
      this.data[i].path = this.data[i].path.replace('bostonglobe.com', '/article');
      this.data[i].path = this.data[i].path.replace('.html', '');

    }

    return this.data;

  }

};