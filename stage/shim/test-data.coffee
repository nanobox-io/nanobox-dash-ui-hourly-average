module.exports = class TestData

  #
  constructor: () -> @createFakeStatDataProvider()

  #
  createFakeStatDataProvider : ()->
    PubSub.subscribe 'STATS.SUBSCRIBE.HOURLY_AVERAGE', (m, data) =>
      hourlyAverageDataSimulator.waitForData(data)

    PubSub.subscribe 'STATS.UNSUBSCRIBE', (m, data) =>

  #
  waitForData : (data) ->
    data.callback hourlyAverageDataSimulator.generateHourlyAverages()
    setInterval () ->

      # disable updates by default
      if window.enableUpdates
        data.callback hourlyAverageDataSimulator.generateHourlyAverages()
    , 5000

  #
  generateHourlyAverages : () ->
    data = []
    for hour in [0...24]
      for quarter in [0, 15, 30, 45]
        data.push {time: "#{("0" + hour).slice(-2)}:#{("0" + quarter).slice(-2)}", value: ((Math.random() * 1.00) + 0.00)}
    data
