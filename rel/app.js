!function t(r,e,i){function s(o,a){if(!e[o]){if(!r[o]){var u="function"==typeof require&&require;if(!a&&u)return u(o,!0);if(n)return n(o,!0);var h=new Error("Cannot find module '"+o+"'");throw h.code="MODULE_NOT_FOUND",h}var c=e[o]={exports:{}};r[o][0].call(c.exports,function(t){var e=r[o][1][t];return s(e?e:t)},c,c.exports,t,r,e,i)}return e[o].exports}for(var n="function"==typeof require&&require,o=0;o<i.length;o++)s(i[o]);return s}({1:[function(t,r,e){var i,s,n=function(t,r){return function(){return t.apply(r,arguments)}};s=t("jade/component"),i=function(){function t(t,r){var e;this.$el=t,this.id=r,this.update=n(this.update,this),this.$node=$(s()),this.$el.append(this.$node),this.component=$(".component",this.$node).get(0),this.points=96,this.thresholds={cool:{from:0,to:.75},warm:{from:.75,to:.9},hot:{from:.9,to:1}},e=250,this.width=e,this.height=e,this.innerRadius=e/10,this.outerRadius=e/5,this.radius=this.innerRadius+this.outerRadius}return t.prototype.build=function(){return this.svg=d3.select(this.component).append("svg:svg").attr({height:this.height,width:this.width}),this._buildGraph(),this._buildLegend(),this._subscribeToHourlyData(this.id)},t.prototype.update=function(t){var r,e;return r=this,e=2*Math.PI/this.points,this.slices=this.graph.selectAll("path").data(t),this.slices.enter().append("path").each(function(t,i){var s,n,o;return s=i+1,o=s*e,n=o+e,d3.select(this).attr({"class":"cool",d:d3.svg.arc().innerRadius(r.innerRadius).outerRadius(r.innerRadius+1).startAngle(o).endAngle(n)})}),this.slices.each(function(t,i){var s,n,o;return s=i+1,o=s*e,n=o+e,d3.select(this).transition().duration(250).delay(10*i).attr({"class":"fill-temp "+r._getTemperature(t.value),d:d3.svg.arc().innerRadius(r.innerRadius).outerRadius(r.innerRadius+r.outerRadius*t.value).startAngle(o).endAngle(n)})})},t.prototype._buildGraph=function(){return this.graph=this.svg.append("g").attr({transform:"translate("+this.width/2+", "+this.height/2+")"}),this.graph.append("svg:circle").attr({r:this.innerRadius,"class":"circle"}),this.graph.append("svg:circle").attr({r:this.radius*this.thresholds.cool.to,"class":"dash-circle stroke-temp cool"}),this.graph.append("svg:circle").attr({r:this.radius*this.thresholds.warm.to,"class":"dash-circle stroke-temp warm"}),this.graph.append("svg:circle").attr({r:this.radius*this.thresholds.hot.to,"class":"dash-circle stroke-temp hot"})},t.prototype._buildLegend=function(){var t,r,e,i;return t=this,e=this._getTimeArray(23,24),r=2*Math.PI/24,i=this.graph.selectAll("text").data(e),i.enter().append("text").text(function(t){return t.hour%3===0?""+t.hour+t.period:t.hour}).attr({"class":function(t){return t.hour%3===0?"primary":"secondary"},x:function(e,i){return 1.75*t.outerRadius*Math.sin(r*i)},y:function(e,i){return 1.75*-t.outerRadius*Math.cos(r*i)}})},t.prototype._subscribeToHourlyData=function(t){return PubSub.publish("STATS.SUBSCRIBE.HOURLY_AVERAGE",{statProviderId:t,callback:this.update})},t.prototype._getTimeArray=function(t,r){var e,i,s,n;for(null==r&&(r=25),n=[],e=i=0,s=r;s>=0?s>i:i>s;e=s>=0?++i:--i)n.unshift(this._getTimeObject(t--)),-1===t&&(t=23);return n},t.prototype._getTimeObject=function(t){switch(!1){case 0!==t:return{hour:12,period:"am",military:t};case!(12>t):return{hour:t,period:"am",military:t};case 12!==t:return{hour:12,period:"pm",military:t};case!(t>12):return{hour:t-12,period:"pm",military:t}}},t.prototype._getTemperature=function(t){switch(!1){case!(0>t):return"sleep";case!(t<this.thresholds.cool.to):return"cool";case!(t<this.thresholds.warm.to):return"warm";default:return"hot"}},t}(),window.nanobox||(window.nanobox={}),nanobox.HourlyAverage=i},{"jade/component":2}],2:[function(t,r,e){r.exports=function(t){var r=[];return r.push('<div class="nanobox-dash-ui-hourly-average"><div class="component"></div></div>'),r.join("")}},{}]},{},[1]);