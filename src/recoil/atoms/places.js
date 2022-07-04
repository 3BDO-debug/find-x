import { atom } from "recoil";

export const placesAtom = atom({
  key: "places",
  default: [],
});

export const placesImagesAtom = atom({
  key: "placesImages",
  default: [],
});

export const placesFilterAtom = atom({
  key: "placeFilter",
  default: "workspace",
});

export const placesPaginationAtom = atom({
  key: "placesPagination",
  default: 10,
});
