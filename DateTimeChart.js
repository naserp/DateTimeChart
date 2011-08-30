function DateTimeChart(MainDivId,array) {

	var mainDiv = document.getElementById(MainDivId);
	
	mainDiv.innerHTML = "<style type='text/css' media='screen'>text{font-family: Arial;font-size: 8pt;}</style>"
	    +"<table nowrap='nowrap' width='980'><tr><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"
		+"<td id='tdYear' class='labelSel' align='center' style='width: 100%'><label id='LabelDate' style='font-weight: bold'></label></td><td>&nbsp;</td><td class='buttons'>"
        +"<button type='button' class='positive' onclick='chart.previous();'> < </button></td>"
        +"<td class='buttons'><button type='button' class='positive' onclick='chart.next();'> > </button> </td>"
	    +"<td>&nbsp;</td><td class='buttons' nowrap='nowrap'><button id='buttonDay' type='button' class='positive' onclick='chart.btnDay();'>Day</button></td>"
	    +"<td class='buttons' nowrap='nowrap'><button id='buttonMonth' type='button' class='positive' onclick='chart.btnMonth();'>Month</button></td>"
	    +"<td class='buttons' nowrap='nowrap'><button id='buttonYear' type='button' class='positive' onclick='chart.btnYear();'>Year</button></td>"
	    +"<td>&nbsp;&nbsp;&nbsp;&nbsp;</td></tr></table>"
		+"<div id='canvas' style='position:relative;' onmousedown='chart.dragStart(chart, event,&quot;canvas&quot;);' onmousemove='chart.dragGo(chart,event)'></div>";


	var w = 1000;
	var h = 250;
	var marginX = 40;
	var marginY = 25;
	var trickY = 10;
	
	var activeStatus = 'year';
   	var monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var myIntervalX;
    
    var valuelist = array;

    var valuelistYear = new Array();
    var valuelistYearN = new Array();
    var valuelistMonth = new Array();
    var valuelistMonthN = new Array();
    var valuelistDay = new Array();
    var valuelistDayN = new Array();

    var yearXLabels = new Array();
    var monthXLabels = new Array();
    var dayXLabels = new Array();
    
    var minyear = 0;
    var maxyear = 0;
    var maxyearpage = 0;
    this.currentyearpage = 1;
    var ystep = 0;
    
    var maxmonth = 0;
    var maxmonthpage = 0;
    this.currentmonthpage = 1;
    var mstep = 0;

    var maxday = 0;
    var maxdaypage = 0;
    this.currentdaypage = 1;
    var dstep = 0;
	
   	var vis = d3.select('#canvas').append("svg:svg").attr("width", w).attr("height", h);
    var g = vis.append("svg:g").attr("transform", "translate(0, "+h+")");

    districtArray(valuelist);
    normalize(valuelistYearN);
    normalize(valuelistMonthN);
    normalize(valuelistDayN);
	
	this.btnDay = function() {
		activeStatus = 'day';
		myIntervalX = 35;
		var dataDay = new Array();
		var dataDayNorm = new Array();
		var index = 0;
		for (var i = (this.currentdaypage * 24 - 1); i >= (this.currentdaypage - 1) * 24; i--) {
			dataDay[index] = valuelistDay[i + dstep].value;
			dataDayNorm[index++] = valuelistDayN[i + dstep].value;
		}
		var indexlabel = 24 - dstep;

		for (var j = 0; j < 5; j++) {
			if (indexlabel >= 24)
				indexlabel = ((indexlabel) % 6);
			dayXLabels[j] = indexlabel;
			indexlabel += 6;
		}
		paintDay(dataDayNorm, dataDay, dayXLabels, dstep, this.currentdaypage);
		
		if (dstep == 0 || dstep == 24)
			document.getElementById('LabelDate').textContent = day + " " +monthName[month] + " " + year;
		else {
			document.getElementById('LabelDate').textContent = (day-1) + "-" + day +" "+monthName[month] + " " + year;
		if(day == 1)
		    document.getElementById('LabelDate').textContent = "31 " + monthName[month-1] + " " + (year) + " - " + day +" "+ monthName[month] + " " + year;				
		if(day == 1 && month==0)
		    document.getElementById('LabelDate').textContent = "31 " + monthName[11] + " " + (year-1) + " - " + day +" "+ monthName[month] + " " + year;				
		}
		document.getElementById('buttonDay').className = "Negative";
		document.getElementById('buttonMonth').className = "Positive";
		document.getElementById('buttonYear').className = "Positive";
	};

	this.btnMonth = function() {
		activeStatus = 'month';
		myIntervalX = 30;
		var dataMonth = new Array();
		var dataMonthNorm = new Array();
		var index = 0;
		for (var i = (this.currentmonthpage * 31 - 1); i >= (this.currentmonthpage - 1) * 31; i--) {
			dataMonth[index] = valuelistMonth[i + mstep].value;
			dataMonthNorm[index++] = valuelistMonthN[i + mstep].value;
		}
		var indexlabel = 32 - mstep;

		for (var j = 0; j < 11; j++) {
			if (indexlabel >= 32)
				indexlabel = ((indexlabel + 1) % 3) + 1;
			monthXLabels[j] = indexlabel;
			indexlabel += 3;
		}
		paintMonth(dataMonthNorm, dataMonth, monthXLabels, mstep, this.currentmonthpage);
		if (mstep == 0 || mstep == 31)
			document.getElementById('LabelDate').textContent = monthName[month] + " " + year;
		else {
			document.getElementById('LabelDate').textContent = monthName[month - 1] + "-" + monthName[month] + "   " + year;
			if(month==0)
			    document.getElementById('LabelDate').textContent = monthName[11] + " " +(year-1) + " - " + monthName[month] + "   " + year;
		}
		document.getElementById('buttonDay').className = "Positive";
		document.getElementById('buttonMonth').className = "Negative";
		document.getElementById('buttonYear').className = "Positive";
	};

	this.btnYear = function() {//alert("btnYear");
		activeStatus = 'year';
		myIntervalX = 83;
		var dataYear = new Array();
		var dataYearNorm = new Array();
		var index = 0;

		for (var i = (12 * this.currentyearpage - 1); i >= (12 * (this.currentyearpage - 1)); i--) {
			dataYear[index] = valuelistYear[i + ystep].value;
			dataYearNorm[index++] = valuelistYearN[i + ystep].value;
		}
		var indexlabel = 12 - ystep;
		for (var j = 0; j < 12; j++) {
			if (indexlabel >= 12)
				indexlabel = 0;
			yearXLabels[j] = monthName[indexlabel++];
		}
		paintYear(dataYearNorm, dataYear, yearXLabels, ystep, this.currentyearpage);

		if (ystep == 0 || ystep == 12)
			document.getElementById('LabelDate').textContent = year;
		else {
			document.getElementById('LabelDate').textContent = (year - 1) + " - " + year;
		}
    	document.getElementById('buttonDay').className = "Positive";
		document.getElementById('buttonMonth').className = "Positive";
		document.getElementById('buttonYear').className = "Negative";		
	};

	this.next = function() {

		if (activeStatus == 'day') {
			dstep = 0;
			if (this.currentdaypage > 1) {
				day++;
				this.currentdaypage--;
				if (day >= 32) {
					day = 1;
    				this.currentmonthpage--;
					month++;
					if(month >= 12) {
						month = 0;
	    				this.currentyearpage--;
    					year++;
					}
				}
       			this.btnDay();
			}
		}
		else if (activeStatus == 'month') {
			mstep = 0;
			if (this.currentmonthpage > 1) {
				month++;
				this.currentmonthpage--;
				this.currentdaypage -= 31;
				if (month >= 12) {
					month = 0;
    				this.currentyearpage--;
					year++;
				}
    			this.btnMonth();			
			}
		}
		else if (activeStatus == 'year') {
			ystep = 0;
			if (year < maxyear) {
				this.currentyearpage--;
				this.currentmonthpage -= 12;
				this.currentdaypage -= 372;
				year++;
        		this.btnYear();
			}
		}
	};

	this.previous = function() {   

		if (activeStatus == 'day') {
			dstep = 0;
			if (this.currentdaypage < maxdaypage) {
				day--;
				this.currentdaypage++;
				if (day <= 0) {
					day = 31;
				    this.currentmonthpage++;					
					month--;
					if(month<0) {
						month = 11;
						this.currentyearpage++;
						year--;
					}
				}
		        this.btnDay();					
			}
		}
		else if (activeStatus == 'month') {
			mstep = 0;
			if (this.currentmonthpage < maxmonthpage) {
				month--;
				this.currentmonthpage++;
				this.currentdaypage += 31;
				if (month < 0) {
					month = 11;
					this.currentyearpage++;
					year--;
				}
			}
			this.btnMonth();
		}
		else if (activeStatus == 'year') {
			ystep = 0;
			if (year > minyear) {
				this.currentyearpage++;
				this.currentmonthpage += 12;
				this.currentdaypage += 372;
				year--;
				this.btnYear();
			}
		}
	};

	this.nextStep = function() {
		if (activeStatus == 'day') {
			var bound = (this.currentdaypage - 1) * 23 + dstep;
			if (bound > 0)
			{
				dstep--;
				if (dstep == -1) {
					this.currentdaypage--;
					day++;
				    if (day >= 32) {
					    day = 1;
    				    this.currentmonthpage--;
					    month++;
					    if(month >= 12) {
						    month = 0;
	    				    this.currentyearpage--;
    					    year++;
					    }
				    }					
					dstep = 22;
				}
				this.btnDay();
			}
			else {
				this.dragStop();
			}
		}
		else
		 if (activeStatus == 'month') {
			var bound = (this.currentmonthpage - 1) * 31 + mstep;
			if (bound > 0)
			{
				mstep--;
				if (mstep == -1) {
					this.currentmonthpage--;
					this.currentdaypage-=31;
					month++;
				    if (month >= 12) {
					    month = 0;
    				    this.currentyearpage--;
					    year++;
				    }					
					mstep = 30;
				}
				this.btnMonth();
			}
			else {
				this.dragStop();
			}
		}
		else if (activeStatus == 'year') {
			var bound = (this.currentyearpage - 1) * 12 + ystep;
			if (bound > 0)
			{
				ystep--;
				if (ystep == -1) {
					this.currentyearpage--;
					this.currentmonthpage -= 12;
					this.currentdaypage -= 372;
					year++;
					ystep = 11;
				}
				this.btnYear();
			}
			else {
				this.dragStop();
			}
		}
	};

	this.previousStep = function() {
		if (activeStatus == 'day') {
			var bound = (this.currentdaypage - 1) * 23 + mstep;
			if (bound < (this.currentdaypage * 23) && this.currentdaypage < maxdaypage)
			{
				dstep++;
				if (dstep >= 23) {
					this.currentdaypage++;
					day--;
				    if (day <= 0) {
					    day = 31;
				        this.currentmonthpage++;					
					    month--;
					    if(month<0) {
						    month = 11;
						    this.currentyearpage++;
						    year--;
					    }
				    }					
					dstep = 0;
				}
				this.btnDay();
			}
			else {
				this.dragStop();
			}
		}
		else
		if (activeStatus == 'month') {
			var bound = (this.currentmonthpage - 1) * 31 + mstep;
			if (bound < (this.currentmonthpage * 31) && this.currentmonthpage < maxmonthpage)
			{
				mstep++;
				if (mstep >= 31) {
					this.currentmonthpage++;
					this.currentdaypage+=31;
					month--;
				    if (month < 0) {
					    month = 11;
					    this.currentyearpage++;
					    year--;
				    }					
					mstep = 0;
				}
				this.btnMonth();
			}
			else {
				this.dragStop();
			}
		}
		else if (activeStatus == 'year') {
			var bound = (this.currentyearpage - 1) * 12 + ystep;
			if (bound < (this.currentyearpage * 12) && this.currentyearpage < maxyearpage)
			{
				ystep++;
				if (ystep == 12) {
					this.currentyearpage++;
					this.currentmonthpage+= 12;
					this.currentdaypage+= 372;
					year--;
					ystep = 0;
				}
				this.btnYear();
			}
			else {
				this.dragStop();
			}
		}
	};    
 
	function districtArray(array) {
    	array.sort(function(a, b) {
    		return b.minute - a.minute;
    	});    	
    	array.sort(function(a, b) {
    		return b.hour - a.hour;
    	});    	
    	array.sort(function(a, b) {
    		return b.day - a.day;
    	});
    	array.sort(function(a, b) {
    		return b.month - a.month;
    	});
    	array.sort(function(a, b) {
    		return b.year - a.year;
    	});
    	
    	maxyear = array[0].year;
    	year = maxyear;
    	var indexYear = 0;
    	var lastyear = maxyear + 1;

    	maxmonth = 12;
    	month = maxmonth-1;	    	
    	var indexMonth = 0;
    	var lastmonth = maxmonth + 1;

    	maxday = 32;
    	day = maxday-1;	    	
    	var indexDay = 0;
    	var lastday = maxday + 1;		
    	
    	for(var i=0; i<array.length;i++) {
    		if(array[i].year == lastyear){
    			var tempyearindex = Math.abs((array[i].month) - 11) + (maxyearpage-1)*12; 
    			valuelistYear[tempyearindex].value += array[i].value; 
    			valuelistYearN[tempyearindex].value += array[i].value;

    			var tempmonthindex = Math.abs((array[i].day) - 30) + (tempyearindex) * 31;
    			valuelistMonth[tempmonthindex].value += array[i].value; 
    			valuelistMonthN[tempmonthindex].value += array[i].value;
    			
    			var tempdayindex = Math.abs((array[i].hour) - 23) + (tempmonthindex) * 24;
    			valuelistDay[tempdayindex].value += array[i].value; 
    			valuelistDayN[tempdayindex].value += array[i].value;
    	    }
    		else{
    			maxyearpage++;
    			i--;
    			lastyear--;
    			for(var y=11; y>=0 ; y-- ) {
    				valuelistYear[indexYear] = new dateObj(lastyear, y ,0,0,0,0);
    				valuelistYearN[indexYear++] = new dateObj(lastyear, y ,0,0,0,0);
    				maxmonthpage++;
    				for(var m=30; m>=0 ; m-- ) {
    				    valuelistMonth[indexMonth] = new dateObj(lastyear, y ,m,0,0,0);
    				    valuelistMonthN[indexMonth++] = new dateObj(lastyear, y ,m,0,0,0);
    					maxdaypage++;
    					for(var d=23 ; d>= 0; d--) {    						
    				        valuelistDay[indexDay] = new dateObj(lastyear, y ,m,d,0,0);
    				        valuelistDayN[indexDay++] = new dateObj(lastyear, y ,m,d,0,0);
    				    }
    		        }
    		    }	
    	    }
    	}
    	minyear = lastyear;
    }
    
    function normalize(array) {
    	var max = 0;
    	for(var j=0; j<array.length;j++) {
    		if(array[j].value > max)
    			max = array[j].value;
    	}
    	for(var i=0; i< array.length;i++) {
    		var temp = (array[i].value * 10) / max;
    		array[i].value = Math.round(temp *1000)/1000;
    	}
    } 	
    
    var dragObj = new Object();
    var subtract;
	var startMoving = false;
	var callCount = 0;
	this.dragStart = function(chart, event, id) {
		startMoving = true;
		callCount = 0;
		var x, y;
		if (id)
			dragObj.elNode = document.getElementById(id);
		else {
			dragObj.elNode = event.target;

			if (dragObj.elNode.nodeType == 3)
				dragObj.elNode = dragObj.elNode.parentNode;
		}

		x = event.clientX + window.scrollX;
		y = event.clientY + window.scrollY;

		dragObj.cursorStartX = x;
		dragObj.cursorStartY = y;
		dragObj.elStartLeft = parseInt(dragObj.elNode.style.left, 10);
		dragObj.elStartTop = parseInt(dragObj.elNode.style.top, 10);

		if (isNaN(dragObj.elStartLeft)) dragObj.elStartLeft = 0;
		if (isNaN(dragObj.elStartTop)) dragObj.elStartTop = 0;

		dragObj.elNode.style.zIndex = ++dragObj.zIndex;

		document.addEventListener("mouseup", this.dragStop, true);
		event.preventDefault();

		document.body.style.cursor = 'move';
		subtract = 0;
	};

	this.dragGo = function(chart,event) {
		if(!startMoving)
			return;
	    var x = event.clientX + window.scrollX - subtract;

		if (x - dragObj.cursorStartX > myIntervalX) {
			this.previousStep();			
			subtract += myIntervalX;
		}

		if (x - dragObj.cursorStartX <- myIntervalX) {
			this.nextStep();
			subtract -= myIntervalX;
   		}
	};

	this.dragStop = function() {
		startMoving = false;
    	document.body.style.cursor = 'default';

	};
	function removeSVG() {
		d3.select('#canvas').remove();
		mainDiv.innerHTML += "<div id='canvas' style='position:relative;' onmousedown='chart.dragStart(chart, event,&quot;canvas&quot;);' onmousemove='chart.dragGo(chart,event)'></div>";

   	    vis = d3.select('#canvas').append("svg:svg").attr("width", w).attr("height", h);
        g = vis.append("svg:g").attr("transform", "translate(0, "+h+")");
		
	}
	
    function paintYear(data, dataOrigin, axisLabels, yearStep, yearPage) {
    	removeSVG();
		var y = d3.scale.linear().domain([0, 10]).range([0 + marginY, h - marginY]);
        var x = d3.scale.linear().domain([0, data.length-1]).range([0 + marginX, w - marginX]);
		this.intervalX = (x(data.length-1)- marginX)/(data.length-1);
		this.intervalY = (y(10)- marginY)/(trickY);
        var line = d3.svg.line().x(function(d, i) { return x(i); }).y(function(d) { return -1 * y(d); }).interpolate("monotone");

    	g.append("svg:rect").attr("x", 0).attr("y", -1 * h).attr("width", w).attr("height", h).attr("fill","white");

        for (var j = 0; j < 11; j+=2) {
            g.append("svg:line").attr("x1", x(0)).attr("y1", -1 * y(0) - this.intervalY*j).attr("x2", x(data.length-1)).attr("y2", -1 * y(0)-this.intervalY*j).attr("fill-opacity", .1).attr("stroke", "#ddd").attr("stroke-width", 1);        	
        	g.append("svg:text").attr("class","yLabel").text(j*10 + "%").attr("x",0 + Math.ceil((10-j)/9)*7).attr("y", -1 * (this.intervalY * j) - marginY ).attr("text-anchor", "right").attr("dy", 3);
        }
    	
		g.append("svg:path").attr("d", line(data)).attr("stroke","steelblue").attr("stroke-width", 2).attr("fill", "none");

		for (var i = 0; i < 12; i++) {
	        g.append("svg:line").attr("x1", x(0)+(this.intervalX*i)).attr("y1", -1 * y(0)+ 8).attr("x2", x(0)+(this.intervalX*i)).attr("y2", -1 * y(10)).attr("fill-opacity", .1).attr("stroke", "#ddd").attr("stroke-width", 1).attr("stroke-dasharray", 2);
        }
    	var indexlabel = yearStep;
    	var sw = yearPage % 2;
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
    		var positionX = (Math.round((marginX + this.intervalX * i) * 100)) / 100;
	        g.append("svg:rect").attr("class", "xRect").attr("x", positionX - 15 ).attr("y", -1 * y(0)+8).attr("width", 30).attr("height", 16).attr("rx", 5).attr("fill", color).attr("stroke", "blue").attr("stroke-width", .5).attr("fill-opacity", .3);
    	}

    	for (var i = 0; i < 12; i++) {
        	positionX = (Math.round((marginX + this.intervalX * i) * 100)) / 100;
        	var tempPercent = (Math.round((data[i]) * 1000) / 100);
   	        g.append("svg:text").attr("class", "xLabel").text(axisLabels[i]).attr("x", positionX ).attr("y", -1 * y(0) + 20).attr("text-anchor", "middle");
        	g.append("svg:circle").attr("class", "little").attr("cx", positionX).attr("cy", (-1 * (this.intervalY) * data[i])-marginY).attr("r", 4).attr("fill", "steelblue").attr('onmouseover',"tooltip.show('"+ dataOrigin[i] +" hits - "+ tempPercent +"%', 100);").attr('onmouseout',"tooltip.hide();");
        }
	};		

	 function paintMonth(data, dataOrigin, axisLabels, monthStep, monthPage) {
	 	removeSVG();
		var y = d3.scale.linear().domain([0, 10]).range([0 + marginY, h - marginY]);
        var x = d3.scale.linear().domain([0, data.length-1]).range([0 + marginX, w - marginX]);
		this.intervalX = (x(data.length-1)-marginX)/(data.length-1);
		this.intervalY = (y(10)-marginY)/(trickY);
        var line = d3.svg.line().x(function(d, i) { return x(i); }).y(function(d) { return -1 * y(d); }).interpolate("monotone");
        
		g.append("svg:rect").attr("x", 0).attr("y", -1 * h).attr("width", w).attr("height", h).attr("fill","white");
		
        for (var j = 0; j < 31; j+=2) {
            g.append("svg:line").attr("x1", x(0)).attr("y1", -1 * y(0) - this.intervalY*j).attr("x2", x(data.length-1)).attr("y2", -1 * y(0)-this.intervalY*j).attr("fill-opacity", .1).attr("stroke", "#ddd").attr("stroke-width", 1);        	
        	g.append("svg:text").attr("class","yLabel").text(j*10 + "%").attr("x",0+ Math.ceil((10-j)/9)*7).attr("y", -1 * (this.intervalY * j) - marginY ).attr("text-anchor", "right").attr("dy", 3);
        }
		
		g.append("svg:path").attr("d", line(data)).attr("stroke","steelblue").attr("stroke-width", 2).attr("fill", "none");

		for (var i = 0; i < 31; i+=3) {
            var positionX = (Math.round((marginX + this.intervalX * i) * 100)) / 100;
	        g.append("svg:line").attr("x1", x(0)+(this.intervalX*i)).attr("y1", -1 * y(0) +10).attr("x2", x(0)+(this.intervalX*i)).attr("y2", -1 * y(10)).attr("fill-opacity", .1).attr("stroke", "#ddd").attr("stroke-width", 1).attr("stroke-dasharray", 2);
        	g.append("svg:text").attr("class", "xLabel").text(axisLabels[i/3]).attr("x", positionX).attr("y", -1 * y(0) + 20).attr("text-anchor", "middle");
        }
	    	
	 	var indexlabel = monthStep;
    	var sw = monthPage % 2;
    	var color;
    	if(sw == 0)
    		color = "steelblue";
    	else 
    		color = "none";
    	for (var i = 0; i < 31; i+=3) {
    		if(i >= indexlabel) {
    	        if(sw == 0)
    		        color = "none";
    	        else 
    		        color = "steelblue";
    		}
    		positionX = (Math.round((marginX + this.intervalX * i) * 100)) / 100;
	        g.append("svg:rect").attr("class", "xRect").attr("x", positionX - 15 ).attr("y", -1 * y(0)+8).attr("width", 30).attr("height", 16).attr("rx", 5).attr("fill", color).attr("stroke", "blue").attr("stroke-width", .5).attr("fill-opacity", .3);
    	}
		
        for (var i = 0; i < 31; i++) {
	        positionX = (Math.round((marginX + this.intervalX * i) * 100)) / 100;
        	var tempPercent = (Math.round(data[i] * 1000) / 100);
	        g.append("svg:circle").attr("class", "little").attr("cx", positionX).attr("cy", (-1 * (this.intervalY) * data[i])-marginY).attr("r", 4).attr("fill", "steelblue").attr('onmouseover',"tooltip.show(' "+ dataOrigin[i] +" hits - "+ (tempPercent) +"%', 100);").attr('onmouseout',"tooltip.hide();");
        }
	};


	function paintDay(data, dataOrigin, axisLabels, dayStep, dayPage) {
		removeSVG();
		var y = d3.scale.linear().domain([0, 10]).range([0 + marginY, h - marginY ]);
        var x = d3.scale.linear().domain([0, data.length-1]).range([0 + marginX, w - marginX]);
		this.intervalX = (x(data.length-1)-marginX)/(data.length-1);
		this.intervalY = (y(10)-marginY)/(trickY);
        var line = d3.svg.line().x(function(d, i) { return x(i); }).y(function(d) { return -1 * y(d); }).interpolate("monotone");

		g.append("svg:rect").attr("x", 0).attr("y", -1 * h).attr("width", w).attr("height", h).attr("fill","white");
		
        for (var j = 0; j < 11; j+=2) {
            g.append("svg:line").attr("x1", x(0)).attr("y1", -1 * y(0) - this.intervalY*j ).attr("x2", x(data.length-1)).attr("y2", -1 * y(0)-this.intervalY*j ).attr("fill-opacity", .1).attr("stroke", "#ddd").attr("stroke-width", 1);        	
        	g.append("svg:text").attr("class","yLabel").text(j*10 + "%").attr("x",0 + Math.ceil((10-j)/9)*7).attr("y", -1 * (this.intervalY * j) - marginY).attr("text-anchor", "left").attr("dy", 3).attr("direction", "rtl");
        }
	
		g.append("svg:path").attr("d", line(data)).attr("stroke","steelblue").attr("stroke-width", 2).attr("fill", "none");

		for (var i = 0; i < 24; i+=6) {
	        var positionX = (Math.round((marginX + this.intervalX * i) * 100)) / 100;
	        g.append("svg:line").attr("x1", x(0)+(this.intervalX*i)).attr("y1", -1 * y(0)+10).attr("x2", x(0)+(this.intervalX*i)).attr("y2", -1 * y(10)).attr("fill-opacity", .1).attr("stroke", "#ddd").attr("stroke-width", 1).attr("stroke-dasharray", 2);
         	g.append("svg:text").attr("class", "xLabel").text((axisLabels[i/6])+":00").attr("x", positionX ).attr("y", -1 * y(0) + 20).attr("text-anchor", "middle");
        }

    	var indexlabel = dayStep;
    	var sw = dayPage % 2;
    	var color;
    	if(sw == 0)
    		color = "steelblue";
    	else 
    		color = "none";
    	for (var i = 0; i < 24; i+=6) {
    		if(i >= indexlabel) {
    	        if(sw == 0)
    		        color = "none";
    	        else 
    		        color = "steelblue";
    		}
    		positionX = (Math.round((marginX + this.intervalX * i) * 100)) / 100;
	        g.append("svg:rect").attr("class", "xRect").attr("x", positionX - 15 ).attr("y", -1 * y(0)+8).attr("width", 30).attr("height", 16).attr("rx", 5).attr("fill", color).attr("stroke", "blue").attr("stroke-width", .5).attr("fill-opacity", .3);
    	}
		
        for (var i = 0; i < 24; i++) {
	        positionX = (Math.round((marginX + this.intervalX * i) * 100)) / 100;
        	var tempPercent = (Math.round((data[i]) * 1000) / 100);
	        g.append("svg:circle").attr("class", "little").attr("cx", positionX).attr("cy", (-1 * (this.intervalY) * data[i])-marginY).attr("r", 4).attr("fill", "steelblue").attr('onmouseover',"tooltip.show(' "+ dataOrigin[i] +" hits  - "+ tempPercent +"%', 100);").attr('onmouseout',"tooltip.hide();");
        }
	};
}

function dateObj(y,m,d,th,tm,v) {
  this.year = y;
  this.month = m;
  this.day = d;
  this.hour = th;
  this.minute = tm;
  this.value = v;
}

var tooltip = function(){
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