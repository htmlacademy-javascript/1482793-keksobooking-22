/* global L:readonly */

import {enableFilter, setFilterChange, filterAds, setFilterReset} from './filter.js';
import {enableForm, ADDRESS} from './form.js';
import {createSimilarCard} from './popup.js';
import {getData} from './api.js';
import {showAlert} from './messages.js';

const INITIAL_COORDINATES = {
  lat: '35.68951',
  lng: '139.69201',
};

const SIMILAR_ADS_COUNT = 10;

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

const SMALL_PIN_ICON = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

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

let smallPins = [];

const createSmallPins = similarAds => {
  smallPins.forEach((pin) => pin.remove());

  similarAds
    .slice()
    .filter(filterAds)
    .slice(0, SIMILAR_ADS_COUNT)
    .forEach((ad) => {
      const SMALL_PIN = L.marker(
        {
          lat: ad.location.lat,
          lng: ad.location.lng,
        },
        {
          icon: SMALL_PIN_ICON,
        },
      );

      SMALL_PIN
        .addTo(MAP)
        .bindPopup(createSimilarCard(ad));

      smallPins.push(SMALL_PIN);
    });
};

getData((ads) => {
  createSmallPins(ads);
  setFilterReset(() => createSmallPins(ads));
  setFilterChange(() => createSmallPins(ads));
}, showAlert);

export {INITIAL_COORDINATES, MAIN_PIN, smallPins};
