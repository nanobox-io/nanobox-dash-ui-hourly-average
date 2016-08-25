module.exports = class Utils

  # color thresholds; not dynamic for now, but easily made so
  @thresholds: {
    cool: {from: 0,   to: .75}
    warm: {from: .75, to: .90}
    hot:  {from: .90, to: 1  }
  }

  #
  @getTimeArray : (hour, hours=25) ->

    #
    timeline = []

    # get the array
    for i in [ 0 ... hours ]
      timeline.unshift @getTimeObject hour--
      hour = 23 if hour == -1

    #
    timeline

  #
  @getTimeObject : (hour) ->
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
  @getTemperature : (t) ->
    switch
      when t <= 0                    then "wait"
      when t < @thresholds.cool.to  then "cool"
      when t < @thresholds.warm.to  then "warm"
      else "hot"
