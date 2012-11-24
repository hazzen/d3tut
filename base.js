(function(exports) {
  var tut = {};

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
          body.text(body.html())
            .classed('code', true);
        } else {
          body.html(body.text())
            .classed('code', false);
        }
        me.datum(!me.datum());
      });
  };

  var sizeResultContent = function(resultElem) {
    var offscreen = d3.select(document.body).append('div')
      .style('position', 'absolute')
      .style('left', '-999px')
      .html(d3.select(resultElem).html());
    var w = offscreen.node().clientWidth;
    var h = offscreen.node().clientHeight;
    offscreen.text(offscreen.html());
    w = Math.max(w, offscreen.node().clientWidth);
    h = Math.max(h, offscreen.node().clientHeight);
    offscreen.remove();
    return [w, h];
  };

  var annotateSample = function(sample) {
    sample = d3.select(sample);
    var html = sample.select('.code-html');
    var js = sample.select('.code-js');
    var result = sample.select('.code-result');
    if (!js.length || !result.length) {
      return;
    }

    var currentDims = [result.node().offsetWidth, result.node().offsetHeight];
    var iframe = result.append('iframe')
      .style('width', '100%')
      .style('height', '100%')
      .node();
    window.setTimeout(function() {
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
        result.classed('loaded', true);
        iframeWindow.eval(js.text());
        ijs.removeEventListener('load', onIjsLoad, true);
        ijs.parentNode.removeChild(ijs);

        var resultDims = sizeResultContent(iframeDoc.body);
        result.style('width', Math.max(currentDims[0], resultDims[0]) + 'px')
          .style('height', (currentDims[1] + resultDims[1]) + 'px');
      };
      ijs.addEventListener('load', onIjsLoad, true);

      iframeDoc.body.appendChild(ijs);

      makeSwapButton(result.node(), iframeDoc.body);
    });
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
