var departures = {

  data: {
    stops: {
      bart: {
        agencyId: "BART",
        stopCode: 16
      },
      caltrain: {
        agencyId: "CALTRAIN",
        stopCode: 70012
      },
      muni: {
        agencyId: "SF",
        stopCode: 16994
      }
    }
  },

  getDepartureMarkup: function(departure) {
    var times = departure.FormattedDepartureTimes.split(",");
    console.log(times);
    var timesMarkup = "";

    $.each(times, function(index, time) {
      timesMarkup += "<span class=\"minutes\">" + time.trim() + " mins</span>";
    });

    return "<div class=\"departure\"><span class=\"stop-name\">" + departure.RouteName + "</span> &nbsp; " + timesMarkup + "</div>";
  },

  getDepartureTimes: function() {
    $.each(departures.data.stops, function(agency, stop) {
      departures.getDepartureTimesByStop(agency, stop);
    });
  },

  getDepartureTimesByStop: function(agency, stop) {
    $.ajax({
      url: "http://transit.511.org/services/providers/GetDepartureTimesByStopCode.aspx",
      type: "GET",
      dataType: "jsonp",
      data: { agencyId: stop.agencyId, stopCode: stop.stopCode },
      success: function(data) {
        departures.showDepartureTimes(agency, data);
      }
    });
  },

  init: function() {
    departures.getDepartureTimes();
  },

  showDepartureTimes: function(agency, data) {
    var stopName = data[0].StopName;

    departures.updateStopName(agency, stopName);
    departures.updateNextDepartures(agency, data);
  },

  updateNextDepartures: function(agency, data) {
    $("#" + agency + "-departures").empty();

    $.each(data, function(index, departure) {
      if(departure.FormattedDepartureTimes != "") {
        $("#" + agency + "-departures").append(departures.getDepartureMarkup(departure));
      }
    });
  },

  updateStopName: function(agency, stopName) {
    $("#" + agency + "-stop-name").html(stopName);
  }
};

setInterval(departures.init(), 10000);
