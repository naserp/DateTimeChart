function DateTimeChart(width, height, marginx, marginy, intervalx, intervaly) {
	this.data = new Array();
	this.w = width;
	this.h = height;
	this.marginX = marginx;
	this.marginY = marginy;
	this.intervalX = intervalx;
	this.intervalY = intervaly;
	this.setData = function(d) {
		this.data = d;
		this.paint();
	};

	this.paint = function() {
		debugger;
		var y = d3.scale.linear().domain([0, d3.max(this.data)]).range([0 + this.marginY, this.h - this.marginY]);
        var x = d3.scale.linear().domain([0, this.data.length]).range([0 + this.marginX, this.w - this.marginX]);
        var vis = d3.select("body").append("svg:svg").attr("width", this.w).attr("height", this.h);
        var g = vis.append("svg:g").attr("transform", "translate(0, 300)");
        var line = d3.svg.line().x(function(d, i) { return x(i); }).y(function(d) { return -1 * y(d); });

        for (var j = 1; j < 11; j++) {
            g.append("svg:line").attr("x1", x(0)).attr("y1", -1 * y(0) - this.intervalY*j).attr("x2", this.w-55).attr("y2", -1 * y(0)-this.intervalY*j).attr("fill-opacity", .1).attr("stroke", "#ddd").attr("stroke-width", 1);        	
        }
        g.selectAll("yLabel").data(y.ticks(10)).enter().append("svg:text").attr("class","yLabel").text(function(count){ return 10 * count;}).attr("x",0).attr("y", function(d) { return -1 * y(d);}).attr("text-anchor", "right").attr("dy", 3);
	
        for (var i = 0; i < 31; i+=3) {
	        g.append("svg:line").attr("x1", x(0)+(this.intervalX*i)).attr("y1", -1 * y(0)).attr("x2", x(0)+(this.intervalX*i)).attr("y2", -1 * y(d3.max(this.data))).attr("fill-opacity", .1).attr("stroke", "#ddd").attr("stroke-width", 1);
        }
        for (var i = 0; i < 31; i++) {
	        g.append("svg:text").attr("class", "xLabel").text(i+1).attr("x", intervalx+this.intervalX*i).attr("y", 0).attr("text-anchor", "middle");
	        g.append("svg:circle").attr("class", "little").attr("cx", marginx+this.intervalX*i).attr("cy", (-1 * marginx * this.data[i])-this.marginX).attr("r", 5).attr("fill", "steelblue");
        }

        g.append("svg:path").attr("d", line(this.data)).attr("stroke","steelblue").attr("stroke-width", 2).attr("fill", "none");
        g.append("svg:line").attr("x1", x(0)).attr("y1", -1 * y(0)).attr("x2", x(this.w)).attr("y2", -1 * y(0)).attr("stroke", "#000").attr("stroke-width", 2);
        g.append("svg:line").attr("x1", x(0)).attr("y1", -1 * y(0)).attr("x2", x(0)).attr("y2", -1 * y(d3.max(this.data))-marginy).attr("stroke", "#000").attr("stroke-width", 2);
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