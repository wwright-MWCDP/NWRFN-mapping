mapboxgl.accessToken = 'pk.eyJ1IjoibWlzc2lvbndlc3QiLCJhIjoiY2ttM3BwdzY5MGFxdjJ4bGNsMmRjbzBvOSJ9.Buj5HQ5xicXVYD2EIb-hCA';
   
   const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/missionwest/ckmyeykto1fsh17v0fx869hjv',
      center: [-117.41,47.64],
      bounds:[-124.82399,46.28506,-111.19693,49.27811],

    })

    map.on('load', function(){
      map.addSource('farm-locations',{
          type:'vector',
          url:'mapbox://missionwest.7jf9rhsz',
          promoteId:'id',
       });
       map.addLayer({
          'id':'Growers',
          'type': 'circle',
          'source':'farm-locations',
          'source-layer':'Farm_Locations-7oi4jd',
          'paint':{
             'circle-radius':[
                'match',
                ['get', 'category'],
                'Farm',
                4,
                'Producer',
                4,
                'Hub',
                7,
                4
             ],
             'circle-color':[
                'match',
                ['get','category'],
                'Farm',
                '#1D658D',
                'Producer',
                '#155F51',
                'Hub',
                '#8C3A40',
                '#000000'
             ],
             'circle-stroke-color':[
                'match',
                ['get','category'],
                'Farm',
                '#254E69',
                'Producer',
                '#173933',
                'Hub',
                '#662b30',
                '#000000'
             ]
          }

       });
       map.addSource('hub-connections',{
          type:'vector',
          url:'mapbox://missionwest.15ncccar'
       });
       map.addLayer({
          'id':'connections',
          'type':'line',
          'source' :'hub-connections',
          'source-layer':'hub-farm_connections-0hackt',
          'layout':{
             'line-cap':'round'
          },
          'paint': {
             'line-opacity':.5,
             'line-color': '#254E69'
          }
       });
    });
    
    

    // Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
   closeButton: false,
   closeOnClick: true
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
   var logo = e.features[0].properties.logo;
   var web =  e.features[0].properties.web;
    
   // Ensure that if the map is zoomed out such that multiple
   // copies of the feature are visible, the popup appears
   // over the copy being pointed to.
   while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
   coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
   }
    
   // Populate the popup and set its coordinates
   // based on the feature found.
   popup.setLngLat(coordinates).setHTML(
      '<a href='+ web + ' target="_blank" rel="noreferrer noopener"><div>'
      +'<img src='+ logo +' class="center" width=75vw";></img></div>'
      +'<p class=farmTitle >'
      + feature.properties.farm + '</p></a>'      
      )
   popup.addTo(map);
   });
    
   map.on('click', 'Growers', function () {
   map.getCanvas().style.cursor = '';
   popup.remove();
   });
