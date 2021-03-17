mapboxgl.accessToken = 'pk.eyJ1IjoibWlzc2lvbndlc3QiLCJhIjoiY2ttM3BwdzY5MGFxdjJ4bGNsMmRjbzBvOSJ9.Buj5HQ5xicXVYD2EIb-hCA';
   
   
   
   const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/missionwest/ckmdml62726ck17rtf55fx1ia',
      center: [-117.41,47.64],
      zoom: 6,

    })

    // Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
   closeButton: false,
   closeOnClick: false
   });
    
   map.on('mouseenter', 'Growers', function (e) {
      var features = map.queryRenderedFeatures(e.point, {
         layers: ['Growers'] // replace this with the name of the layer
       });
     
       if (!features.length) {
         return;
       }
     
       var feature = features[0];
   // Change the cursor style as a UI indicator.
   map.getCanvas().style.cursor = 'pointer';
    
   var coordinates = e.features[0].geometry.coordinates.slice();
   var description = e.features[0].properties.description;
    
   // Ensure that if the map is zoomed out such that multiple
   // copies of the feature are visible, the popup appears
   // over the copy being pointed to.
   while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
   coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
   }
    
   // Populate the popup and set its coordinates
   // based on the feature found.
   popup.setLngLat(coordinates).setHTML('<h3>' + feature.properties.Farm + '</h3>').addTo(map);
   });
    
   map.on('mouseleave', 'Growers', function () {
   map.getCanvas().style.cursor = '';
   popup.remove();
   });
