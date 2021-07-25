import React, { useState } from "react";
import Dropdown from "react-multilevel-dropdown";

function RenderOne(props) {
  var [filter, setFilter] = useState("");
  return (
    <Dropdown.Item>
      {props.Name}
      <Dropdown.Submenu>
        <Dropdown.Item
          onClick={() => {
            props.Name === "Price" ? setFilter(1) : setFilter(3);
          }}
        >
          Low to High
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            props.Name === "Price" ? setFilter(2) : setFilter(4);
          }}
        >
          High to Low
        </Dropdown.Item>
      </Dropdown.Submenu>
    </Dropdown.Item>
  );
}

function SortDropdown() {
  return (
    <>
      <Dropdown title="Filter">
        <RenderOne Name="Price" />
        <RenderOne Name="Popularity" />
      </Dropdown>
    </>
  );
}
export default SortDropdown;
