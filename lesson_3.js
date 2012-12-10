(function(exports) {
  var tut3 = {};

  var DATA = [
    {
      line: '...',
      nodes: [
        {
          children: [{}, {}],
        },
        {
          children: [{}],
        },
      ],
    },
    {
      line: "var outers = d3.selectAll('outer').data(['a', 'b', 'c']);",
      nodes: [
        {
          selected: true,
          data: 'a',
          children: [{}, {}],
        },
        {
          selected: true,
          data: 'b',
          children: [{}],
        },
        {
          placeholder: true,
          selected: true,
          data: 'c',
          children: [],
        },
      ],
    },
    {
      line: "var newOuters = outers.enter()",
      nodes: [
        {
          data: 'a',
          children: [{}, {}],
        },
        {
          data: 'b',
          children: [{}],
        },
        {
          placeholder: true,
          selected: true,
          data: 'c',
          children: [],
        },
      ],
    },
    {
      line: "    .append('div')",
      nodes: [
        {
          data: 'a',
          children: [{}, {}],
        },
        {
          data: 'b',
          children: [{}],
        },
        {
          selected: true,
          data: 'c',
          children: [],
        },
      ],
    },
    {
      line: "var inners = outers.selectAll('inner').data(function(d, i) { return ['x' + i, 'y' + i]; });",
      nodes: [
        {
          data: 'a',
          children: [
            {
              selected: true,
              data: 'x0',
            },
            {
              selected: true,
              data: 'y0',
            },
          ],
        },
        {
          data: 'b',
          children: [
            {
              selected: true,
              data: 'x1',
            },
            {
              selected: true,
              placeholder: true,
              data: 'y1',
            },
          ],
        },
        {
          data: 'c',
          children: [
            {
              selected: true,
              placeholder: true,
              data: 'x2',
            },
            {
              selected: true,
              placeholder: true,
              data: 'y2',
            },
          ],
        },
      ],
    },
  ];

  tut3.initCode = function(idSuffix, lines) {
    var block = d3.select('#l3-' + idSuffix);

    var code = block.select('.code');
    var diagram = block.select('.diagram');

    var lineElems = code.selectAll('div.line')
        .data(lines).enter()
      .append('div')
        .attr('class', 'line')
        .text(function(d) { return d.line; });

    var prevButton = code.append('button')
        .html('&laquo; prev line');
    var nextButton = code.append('button')
        .html('next line &raquo;');

    var active = 0;

    var setLine = function(v) {
      active = v;
      lineElems
          .classed('active', function(d, i) { return i == active; });

      var outers = diagram.selectAll('.outer')
          .data(lines[v].nodes);

      outers.exit().remove();
      outers.enter().append('div')
          .attr('class', 'box outer')
          .text(function(d, i) { return 'outer ' + (i + 1); })
          .append('span')
            .attr('class', 'data');

      outers
          .classed('placeholder', function(d) { return d.placeholder; })
          .classed('selected', function(d) { return d.selected; })
          .select('.data')
            .text(function(d) { return d.data == null ? '' : ' [data=' + d.data + ']'; });

      var inners = outers.selectAll('.inner')
          .data(function(d) { return d.children; });

      inners.exit().remove();
      inners.enter().append('div')
          .attr('class', 'box inner')
          .text(function(d, i) { return 'inner ' + (i + 1); })
          .append('span')
            .attr('class', 'data');

      inners
          .classed('placeholder', function(d) { return d.placeholder; })
          .classed('selected', function(d) { return d.selected; })
          .select('.data')
            .text(function(d) { return d.data == null ? '' : ' [data=' + d.data + ']'; });
    };

    setLine(active);

    prevButton.on('click', function() { setLine(active - 1); });
    nextButton.on('click', function() { setLine(active + 1); });
  };

  tut3.init = function() {
    tut3.initCode('select', DATA);
  };

  exports.tut3 = tut3;
})(window);
