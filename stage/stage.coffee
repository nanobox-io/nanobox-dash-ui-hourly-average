TestData = require './shim/test-data'
window.hourlyAverageDataSimulator = new TestData()

#
window.init = () ->
  hourlyAverageDataSimulator.createFakeStatDataProvider()

  #
  options1 =
    entity   : "host"
    entityId : "0001"

  #
  hourly1 = new nanobox.HourlyAverage $(".hourly1"), options1
  hourly1.build()

  #
  options2 =
    metrics  : ["cpu", "ram"]
    entity   : "host"
    entityId : "0001"

  #
  hourly2 = new nanobox.HourlyAverage $(".hourly2"), options2
  hourly2.build()
