/* eslint-disable */
/*
 * L.TileLayer.PixelFilter
 * https://github.com/greeninfo/L.TileLayer.PixelFilter
 * http://greeninfo-network.github.io/L.TileLayer.PixelFilter/
 */

import { scale } from 'chroma-js';

L.tileLayerPixelFilter = function (url, options) {
  console.log(url);
  console.log(options);
    return new L.TileLayer.PixelFilter(url, options);
};

L.TileLayer.PixelFilter = L.TileLayer.extend({
    // the constructor saves settings and throws a fit if settings are bad, as typical
    // then adds the all-important 'tileload' event handler which basically "detects" an unmodified tile and performs the pxiel-swap
    initialize: function (url, options) {
        options = L.extend({}, L.TileLayer.prototype.options, {
            present: true,
            crossOrigin: true // bypass potential CORS issues by defaulting to true
        }, options);
        L.TileLayer.prototype.initialize.call(this, url, options);
        L.setOptions(this, options);

        // and add our tile-load event hook which triggers us to do the pixel-swap
        this.on('tileload', function (event) {
            this.applyFiltersToTile(event.tile);
        });
    },

    // extend the _createTile function to add the .crossOrigin attribute, since loading tiles from a separate service is a pretty common need
    // and the Canvas is paranoid about cross-domain image data. see issue #5
    _createTile: function () {
        var tile = L.TileLayer.prototype._createTile.call(this);
        tile.crossOrigin = "Anonymous";
        return tile;
    },

    // the heavy lifting to do the pixel-swapping
    // called upon 'tileload' and passed the IMG element
    // tip: when the tile is saved back to the IMG element that counts as a tileload event too! thus an infinite loop, as wel as comparing the pixelCodes against already-replaced pixels!
    //      so, we tag the already-swapped tiles so we know when to quit
    // if the layer is redrawn, it's a new IMG element and that means it would not yet be tagged
    applyFiltersToTile: function (imgelement) {
        // already processed, see note above
        if (imgelement.getAttribute('data-PixelFilterDone')) return;

        // copy the image data onto a canvas for manipulation
        var width  = imgelement.width;
        var height = imgelement.height;
        var canvas    = document.createElement("canvas");
        canvas.width  = width;
        canvas.height = height;
        var context = canvas.getContext("2d");
        context.drawImage(imgelement, 0, 0);

        // create our target imagedata
        var output = context.createImageData(width, height);

        // iterate over the pixels (each one is 4 bytes, RGBA)
        // and see if they are on our list (recall the "addition" thing so we're comparing integers in an array for performance)
        // per issue #5 catch a failure here, which is likely a cross-domain problem
        var pixels;
        try {
            pixels = context.getImageData(0, 0, width, height).data;
        } catch(e) {
            throw "L.TileLayer.PixelFilter getImageData() failed. Likely a cross-domain issue?";
        }
          
				var scaleColor = null;
        for(var pi = 0, pn = pixels.length; pi < pn; pi += 4) {
            var r = pixels[pi];
            var g = pixels[pi+1];
            var b = pixels[pi+2];
            var a = pixels[pi+3];

            // did it match? either way we push a R, a G, and a B onto the image blob
            // if the target RGBA is a null, then we push exactly the same RGBA as we found in the source pixel
            //
            // For this:
            // R = present suitability;
            // G = future suitability;
            // B = ?
            // A = ?
            // if suitability is zero, make pixel not show with A channel = 0
            // for first tests we are using the present suitability only

            if(['gains', 'losses'].indexOf(this.options.present) >= 0) {
                if(r === undefined && g !== undefined) {
                  output.data[pi  ] = 0;
                  output.data[pi+1] = 255;
                  output.data[pi+2] = 0;
                  output.data[pi+3] = r === 0 ? 0 : 255;
                }                
                if(g === undefined && r !== undefined) {
                  output.data[pi  ] = 255;
                  output.data[pi+1] = 0;
                  output.data[pi+2] = 0;
                  output.data[pi+3] = r === 0 ? 0 : 255;
                }
              // if(this.options.present === 'gains') {
              //   if(r === undefined && g !== undefined) {
              //     output.data[pi  ] = 0;
              //     output.data[pi+1] = 255;
              //     output.data[pi+2] = 0;
              //     output.data[pi+3] = r === 0 ? 0 : 255;
              //   }
              // }
              // else if(this.options.present === 'losses') {
              //   if(g === undefined && r !== undefined) {
              //     output.data[pi  ] = 255;
              //     output.data[pi+1] = 0;
              //     output.data[pi+2] = 0;
              //     output.data[pi+3] = r === 0 ? 0 : 255;
              //   }
              // }
            }
            else {
              const myScale = this.options.present === 'present' 
              ? scale(['#FFA575', 'red']).domain([0, 255])
              : scale(['lightgreen', 'green']).domain([0, 255]);
              scaleColor = this.options.present === 'present' ? myScale(r).rgba() : myScale(g).rgba();
              output.data[pi  ] = scaleColor[0];
              output.data[pi+1] = scaleColor[1];
              output.data[pi+2] = scaleColor[2];
              output.data[pi+3] = r === 0 ? 0 : 255;
            }
        }

        // write the image back to the canvas, and assign its base64 back into the on-screen tile to visualize the change
        // tag the tile as having already been updated, so we don't process a 'load' event again and re-process a tile that surely won't match any target RGB codes, in an infinite loop!
        context.putImageData(output, 0, 0);
        imgelement.setAttribute('data-PixelFilterDone', true);
        imgelement.src = canvas.toDataURL();
    }
});
