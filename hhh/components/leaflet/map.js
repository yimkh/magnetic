import React, { useEffect } from 'react'
import L from 'leaflet'
import paper from 'paper'

const LeafletMap = () => {
  useEffect(() => {
    const map = L.map('map').setView([39.9042, 116.4074], 12)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(map)

    var popup = L.popup()

    function onMapClick(e) {
      popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);

        var circle = L.circle(e.latlng, {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 500
      }).addTo(map)
    }
    
    map.locate({
      setView: true,
      maxZoom: 16
    });

    map.on('locationfound', function(e) {
      var radius = e.accuracy / 2;
      L.marker(e.latlng).addTo(m).bindPopup("你就在这个圈内");
      L.circle(e.latlng, radius).addTo(m);
    });
    
    map.on('locationerror', function(e) {
      console.log('定位出错=====>', e);
    });
  
    map.on('click', onMapClick)

    map.on('click', )
  }, [])

  console.log(`${window.innerHeight}`)

  return (
    <div id="map">
      <style jsx>{`
        #map {
          width: 100%;
          height: ${window.innerHeight}px;
        }
      `}</style>
    </div>
  )
}

export default LeafletMap
