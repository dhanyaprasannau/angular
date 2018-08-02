$(function () {
  jQuery.support.cors = true;

  var data = {};
  // Start loading data simultaneously
  $.when(
    // Load the GeoJSON that contains the zipcode boundaries
    $.getJSON("http://localhost:4200/assets/json/zipcode_bound_geoJson.json", function (json) {
      data["zipcode_bound_geoJson"] = json;
    }).fail(function (response) {
      console.log("server error when loading zip code bound GeoJson: ", response);
    }),
    // Load the table that maps zipcodes, bounds, and center positions
    $.getJSON("http://localhost:4200/assets/json/zipcode_bound_info.json", function (json) {
      data["zipcode_bound_info"] = json["data"];
    }).fail(function (response) {
      console.log("server error when loading zipcode bound information:", response);
    }),
    // Load metadata
   
    $.getJSON("http://localhost:4200/assets/json/zipcode_metadata.json", function (json) {
      data["zipcode_metadata"] = json;
    }).fail(function (response) {
      console.log("server error when loading zipcode metadata:", response);
    })
  ).then(function () {
    init(data);
  });

});
function init(data) {
  var zipcode_metadata = data["zipcode_metadata"];

  // Create the geo heatmap object
  var settings_1 = {
    zipcode_bound_geoJson: data["zipcode_bound_geoJson"],
    zipcode_bound_info: data["zipcode_bound_info"],
    zipcode_metadata: zipcode_metadata,
    threshold_metadata: 0,
    lambda: 0.5
  };
  geo_heatmap_1 = new edaplotjs.GeoHeatmap("#map-container-1", settings_1);

  // Create the geo heatmap object
  var color_scale = d3.scale.linear().domain([0, 0.33, 0.66, 1]).range(["#00a511", "#fff200", "#ff6200", "#ff0000"]).interpolate(d3.interpolateLab);
  var settings_2 = {
    zipcode_bound_geoJson: data["zipcode_bound_geoJson"],
    zipcode_bound_info: data["zipcode_bound_info"],
    zipcode_metadata: zipcode_metadata,
    color_scale: color_scale,
    max_percentile: 0.99,
    min_percentile: 0.05,
    info_window_html_layout: function (zipcode) {
      var html = "";
      html += "<table>";
      html += "  <tr>";
      html += "    <td>Zipcode: " + zipcode + "</td>";
      html += "  </tr>";
      html += "  <tr>";
      html += "    <td>My Data: " + zipcode_metadata[zipcode] + "</td>";
      html += "  </tr>";
      html += "</table>";
      return html;
    },
    mouseover_callback: function (zipcode) {
      console.log("mouseover on zipcode: " + zipcode);
    },
    mouseout_callback: function (zipcode) {
      console.log("mouseout on zipcode: " + zipcode);
    },
    info_window_domready_callback: function (zipcode) {
      console.log("info window domready for zipcode: " + zipcode);
    },
    info_window_closeclick_callback: function (zipcode) {
      console.log("info window closeclick for zipcode: " + zipcode);
    }
  };
  //geo_heatmap_2 = new edaplotjs.GeoHeatmap("#map-container-2", settings_2);
  //color_legned_2 = new edaplotjs.ColorScaleLegend("#color-legend-container-2", {color_scale: color_scale});
}

