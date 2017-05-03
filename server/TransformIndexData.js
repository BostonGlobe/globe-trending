module.exports = class TransformIndexData {
  
  constructor(data) {
    this.data = data;
  }

  transform() {

    for ( var i = 0; i < this.data.length; i++ ) {
      this.data[i].image = this.data[i].image.replace('//www.bostonglobe.com/', '//c.o0bg.com/');
      this.data[i].path = this.data[i].path.replace('bostonglobe.com', '/article');
      this.data[i].path = this.data[i].path.replace('.html', '');
    }

    return this.data;

  }

};