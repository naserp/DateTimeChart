﻿function DateTimeChart(width, height, marginx, marginy,tricky) {
	this.data = new Array();
	this.w = width;
	this.h = height;
	this.marginX = marginx;
	this.marginY = marginy;
	this.trickY = tricky;
   	var vis = d3.select('#canvas').append("svg:svg").attr("width", this.w).attr("height", this.h);
    var g = vis.append("svg:g").attr("transform", "translate(0, "+this.h+")");

	this.setDataYear = function(d, dOrigin, labels, yStep, yPage) {
		this.data = d;
		this.dataOrigin = dOrigin;
		this.axisLabels = labels;
		this.yearStep = yStep;
		this.yearPage = yPage;
		this.paintYear();
	};
	
    this.paintYear = function() {
		var y = d3.scale.linear().domain([0, 10]).range([0 + this.marginY, this.h - this.marginY]);
        var x = d3.scale.linear().domain([0, this.data.length-1]).range([0 + this.marginX, this.w - this.marginX]);
		this.intervalX = (x(this.data.length-1)-this.marginX)/(this.data.length-1);
		this.intervalY = (y(10)-this.marginY)/(tricky);
        var line = d3.svg.line().x(function(d, i) { return x(i); }).y(function(d) { return -1 * y(d); }).interpolate("cardinal");

    	g.append("svg:rect").attr("x", 0).attr("y", -1 * this.h).attr("width", this.w).attr("height", this.h).attr("fill","white");

        for (var j = 0; j < 11; j+=2) {
            g.append("svg:line").attr("x1", x(0)).attr("y1", -1 * y(0) - this.intervalY*j).attr("x2", x(this.data.length-1)).attr("y2", -1 * y(0)-this.intervalY*j).attr("fill-opacity", .1).attr("stroke", "#ddd").attr("stroke-width", 1);        	
        	//g.append("svg:text").attr("class","yLabel").text(j*10 + "%").attr("x",0 + Math.ceil((10-j)/9)*7).attr("y", -1 * (this.intervalY * j) - marginy ).attr("text-anchor", "right").attr("dy", 3);
        }
    	
		g.append("svg:path").attr("d", line(this.data)).attr("stroke","steelblue").attr("stroke-width", 2).attr("fill", "none");

		for (var i = 0; i < 12; i++) {
	        g.append("svg:line").attr("x1", x(0)+(this.intervalX*i)).attr("y1", -1 * y(0)+ 8).attr("x2", x(0)+(this.intervalX*i)).attr("y2", -1 * y(10)).attr("fill-opacity", .1).attr("stroke", "#ddd").attr("stroke-width", 1).attr("stroke-dasharray", 2);
        }
    	//g.append("svg:line").attr("x1", x(0)+(this.intervalX* ystep)).attr("y1", -1 * y(0)+ 8).attr("x2", x(0)+(this.intervalX* ystep)).attr("y2", -1 * y(10)).attr("fill-opacity", .1).attr("stroke", "#d12f19").attr("stroke-width", 2).attr("stroke-dasharray", 2);
	
    	var indexlabel = this.yearStep;
    	var sw = this.yearPage % 2;
    	var color;
    	if(sw == 0)
    		color = "steelblue";
    	else 
    		color = "none";
    	for (var i = 0; i < 12; i++) {
    		if(i >= indexlabel) {
    	        if(sw == 0)
    		        color = "none";
    	        else 
    		        color = "steelblue";
    		}
    		var positionX = (Math.round((marginx + this.intervalX * i) * 100)) / 100;
	        g.append("svg:rect").attr("class", "xRect").attr("x", positionX - 15 ).attr("y", -1 * y(0)+8).attr("width", 30).attr("height", 16).attr("rx", 5).attr("fill", color).attr("stroke", "blue").attr("stroke-width", .5).attr("fill-opacity", .3);
    	}
    //	var positionX = (Math.round((marginx + this.intervalX * ystep) * 100)) / 100;
       // g.append("svg:rect").attr("class", "xRect").attr("x", positionX - 15 ).attr("y", -1 * y(0)+8).attr("width", 30).attr("height", 16).attr("rx", 5).attr("fill", 'none').attr("stroke", "#d12f19").attr("stroke-width", 1).attr("fill-opacity", 1);

    	for (var i = 0; i < 12; i++) {
        	var positionX = (Math.round((marginx + this.intervalX * i) * 100)) / 100;
        	var tempPercent = (Math.round((this.data[i]) * 1000) / 100);
   	        g.append("svg:text").attr("class", "xLabel").text(this.axisLabels[i]).attr("x", positionX ).attr("y", -1 * y(0) + 20).attr("text-anchor", "middle");
        	g.append("svg:circle").attr("class", "little").attr("cx", positionX).attr("cy", (-1 * (this.intervalY) * this.data[i])-this.marginY).attr("r", 4).attr("fill", "steelblue").attr('onmouseover',"tooltip.show('"+ this.dataOrigin[i] +" hits - "+ tempPercent +"%', 100);").attr('onmouseout',"tooltip.hide();");
        }
	};	
	
	this.setDataMonth = function(d) {
		this.data = d;
		this.paintMonth();
	};

	this.paintMonth = function() {
		var y = d3.scale.linear().domain([0, d3.max(this.data)]).range([0 + this.marginY, this.h - this.marginY]);
        var x = d3.scale.linear().domain([0, this.data.length-1]).range([0 + this.marginX, this.w - this.marginX]);
		this.intervalX = (x(this.data.length-1)-this.marginX)/(this.data.length-1);
		this.intervalY = (y(d3.max(this.data))-this.marginY)/(tricky);
		var percent = d3.scale.linear().domain([0, d3.max(this.data)]).range([0, 100]);
        var line = d3.svg.line().x(function(d, i) { return x(i); }).y(function(d) { return -1 * y(d); }).interpolate("cardinal");
        
		g.append("svg:rect").attr("x", 0).attr("y", -1 * this.h).attr("width", this.w).attr("height", this.h).attr("fill","white");
		
        for (var j = 0; j < 11; j+=2) {
            g.append("svg:line").attr("x1", x(0)).attr("y1", -1 * y(0) - this.intervalY*j).attr("x2", x(this.data.length-1)).attr("y2", -1 * y(0)-this.intervalY*j).attr("fill-opacity", .1).attr("stroke", "#ddd").attr("stroke-width", 1);        	
        	g.append("svg:text").attr("class","yLabel").text(j*10 + "%").attr("x",0+ Math.ceil((10-j)/9)*7).attr("y", -1 * (this.intervalY * j) - marginy ).attr("text-anchor", "right").attr("dy", 3);
        }
	
		g.append("svg:path").attr("d", line(this.data)).attr("stroke","steelblue").attr("stroke-width", 2).attr("fill", "none");

		for (var i = 0; i < 31; i+=3) {
            var positionX = (Math.round((marginx + this.intervalX * i) * 100)) / 100;
	        g.append("svg:line").attr("x1", x(0)+(this.intervalX*i)).attr("y1", -1 * y(0) +10).attr("x2", x(0)+(this.intervalX*i)).attr("y2", -1 * y(d3.max(this.data))).attr("fill-opacity", .1).attr("stroke", "#ddd").attr("stroke-width", 1);
        	g.append("svg:text").attr("class", "xLabel").text(i+1).attr("x", positionX).attr("y", -1 * y(0) + 20).attr("text-anchor", "middle");
        }
	
        for (var i = 0; i < 31; i++) {
	        var positionX = (Math.round((marginx + this.intervalX * i) * 100)) / 100;
        	var tempPercent = (Math.round(percent(this.data[i]) * 100) / 100);
	        g.append("svg:circle").attr("class", "little").attr("cx", positionX).attr("cy", (-1 * (this.intervalY) * this.data[i])-this.marginY).attr("r", 4).attr("fill", "steelblue").attr('onmouseover',"tooltip.show(' "+ this.data[i] +" hits - "+ (tempPercent) +"%', 100);").attr('onmouseout',"tooltip.hide();");
        }

	};

    this.setDataDay = function(d) {
		this.data = d;
		this.paintDay();
	};

	this.paintDay = function() {
		var y = d3.scale.linear().domain([0, d3.max(this.data)]).range([0 + this.marginY, this.h - this.marginY ]);
        var x = d3.scale.linear().domain([0, this.data.length-1]).range([0 + this.marginX, this.w - this.marginX]);
		this.intervalX = (x(this.data.length-1)-this.marginX)/(this.data.length-1);
		this.intervalY = (y(d3.max(this.data))-this.marginY)/(tricky);
		var percent = d3.scale.linear().domain([0, d3.max(this.data)]).range([0, 100]);
        var line = d3.svg.line().x(function(d, i) { return x(i); }).y(function(d) { return -1 * y(d); }).interpolate("cardinal");

		g.append("svg:rect").attr("x", 0).attr("y", -1 * this.h).attr("width", this.w).attr("height", this.h).attr("fill","white");
		
        for (var j = 0; j < 11; j+=2) {
            g.append("svg:line").attr("x1", x(0)).attr("y1", -1 * y(0) - this.intervalY*j ).attr("x2", x(this.data.length-1)).attr("y2", -1 * y(0)-this.intervalY*j ).attr("fill-opacity", .1).attr("stroke", "#ddd").attr("stroke-width", 1);        	
        	g.append("svg:text").attr("class","yLabel").text(j*10 + "%").attr("x",0 + Math.ceil((10-j)/9)*7).attr("y", -1 * (this.intervalY * j) - marginy).attr("text-anchor", "left").attr("dy", 3).attr("direction", "rtl");
        }
	
		g.append("svg:path").attr("d", line(this.data)).attr("stroke","steelblue").attr("stroke-width", 2).attr("fill", "none");

		for (var i = 0; i < 25; i+=6) {
	        var positionX = (Math.round((marginx + this.intervalX * i) * 100)) / 100;
	        g.append("svg:line").attr("x1", x(0)+(this.intervalX*i)).attr("y1", -1 * y(0)+10).attr("x2", x(0)+(this.intervalX*i)).attr("y2", -1 * y(d3.max(this.data))).attr("fill-opacity", .1).attr("stroke", "#ddd").attr("stroke-width", 1);
         	g.append("svg:text").attr("class", "xLabel").text((i)+":00").attr("x", positionX ).attr("y", -1 * y(0) + 20).attr("text-anchor", "middle");
        }
	
        for (var i = 0; i < 25; i++) {
	        var positionX = (Math.round((marginx + this.intervalX * i) * 100)) / 100;
        	var tempPercent = (Math.round(percent(this.data[i]) * 100) / 100);
	        g.append("svg:circle").attr("class", "little").attr("cx", positionX).attr("cy", (-1 * (this.intervalY) * this.data[i])-this.marginY).attr("r", 4).attr("fill", "steelblue").attr('onmouseover',"tooltip.show(' "+ this.data[i] +" hits  - "+ tempPercent +"%', 100);").attr('onmouseout',"tooltip.hide();");
        }
	};
}

