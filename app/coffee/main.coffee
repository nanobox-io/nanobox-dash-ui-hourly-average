Utils = require './utils'

#
component = require 'jade/component'

#
class HourlyAverage

  _size:   250          # the size of the component
  _points: 96           # the number of data points to create; we're showing stats for every 15 min (4*24)
  _slices: 2*Math.PI/24 # the circle will show 24 points of data

  # these are the available periods to display on the component; the value represents
  # the index to pull from this list once selected
  _periods: [
    {text: "24 hours",  value: 0, start:"25h",  stop:"1h"},
    {text: "7 days",    value: 1, start:"168h", stop:"1h"},
    {text: "30 days",   value: 2, start:"720h", stop:"1h"}
  ]

  #
  constructor : (@$el, @options={}) ->

    # set defaults
    if !@options.metrics then @options.metrics = ["cpu", "ram", "swap", "disk"]
    @metric = @options.metrics[0]
    @start  = @_periods[0].start
    @stop   = @_periods[0].stop

    #
    @size = @options.size || @_size

    #
    @width       = @size
    @height      = @size
    @innerRadius = @size/10
    @outerRadius = @size/5
    @radius      = (@innerRadius + @outerRadius)

    #
    @$node = $(component({metrics: @options.metrics, periods: @_periods}))
    @$el.append @$node

  #
  build : () ->

    #
    @view      = d3.select($(".component", @$node).get(0))
    @component = @view.append("svg:svg").attr({width: @width, height: @height})
    @center    = @component.append("g").attr(transform : "translate(#{@width/2}, #{@height/2})")

    #
    @_drawThresholds()
    @_buildLegend()

    # get initial (default) stats
    @_updateData()

    # EVENT HANDLERS

    # when a metirc is changed update the desired metric and request data
    @$node.find(".metrics").change (e) =>
      @metric = $(e.currentTarget).find("option:selected").val()
      @_updateData()

    # when a period is changed update the desired metric and request data
    @$node.find(".periods").change (e) =>
      period = $(e.currentTarget).find("option:selected").val()
      [@start, @stop] = [@_periods[period].start, @_periods[period].stop]
      @_updateData()

  #
  updateAverageStats : (data) =>
    self = @

    # CREATE
    sliceEnter = @center.selectAll('path').data(data)
      .enter().append("path")
    sliceEnter.each (d, i) ->

      # i+1 because 0 kills the first data point
      sa = ((i+1)*self._slices/4) # /4 because we're showing 4 poitns for each time (24/4)
      ea = (sa+self._slices/4)    # /4 because we're showing 4 poitns for each time (24/4)

      d3.select(@).attr
        class: "cool"

        # start each arc at 1
        d : d3.svg.arc()
          .innerRadius(self.innerRadius)
          .outerRadius(self.innerRadius)
          .startAngle(sa)
          .endAngle(ea)

    # UPDATE
    @center.selectAll('path').data(data).each (d, i) ->

      # i+1 because 0 kills the first data point
      sa = ((i+1)*self._slices/4) # /4 because we're showing 4 poitns for each time (24/4)
      ea = (sa+self._slices/4)    # /4 because we're showing 4 poitns for each time (24/4)

      # if the value is 0 then we want to bump it up a little just to show some green
      d.value = 0.05 if d.value == 0

      d3.select(@)
        .transition().duration(250).delay(i*10)
        .attr
          class: "fill-temp #{Utils.getTemperature(d.value)}"

          # tween each arc to it's actual value
          d : d3.svg.arc()
            .innerRadius(self.innerRadius)
            .outerRadius(self.innerRadius + (self.outerRadius * d.value))
            .startAngle(sa)
            .endAngle(ea)

  # draw center, cool, warm, and hot rings
  _drawThresholds : () ->
    @center.append("svg:circle").attr({r: @innerRadius, class: "circle"})
    @center.append("svg:circle").attr({r: @radius * 0.75, class: "dash-circle stroke-temp cool"})
    @center.append("svg:circle").attr({r: @radius * 0.90, class: "dash-circle stroke-temp warm"})
    @center.append("svg:circle").attr({r: @radius * 1.00, class: "dash-circle stroke-temp hot"})

  # draw clock face
  _buildLegend : () ->

    # build data; we need 24 hours represented (23..0 == 24)
    data = []
    data.unshift Utils.getTimeObject i for i in [23..0]

    # draw hours
    @center.selectAll("text").data(data)
      .enter()
      .append("text")
        .text (d) -> if d.hour % 3 == 0 then "#{d.hour}#{d.period}" else d.hour
        .attr
          class: (d) -> if d.hour % 3 == 0 then "primary" else "secondary"
          x: (d, i)  => (@outerRadius*1.75) * Math.sin(@_slices*i)
          y: (d, i)  => (-@outerRadius*1.75) * Math.cos(@_slices*i)

  #
  _updateData : () ->
    PubSub.publish 'STATS.SUBSCRIBE.HOURLY_AVERAGE', {
      start    : @start
      stop     : @stop
      entity   : @options.entity
      entityId : @options.entityId
      metric   : @metric
      callback : @updateAverageStats
    }

#
window.nanobox ||= {}
nanobox.HourlyAverage = HourlyAverage
