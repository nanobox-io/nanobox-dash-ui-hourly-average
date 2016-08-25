TestData = require './shim/test-data'
window.hourlyAverageDataSimulator = new TestData()

#
window.init = () ->
  # statsDataSimultor.createFakeStatDataProvider()

  #
  options =
    # metrics     : []
    entity      : "host"
    entityId    : "0001"

  #
  hourly = new nanobox.HourlyAverage $("body"), options
  hourly.build()
