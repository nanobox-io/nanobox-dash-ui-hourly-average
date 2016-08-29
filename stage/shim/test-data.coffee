module.exports = class TestData

  #
  constructor: () -> # do nothing...

  #
  createFakeStatDataProvider : ()->
    PubSub.subscribe 'STATS.SUBSCRIBE.HOURLY_AVERAGE', (m, data) =>
      hourlyAverageDataSimulator.waitForData(data)

  #
  waitForData : (data) ->
    data.callback hourlyAverageDataSimulator.generateOutOfOrderValues()

    # disable updates by default
    setInterval () ->
      if window.enableUpdates
        data.callback hourlyAverageDataSimulator.generateOutOfOrderValues()
    , 3000

  #
  generateHourlyAverages : () ->
    data = []
    for hour in [0...24]
      for quarter in [0, 15, 30, 45]
        value = ((Math.random() * 1.00) + 0.00)
        data.push {time: "#{("0" + hour).slice(-2)}:#{("0" + quarter).slice(-2)}", value: value}
    data

  #
  generateOutOfOrderValues : () ->
    data = []
    total = 0

    # Create an array of values that increase linearly
    for hour in [0...24]
      for quarter in [0, 15, 30, 45]
        value = (total+=0.0106)
        data.push {time: "#{("0" + hour).slice(-2)}:#{("0" + quarter).slice(-2)}", value: value}

    # Randomly mix up the array
    for i in [data.length-1..1]
      j = Math.floor Math.random() * (i + 1)
      [data[i], data[j]] = [data[j], data[i]]

    data