function getProps(obj, objName)
{
	var result = "";
	for (var i in obj)
	{
		result += objName + "." + i + " = " + obj[i] + "<BR><BR>";
	}
	result += "<HR>";
	document.write(result);
	return (result);
}

var tooltip=function(){
 var id = 'tt';
 var top = 0;
 var left = 0;
 var maxw = 300;
 var speed = 10;
 var timer = 20;
 var endalpha = 85;
 var alpha = 0;
 var tt,t,c,b,h;
 var ie = document.all ? true : false;
 return{
  show:function(v,w){
   if(tt == null){
    tt = document.createElement('div');
    tt.setAttribute('id',id);
    t = document.createElement('div');
    t.setAttribute('id',id + 'top');
    c = document.createElement('div');
    c.setAttribute('id',id + 'cont');
    b = document.createElement('div');
    b.setAttribute('id',id + 'bot');
    tt.appendChild(t);
    tt.appendChild(c);
    tt.appendChild(b);
    document.body.appendChild(tt);
    tt.style.opacity = 0;
    tt.style.filter = 'alpha(opacity=0)';
    document.onmousemove = this.pos;
   }
   tt.style.display = 'block';
   c.innerHTML = v;
   tt.style.width = w ? w + 'px' : 'auto';
   if(!w && ie){
    t.style.display = 'none';
    b.style.display = 'none';
    tt.style.width = tt.offsetWidth;
    t.style.display = 'block';
    b.style.display = 'block';
   }
  if(tt.offsetWidth > maxw){tt.style.width = maxw + 'px'}
  h = parseInt(tt.offsetHeight) + top;
  clearInterval(tt.timer);
  tt.timer = setInterval(function(){tooltip.fade(1)},timer);
  },
  pos:function(e){
   var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
   var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
   tt.style.top = (u - h) + 'px';
   tt.style.left = (l + left) + 'px';
  },
  fade:function(d){
   var a = alpha;
   if((a != endalpha && d == 1) || (a != 0 && d == -1)){
    var i = speed;
   if(endalpha - a < speed && d == 1){
    i = endalpha - a;
   }else if(alpha < speed && d == -1){
     i = a;
   }
   alpha = a + (i * d);
   tt.style.opacity = alpha * .01;
   tt.style.filter = 'alpha(opacity=' + alpha + ')';
  }else{
    clearInterval(tt.timer);
     if(d == -1){tt.style.display = 'none'}
  }
 },
 hide:function(){
  clearInterval(tt.timer);
   tt.timer = setInterval(function(){tooltip.fade(-1)},timer);
  }
 };
}();