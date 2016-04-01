module.exports = class Stats

  #
  constructor : ($node, options = {}) ->

    #
    self = @

    #
    @$node       = $node[0]              # D3 likes actual DOM elements not jQuery DOM
    @data        = options.data
    @points      = options.points || 96  # the number of data points to reference
    @thresholds  = options.thresholds || {
      cool: { from: 0,    to: .75 }
      warm: { from: .75,  to: .90 }
      hot:  { from: .90,  to: 1   }}

    #
    size         = options.size || 250   # the size of the component
    width        = size
    height       = size
    @innerRadius = size/10
    @outerRadius = size/5
    @radius      = (@innerRadius + @outerRadius)

    # create base svg ("stage")
    @svg = d3.select(@$node)
      .append("svg:svg")
      .attr
        height : height
        width  : width
        class  : "hourly-stats"

    # build the central circles
    chart = @svg.append("g").attr(transform : "translate(#{width/2}, #{height/2})")

    # center
    chart.append("svg:circle").attr
      r : @innerRadius
      class : "circle"

    # cool
    chart.append("svg:circle").attr
      r : @radius * @thresholds.cool.to
      class : "dash-circle cool"

    # warm
    chart.append("svg:circle").attr
      r : @radius * @thresholds.warm.to
      class : "dash-circle warm"

    # hot
    chart.append("svg:circle").attr
      r : @radius * @thresholds.hot.to
      class : "dash-circle hot"

    # create clock face
    timeline = @_getTimeArray 23, 24
    sliceSize = 2 * Math.PI / 24 # even increments

    #
    times = chart.selectAll("text").data(timeline)

    #
    times.enter()
      .append("text")
        .text (d) -> if d.hour % 3 == 0 then "#{d.hour}#{d.period}" else d.hour
        .attr
          class : (d) -> if d.hour % 3 == 0 then "primary" else "secondary"
          x : (d, i)  -> (self.outerRadius*1.75) * Math.sin(sliceSize * i)
          y : (d, i)  -> (-self.outerRadius*1.75) * Math.cos(sliceSize * i)

    #
    @slices = chart.selectAll('path')
      .data(@data)
      .enter()
        .append("path")
          .attr(class : "cool")

    #
    @update()

  #
  update : (data = @data) ->

    #
    self      = @
    sliceSize = (2 * Math.PI / @points)

    @slices.data(data).each (d, i) ->

      # because i == 0 on the first iteration killing the first data point
      a = i + 1
      sa = a * sliceSize
      ea = (a * sliceSize) + sliceSize

      d3.select(this)
        .transition().duration(250).delay(i * 10)
        .attr {
          d : d3.svg.arc()
                .innerRadius(self.innerRadius)
                .outerRadius(self.innerRadius + (self.outerRadius * d.stat))
                .startAngle(sa)
                .endAngle(ea)
          class: self._getTemperature d.stat
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
