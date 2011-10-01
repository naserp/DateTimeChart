function DateTimeChart(MainDivId,array) {

	var mainDiv = document.getElementById(MainDivId);




	var w = 1000;
	var h = 250;
	var marginX = 0;
	var marginY = 25;
	var trickY = 10;
	
	var activeStatus = 'year';
   	var monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var myIntervalX;
    var valuelist = array;

    var valuelistYear = new Array();
    var valuelistYearN = new Array();
    var valuelistYearValue = new Array();
    var valuelistMonth = new Array();
    var valuelistMonthN = new Array();
    var valuelistMonthValue = new Array();
    var valuelistDay = new Array();
    var valuelistDayN = new Array();
    var valuelistDayValue = new Array();

    var yearXLabels = new Array();
    var yearYLabels = [0,20,40,60,80,100];
    var monthXLabels = new Array();
    var monthYLabels = [0,20,40,60,80,100];
    var dayXLabels = new Array();
    var dayYLabels = [0,20,40,60,80,100];

	var minyear = 0;
    var maxyear = 0;
    var maxyearpage = 0;
    currentyearpage = 1;
    var ystep = 0;
    
    var maxmonth = 0;
    var maxmonthpage = 0;
    this.currentmonthpage = 1;
    var mstep = 0;
	
    var maxday = 0;
    var maxdaypage = 0;
    this.currentdaypage = 1;
    var dstep = 0;

	var cursorDifrention = 0;
	var cursorDifrentionTotal = 0;
		
    districtArray(valuelist);
    normalize(valuelistYearN,valuelistYearValue,yearYLabels);
    normalize(valuelistMonthN,valuelistMonthValue,monthYLabels);
    normalize(valuelistDayN,valuelistDayValue,dayYLabels);
	
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
		paintDay(dataDayNorm, dataDay, dayXLabels, dayYLabels, dstep, this.currentdaypage);
		
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
		
		dataMonth[index] = valuelistMonth[31 * this.currentmonthpage + 1 + mstep].value;
		dataMonthNorm[index++] = valuelistMonthN[31 * this.currentmonthpage + 1 + mstep].value;		
		
		for (var i = (this.currentmonthpage * 31 - 1); i >= (this.currentmonthpage - 1) * 31; i--) {
			dataMonth[index] = valuelistMonth[i + mstep].value;
			dataMonthNorm[index++] = valuelistMonthN[i + mstep].value;
		}
		
		dataMonth[index] = valuelistMonth[31 * this.currentmonthpage - 1 + mstep].value;
		dataMonthNorm[index++] = valuelistMonthN[31 * this.currentmonthpage - 1 + mstep].value;		

		var indexlabel = 32 - mstep;
		for (var j = 0; j < 13; j++) {
			if (indexlabel >= 32)
				indexlabel = ((indexlabel + 1) % 3) + 1;
			monthXLabels[j] = indexlabel;
			indexlabel += 3;
		}
		
		paintMonth(dataMonthNorm, dataMonth, monthXLabels, monthYLabels, mstep, this.currentmonthpage);
		
		if (mstep == 0 || mstep == 31)
			document.getElementById('LabelDate').textContent = monthName[month] + " " + year;
		else {
			document.getElementById('LabelDate').textContent = monthName[month - 1] + "-" + monthName[month] + "   " + year;
			if(month==0)
			    document.getElementById('LabelDate').textContent = monthName[11] + " " +(year-1) + " - " + monthName[month] + "   " + year;
		}
//		document.getElementById('buttonDay').className = "Positive";
//		document.getElementById('buttonMonth').className = "Negative";
//		document.getElementById('buttonYear').className = "Positive";
	};

	this.btnYear = function() {
		activeStatus = 'year';
		myIntervalX = 71;
		var dataYear = new Array();
		var dataYearNorm = new Array();
		var index = 0;

		dataYear[index] = valuelistYear[12 * currentyearpage + 1 + ystep].value;
		dataYearNorm[index++] = valuelistYearN[12 * currentyearpage + 1 + ystep].value;
		
		for (var i = (12 * currentyearpage); i >= (12 * (currentyearpage - 1) + 1); i--) {
			dataYear[index] = valuelistYear[i + ystep].value;
			dataYearNorm[index++] = valuelistYearN[i + ystep].value;
		}
		
		dataYear[index] = valuelistYear[(12 * (currentyearpage - 1)) + ystep].value;
		dataYearNorm[index++] = valuelistYearN[(12 * (currentyearpage - 1)) + ystep].value;		
		
		var indexlabel = 11 - ystep;
		for (var j = 0; j < 14; j++) {
			if (indexlabel >= 12)
				indexlabel = 0;
			yearXLabels[j] = monthName[indexlabel++];
		}
		
		paintYear(dataYearNorm, dataYear, yearXLabels, yearYLabels, ystep, currentyearpage);

		if (ystep == 0 || ystep == 12){
			document.getElementById('LabelDate').textContent = year;
		}else {
			document.getElementById('LabelDate').textContent = (year - 1) + " - " + year;
		}
//    	document.getElementById('buttonDay').className = "Positive";
//		document.getElementById('buttonMonth').className = "Positive";
//		document.getElementById('buttonYear').className = "Negative";		
	};

	this.next = function() {
        cursorDifrention = 0;
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
	    				currentyearpage--;
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
    				currentyearpage--;
					year++;
				}
    			this.btnMonth();			
			}
		}
		else if (activeStatus == 'year') {
			ystep = 0;
			if (year < maxyear) {
				currentyearpage--;
				this.currentmonthpage -= 12;
				this.currentdaypage -= 372;
				year++;
        		this.btnYear();
			}
		}
	};

	this.previous = function() {   
        cursorDifrention = 0;
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
						currentyearpage++;
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
					currentyearpage++;
					year--;
				}
			}
			this.btnMonth();
		}
		else if (activeStatus == 'year') {
			ystep = 0;
			if (year > minyear) {
				currentyearpage++;
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
	    				    currentyearpage--;
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
    				    currentyearpage--;
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
			var bound = (currentyearpage - 1) * 12 + ystep;
			if (bound > 0)
			{
				ystep--;
				if (ystep == -1) {
					currentyearpage--;
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
		if (activeStatus == 'day') {//mstep -> dstep
			var bound = (this.currentdaypage - 1) * 23 + dstep;
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
						    currentyearpage++;
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
					    currentyearpage++;
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
			var bound = (currentyearpage - 1) * 12 + ystep;
			if (bound < (currentyearpage * 12) && currentyearpage < maxyearpage)
			{
				ystep++;
				if (ystep == 12) {
					currentyearpage++;
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

		valuelistYear[indexYear] = new dateObj(lastyear, 0 ,0,0,0,-1);
		valuelistYearN[indexYear++] = new dateObj(lastyear, 0 ,0,0,0,-1);
		
    	for(var i=0; i<array.length;i++) {
    		if(array[i].year == lastyear){
    			var tempyearindex = Math.abs((array[i].month-1) - 11) + 1 + (maxyearpage-1)*12; 
    			valuelistYear[tempyearindex].value += array[i].value; 
    			valuelistYearN[tempyearindex].value += array[i].value;

    			var tempmonthindex = Math.abs((array[i].day-1) - 30) + (tempyearindex-1) * 31;
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
		
		valuelistYear[indexYear] = new dateObj(lastyear, maxmonth ,0,0,0,0);
		valuelistYearN[indexYear++] = new dateObj(lastyear, maxmonth ,0,0,0,0);	
		
    	minyear = lastyear;
    }
    
    function normalize(array , arrayValue , labels) {
    	var max =  array[1].value;
    	var min =  array[1].value;
    	for(var j=1; j<array.length-1;j++) {
    		if(array[j].value > max)
    			max = array[j].value;
    		if(array[j].value < min)
    			min = array[j].value;
    	}
    	valuelistYear[0].value = min;
    	valuelistYear[valuelistYear.length-1].value = min;
    	valuelistYearN[0].value = min;
    	valuelistYearN[valuelistYearN.length-1].value = min;
    	
    	valuelistMonth[0].value = min;
    	valuelistMonth[valuelistMonth.length-1].value = min;
    	valuelistMonthN[0].value = min;
    	valuelistMonthN[valuelistMonthN.length-1].value = min;

    	var temp;
    	for(var i=0; i< array.length;i++) {  
    		var change = d3.scale.linear().domain([min , max]).range([0,10]);
    		array[i].value = Math.round(change(array[i].value) *1000)/1000;
    	}
    	for(i=0 ; i<array.length;i++) {
    		arrayValue[i] = array[(array.length-1) - i].value;
    	}
    	
    	for (var k = 0; k <= 5; k++) {
    		var temp = min + (k * ((max - min) / 5));
    		labels[k] = Math.round(temp*10)/10;
    	}
    } 	
    
    var dragObj = new Object();
    var subtract;
	var startMoving = false;
	this.dragStart = function(chart, event, id) {
		startMoving = true;
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
		cursorDifrentionTotal = 0;
	};

	this.dragGo = function(chart,event) {
		
		if(!startMoving)
			return;
	    var x = event.clientX + window.scrollX - subtract;
		cursorDifrention = x - dragObj.cursorStartX;
		
		cursorDifrentionTotal = event.clientX + window.scrollX - dragObj.cursorStartX;
		
		if (activeStatus == 'day') {
			
		}
		else if (activeStatus == 'month') {
			
		}
		else if (activeStatus == 'year') {
		    var bound = (currentyearpage - 1) * 12 + ystep;
		    if(bound <= 0 && cursorDifrention < 0)
			    return;
		    if(currentyearpage >= maxyearpage  && cursorDifrention > 0)
			    return;

		    this.btnYear();			
		}

	    if (x - dragObj.cursorStartX > myIntervalX) {
	    	cursorDifrention = 0;
	    	this.previousStep();			
		    subtract += myIntervalX;
	    }
	    if (x - dragObj.cursorStartX <- myIntervalX) {
	    	cursorDifrention = 0;
		    this.nextStep();
		    subtract -= myIntervalX;
	    }
	};

	this.dragStop = function() {
		startMoving = false;
    	document.body.style.cursor = 'default';

	};
	
	var vis;
	function removeSVG() {
		d3.select('#canvas').remove();
		if (activeStatus == 'day') {
			paintDayTotal();
		}
		else if (activeStatus == 'month') {
			paintMonthTotal();
		}
		else if (activeStatus == 'year') {
            paintYearTotal();		
		}
		mainDiv.innerHTML += "<div id='canvas' style='position:relative;' onmousedown='chart.dragStart(chart, event,&quot;canvas&quot;);' onmousemove='chart.dragGo(chart,event)'></div>";
	    mainDiv.innerHTML += "<style type='text/css' media='screen'>text{font-family: Arial;font-size: 8pt;}</style>"
			+ "<table nowrap='nowrap' width='1000' cellspacing='0' cellpadding='2'><tr class='labelSel'>"
				+ "<td id='tdYear'  align='center' style='width: 100%'><label id='LabelDate' style='font-weight: bold'></label></td><td>&nbsp;</td><td class='buttons'>"
//					+ "<button type='button' class='positive' onclick='chart.previous();'> < </button></td>"
//						+ "<td class='buttons'><button type='button' class='positive' onclick='chart.next();'> > </button> </td>"
//							+ "<td>&nbsp;</td><td class='buttons' nowrap='nowrap'><button id='buttonDay' type='button' class='positive' onclick='chart.btnDay();'>Day</button></td>"
//								+ "<td class='buttons' nowrap='nowrap'><button id='buttonMonth' type='button' class='positive' onclick='chart.btnMonth();'>Month</button></td>"
//									+ "<td class='buttons' nowrap='nowrap'><button id='buttonYear' type='button' class='positive' onclick='chart.btnYear();'>Year</button></td>"
										+ "</tr></table>";
		vis = d3.select('#canvas').append("svg:svg").attr("width", w).attr("height", h);

	}

	function paintYearTotal() {
		d3.select('#canvasBorder').remove();
		mainDiv.innerHTML = "<div id='canvasBorder' style='position:relative;'></div>";

   	    visBorder = d3.select('#canvasBorder').append("svg:svg").attr("width", w).attr("height", (h/8+4));
		var gBorder = visBorder.append("svg:g").attr("transform", "translate("+(-1*w/(maxyearpage*12))+" ,"+(h/8+4)+")");

    	gBorder.append("svg:rect").attr("transform", "translate("+w/(maxyearpage*12)+",0)").attr("x", 0).attr("y", -1 * h / 8-4).attr("width", w).attr("height", h / 8 +4 ).attr("fill-opacity", .1).attr("fill", "gray").attr("stroke-width", 2);        	
		var y = d3.scale.linear().domain([0, 10]).range([2, h/8]);
        var x = d3.scale.linear().domain([0, valuelistYear.length-3]).range([0,w]);
	    var line = d3.svg.line().x(function(d, i) { return x(i); }).y(function(d) { return -1 * y(d); }).interpolate("monotone");
        gBorder.append("svg:path").attr("d", line(valuelistYearValue)).attr("stroke","steelblue").attr("stroke-width", 2).attr("fill", "gray").attr("fill-opacity", .5);

		//alert(currentyearpage + " " + ystep);
		//gBorder.append("svg:rect").attr("transform", "translate("+((currentyearpage-1)*12+ystep)*(w/(maxyearpage*12))+",0)").attr("x", 0).attr("y", -1 * h / 8-4).attr("width", w).attr("height", h / 8 +2 ).attr("fill-opacity", .7).attr("fill", "gray");        	
		gBorder.append("svg:rect").attr("transform", "translate("+(2*(w/(maxyearpage*12))+(-1*((currentyearpage)*12+ystep)*(w/(maxyearpage*12-1))))+",0)").attr("x", 0).attr("y", -1 * h / 8-4).attr("width", w).attr("height", h / 8 +2 ).attr("fill-opacity", .7).attr("fill", "gray");        	
		gBorder.append("svg:rect").attr("transform", "translate("+(w+(2*(w/(maxyearpage*12))+(-1*((currentyearpage-1)*12+ystep)*(w/(maxyearpage*12-1)))))+",0)").attr("x", 0).attr("y", -1 * h / 8-4).attr("width", w).attr("height", h / 8 +2 ).attr("fill-opacity", .7).attr("fill", "gray");        	

//		gBorder.append("svg:rect").attr("transform", "translate("+(2*(w/(maxyearpage*12))-(currentyearpage*((w+w/(maxyearpage*12))/maxyearpage)))+",0)").attr("x", 0).attr("y", -1 * h / 8-4).attr("width", w).attr("height", h / 8 +2 ).attr("fill-opacity", .7).attr("fill", "gray");        	
//		gBorder.append("svg:rect").attr("transform", "translate("+(w+2*(w/(maxyearpage*12))-((currentyearpage-1)*((w+w/(maxyearpage*12))/maxyearpage)))+",0)").attr("x", 0).attr("y", -1 * h / 8-4).attr("width", w).attr("height", h / 8 +2 ).attr("fill-opacity", .7).attr("fill", "gray");        	

		var indexYear = 0;
		for(var i=1; i< valuelistYearValue.length;i+=12) {
            gBorder.append("svg:line").attr("x1", x(i)).attr("y1", -1 * y(0)).attr("x2", x(i)).attr("y2", -1 * h / 8-4).attr("fill-opacity", .1).attr("stroke", "#ddd").attr("stroke-width", 1);        	
			gBorder.append("svg:text").text(minyear + indexYear ).attr("x", x(i)+3).attr("y", -1 * h / 8+7).attr("text-anchor", "right").attr("fill", "white");
			indexYear++;
		}

	}
	
    function paintYear(data, dataOrigin, xAxisLabels, yAxisLabels, yearStep, yearPage) {
    	removeSVG();
		var g = vis.append("svg:g").attr("transform", "translate("+cursorDifrention+" ,"+h+")");

    	g.append("svg:clipPath").attr("id", "rectClip")
	    	.append("svg:rect").attr("x", marginX + myIntervalX + 3 - cursorDifrention).attr("y", -1 * h).attr("width", w - 2 * (marginX + myIntervalX) -6).attr("height", h);

    	g.append("svg:clipPath").attr("id", "rectClipLabel")
	    	.append("svg:rect").attr("x", -1 * 50).attr("y", -1 * h).attr("width", myIntervalX+marginX+3).attr("height", h);
        
    	g.append("svg:clipPath").attr("id", "rectClipLabelRight")
	    	.append("svg:rect").attr("x", w -(marginX+myIntervalX)-marginX -53).attr("y", -1 * h).attr("width",myIntervalX+marginX+3).attr("height", h);
    	
		var y = d3.scale.linear().domain([0, 10]).range([ marginY, h -10]);
        var x = d3.scale.linear().domain([0, data.length-1]).range([0 + marginX, w - marginX]);
		this.intervalX = (x(data.length-1)- marginX)/(data.length-1);
		this.intervalY = (y(10)- marginY)/(trickY);
        var line = d3.svg.line().x(function(d, i) { return x(i); }).y(function(d) { return -1 * y(d); }).interpolate("monotone");

        for (var j = 0; j < 11; j+=2) {
            g.append("svg:line").attr("clip-path", "url(#rectClip)").attr("x1", x(0)).attr("y1", -1 * y(0) - this.intervalY*j).attr("x2", x(data.length-1)).attr("y2", -1 * y(0)-this.intervalY*j).attr("fill-opacity", .1).attr("stroke", "#ddd").attr("stroke-width", 1);        	
            g.append("svg:line").attr("transform", "translate("+(50-cursorDifrention)+" ,0)").attr("clip-path", "url(#rectClipLabel)").attr("x1", marginX ).attr("y1", -1 * y(0) - this.intervalY*j).attr("x2", 100).attr("y2", -1 * y(0)-this.intervalY*j).attr("fill-opacity", .1).attr("stroke", "#ddd").attr("stroke-width", 1);        	
        	g.append("svg:text").attr("transform", "translate("+(50-cursorDifrention)+" ,0)").attr("clip-path", "url(#rectClipLabel)").text("$"+yAxisLabels[j/2]).attr("x", marginX - 10).attr("y", -1 * (this.intervalY * j) - marginY ).attr("text-anchor", "end").attr("dy", 3);
        }
    	g.append("svg:rect").attr("transform", "translate(" + (50 - cursorDifrention) + " ,0)").attr("clip-path", "url(#rectClipLabel)").attr("x", -50).attr("y", -1 * h).attr("width", myIntervalX+marginX+3).attr("height", h).attr("fill-opacity", .1).attr("fill", "gray");        	
    	
    	g.append("svg:rect").attr("transform", "translate(" + (50 - cursorDifrention) + " ,0)").attr("clip-path", "url(#rectClipLabelRight)").attr("x", w - (marginX + myIntervalX) - marginX - 53).attr("y", -1 * h).attr("width", myIntervalX+marginX+3).attr("height", h).attr("fill-opacity", .1).attr("fill", "gray");
    	
    	g.append("svg:rect").attr("transform", "translate(" + (50 - cursorDifrention) + " ,0)").attr("clip-path", "url(#rectClipLabelRight)").attr("x", w - (marginX + myIntervalX) - marginX -40).attr("y", -1 * h + 65).attr("width", 50).attr("height", 20).attr("rx",5).attr("ry",5).attr("stroke", "gray").attr("stroke-width", 1).attr("fill", "#529214").attr("fill-opacity", .5).attr('onclick',"chart.btnYear();").attr("onmouseover","this.style.cursor='pointer ';");
    	g.append("svg:text").attr("transform", "translate(" + (50 - cursorDifrention) + " ,0)").attr("clip-path", "url(#rectClipLabelRight)").text("Year").attr("x", w - (marginX + myIntervalX) - marginX -16).attr("y", -1 * h + 79).attr("text-anchor", "middle").attr("fill","white").attr('onclick',"chart.btnYear();").attr("onmouseover","this.style.cursor='pointer ';");

    	g.append("svg:rect").attr("transform", "translate(" + (50 - cursorDifrention) + " ,0)").attr("clip-path", "url(#rectClipLabelRight)").attr("x", w - (marginX + myIntervalX) - marginX -40).attr("y", -1 * h + 90).attr("width", 50).attr("height", 20).attr("rx", 5).attr("ry", 5).attr("stroke", "gray").attr("stroke-width", 1).attr("fill", "#529214").attr("fill-opacity", .5).attr("onmouseover", "this.style.cursor='pointer ';");//.attr('onclick',"chart.btnMonth();")
    	g.append("svg:text").attr("transform", "translate(" + (50 - cursorDifrention) + " ,0)").attr("clip-path", "url(#rectClipLabelRight)").text("Month").attr("x", w - (marginX + myIntervalX) - marginX -16).attr("y", -1 * h + 104).attr("text-anchor", "middle").attr("fill","white").attr("onmouseover","this.style.cursor='pointer ';");//.attr('onclick',"chart.btnMonth();");
    	
    	g.append("svg:rect").attr("transform", "translate(" + (50 - cursorDifrention) + " ,0)").attr("clip-path", "url(#rectClipLabelRight)").attr("x", w - (marginX + myIntervalX) - marginX -40).attr("y", -1 * h + 115).attr("width", 50).attr("height", 20).attr("rx",5).attr("ry",5).attr("stroke", "gray").attr("stroke-width", 1).attr("fill", "#529214").attr("fill-opacity", .5).attr("onmouseover","this.style.cursor='pointer ';");//.attr('onclick',"chart.btnDay();");
    	g.append("svg:text").attr("transform", "translate(" + (50 - cursorDifrention) + " ,0)").attr("clip-path", "url(#rectClipLabelRight)").text("Day").attr("x", w - (marginX + myIntervalX) - marginX -16).attr("y", -1 * h + 129).attr("text-anchor", "middle").attr("fill","white").attr("onmouseover","this.style.cursor='pointer ';");//.attr('onclick',"chart.btnDay();");

    	g.append("svg:rect").attr("transform", "translate(" + (50 - cursorDifrention) + " ,0)").attr("clip-path", "url(#rectClipLabelRight)").attr("x", w - (marginX + myIntervalX) - marginX -40).attr("y", -1 * h + 140).attr("width", 22).attr("height", 20).attr("rx",5).attr("ry",5).attr("stroke", "gray").attr("stroke-width", 1).attr("fill", "#529214").attr("fill-opacity", .5).attr('onclick',"chart.previous();").attr("onmouseover","this.style.cursor='pointer ';");
    	g.append("svg:text").attr("transform", "translate(" + (50 - cursorDifrention) + " ,0)").attr("clip-path", "url(#rectClipLabelRight)").text("<").attr("x", w - (marginX + myIntervalX) - marginX -29).attr("y", -1 * h + 154).attr("text-anchor", "middle").attr("fill","white").attr('onclick',"chart.previous();").attr("onmouseover","this.style.cursor='pointer ';");

    	g.append("svg:rect").attr("transform", "translate(" + (50 - cursorDifrention) + " ,0)").attr("clip-path", "url(#rectClipLabelRight)").attr("x", w - (marginX + myIntervalX) - marginX -13).attr("y", -1 * h + 140).attr("width", 22).attr("height", 20).attr("rx",5).attr("ry",5).attr("stroke", "gray").attr("stroke-width", 1).attr("fill", "#529214").attr("fill-opacity", .5).attr('onclick',"chart.next();").attr("onmouseover","this.style.cursor='pointer ';");
    	g.append("svg:text").attr("transform", "translate(" + (50 - cursorDifrention) + " ,0)").attr("clip-path", "url(#rectClipLabelRight)").text(">").attr("x", w - (marginX + myIntervalX) - marginX -3).attr("y", -1 * h + 154).attr("text-anchor", "middle").attr("fill","white").attr('onclick',"chart.next();").attr("onmouseover","this.style.cursor='pointer ';");

		g.append("svg:path").attr("clip-path", "url(#rectClip)").attr("d", line(data)).attr("stroke","steelblue").attr("stroke-width", 2).attr("fill", "none");
        g.append("svg:rect").attr("clip-path", "url(#rectClip)").attr("x", 250).attr("y", 20).attr("width", 20).attr("height", 200);

        for (var i = 0; i < 14; i++) {
	        g.append("svg:line").attr("clip-path", "url(#rectClip)").attr("x1", x(0)+(this.intervalX*i)).attr("y1", -1 * y(0)+ 8).attr("x2", x(0)+(this.intervalX*i)).attr("y2", -1 * y(10)).attr("fill-opacity", .1).attr("stroke", "#ddd").attr("stroke-width", 1).attr("stroke-dasharray", 2);
        }
    	var indexlabel = Math.abs(yearStep - 11);
    	var sw = yearPage % 2;
    	var color = "none";
    	if(sw == 0)
    		color = "steelblue";
    	for (var i = 0; i < 14; i++) {
    		if(indexlabel == 12) {
    	        if(color == "steelblue")
    		        color = "none";
    	        else 
    		        color = "steelblue";
    		}

    		indexlabel = (indexlabel) % 12;
       		indexlabel++;
    		var positionX = (Math.round((marginX + this.intervalX * i) * 100)) / 100;
            
    		g.append("svg:rect").attr("class", "xRect").attr("clip-path", "url(#rectClip)").attr("x", positionX - i*2.5).attr("y", -1 * y(0)+5).attr("width", 30).attr("height", 16).attr("rx", 5).attr("fill", color).attr("stroke", "blue").attr("stroke-width", .5).attr("fill-opacity", .3);    			
			g.append("svg:text").attr("class", "xLabel").attr("clip-path", "url(#rectClip)").text(xAxisLabels[i]).attr("x", positionX - i*2.5 + 6 ).attr("y", -1 * y(0) + 17).attr("text-anchor", "right");

    		var tempData = (Math.round((dataOrigin[i]) * 1000) / 1000);    		
        	g.append("svg:circle").attr("class", "little").attr("clip-path", "url(#rectClip)").attr("cx", positionX).attr("cy", (-1 * (this.intervalY) * data[i])-marginY).attr("r", 4).attr("fill", "steelblue").attr('onmouseover',"tooltip.show('Value:  "+ tempData +" $', 100);").attr('onmouseout',"tooltip.hide();");
    	}
    	
	};
	
	function paintMonthTotal() {
		d3.select('#canvasBorder').remove();
		mainDiv.innerHTML = "<div id='canvasBorder' style='position:relative;'></div>";

   	    visBorder = d3.select('#canvasBorder').append("svg:svg").attr("width", w).attr("height", (h/8+4));
		var gBorder = visBorder.append("svg:g").attr("transform", "translate(0 ,"+(h/8+4)+")");

    	gBorder.append("svg:rect").attr("transform", "translate(0,0)").attr("x", 0).attr("y", -1 * h / 8-4).attr("width", w).attr("height", h / 8 +4 ).attr("fill-opacity", .1).attr("fill", "gray").attr("stroke-width", 2);        	
		var y = d3.scale.linear().domain([0, 10]).range([2, h/8]);
        var x = d3.scale.linear().domain([0, valuelistMonth.length-1]).range([0,w]);
	    var line = d3.svg.line().x(function(d, i) { return x(i); }).y(function(d) { return -1 * y(d); }).interpolate("monotone");
        gBorder.append("svg:path").attr("d", line(valuelistMonthValue)).attr("stroke","steelblue").attr("stroke-width", 1);//.attr("fill", "gray");
		
//		var indexYear = 0;
//		for(var i=1; i< valuelistMonthValue.length;i+=12) {
//            gBorder.append("svg:line").attr("x1", x(i)).attr("y1", -1 * y(0)).attr("x2", x(i)).attr("y2", -1 * h / 8-4).attr("fill-opacity", .1).attr("stroke", "#ddd").attr("stroke-width", 1);        	
//			gBorder.append("svg:text").text(minyear + indexYear ).attr("x", x(i)+3).attr("y", -1 * h / 8+7).attr("text-anchor", "right");
//			indexYear++;
//		}
	};
	
	function paintMonth(data, dataOrigin, xAxisLabels, yAxisLabels, monthStep, monthPage) {
	 	removeSVG();
	 	var g = vis.append("svg:g").style("clip-path", "url(#rectClip)").attr("transform", "translate(0 ,"+h+")");
		
	 	var y = d3.scale.linear().domain([0, 10]).range([0 + marginY, h - 10]);
        var x = d3.scale.linear().domain([0, data.length-1]).range([0 + marginX, w - marginX]);
		this.intervalX = (x(data.length-1)-marginX)/(data.length-1);
		this.intervalY = (y(10)-marginY)/(trickY);
        var line = d3.svg.line().x(function(d, i) { return x(i); }).y(function(d) { return -1 * y(d); }).interpolate("monotone");

	 	for (var j = 0; j < 31; j+=2) {
            g.append("svg:line").attr("x1", x(0)).attr("y1", -1 * y(0) - this.intervalY*j).attr("x2", x(data.length-1)).attr("y2", -1 * y(0)-this.intervalY*j).attr("fill-opacity", .1).attr("stroke", "#ddd").attr("stroke-width", 1);        	
        	g.append("svg:text").attr("class","yLabel").text(yAxisLabels[j/2]).attr("x" , marginX - 10).attr("y", -1 * (this.intervalY * j) - marginY ).attr("text-anchor", "end").attr("dy", 3);
        }
		
		g.append("svg:path").attr("d", line(data)).attr("stroke","steelblue").attr("stroke-width", 2).attr("fill", "none");

		for (var i = 0; i < 33; i+=3) {
            var positionX = (Math.round((marginX + this.intervalX * i) * 100)) / 100;
	        g.append("svg:line").attr("x1", x(0)+(this.intervalX*i)).attr("y1", -1 * y(0) +10).attr("x2", x(0)+(this.intervalX*i)).attr("y2", -1 * y(10)).attr("fill-opacity", .1).attr("stroke", "#ddd").attr("stroke-width", 1).attr("stroke-dasharray", 2);
        	g.append("svg:text").attr("class", "xLabel").text(xAxisLabels[i/3]).attr("x", positionX).attr("y", -1 * y(0) + 20).attr("text-anchor", "middle");
        }
	    	
	 	var indexlabel = monthStep;
    	var sw = monthPage % 2;
    	var color;
    	if(sw == 0)
    		color = "steelblue";
    	else 
    		color = "none";
    	for (var i = 0; i < 33; i+=3) {
    		if (i >= indexlabel) {
    			if (sw == 0)
    				color = "none";
    			else
    				color = "steelblue";
    		}
    		positionX = (Math.round((marginX + this.intervalX * i) * 100)) / 100;
    		g.append("svg:rect").attr("class", "xRect").attr("x", positionX - 15).attr("y", -1 * y(0) + 8).attr("width", 30).attr("height", 16).attr("rx", 5).attr("fill", color).attr("stroke", "blue").attr("stroke-width", .5).attr("fill-opacity", .3);
    	}
		for (var i = 0; i < 33; i++) {

	        positionX = (Math.round((marginX + this.intervalX * i) * 100)) / 100;
        	var tempData = (Math.round(dataOrigin[i] * 1000) / 1000);
	        g.append("svg:circle").attr("class", "little").attr("cx", positionX).attr("cy", (-1 * (this.intervalY) * data[i])-marginY).attr("r", 4).attr("fill", "steelblue").attr('onmouseover',"tooltip.show('Value:  "+ tempData +" $', 100);").attr('onmouseout',"tooltip.hide();");
        }
	};

	function paintDayTotal() {
		d3.select('#canvasBorder').remove();
		mainDiv.innerHTML = "<div id='canvasBorder' style='position:relative;'></div>";

   	    visBorder = d3.select('#canvasBorder').append("svg:svg").attr("width", w).attr("height", (h/8+4));
		var gBorder = visBorder.append("svg:g").attr("transform", "translate(0 ,"+(h/8+4)+")");

    	gBorder.append("svg:rect").attr("transform", "translate(0,0)").attr("x", 0).attr("y", -1 * h / 8-4).attr("width", w).attr("height", h / 8 +4 ).attr("fill-opacity", .1).attr("fill", "gray").attr("stroke-width", 2);        	
		var y = d3.scale.linear().domain([0, 10]).range([2, h/8]);
        var x = d3.scale.linear().domain([0, valuelistDay.length-1]).range([0,w]);
	    var line = d3.svg.line().x(function(d, i) { return x(i); }).y(function(d) { return -1 * y(d); }).interpolate("monotone");
        gBorder.append("svg:path").attr("d", line(valuelistDayValue)).attr("stroke","steelblue").attr("stroke-width", 1);//.attr("fill", "gray");
		
//		var indexYear = 0;
//		for(var i=1; i< valuelistMonthValue.length;i+=12) {
//            gBorder.append("svg:line").attr("x1", x(i)).attr("y1", -1 * y(0)).attr("x2", x(i)).attr("y2", -1 * h / 8-4).attr("fill-opacity", .1).attr("stroke", "#ddd").attr("stroke-width", 1);        	
//			gBorder.append("svg:text").text(minyear + indexYear ).attr("x", x(i)+3).attr("y", -1 * h / 8+7).attr("text-anchor", "right");
//			indexYear++;
//		}
	};	
	
	function paintDay(data, dataOrigin, xAxisLabels, yAxisLabels, dayStep, dayPage) {
		removeSVG();
	 	var g = vis.append("svg:g").style("clip-path", "url(#rectClip)").attr("transform", "translate(0 ,"+h+")");		
		
		var y = d3.scale.linear().domain([0, 10]).range([0 + marginY, h - 10 ]);
        var x = d3.scale.linear().domain([0, data.length-1]).range([0 + marginX, w - marginX]);
		this.intervalX = (x(data.length-1)-marginX)/(data.length-1);
		this.intervalY = (y(10)-marginY)/(trickY);
        var line = d3.svg.line().x(function(d, i) { return x(i); }).y(function(d) { return -1 * y(d); }).interpolate("monotone");
		
        for (var j = 0; j < 11; j+=2) {
            g.append("svg:line").attr("x1", x(0)).attr("y1", -1 * y(0) - this.intervalY*j ).attr("x2", x(data.length-1)).attr("y2", -1 * y(0)-this.intervalY*j ).attr("fill-opacity", .1).attr("stroke", "#ddd").attr("stroke-width", 1);        	
        	g.append("svg:text").attr("class","yLabel").text(yAxisLabels[j/2]).attr("x",marginX - 10).attr("y", -1 * (this.intervalY * j) - marginY).attr("text-anchor", "end").attr("dy", 3);
        }
	
		g.append("svg:path").attr("d", line(data)).attr("stroke","steelblue").attr("stroke-width", 2).attr("fill", "none");

		for (var i = 0; i < 24; i+=6) {
	        var positionX = (Math.round((marginX + this.intervalX * i) * 100)) / 100;
	        g.append("svg:line").attr("x1", x(0)+(this.intervalX*i)).attr("y1", -1 * y(0)+10).attr("x2", x(0)+(this.intervalX*i)).attr("y2", -1 * y(10)).attr("fill-opacity", .1).attr("stroke", "#ddd").attr("stroke-width", 1).attr("stroke-dasharray", 2);
         	g.append("svg:text").attr("class", "xLabel").text((xAxisLabels[i/6])+":00").attr("x", positionX ).attr("y", -1 * y(0) + 20).attr("text-anchor", "middle");
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
        	var tempData = (Math.round((dataOrigin[i]) * 1000) / 1000);
	        g.append("svg:circle").attr("class", "little").attr("cx", positionX).attr("cy", (-1 * (this.intervalY) * data[i])-marginY).attr("r", 4).attr("fill", "steelblue").attr('onmouseover',"tooltip.show('Value: "+ tempData +" $', 100);").attr('onmouseout',"tooltip.hide();");
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