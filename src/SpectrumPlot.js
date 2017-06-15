/*
* Author   Jonathan Lurie - http://me.jonahanlurie.fr
* License  MIT
* Link      https://github.com/jonathanlurie/pixpipejs
* Lab       MCIN - Montreal Neurological Institute
*/


import Chartist from 'chartist'
import 'chartist/dist/chartist.min.css'


/**
* Draw a line plot with as many series as you want
*/
class SpectrumPlot {
  
  /**
  * @param {Object} parentContainer - can be a div id {string} or directly a div element. Will host the plot.
  * @param {Object} options - can contain plotSettings {Object} that complies with Chartist options
  */
  constructor( parentContainer, options = {} ){
    console.log('init SpectrumPlot');
    
    // Getting the parent div
    this._parentElem = null;
    if (typeof parentContainer === 'string' || parentContainer instanceof String){
      this._parentElem = document.getElementById( parentContainer );
    }else{
      this._parentElem = parentContainer;
    }
    
    this._plot = null;
    
    this._defaultPlotSettings = {
      low: 0,
      divisor: 5,
      showPoint: false,
      //lineSmooth: Chartist.Interpolation.simple(),
      lineSmooth: Chartist.Interpolation.none(),
      axisX: {
        showLabel: false,
        showGrid: false
      }
    }
    
    // replacing the default values with the one from the options
    if( "plotSettings" in options ){
      var plotSettings = options.plotSettings;
      var keys = Object.keys( plotSettings );
      for(var i=0; i<keys; i++){
        this._defaultPlotSettings[ keys[i] ] = plotSettings[ keys[i] ];
      }
    }
    
    this._defaultColor = "#555";
    this._lineColors = [
      "#F00",
      "#0F0",
      "#00F",
      "#888"
    ]

    this._lineThickness = 1;
    
    this._initPlot();
  }
  
  
  /**
  * [PRIVATE]
  * Initialize the plot object
  */
  _initPlot(){
    var that = this;
    
    this._plot = new Chartist.Line( this._parentElem, {
      labels: null, // Array
      series: null // Array of Arrays
    }, {
      //high: 255,
      low: 0,
      divisor: 5,
      showPoint: false,
      lineSmooth: Chartist.Interpolation.none(),
      showArea: false,
      axisX: {
        showLabel: false,
        showGrid: false
      }
      
    });  
    
    this._colorCounter = 0;
    
    // refreshing the style
    this._plot.on('draw', function(context) {
      if(context.type === 'line') {
        context.element._node.style.stroke = that._lineColors[ that._colorCounter % that._lineColors.length ]
        context.element._node.style["stroke-width"] = that._lineThickness + "px";
        that._colorCounter ++;
      }
    });

  }
  
  
  /**
  * Update the series of data. Create random colors if not enought colors are set.
  * @param {Array} series - can be an array of Number or an Array of Arrays of numbers
  */
  updateSeries( series ){
    
    while( series.length > this._lineColors.length){
      this._lineColors.push( this._defaultColor );
    }
    
    this._plot.update( {series: series });
  }
  
  
  /**
  * Update the labels, should be the same size as data series
  * @param {Array} labels - label for each point of the series
  */
  updateLabels( labels ){
    this._plot.update( {labels: labels });
  }
  
  
  /**
  * Get the Chartist plot object so that it's still easy to tune from the outside
  * @return {Chartist.Line} the plot object
  */
  getChartistPlot(){
    return this._plot;
  }
  
  
  /**
  * Define the color of a cuve
  * @param {Number} curveIndex - the index of the curve, starting at 0
  * @param {String} cssColor - color represented by a css-cmopliant string
  */
  setLineColor( curveIndex, cssColor ){
    if(curveIndex < 0){
      return;
    }
    
    while( curveIndex > this._lineColors.length){
      this._lineColors.push( this._defaultColor );
    }
    
    this._lineColors[ curveIndex ] = cssColor;
  }
  
  
} /* END of class SpectrumPlot */

export { SpectrumPlot };
