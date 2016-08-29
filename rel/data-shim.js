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
    data.callback(hourlyAverageDataSimulator.generateOutOfOrderValues());
    return setInterval(function() {
      if (window.enableUpdates) {
        return data.callback(hourlyAverageDataSimulator.generateOutOfOrderValues());
      }
    }, 3000);
  };

  TestData.prototype.generateHourlyAverages = function() {
    var data, hour, k, l, len, quarter, ref, value;
    data = [];
    for (hour = k = 0; k < 24; hour = ++k) {
      ref = [0, 15, 30, 45];
      for (l = 0, len = ref.length; l < len; l++) {
        quarter = ref[l];
        value = (Math.random() * 1.00) + 0.00;
        data.push({
          time: (("0" + hour).slice(-2)) + ":" + (("0" + quarter).slice(-2)),
          value: value
        });
      }
    }
    return data;
  };

  TestData.prototype.generateOutOfOrderValues = function() {
    var data, hour, i, j, k, l, len, n, quarter, ref, ref1, ref2, total, value;
    data = [];
    total = 0;
    for (hour = k = 0; k < 24; hour = ++k) {
      ref = [0, 15, 30, 45];
      for (l = 0, len = ref.length; l < len; l++) {
        quarter = ref[l];
        value = (total += 0.0106);
        data.push({
          time: (("0" + hour).slice(-2)) + ":" + (("0" + quarter).slice(-2)),
          value: value
        });
      }
    }
    for (i = n = ref1 = data.length - 1; ref1 <= 1 ? n <= 1 : n >= 1; i = ref1 <= 1 ? ++n : --n) {
      j = Math.floor(Math.random() * (i + 1));
      ref2 = [data[j], data[i]], data[i] = ref2[0], data[j] = ref2[1];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9ndWxwLWNvZmZlZWlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic2hpbS90ZXN0LWRhdGEuY29mZmVlIiwic3RhZ2UuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBUZXN0RGF0YTtcblxubW9kdWxlLmV4cG9ydHMgPSBUZXN0RGF0YSA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gVGVzdERhdGEoKSB7fVxuXG4gIFRlc3REYXRhLnByb3RvdHlwZS5jcmVhdGVGYWtlU3RhdERhdGFQcm92aWRlciA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBQdWJTdWIuc3Vic2NyaWJlKCdTVEFUUy5TVUJTQ1JJQkUuSE9VUkxZX0FWRVJBR0UnLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihtLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBob3VybHlBdmVyYWdlRGF0YVNpbXVsYXRvci53YWl0Rm9yRGF0YShkYXRhKTtcbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICB9O1xuXG4gIFRlc3REYXRhLnByb3RvdHlwZS53YWl0Rm9yRGF0YSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBkYXRhLmNhbGxiYWNrKGhvdXJseUF2ZXJhZ2VEYXRhU2ltdWxhdG9yLmdlbmVyYXRlT3V0T2ZPcmRlclZhbHVlcygpKTtcbiAgICByZXR1cm4gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAod2luZG93LmVuYWJsZVVwZGF0ZXMpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEuY2FsbGJhY2soaG91cmx5QXZlcmFnZURhdGFTaW11bGF0b3IuZ2VuZXJhdGVPdXRPZk9yZGVyVmFsdWVzKCkpO1xuICAgICAgfVxuICAgIH0sIDMwMDApO1xuICB9O1xuXG4gIFRlc3REYXRhLnByb3RvdHlwZS5nZW5lcmF0ZUhvdXJseUF2ZXJhZ2VzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRhdGEsIGhvdXIsIGssIGwsIGxlbiwgcXVhcnRlciwgcmVmLCB2YWx1ZTtcbiAgICBkYXRhID0gW107XG4gICAgZm9yIChob3VyID0gayA9IDA7IGsgPCAyNDsgaG91ciA9ICsraykge1xuICAgICAgcmVmID0gWzAsIDE1LCAzMCwgNDVdO1xuICAgICAgZm9yIChsID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgbCA8IGxlbjsgbCsrKSB7XG4gICAgICAgIHF1YXJ0ZXIgPSByZWZbbF07XG4gICAgICAgIHZhbHVlID0gKE1hdGgucmFuZG9tKCkgKiAxLjAwKSArIDAuMDA7XG4gICAgICAgIGRhdGEucHVzaCh7XG4gICAgICAgICAgdGltZTogKChcIjBcIiArIGhvdXIpLnNsaWNlKC0yKSkgKyBcIjpcIiArICgoXCIwXCIgKyBxdWFydGVyKS5zbGljZSgtMikpLFxuICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH07XG5cbiAgVGVzdERhdGEucHJvdG90eXBlLmdlbmVyYXRlT3V0T2ZPcmRlclZhbHVlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkYXRhLCBob3VyLCBpLCBqLCBrLCBsLCBsZW4sIG4sIHF1YXJ0ZXIsIHJlZiwgcmVmMSwgcmVmMiwgdG90YWwsIHZhbHVlO1xuICAgIGRhdGEgPSBbXTtcbiAgICB0b3RhbCA9IDA7XG4gICAgZm9yIChob3VyID0gayA9IDA7IGsgPCAyNDsgaG91ciA9ICsraykge1xuICAgICAgcmVmID0gWzAsIDE1LCAzMCwgNDVdO1xuICAgICAgZm9yIChsID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgbCA8IGxlbjsgbCsrKSB7XG4gICAgICAgIHF1YXJ0ZXIgPSByZWZbbF07XG4gICAgICAgIHZhbHVlID0gKHRvdGFsICs9IDAuMDEwNik7XG4gICAgICAgIGRhdGEucHVzaCh7XG4gICAgICAgICAgdGltZTogKChcIjBcIiArIGhvdXIpLnNsaWNlKC0yKSkgKyBcIjpcIiArICgoXCIwXCIgKyBxdWFydGVyKS5zbGljZSgtMikpLFxuICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChpID0gbiA9IHJlZjEgPSBkYXRhLmxlbmd0aCAtIDE7IHJlZjEgPD0gMSA/IG4gPD0gMSA6IG4gPj0gMTsgaSA9IHJlZjEgPD0gMSA/ICsrbiA6IC0tbikge1xuICAgICAgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xuICAgICAgcmVmMiA9IFtkYXRhW2pdLCBkYXRhW2ldXSwgZGF0YVtpXSA9IHJlZjJbMF0sIGRhdGFbal0gPSByZWYyWzFdO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfTtcblxuICByZXR1cm4gVGVzdERhdGE7XG5cbn0pKCk7XG4iLCJ2YXIgVGVzdERhdGE7XG5cblRlc3REYXRhID0gcmVxdWlyZSgnLi9zaGltL3Rlc3QtZGF0YScpO1xuXG53aW5kb3cuaG91cmx5QXZlcmFnZURhdGFTaW11bGF0b3IgPSBuZXcgVGVzdERhdGEoKTtcblxud2luZG93LmluaXQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGhvdXJseTEsIGhvdXJseTIsIG9wdGlvbnMxLCBvcHRpb25zMjtcbiAgaG91cmx5QXZlcmFnZURhdGFTaW11bGF0b3IuY3JlYXRlRmFrZVN0YXREYXRhUHJvdmlkZXIoKTtcbiAgb3B0aW9uczEgPSB7XG4gICAgZW50aXR5OiBcImhvc3RcIixcbiAgICBlbnRpdHlJZDogXCIwMDAxXCJcbiAgfTtcbiAgaG91cmx5MSA9IG5ldyBuYW5vYm94LkhvdXJseUF2ZXJhZ2UoJChcIi5ob3VybHkxXCIpLCBvcHRpb25zMSk7XG4gIGhvdXJseTEuYnVpbGQoKTtcbiAgb3B0aW9uczIgPSB7XG4gICAgbWV0cmljczogW1wiY3B1XCIsIFwicmFtXCJdLFxuICAgIGVudGl0eTogXCJob3N0XCIsXG4gICAgZW50aXR5SWQ6IFwiMDAwMVwiXG4gIH07XG4gIGhvdXJseTIgPSBuZXcgbmFub2JveC5Ib3VybHlBdmVyYWdlKCQoXCIuaG91cmx5MlwiKSwgb3B0aW9uczIpO1xuICByZXR1cm4gaG91cmx5Mi5idWlsZCgpO1xufTtcbiJdfQ==
