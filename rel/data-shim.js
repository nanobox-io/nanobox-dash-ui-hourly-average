(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var TestData;

module.exports = TestData = (function() {
  function TestData() {}

  TestData.prototype.createFakeStatDataProvider = function() {
    return PubSub.subscribe('STATS.SUBSCRIBE.HOURLY_AVERAGE', (function(_this) {
      return function(m, data) {
        return hourlyAverageDataSimulator.waitForData(data);
      };
    })(this));
  };

  TestData.prototype.waitForData = function(data) {
    data.callback(hourlyAverageDataSimulator.generateHourlyAverages());
    return setInterval(function() {
      if (window.enableUpdates) {
        return data.callback(hourlyAverageDataSimulator.generateHourlyAverages());
      }
    }, 3000);
  };

  TestData.prototype.generateHourlyAverages = function() {
    var data, hour, i, j, len, quarter, ref, value;
    data = [];
    for (hour = i = 0; i < 24; hour = ++i) {
      ref = [0, 15, 30, 45];
      for (j = 0, len = ref.length; j < len; j++) {
        quarter = ref[j];
        value = (Math.random() * 1.00) + 0.00;
        data.push({
          time: (("0" + hour).slice(-2)) + ":" + (("0" + quarter).slice(-2)),
          value: value
        });
      }
    }
    return data;
  };

  return TestData;

})();

},{}],2:[function(require,module,exports){
var TestData;

TestData = require('./shim/test-data');

window.hourlyAverageDataSimulator = new TestData();

window.init = function() {
  var hourly1, hourly2, options1, options2;
  hourlyAverageDataSimulator.createFakeStatDataProvider();
  options1 = {
    entity: "host",
    entityId: "0001"
  };
  hourly1 = new nanobox.HourlyAverage($(".hourly1"), options1);
  hourly1.build();
  options2 = {
    metrics: ["cpu", "ram"],
    entity: "host",
    entityId: "0001"
  };
  hourly2 = new nanobox.HourlyAverage($(".hourly2"), options2);
  return hourly2.build();
};

},{"./shim/test-data":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9ndWxwLWNvZmZlZWlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic2hpbS90ZXN0LWRhdGEuY29mZmVlIiwic3RhZ2UuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgVGVzdERhdGE7XG5cbm1vZHVsZS5leHBvcnRzID0gVGVzdERhdGEgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFRlc3REYXRhKCkge31cblxuICBUZXN0RGF0YS5wcm90b3R5cGUuY3JlYXRlRmFrZVN0YXREYXRhUHJvdmlkZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gUHViU3ViLnN1YnNjcmliZSgnU1RBVFMuU1VCU0NSSUJFLkhPVVJMWV9BVkVSQUdFJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24obSwgZGF0YSkge1xuICAgICAgICByZXR1cm4gaG91cmx5QXZlcmFnZURhdGFTaW11bGF0b3Iud2FpdEZvckRhdGEoZGF0YSk7XG4gICAgICB9O1xuICAgIH0pKHRoaXMpKTtcbiAgfTtcblxuICBUZXN0RGF0YS5wcm90b3R5cGUud2FpdEZvckRhdGEgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgZGF0YS5jYWxsYmFjayhob3VybHlBdmVyYWdlRGF0YVNpbXVsYXRvci5nZW5lcmF0ZUhvdXJseUF2ZXJhZ2VzKCkpO1xuICAgIHJldHVybiBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgIGlmICh3aW5kb3cuZW5hYmxlVXBkYXRlcykge1xuICAgICAgICByZXR1cm4gZGF0YS5jYWxsYmFjayhob3VybHlBdmVyYWdlRGF0YVNpbXVsYXRvci5nZW5lcmF0ZUhvdXJseUF2ZXJhZ2VzKCkpO1xuICAgICAgfVxuICAgIH0sIDMwMDApO1xuICB9O1xuXG4gIFRlc3REYXRhLnByb3RvdHlwZS5nZW5lcmF0ZUhvdXJseUF2ZXJhZ2VzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRhdGEsIGhvdXIsIGksIGosIGxlbiwgcXVhcnRlciwgcmVmLCB2YWx1ZTtcbiAgICBkYXRhID0gW107XG4gICAgZm9yIChob3VyID0gaSA9IDA7IGkgPCAyNDsgaG91ciA9ICsraSkge1xuICAgICAgcmVmID0gWzAsIDE1LCAzMCwgNDVdO1xuICAgICAgZm9yIChqID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgIHF1YXJ0ZXIgPSByZWZbal07XG4gICAgICAgIHZhbHVlID0gKE1hdGgucmFuZG9tKCkgKiAxLjAwKSArIDAuMDA7XG4gICAgICAgIGRhdGEucHVzaCh7XG4gICAgICAgICAgdGltZTogKChcIjBcIiArIGhvdXIpLnNsaWNlKC0yKSkgKyBcIjpcIiArICgoXCIwXCIgKyBxdWFydGVyKS5zbGljZSgtMikpLFxuICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH07XG5cbiAgcmV0dXJuIFRlc3REYXRhO1xuXG59KSgpO1xuIiwidmFyIFRlc3REYXRhO1xuXG5UZXN0RGF0YSA9IHJlcXVpcmUoJy4vc2hpbS90ZXN0LWRhdGEnKTtcblxud2luZG93LmhvdXJseUF2ZXJhZ2VEYXRhU2ltdWxhdG9yID0gbmV3IFRlc3REYXRhKCk7XG5cbndpbmRvdy5pbml0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBob3VybHkxLCBob3VybHkyLCBvcHRpb25zMSwgb3B0aW9uczI7XG4gIGhvdXJseUF2ZXJhZ2VEYXRhU2ltdWxhdG9yLmNyZWF0ZUZha2VTdGF0RGF0YVByb3ZpZGVyKCk7XG4gIG9wdGlvbnMxID0ge1xuICAgIGVudGl0eTogXCJob3N0XCIsXG4gICAgZW50aXR5SWQ6IFwiMDAwMVwiXG4gIH07XG4gIGhvdXJseTEgPSBuZXcgbmFub2JveC5Ib3VybHlBdmVyYWdlKCQoXCIuaG91cmx5MVwiKSwgb3B0aW9uczEpO1xuICBob3VybHkxLmJ1aWxkKCk7XG4gIG9wdGlvbnMyID0ge1xuICAgIG1ldHJpY3M6IFtcImNwdVwiLCBcInJhbVwiXSxcbiAgICBlbnRpdHk6IFwiaG9zdFwiLFxuICAgIGVudGl0eUlkOiBcIjAwMDFcIlxuICB9O1xuICBob3VybHkyID0gbmV3IG5hbm9ib3guSG91cmx5QXZlcmFnZSgkKFwiLmhvdXJseTJcIiksIG9wdGlvbnMyKTtcbiAgcmV0dXJuIGhvdXJseTIuYnVpbGQoKTtcbn07XG4iXX0=
