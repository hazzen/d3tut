(function(exports) {
  var tut3 = {};

  var SELECT_DATA = [
    {
      line: "var outers = d3.selectAll('outer')",
      nodes: [
        {
          selected: true,
          children: [{}, {}],
        },
        {
          selected: true,
          children: [{}],
        },
      ],
    },
    {
      line: "    .data(['a', 'b', 'c']);",
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
      line: "var inners = outers.selectAll('inner')",
      nodes: [
        {
          data: 'a',
          children: [
            {
              selected: true,
            },
            {
              selected: true,
            },
          ],
        },
        {
          data: 'b',
          children: [
            {
              selected: true,
            },
          ],
        },
        {
          data: 'c',
          children: [],
        },
      ],
    },
    {
      line: "    .data(function(d, i) { return ['x' + i, 'y' + i]; });",
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
    {
      line: "var newInners = inners.enter()",
      nodes: [
        {
          data: 'a',
          children: [
            {
              data: 'x0',
            },
            {
              data: 'y0',
            },
          ],
        },
        {
          data: 'b',
          children: [
            {
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
    {
      line: "    .append('div');",
      nodes: [
        {
          data: 'a',
          children: [
            {
              data: 'x0',
            },
            {
              data: 'y0',
            },
          ],
        },
        {
          data: 'b',
          children: [
            {
              data: 'x1',
            },
            {
              selected: true,
              data: 'y1',
            },
          ],
        },
        {
          data: 'c',
          children: [
            {
              selected: true,
              data: 'x2',
            },
            {
              selected: true,
              data: 'y2',
            },
          ],
        },
      ],
    },
    {
      line: '...',
    },
  ];
  var TABLE_DATA = [
    {
      line: "var tableRows = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];",
      nodes: [
      ],
    },
    {
      line: "var trs = table.selectAll('tr')",
      nodes: [
      ],
    },
    {
      line: "    .data(tableRows);",
      nodes: [
        {
          data: '[1, 2, 3]',
          placeholder: true,
          selected: true,
        },
        {
          data: '[4, 5, 6]',
          placeholder: true,
          selected: true,
        },
        {
          data: '[7, 8, 9]',
          placeholder: true,
          selected: true,
        },
      ],
    },
    {
      line: "var newTrs = trs.enter()",
      nodes: [
        {
          data: '[1, 2, 3]',
          placeholder: true,
          selected: true,
        },
        {
          data: '[4, 5, 6]',
          placeholder: true,
          selected: true,
        },
        {
          data: '[7, 8, 9]',
          placeholder: true,
          selected: true,
        },
      ],
    },
    {
      line: "    .append('tr');",
      nodes: [
        {
          data: '[1, 2, 3]',
          selected: true,
        },
        {
          data: '[4, 5, 6]',
          selected: true,
        },
        {
          data: '[7, 8, 9]',
          selected: true,
        },
      ],
    },
    {
      line: "var tds = trs.selectAll('td')",
      nodes: [
        {
          data: '[1, 2, 3]',
        },
        {
          data: '[4, 5, 6]',
        },
        {
          data: '[7, 8, 9]',
        },
      ],
    },
    {
      line: "    .data(Object);",
      nodes: [
        {
          data: '[1, 2, 3]',
          children: [
            {
              data: '1',
              selected: true,
              placeholder: true,
            },
            {
              data: '2',
              selected: true,
              placeholder: true,
            },
            {
              data: '3',
              selected: true,
              placeholder: true,
            },
          ],
        },
        {
          data: '[4, 5, 6]',
          children: [
            {
              data: '4',
              selected: true,
              placeholder: true,
            },
            {
              data: '5',
              selected: true,
              placeholder: true,
            },
            {
              data: '6',
              selected: true,
              placeholder: true,
            },
          ],
        },
        {
          data: '[7, 8, 9]',
          children: [
            {
              data: '7',
              selected: true,
              placeholder: true,
            },
            {
              data: '8',
              selected: true,
              placeholder: true,
            },
            {
              data: '9',
              selected: true,
              placeholder: true,
            },
          ],
        },
      ],
    },
    {
      line: "var newTds = tds.enter()",
      nodes: [
        {
          data: '[1, 2, 3]',
          children: [
            {
              data: '1',
              selected: true,
              placeholder: true,
            },
            {
              data: '2',
              selected: true,
              placeholder: true,
            },
            {
              data: '3',
              selected: true,
              placeholder: true,
            },
          ],
        },
        {
          data: '[4, 5, 6]',
          children: [
            {
              data: '4',
              selected: true,
              placeholder: true,
            },
            {
              data: '5',
              selected: true,
              placeholder: true,
            },
            {
              data: '6',
              selected: true,
              placeholder: true,
            },
          ],
        },
        {
          data: '[7, 8, 9]',
          children: [
            {
              data: '7',
              selected: true,
              placeholder: true,
            },
            {
              data: '8',
              selected: true,
              placeholder: true,
            },
            {
              data: '9',
              selected: true,
              placeholder: true,
            },
          ],
        },
      ],
    },
    {
      line: "    .append('td')",
      nodes: [
        {
          data: '[1, 2, 3]',
          children: [
            {
              data: '1',
              selected: true,
            },
            {
              data: '2',
              selected: true,
            },
            {
              data: '3',
              selected: true,
            },
          ],
        },
        {
          data: '[4, 5, 6]',
          children: [
            {
              data: '4',
              selected: true,
            },
            {
              data: '5',
              selected: true,
            },
            {
              data: '6',
              selected: true,
            },
          ],
        },
        {
          data: '[7, 8, 9]',
          children: [
            {
              data: '7',
              selected: true,
            },
            {
              data: '8',
              selected: true,
            },
            {
              data: '9',
              selected: true,
            },
          ],
        },
      ],
    },
    {
      line: '...',
    },
  ];

  tut3.initCode = function(idSuffix, lines, opt_names) {
    var names = opt_names || ['outer', 'inner'];
    var block = d3.select('#l3-' + idSuffix);

    var code = block.select('.code');
    var diagram = block.select('.diagram');

    var lineElems = code.selectAll('div.line')
        .data(lines).enter()
      .append('div')
        .attr('class', 'line')
        .text(function(d) { return d.line; });

    var prevButton = code.append('button')
        .html('&laquo; step back');
    var nextButton = code.append('button')
        .html('run line &raquo;');

    var active = 0;

    var setLine = function(v) {
      if (v < 0 || v >= lines.length) return;
      active = v;
      lineElems
          .classed('active', function(d, i) { return i == active; });

      var renderDiagram = function(nodes, clazz, name) {
        nodes.exit().transition()
            .style('opacity', 0)
            .style('left', '-15px')
            .remove();
        nodes.enter().append('div')
            .style('opacity', 0)
            .style('left', '-15px')
            .attr('class', 'box ' + clazz)
            .text(function(d, i) { return name + ' ' + (i + 1); })
            .append('span')
              .attr('class', 'data');

        nodes.transition()
            .style('border-color', function(d) { return d.selected ? '#add8ff' : '#aaa'; })
            .style('left', '0px')
            .style('opacity', 1);

        nodes
            .classed('placeholder', function(d) { return d.placeholder; })
            .classed('selected', function(d) { return d.selected; })
            .select('.data')
              .text(function(d) { return d.data == null ? '' : ' [data=' + d.data + ']'; });
      };

      if (v > 0) {
        var outers = diagram.selectAll('.outer')
            .data(lines[v - 1].nodes);
        renderDiagram(outers, 'outer', names[0]);

        var inners = outers.selectAll('.inner')
            .data(function(d) { return d.children || []; });
        renderDiagram(inners, 'inner', names[1]);
      }
    };

    setLine(active);

    prevButton.on('click', function() { setLine(active - 1); });
    nextButton.on('click', function() { setLine(active + 1); });
  };

  tut3.init = function() {
    tut3.initCode('select', SELECT_DATA);
    tut3.initCode('table', TABLE_DATA, ['tr', 'td']);
  };

  exports.tut3 = tut3;
})(window);
