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

  var makeToggleSrcButton = function(sample) {
    var js = sample.select('.js');
    var buttonText = function(d) { return d ? 'Hide code' : 'Show code'; };
    sample.insert('button', '.js')
        .attr('class', 'toggle-src')
        .datum(false)
        .text(buttonText)
        .on('click', function(isVisible) {
          d3.select(this)
              .datum(!isVisible)
              .text(buttonText);
          js.style('display', function() { return isVisible ? 'none' : 'inherit'; });
        });
  };

  var makeSwapButton = function(container, content) {
    // Swap a button to swap from html to "view source" for the content
    // element within container. Moves any child nodes to an invisible div to
    // preserve event handlers.
    var holder = d3.select(container).append('div')
        .style('display', 'none');
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
            while (body.node().childNodes.length) {
              holder.node().appendChild(body.node().childNodes[0]);
            }
            body.text(styled)
              .classed('code', true);
          } else {
            body.html('')
              .classed('code', false);
            while (holder.node().childNodes.length) {
              body.node().appendChild(holder.node().childNodes[0]);
            }
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

  var annotateHiders = function() {
    d3.selectAll('.sample .hide').on('click', function() {
      var div = d3.select(this);
      div.classed('hide-active', !div.classed('hide-active'));
    });
  };


  var annotateAnnotates = function() {
    d3.selectAll('.sample .annotate')
      .on('click', function() {
        var div = d3.select(this);
        div.classed('collapse', !div.classed('collapse'));
      });
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
          alert(e);
          result
              .classed('error', true)
              .text(describeError(e));
        }
        ijs.parentNode.removeChild(ijs);

        // Delay the load - let any transitions run at least one frame.
        var resizeElem = function() {
          window.setTimeout(function() {
            var resultDims = sizeResultContent(iframeDoc.body);
            result
                .style('height', (25 + resultDims[1]) + 'px');
          }, 0);
        };
        d3.select(iframeDoc).on('click', resizeElem);
        resizeElem();
      };
      ijs.addEventListener('load', onIjsLoad, true);

      iframeDoc.head.appendChild(ijs);

      if (!sample.classed('hide-src')) {
        makeSwapButton(result.node(), iframeDoc.body);
      } else {
        makeToggleSrcButton(sample);
      }
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
    annotateHiders();
    annotateAnnotates();
  };

  exports.tut = tut;
})(window);
