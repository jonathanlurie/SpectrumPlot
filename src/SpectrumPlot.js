/*
* Author   Jonathan Lurie - http://me.jonahanlurie.fr
* License  MIT
* Link      https://github.com/jonathanlurie/pixpipejs
* Lab       MCIN - Montreal Neurological Institute
*/


import Chartist from 'chartist'


/**
* 
*/
class SpectrumPlot {
  
  /**
  * @param {Object} parentContainer - can be a div id {string} or directly a div element. Will host the plot.
  * @param {Object} options - can contain plotSettings {Object} that complies with Chartist options
  */
  constructor( parentContainer, options = {} ){
    console.log('init SpectrumPlot');
    console.log( Chartist );
    
    // Getting the parent div
    var parentElem = null;
    if (typeof parentContainer === 'string' || parentContainer instanceof String){
      parentElem = document.getElementById( parentContainer );
    }else{
      parentElem = parentContainer;
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
    
  }
  
  
  _initPlot(){
    
    
    plot = new Chartist.Line('#chartDiv', {
      labels: null // Array
      series: null // Array of Arrays
    }, {
      high: 255,
      low: 0,
      divisor: 5,
      showPoint: false,
      //lineSmooth: Chartist.Interpolation.simple(),
      lineSmooth: Chartist.Interpolation.none(),
      axisX: {
        showLabel: false,
        showGrid: false
      },
    });  
    
    
    
  }
  
} /* END of class SpectrumPlot */

export { SpectrumPlot };
