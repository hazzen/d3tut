(function(exports) {
  var tut = {};

  var describeError = function(e) {
    var apologies = ['Whoops', 'Harumph', 'Drats', 'Snap', 'Zut', 'Bugger'];
    var apol = apologies[Math.floor(Math.random() * apologies.length)];
    return [apol, '! We had an error (', e.name, ': "', e.message, '").'].join('');
  };

  var unescapeHtml = function(code) {
    return code.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  };

  var makeSwapButton = function(container, content) {
    var btn = d3.select(container).append('button')
        .datum(true)
        .attr('class', 'sample-swap')
        .text('swap src/result')
        .on('click', function() {
          var me = d3.select(this);
          var body = d3.select(content);
          if (me.datum()) {
            var styled = style_html(body.html(), {
              indent_size: 2
            });
            body.text(styled)
              .classed('code', true);
          } else {
            body.html(body.text())
              .classed('code', false);
          }
          me.datum(!me.datum());
          var dims = sizeResultContent(content);
          d3.select(container)
              .style('height', (25 + dims[1]) + 'px');
        });
  };

  var sizeResultContent = function(resultElem) {
    var offscreen = d3.select(resultElem.ownerDocument.body).append('div')
        .style('position', 'absolute')
        .style('left', '-999px')
        .attr('class', resultElem.className)
        .html(d3.select(resultElem).html());
    var w = offscreen.node().clientWidth;
    var h = offscreen.node().clientHeight;
    offscreen.remove();
    return [w, h];
  };

  var annotateSample = function(sample) {
    sample = d3.select(sample);
    var html = sample.select('.html');
    var js = sample.select('.js');
    var result = sample.select('.result');
    if (!js.length || !result.length) {
      return;
    }

    var currentDims = [result.node().offsetWidth, result.node().offsetHeight];
    var iframe = result.append('iframe')
        .style('width', '100%')
        .style('height', '100%')
        .text('')
        .node();
    var onIframeLoad = function() {
      var iframeWindow = iframe.contentWindow;
      var iframeDoc = iframeWindow.document;
      if (html.text()) {
        iframe.contentDocument.body.innerHTML = unescapeHtml(html.text());
      }
      var icss = iframeDoc.createElement('style');
      icss.innerHTML = '.code{color:#000;white-space:pre;font-family:monospace;}' +
          'body{padding:0;margin:0}';
      iframeDoc.head.appendChild(icss);
      var ijs = iframeDoc.createElement('script');
      ijs.type = 'text/javascript';
      ijs.async = true;
      ijs.src = 'd3.v2.min.js';

      var onIjsLoad = function() {
        ijs.removeEventListener('load', onIjsLoad, true);
        result
            .classed('loaded', true);
        try {
          iframeWindow.eval(js.text());
        } catch (e) {
          result
              .classed('error', true)
              .text(describeError(e));
        }
        ijs.parentNode.removeChild(ijs);

        var resultDims = sizeResultContent(iframeDoc.body);
        result
            .style('height', (25 + resultDims[1]) + 'px');
      };
      ijs.addEventListener('load', onIjsLoad, true);

      iframeDoc.head.appendChild(ijs);

      makeSwapButton(result.node(), iframeDoc.body);
    };
    // Firefox doesn't like setTimeout-ing an iframe loading, and Chrome doesn't
    // seem to fire the load event. I'll assume Webkit == Chrome, and ignore
    // IE/Opera.
    if (navigator.userAgent.match(/Firefox/)) {
      iframe.addEventListener('load', onIframeLoad, true);
    } else {
      window.setTimeout(onIframeLoad, 1);
    }
  };

  var annotateAllSamples = function() {
    var samples = document.querySelectorAll('.sample');
    Array.prototype.forEach.call(samples, function(elem) {
      annotateSample(elem);
    });
  };

  tut.init = function() {
    annotateAllSamples();
  };

  exports.tut = tut;
})(window);
