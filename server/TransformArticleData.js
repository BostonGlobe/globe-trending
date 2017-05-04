module.exports = class TransformArticleData {
  
  constructor(data, rawChartbeatData) {
    this.data = data;
    this.rawChartbeatData = rawChartbeatData;
  }

  transform() {

    let recircArray = [];
    let chartBeatNode = null;
    this.data.recirc.forEach( function (recirc) {
      if(recirc.lead && recirc.lead.href && recirc.headlines.headline && recirc.lead.type === 'image') {

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

      
      this.rawChartbeatData.forEach(function(popularArticle, index) {
        if (popularArticle.loid === this.data.loid) {
          chartBeatNode = popularArticle;
          chartBeatNode.rank = index+1;
        }
      }.bind(this));

      this.normalizedHistogram = false;
      if(chartBeatNode) {
        this.normalizedHistogram = [];
        chartBeatNode.concurrentHistogramScaled = [];
        
        if (chartBeatNode.chartbeat) {
          chartBeatNode.concurrentHistogramMax = Math.max.apply(null, chartBeatNode.chartbeat.visit.hist);

          // Normalize the concurrent visitor data out of 100%:
          chartBeatNode.chartbeat.visit.hist.forEach(function(value) {
            // Assume that the graph will never be more than 50px
            this.normalizedHistogram.push(Math.round(value/chartBeatNode.concurrentHistogramMax*40));
          }.bind(this));
        }
        
      }

      
    }.bind(this) );
    
    
    return {
      headline: this.data.headlines.headline,
      author: this.data.attribution.author,
      authorType: this.data.attribution.authorType, // TODO: Handle more than one author
      leadImage: {
        href: this.data.lead.href, // TODO: Verify that this is an image
        caption: this.data.lead.caption,
        credit: this.data.lead.credit,
        alt: this.data.lead.alt,
        type: this.data.lead.type
      },
      content: this.data.content,
      tagline: this.data.tagline,
      chartBeat: chartBeatNode,
      loid: this.data.loid,
      recirc: recircArray,
      normalizedHistogram: this.normalizedHistogram
    };
  }

};