/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZHRsdWF0MjU5IiwiYSI6ImNsNnRiNHJlYTA1cmEzamxwYXpjZW1xYXoifQ.YChY0XgJcVJ81CRvsgl3gQ';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/dtluat259/cl6tbrwb0000t14lfaonb7fa8',
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      focusAfterOpen: false,
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>${loc.description} </p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
