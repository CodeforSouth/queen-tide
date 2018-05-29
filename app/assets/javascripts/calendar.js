"use strict";

function parseData(predictions) {
    var months = [];
    predictions.forEach(function(prediction) {
        var index = prediction.zeroBasedMonth;
        var tides = prediction.monthData.map(function(day) {
            var tide = {
                firstTide: {
                    time: day[0][0],
                    level: Number(day[0][1])
                }
            };

            if (day[1]) {
                tide.secondTide = {
                    time: day[1][0],
                    level: Number(day[1][1])
                };
            }
            return tide;
        });
        months[index] = tides;
    });

    //document.getElementById("legend").style.display = "block";
    //document.getElementById("station").innerHTML = stationname;
    return calendarize(months);
}

function calendarize(yearData) {
    var calendarYear = yearData.map(function(monthData, index) {
        var highestTide = getHighestTide(monthData);
        var month = moment().month(index);
        var monthName = month.format("MMMM");
        var startWeek = month.startOf("month").week();
        var endWeek = month.endOf("month").week();
        if (index === 11) endWeek = moment().weeksInYear() + 1;
        var weeks = [];
        for (var i = startWeek; i <= endWeek; i++) {
            var week = month.week(i);
            var days = [];
            for (var weekDay = 0; weekDay < 7; weekDay++) {
                var day = week.weekday(weekDay);
                var inMonth = day.month() === index;
                var date = day.date();
                days.push({
                    date: day.date(),
                    dateString: day.toString(),
                    inMonth: inMonth,
                    tideData: inMonth
                        ? parseTideData(monthData[date - 1], highestTide)
                        : null
                });
            }
            weeks.push(days);
        }
        return {
            name: monthName,
            weeks: weeks
        };
    });
    return calendarYear;
}

function getHighestTide(monthData) {
    var allTides = monthData.reduce(function(accumulator, currentTide) {
        accumulator.push(currentTide.firstTide.level);
        if (currentTide.secondTide) {
            accumulator.push(currentTide.secondTide.level);
        }
        return accumulator;
    }, []);

    var highestTide = Math.max.apply(this, allTides);
    return highestTide;
}

function parseTideData(tideData, highestTide) {
    var floodingType;
    var reference = window.king || 2.5;
    var allTides = tideData.secondTide
        ? [tideData.firstTide, tideData.secondTide]
        : [tideData.firstTide];
    var allLevels = allTides.map(function(tideData) {
        return tideData.level;
    });

    var allValues = allLevels.concat([reference]);

    var max = Math.max.apply(this, allValues);
    var min = Math.min.apply(this, allValues);

    if (reference === max) {
        floodingType = 0; //both floods are lower
    } else if (reference === min) {
        floodingType = 2; //both floods are higher
    } else {
        floodingType = 1; //floods on oly one
    }

    var highestInMonth = Math.max.apply(this, allLevels) === highestTide;

    var label = allTides.reduce(function(labelString, current, index) {
        if (index > 0) {
            labelString += " & ";
        }
        labelString += current.time + " " + current.level + "ft";
        return labelString;
    }, "");

    return {
        floodLevel: floodingType,
        highestInMonth: highestInMonth,
        label: label
    };
}

function renderCalendar(calendarData) {
    var calendar = document.querySelector("#calendar");
    calendar.innerHTML = "";
    calendarData.forEach(function(calendarMonth) {
        calendar.appendChild(renderMonth(calendarMonth));
    });
    calendar.classList.remove("hidden");
}

function renderMonth(monthData) {
    var monthCalendar = document.createDocumentFragment();
    var monthElement = document.createElement("div");
    monthElement.classList.toggle("calendar-month");
    monthElement.innerHTML =
        "<h2 class='month-name'>" +
        monthData.name +
        "</h2>" +
        "<div class='month-header'>" +
        "<span class='week-day month-day'>Sun</span>" +
        "<span class='week-day month-day'>Mon</span>" +
        "<span class='week-day month-day'>Tue</span>" +
        "<span class='week-day month-day'>Wed</span>" +
        "<span class='week-day month-day'>Thu</span>" +
        "<span class='week-day month-day'>Fri</span>" +
        "<span class='week-day month-day'>Sat</span>" +
        "</div>";

    monthData.weeks.forEach(function(week) {
        var weekElement = document.createElement("div");
        weekElement.classList.toggle("month-week");
        week.forEach(function(day) {
            var dayElement = document.createElement("span");
            dayElement.classList.toggle("month-day");
            dayElement.textContent = day.date;
            if (day.inMonth) {
                dayElement.onmouseenter = showLabel;
                dayElement.onmouseleave = hideLabel;
                dayElement.dataset.label = day.tideData.label;
                if (day.tideData.highestInMonth) {
                    dayElement.classList.toggle("highest-in-month");
                }
                switch (day.tideData.floodLevel) {
                    case 0:
                        dayElement.classList.toggle("no-tides");
                        break;
                    case 1:
                        dayElement.classList.toggle("one-tide");
                        break;
                    case 2:
                        dayElement.classList.toggle("two-tides");
                        break;
                    default:
                        break;
                }
            } else {
                dayElement.classList.toggle("non-month");
            }
            weekElement.appendChild(dayElement);
        });
        monthElement.appendChild(weekElement);
    });

    monthCalendar.appendChild(monthElement);
    return monthCalendar;
}

function showLabel(event) {
    var label = document.getElementById("floating-label");
    var day = event.target;
    var mousex = event.pageX + 20; //Get X coordinates
    var mousey = event.pageY + 10; //Get Y coordinates
    label.textContent = day.dataset.label;
    label.style.top = mousey + "px";
    label.style.left = mousex + "px";
    label.classList.remove("hidden");
}

function hideLabel(event) {
    var label = document.getElementById("floating-label");
    label.classList.add("hidden");
}
