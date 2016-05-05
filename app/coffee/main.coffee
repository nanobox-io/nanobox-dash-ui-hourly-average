component = require 'jade/component'

class HourlyAverage

  #
  constructor : (@$el, @options) ->

    #
    @$node = $(component())
    @$el.append @$node

    # D3 likes actual DOM nodes, not jQuery nodes
    @component = $(".component", @$node).get(0)

    #
    @points      = 96  # the number of data points to reference
    @thresholds  = {
      cool: { from: 0,    to: .75 }
      warm: { from: .75,  to: .90 }
      hot:  { from: .90,  to: 1   }}

    #
    size         = 250   # the size of the component
    @width        = size
    @height       = size
    @innerRadius = size/10
    @outerRadius = size/5
    @radius      = (@innerRadius + @outerRadius)

  #
  build : () ->

    # create base svg ("stage")
    @svg = d3.select(@component)
      .append("svg:svg")
        .attr
          height : @height
          width  : @width

    @_buildGraph()
    @_buildLegend()
    @_subscribeToHourlyData(@options.id)

  #
  update : (data) =>

    #
    self      = @
    sliceSize = (2 * Math.PI / @points)

    #
    @slices = @graph.selectAll('path').data(data)

    # init
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

    # update
    @slices.each (d, i) ->

      a  = (i + 1) # because i == 0 on the first iteration killing the first data point
      sa = (a * sliceSize)
      ea = (sa + sliceSize)

      d3.select(@)
        .transition().duration(250).delay(i * 10)
        .attr
          class: "fill-temp #{self._getTemperature(d.value)}"

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
      r : @radius * @thresholds.cool.to
      class : "dash-circle stroke-temp cool"

    # warm
    @graph.append("svg:circle").attr
      r : @radius * @thresholds.warm.to
      class : "dash-circle stroke-temp warm"

    # hot
    @graph.append("svg:circle").attr
      r : @radius * @thresholds.hot.to
      class : "dash-circle stroke-temp hot"

  #
  _buildLegend : () ->

    self = @

    # create clock face
    timeline = @_getTimeArray 23, 24
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
  _subscribeToHourlyData : (id) ->
    PubSub.publish 'STATS.SUBSCRIBE.HOURLY_AVERAGE', {
      statProviderId : id
      callback       : @update
    }

  #
  _getTimeArray : (hour, hours=25) ->

    #
    timeline = []

    # get the array
    for i in [ 0 ... hours ]
      timeline.unshift @_getTimeObject hour--
      hour = 23 if hour == -1

    #
    timeline

  #
  _getTimeObject : (hour) ->
    switch
      when hour == 0
        hour     : 12
        period   : "am"
        military : hour
      when hour < 12
        hour   : hour
        period : "am"
        military : hour
      when hour == 12
        hour   : 12
        period : "pm"
        military : hour
      when hour > 12
        hour   : hour - 12
        period : "pm"
        military : hour

  #
  _getTemperature : (t) ->
    switch
      when t < 0                    then "sleep"
      when t < @thresholds.cool.to  then "cool"
      when t < @thresholds.warm.to  then "warm"
      else "hot"

#
window.nanobox ||= {}
nanobox.HourlyAverage = HourlyAverage
