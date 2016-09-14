(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var TestData;

module.exports = TestData = (function() {
  function TestData() {}

  TestData.prototype.createFakeStatDataProvider = function() {
    return PubSub.subscribe('STATS.SUBSCRIBE.HOURLY_AVERAGE', (function(_this) {
      return function(m, data) {
        return data.callback(hourlyAverageDataSimulator.generateGrowingAverges());
      };
    })(this));
  };

  TestData.prototype.generateNoAverages = function() {
    var data;
    data = [];
    return data;
  };

  TestData.prototype.generateEmptyAverages = function() {
    var data, hour, k, l, len, quarter, ref;
    data = [];
    for (hour = k = 0; k < 24; hour = ++k) {
      ref = [0, 15, 30, 45];
      for (l = 0, len = ref.length; l < len; l++) {
        quarter = ref[l];
        data.push({
          time: (("0" + hour).slice(-2)) + ":" + (("0" + quarter).slice(-2)),
          value: -1
        });
      }
    }
    return data;
  };

  TestData.prototype.generateRandomAverages = function() {
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

  TestData.prototype.generateGrowingAverges = function() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9ndWxwLWNvZmZlZWlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic2hpbS90ZXN0LWRhdGEuY29mZmVlIiwic3RhZ2UuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIFRlc3REYXRhO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRlc3REYXRhID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBUZXN0RGF0YSgpIHt9XG5cbiAgVGVzdERhdGEucHJvdG90eXBlLmNyZWF0ZUZha2VTdGF0RGF0YVByb3ZpZGVyID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFB1YlN1Yi5zdWJzY3JpYmUoJ1NUQVRTLlNVQlNDUklCRS5IT1VSTFlfQVZFUkFHRScsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKG0sIGRhdGEpIHtcbiAgICAgICAgcmV0dXJuIGRhdGEuY2FsbGJhY2soaG91cmx5QXZlcmFnZURhdGFTaW11bGF0b3IuZ2VuZXJhdGVHcm93aW5nQXZlcmdlcygpKTtcbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICB9O1xuXG4gIFRlc3REYXRhLnByb3RvdHlwZS5nZW5lcmF0ZU5vQXZlcmFnZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZGF0YTtcbiAgICBkYXRhID0gW107XG4gICAgcmV0dXJuIGRhdGE7XG4gIH07XG5cbiAgVGVzdERhdGEucHJvdG90eXBlLmdlbmVyYXRlRW1wdHlBdmVyYWdlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkYXRhLCBob3VyLCBrLCBsLCBsZW4sIHF1YXJ0ZXIsIHJlZjtcbiAgICBkYXRhID0gW107XG4gICAgZm9yIChob3VyID0gayA9IDA7IGsgPCAyNDsgaG91ciA9ICsraykge1xuICAgICAgcmVmID0gWzAsIDE1LCAzMCwgNDVdO1xuICAgICAgZm9yIChsID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgbCA8IGxlbjsgbCsrKSB7XG4gICAgICAgIHF1YXJ0ZXIgPSByZWZbbF07XG4gICAgICAgIGRhdGEucHVzaCh7XG4gICAgICAgICAgdGltZTogKChcIjBcIiArIGhvdXIpLnNsaWNlKC0yKSkgKyBcIjpcIiArICgoXCIwXCIgKyBxdWFydGVyKS5zbGljZSgtMikpLFxuICAgICAgICAgIHZhbHVlOiAtMVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH07XG5cbiAgVGVzdERhdGEucHJvdG90eXBlLmdlbmVyYXRlUmFuZG9tQXZlcmFnZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZGF0YSwgaG91ciwgaywgbCwgbGVuLCBxdWFydGVyLCByZWYsIHZhbHVlO1xuICAgIGRhdGEgPSBbXTtcbiAgICBmb3IgKGhvdXIgPSBrID0gMDsgayA8IDI0OyBob3VyID0gKytrKSB7XG4gICAgICByZWYgPSBbMCwgMTUsIDMwLCA0NV07XG4gICAgICBmb3IgKGwgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBsIDwgbGVuOyBsKyspIHtcbiAgICAgICAgcXVhcnRlciA9IHJlZltsXTtcbiAgICAgICAgdmFsdWUgPSAoTWF0aC5yYW5kb20oKSAqIDEuMDApICsgMC4wMDtcbiAgICAgICAgZGF0YS5wdXNoKHtcbiAgICAgICAgICB0aW1lOiAoKFwiMFwiICsgaG91cikuc2xpY2UoLTIpKSArIFwiOlwiICsgKChcIjBcIiArIHF1YXJ0ZXIpLnNsaWNlKC0yKSksXG4gICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfTtcblxuICBUZXN0RGF0YS5wcm90b3R5cGUuZ2VuZXJhdGVHcm93aW5nQXZlcmdlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBkYXRhLCBob3VyLCBpLCBqLCBrLCBsLCBsZW4sIG4sIHF1YXJ0ZXIsIHJlZiwgcmVmMSwgcmVmMiwgdG90YWwsIHZhbHVlO1xuICAgIGRhdGEgPSBbXTtcbiAgICB0b3RhbCA9IDA7XG4gICAgZm9yIChob3VyID0gayA9IDA7IGsgPCAyNDsgaG91ciA9ICsraykge1xuICAgICAgcmVmID0gWzAsIDE1LCAzMCwgNDVdO1xuICAgICAgZm9yIChsID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgbCA8IGxlbjsgbCsrKSB7XG4gICAgICAgIHF1YXJ0ZXIgPSByZWZbbF07XG4gICAgICAgIHZhbHVlID0gKHRvdGFsICs9IDAuMDEwNik7XG4gICAgICAgIGRhdGEucHVzaCh7XG4gICAgICAgICAgdGltZTogKChcIjBcIiArIGhvdXIpLnNsaWNlKC0yKSkgKyBcIjpcIiArICgoXCIwXCIgKyBxdWFydGVyKS5zbGljZSgtMikpLFxuICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChpID0gbiA9IHJlZjEgPSBkYXRhLmxlbmd0aCAtIDE7IHJlZjEgPD0gMSA/IG4gPD0gMSA6IG4gPj0gMTsgaSA9IHJlZjEgPD0gMSA/ICsrbiA6IC0tbikge1xuICAgICAgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xuICAgICAgcmVmMiA9IFtkYXRhW2pdLCBkYXRhW2ldXSwgZGF0YVtpXSA9IHJlZjJbMF0sIGRhdGFbal0gPSByZWYyWzFdO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfTtcblxuICByZXR1cm4gVGVzdERhdGE7XG5cbn0pKCk7XG4iLCJ2YXIgVGVzdERhdGE7XG5cblRlc3REYXRhID0gcmVxdWlyZSgnLi9zaGltL3Rlc3QtZGF0YScpO1xuXG53aW5kb3cuaG91cmx5QXZlcmFnZURhdGFTaW11bGF0b3IgPSBuZXcgVGVzdERhdGEoKTtcblxud2luZG93LmluaXQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGhvdXJseTEsIGhvdXJseTIsIG9wdGlvbnMxLCBvcHRpb25zMjtcbiAgaG91cmx5QXZlcmFnZURhdGFTaW11bGF0b3IuY3JlYXRlRmFrZVN0YXREYXRhUHJvdmlkZXIoKTtcbiAgb3B0aW9uczEgPSB7XG4gICAgZW50aXR5OiBcImhvc3RcIixcbiAgICBlbnRpdHlJZDogXCIwMDAxXCJcbiAgfTtcbiAgaG91cmx5MSA9IG5ldyBuYW5vYm94LkhvdXJseUF2ZXJhZ2UoJChcIi5ob3VybHkxXCIpLCBvcHRpb25zMSk7XG4gIGhvdXJseTEuYnVpbGQoKTtcbiAgb3B0aW9uczIgPSB7XG4gICAgbWV0cmljczogW1wiY3B1XCIsIFwicmFtXCJdLFxuICAgIGVudGl0eTogXCJob3N0XCIsXG4gICAgZW50aXR5SWQ6IFwiMDAwMVwiXG4gIH07XG4gIGhvdXJseTIgPSBuZXcgbmFub2JveC5Ib3VybHlBdmVyYWdlKCQoXCIuaG91cmx5MlwiKSwgb3B0aW9uczIpO1xuICByZXR1cm4gaG91cmx5Mi5idWlsZCgpO1xufTtcbiJdfQ==
