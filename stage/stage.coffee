
#
genData = () ->
    data = []
    for hour in [0...24]
      for quarter in [0, 15, 30, 45]
        data.push {time: "#{("0" + hour).slice(-2)}:#{("0" + quarter).slice(-2)}", stat: ((Math.random() * 1.00) + 0.00)}
    data

#
app = new nanobox.HourlyAverage $("body"), genData()

#
setInterval () ->
  app.update(genData())
, 3000
