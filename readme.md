## Instanciation

```javascript
var spectrumPlot = new SpectrumPlot.SpectrumPlot( "chartDiv" );
```

## Setting the series
Each series is an array and all the series as to be passed as an array (even when using only one series). Example:  
```javascript

// Let's generate 3 series of 200 points each
var seriesSize = 200;
var series1 = new Array(seriesSize);
var series2 = new Array(seriesSize);
var series3 = new Array(seriesSize);

// we just fill with random values
for(var i=0; i<seriesSize; i++){
  series1[i] = Math.random() * 10;
  series2[i] = Math.random() * 10 + 20;
  series3[i] = Math.random() * 10 + 40;
}

// And add all of them in an array
spectrumPlot.updateSeries( [series1, series2, series3] )

```

## Changing color
Internally, the first 4 colors are hardcoder to be `#F00` (plain red), `#0F0` (plain green), `#00F` (plain bue) and `#888` (medum gray), but you can change these colors and even ad colors for other curves if you have more:

```javascript
// The line with index `4` (the fifth) will be orange
spectrumPlot.setLineColor(4, '#F50');
```
