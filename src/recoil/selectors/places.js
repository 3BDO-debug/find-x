import { selector } from "recoil";
import _ from "lodash";
// atoms
import {
  placesAtom,
  placesFilterAtom,
  placesPagination,
  placesPaginationAtom,
} from "../atoms/places";
import { geoLocationAtom } from "../atoms/map";
// utils
import { distanceFinder } from "src/utils/distanceFinder";

export const mappedPlaces = selector({
  key: "mappedPlaces",
  get: ({ get }) => {
    const geoLocation = get(geoLocationAtom);
    const places = get(placesAtom);
    const placesFilter = get(placesFilterAtom);
    const filteredPlaces = _.filter(
      places,
      (place) => place.category === placesFilter
    );
    const mappedPlacesData = _.map(filteredPlaces, (place) => ({
      ...place,

      distance: distanceFinder(
        geoLocation.latitude,
        place.latitude,
        geoLocation.longitude,
        place.longitude
      ),
    }));
    const orderedMappedPlacesData = _.orderBy(
      mappedPlacesData,
      ["distance"],
      ["asc", "desc"]
    );
    return orderedMappedPlacesData;
  },
});

export const paginatedMappedPlaces = selector({
  key: "paginatedMappedPlaces",
  get: ({ get }) => {
    const mappedPlacesData = get(mappedPlaces);
    const paginationValue = get(placesPaginationAtom);
    return mappedPlacesData.slice(0, paginationValue);
  },
});
