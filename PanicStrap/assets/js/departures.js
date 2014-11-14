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

  getDepartureTimes: function() {
    $.each(departures.data.stops, function(agency, stop) {
      departures.getDepartureTimesByStop(stop);
    });
  },

  getDepartureTimesByStop: function(stop) {
    $.ajax({
      url: "http://transit.511.org/services/providers/GetDepartureTimesByStopCode.aspx",
      type: "GET",
      dataType: "jsonp",
      data: { agencyId: stop.agencyId, stopCode: stop.stopCode },
      success: function(data) {
        console.log(data);
      }
    });
  },

  init: function() {
    departures.getDepartureTimes();
  }
};

departures.init();