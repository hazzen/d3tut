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

  var annotateSample = function(sample) {
    sample = d3.select(sample);
    var html = sample.select('.code-html');
    var js = sample.select('.code-js');
    var result = sample.select('.code-result');
    if (!js.length || !result.length) {
      return;
    }
    result.style('width', result.node().clientWidth + 'px')
      .style('height', result.node().clientHeight + 'px');
    result.html('');
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
      icss.innerHTML = '.code {color:#000;white-space:pre;font-family:monospace;}';
      iframeDoc.head.appendChild(icss);
      var ijs = iframeDoc.createElement('script');
      ijs.type = 'text/javascript';
      ijs.async = true;
      ijs.src = 'd3.v2.min.js';

      var onIjsLoad = function() {
        iframeWindow.eval(js.text());
        ijs.removeEventListener('load', onIjsLoad, true);
        ijs.parentNode.removeChild(ijs);
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
