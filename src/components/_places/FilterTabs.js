import React, { useState } from "react";
// recoil
import { useRecoilState } from "recoil";
// material
import { Tabs, Tab, Slide } from "@mui/material";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import CelebrationIcon from "@mui/icons-material/Celebration";
// atoms
import { placesFilterAtom } from "src/recoil/atoms/places";

// ----------------------------------------------------------------------

function FilterTabs() {
  const [placesFilter, setPlacesFilter] = useRecoilState(placesFilterAtom);

  const handleTabsChange = (event, newValue) => {
    setPlacesFilter(newValue);
  };

  return (
    <Tabs
      value={placesFilter}
      onChange={handleTabsChange}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="categories tabs"
    >
      <Tab
        label="Workspaces"
        icon={
          <Slide in={placesFilter === "workspace"} direction="up">
            <WorkspacesIcon />
          </Slide>
        }
        value="workspace"
      />

      <Tab
        label="Weeding halls"
        icon={
          <Slide in={placesFilter === "weeding-hall"} direction="up">
            <CelebrationIcon />
          </Slide>
        }
        value="weeding-hall"
      />
    </Tabs>
  );
}

export default FilterTabs;
