TestData = require './shim/test-data'
window.hourlyAverageDataSimulator = new TestData()

window.init = () ->
  hourly = new nanobox.HourlyAverage $("body")
  hourly.build()
