/* global L:readonly */

import {enableFilter} from './filter.js';
import {enableForm, ADDRESS} from './form.js';
import {SIMILAR_ADS, createSimilarCard} from './popup.js';

const INITIAL_COORDINATES = {
  lat: '35.68951',
  lng: '139.69201',
};

const MAP = L.map('map-canvas')
  .on('load', () => {
    enableFilter();
    enableForm();
    ADDRESS.value = `${INITIAL_COORDINATES.lat}, ${INITIAL_COORDINATES.lng}`;
  })
  .setView({
    lat: INITIAL_COORDINATES.lat,
    lng: INITIAL_COORDINATES.lng,
  }, 10);

const MAIN_PIN_ICON = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const MAIN_PIN = L.marker(
  {
    lat: INITIAL_COORDINATES.lat,
    lng: INITIAL_COORDINATES.lng,
  },
  {
    draggable: true,
    icon: MAIN_PIN_ICON,
  },
);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(MAP);

MAIN_PIN.addTo(MAP);

MAIN_PIN.on('moveend', (evt) => {
  ADDRESS.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

SIMILAR_ADS.forEach((ad) => {
  const SMALL_PIN_ICON = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const SMALL_PIN = L.marker(
    {
      lat: ad.location.x,
      lng: ad.location.y,
    },
    {
      SMALL_PIN_ICON,
    },
  );

  SMALL_PIN
    .addTo(MAP)
    .bindPopup(createSimilarCard(ad));
});
