Utils = require './utils'

#
component = require 'jade/component'

#
class HourlyAverage

  _size:       250 # the size of the component
  _points:     96  # the number of data points to create

  # these are the available periods to display on the component; the value represents
  # the index to pull from this list once selected
  _periods: [
    {text: "24 hours", value: 0, start:"25h", stop:"1h"},
    {text: "7 days", value: 1, start:"168h", stop:"1h"},
    {text: "30 days", value: 2, start:"720h", stop:"1h"}
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

    # create base svg ("stage"); D3 likes actual DOM nodes, not jQuery nodes
    @svg = d3.select($(".component", @$node).get(0))
      .append("svg:svg")
        .attr
          height : @height
          width  : @width

    @_buildGraph()
    @_buildLegend()

    # add event handlers

    # when a metirc is changed update the desired metric and request data
    @$node.find(".metrics").change (e) =>
      @metric = $(e.currentTarget).find("option:selected").val()
      @_subscribeToHourlyData()

    # when a period is changed update the desired metric and request data
    @$node.find(".periods").change (e) =>
      period = $(e.currentTarget).find("option:selected").val()
      [@start, @stop] = [@_periods[period].start, @_periods[period].stop]
      @_subscribeToHourlyData()

    # get initial (default) stats
    @_subscribeToHourlyData()

  #
  updateAverageStats : (data) =>

    #
    self      = @
    sliceSize = (2 * Math.PI / @_points)

    #
    @slices = @graph.selectAll('path').data(data)

    # CREATE

    #
    @slices.enter()
      .append("path")
        .each (d, i) ->

          a  = (i + 1) # because i == 0 on the first iteration killing the first data point
          sa = (a * sliceSize)
          ea = (sa + sliceSize)

          d3.select(@).attr
            class: "cool"

            # start each arc at 1
            d : d3.svg.arc()
              .innerRadius(self.innerRadius)
              .outerRadius(self.innerRadius + 1)
              .startAngle(sa)
              .endAngle(ea)

    # UPDATE

    @slices.each (d, i) ->

      a  = (i + 1) # because i == 0 on the first iteration killing the first data point
      sa = (a * sliceSize)
      ea = (sa + sliceSize)

      d3.select(@)
        .transition().duration(250).delay(i * 10)
        .attr
          class: "fill-temp #{Utils.getTemperature(d.value)}"

          # tween each arc to it's actual value
          d : d3.svg.arc()
            .innerRadius(self.innerRadius)
            .outerRadius(self.innerRadius + (self.outerRadius * d.value))
            .startAngle(sa)
            .endAngle(ea)

  #
  _buildGraph : () ->

    # build the central circles
    @graph = @svg.append("g").attr(transform : "translate(#{@width/2}, #{@height/2})")

    # center
    @graph.append("svg:circle").attr
      r : @innerRadius
      class : "circle"

    # cool
    @graph.append("svg:circle").attr
      r : @radius * Utils.thresholds.cool.to
      class : "dash-circle stroke-temp cool"

    # warm
    @graph.append("svg:circle").attr
      r : @radius * Utils.thresholds.warm.to
      class : "dash-circle stroke-temp warm"

    # hot
    @graph.append("svg:circle").attr
      r : @radius * Utils.thresholds.hot.to
      class : "dash-circle stroke-temp hot"

  #
  _buildLegend : () ->

    self = @

    # create clock face
    timeline = Utils.getTimeArray 23, 24
    sliceSize = 2 * Math.PI / 24 # even increments

    #
    times = @graph.selectAll("text").data(timeline)

    #
    times.enter()
      .append("text")
        .text (d) -> if d.hour % 3 == 0 then "#{d.hour}#{d.period}" else d.hour
        .attr
          class : (d) -> if d.hour % 3 == 0 then "primary" else "secondary"
          x : (d, i)  -> (self.outerRadius*1.75) * Math.sin(sliceSize * i)
          y : (d, i)  -> (-self.outerRadius*1.75) * Math.cos(sliceSize * i)

  #
  _subscribeToHourlyData : () ->
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
