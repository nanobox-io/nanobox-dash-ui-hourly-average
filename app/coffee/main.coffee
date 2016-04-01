component = require 'jade/component'
Stats = require 'stats'
View = require 'view'

class HourlyAverage extends View

  #
  constructor : ($el, @data) ->

    #
    Eventify.extend @

    #
    @$node = $ component()

    ## build component

    # create stats
    @stats = new Stats $("#hourly-stats", @$node), {data: @data}

    # set the opacity of the component to 0, attach it, and fade it in
    @$node.css opacity: 0
    $el.append @$node
    @fadeIn()

  #
  update : (data = @data) -> @stats.update(data)

#
window.nanobox ||= {}
nanobox.HourlyAverage = HourlyAverage
