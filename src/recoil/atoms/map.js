import { atom } from "recoil";

export const geoLocationAtom = atom({
  key: "geoLocation",
  default: {
    width: 400,
    height: 400,
    latitude: 30.0561,
    longitude: 31.2394,
    zoom: 8,
  },
});
