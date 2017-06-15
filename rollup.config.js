var config = require('./package.json');

import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss'

export default {
  entry: config.main, //'src/es6module.js',
  format: config.moduleFormat, //'umd',
  moduleName: config.moduleName, //'ES6MOD',
  sourceMap: true,
  dest: config.moduleBuildDir + '/' + config.name + '.js', //'build/es6module/es6module.js' // equivalent to --output
  plugins: [
    nodeResolve(),
    commonjs(),
    
    postcss({
      plugins: [
        // cssnext(),
        // yourPostcssPlugin()
      ],
      sourceMap: true, // default value: false
      //extract: true, // default value: false
      extensions: ['.css', '.sss']  // default value
      // parser: sugarss
    })
  
  ]
};
