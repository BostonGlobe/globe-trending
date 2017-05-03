module.exports = class TransformIndexData {
  
  constructor(data, chartbeatData) {
    this.data = data;
    this.chartbeatData = chartbeatData.pages;
  }

  transform() {

    for ( var i = 0; i < this.data.length; i++ ) {

      this.data[i].chartbeat = null;

      for ( var j = 0; j < this.chartbeatData.length; j++ ) {

        if ( this.chartbeatData[j].path === this.data[i].path ) {
          this.data[i].chartbeat = this.chartbeatData[j].stats;
        }

      }

      this.data[i].image = this.data[i].image.replace('//www.bostonglobe.com/', '//c.o0bg.com/');
      this.data[i].path = this.data[i].path.replace('bostonglobe.com', '/article');
      this.data[i].path = this.data[i].path.replace('.html', '');

    }

    return this.data;

  }

};