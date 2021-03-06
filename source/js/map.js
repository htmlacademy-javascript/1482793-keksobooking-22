/* global L:readonly */
/* global _:readonly */

import {enableFilter, setFilterChange, filterAds, setFilterReset} from './filter.js';
import {enableForm, address} from './form.js';
import {createSimilarCard} from './popup.js';
import {getData} from './api.js';
import {showAlert} from './messages.js';

const SIMILAR_ADS_COUNT = 10;

const CREATE_PINS_DELAY = 500;

const initialCoordinates = {
  lat: '35.68951',
  lng: '139.69201',
};

const map = L.map('map-canvas')
  .on('load', () => {
    enableForm();
    address.value = `${initialCoordinates.lat}, ${initialCoordinates.lng}`;
    getData((ads) => {
      createSmallPins(ads);
      enableFilter();
      setFilterReset(() => createSmallPins(ads));
      setFilterChange(_.debounce(
        () => createSmallPins(ads),
        CREATE_PINS_DELAY,
      ));
    }, showAlert);
  })
  .setView({
    lat: initialCoordinates.lat,
    lng: initialCoordinates.lng,
  }, 10);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPin = L.marker(
  {
    lat: initialCoordinates.lat,
    lng: initialCoordinates.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const smallPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

mainPin.addTo(map);

mainPin.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

let smallPins = [];

const createSmallPins = similarAds => {
  smallPins.forEach((pin) => pin.remove());

  similarAds
    .filter(filterAds)
    .slice(0, SIMILAR_ADS_COUNT)
    .forEach((ad) => {
      const smallPin = L.marker(
        {
          lat: ad.location.lat,
          lng: ad.location.lng,
        },
        {
          icon: smallPinIcon,
        },
      );

      smallPin
        .addTo(map)
        .bindPopup(createSimilarCard(ad));

      smallPins.push(smallPin);
    });
};

export {initialCoordinates, mainPin};
