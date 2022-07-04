import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ReactMapGL, {
  NavigationControl,
  Marker,
  Layer,
  GeolocateControl,
  FlyToInterpolator,
} from "react-map-gl";
import { Icon } from "@iconify/react";
import { useSnackbar } from "notistack";
import closeFill from "@iconify/icons-eva/close-fill";
import _ from "lodash";
import useSupercluster from "use-supercluster";
// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { placesFilterAtom } from "src/recoil/atoms/places";
// material
import { Card, Chip, Paper } from "@mui/material";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import CelebrationIcon from "@mui/icons-material/Celebration";
// atoms
import { geoLocationAtom } from "src/recoil/atoms/map";
import { paginatedMappedPlaces as paginatedMappedPlacesSelector } from "src/recoil/selectors/places";
// components
import { MIconButton } from "../@material-extend";
import { default as CustomMarker } from "./Marker";

// ----------------------------------------------------------

const navControlStyle = {
  right: 10,
  top: 10,
};

// ----------------------------------------------------------

Map.propTypes = {
  singleMode: PropTypes.bool,
  longitude: PropTypes.any,
  latitude: PropTypes.any,
  place: PropTypes.object,
};

function Map({ singleMode, longitude, latitude, place }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const paginatedMappaedPlaces = useRecoilValue(paginatedMappedPlacesSelector);
  const [geoLocation, setGeoLocation] = useRecoilState(geoLocationAtom);
  const [points, setPoints] = useState([]);
  const [placesFilter, setPlacesFilter] = useRecoilState(placesFilterAtom);

  const mapRef = useRef();

  const [mapViewport, setMapViewport] = useState({
    height: 600,
    width: "100%",
    longitude: 30.0561,
    latitude: 31.2394,
    zoom: 5,
  });

  const geolocateControlStyle = {
    right: 10,
    top: 10,
  };

  useEffect(() => {
    setPoints(
      _.map(paginatedMappaedPlaces, (place) => ({
        type: "Feature",
        properties: {
          cluster: false,
          placeId: place.id,
          placeName: place.name,
          placeAddress: place.address,
        },
        geometry: {
          type: "Point",
          coordinates: [
            parseFloat(place.longitude),
            parseFloat(place.latitude),
          ],
        },
      }))
    );
  }, [paginatedMappaedPlaces]);

  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null;

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: mapViewport.zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  useEffect(() => {
    enqueueSnackbar(
      "Please enable location permission to find nearby places.",
      {
        variant: "warning",
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        ),
      }
    );
    if (!singleMode) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setGeoLocation({
            width: "100%",
            height: 400,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 8,
          });
          setMapViewport({
            height: 600,
            width: "100%",
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            zoom: 5,
          });
        });
      } else {
        enqueueSnackbar("Geolocation is not supported with your browser.", {
          variant: "error",
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          ),
        });
      }
    }
  }, [singleMode]);

  const renderClusters = () =>
    clusters.map((cluster) => {
      // every cluster point has coordinates
      const [longitude, latitude] = cluster.geometry.coordinates;
      // the point may be either a cluster or a crime point
      const { cluster: isCluster, point_count: pointCount } =
        cluster.properties;

      // we have a cluster to render
      if (isCluster) {
        return (
          <Marker
            key={`cluster-${cluster.id}`}
            latitude={latitude}
            longitude={longitude}
          >
            <Chip
              icon={
                placesFilter === "workspace" ? (
                  <WorkspacesIcon />
                ) : (
                  <CelebrationIcon />
                )
              }
              label={`Disocver ${
                placesFilter === "workspace" ? "workspaces" : "weeding halls"
              } here`}
              variant="outlined"
              color="primary"
              onClick={() => {
                const expansionZoom = Math.min(
                  supercluster.getClusterExpansionZoom(cluster.id),
                  20
                );

                setMapViewport({
                  ...mapViewport,
                  latitude,
                  longitude,
                  zoom: expansionZoom,
                  transitionInterpolator: new FlyToInterpolator({
                    speed: 2,
                  }),
                  transitionDuration: "auto",
                });
              }}
            />
          </Marker>
        );
      }

      return (
        <Marker
          key={`place-${cluster.properties.placeId}`}
          latitude={latitude}
          longitude={longitude}
        >
          <CustomMarker
            place={{
              id: cluster.properties.placeId,
              title: cluster.properties.placeName,
              address: cluster.properties.placeAddress,
            }}
          />
        </Marker>
      );
    });

  return (
    <Card>
      <ReactMapGL
        mapStyle="mapbox://styles/golfawy/ckvuu5ho33c2f14qn3w3o1zoa?optimize=true"
        mapboxApiAccessToken="pk.eyJ1IjoiZ29sZmF3eSIsImEiOiJja3Z1dDN6MDgxNHg3MnZtOTBoNzFnZGxmIn0.mHhK6VyIypZqJNl6_W2ZJA"
        {...mapViewport}
        onViewportChange={(nextViewport) => setMapViewport(nextViewport)}
        ref={mapRef}
      >
        <NavigationControl style={navControlStyle} />
        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />
        {!singleMode ? (
          renderClusters()
        ) : (
          <Marker
            longitude={parseFloat(longitude)}
            latitude={parseFloat(latitude)}
          >
            <CustomMarker place={place} />
          </Marker>
        )}
      </ReactMapGL>
    </Card>
  );
}

export default Map;
