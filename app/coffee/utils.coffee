module.exports = class Utils

  #
  @getTimeObject : (hour) ->
    switch
      when hour == 0  then {hour: 12, period: "am", military: hour}
      when hour < 12  then {hour: hour, period: "am", military: hour}
      when hour == 12 then {hour: 12, period: "pm", military: hour}
      when hour > 12  then {hour: hour-12, period: "pm", military: hour}

  #
  @getTemperature : (val) ->
    switch
      when val < 0     then "wait"
      when val <= 0.75 then "cool"
      when val <= 0.90 then "warm"
      else                  "hot"

  @sortData : (ar) ->
    ar.sort (a,b)=>
      timeA = Number a.time.split(':').join('.')
      timeB = Number b.time.split(':').join('.')
      if timeA < timeB then return -1
      else                  return 1
