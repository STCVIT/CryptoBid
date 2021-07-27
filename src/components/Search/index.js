import React, { useState, useEffect } from "react";
import Card from "../Posts";
import styles from "./search.module.css";
import { CardDeck } from "react-bootstrap";
import Dropdown from "react-multilevel-dropdown";
import "./stl.css";
function SearchPg(props) {
  console.log(props.products)
  var Arr = [...props.products];
  var term = window.location.pathname.split("=");
  term = term[1];
  const [searchTerm, setSearchTerm] = useState(term);
  const [searchResults, setSearchResults] = useState(Arr);
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const [filter, setFilter] = useState(0);

  function RenderOne(props) {
    return (
      <Dropdown.Item className={styles.Filter}>
        {props.Name}
        <Dropdown.Submenu className={styles.Filter}>
          <Dropdown.Item
            className={styles.Filter}
            onClick={() => {
              if (props.Name === "Price") {
                setFilter(1);
              } else if (props.Name === "Popularity") {
                setFilter(3);
              }
            }}
          >
            Low to High
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              if (props.Name === "Price") {
                setFilter(2);
              } else if (props.Name === "Popularity") {
                setFilter(4);
              }
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
        <Dropdown className={styles.Filter + " btn"} title="Filter">
          <RenderOne Name="Price" />
          <RenderOne Name="Popularity" />
        </Dropdown>
      </>
    );
  }
  function SortList(Arr, filter) {
    if (filter === 1) {
      Arr = Arr.sort((a, b) => {
        const diff = parseInt(a.currentBid) - parseInt(b.currentBid);
        if (diff === 0) return 0;
        const sign = Math.abs(diff) / diff;
        return sign;
      });
    }
    if (filter === 2) {
      Arr = Arr.sort((a, b) => parseInt(b.currentBid) - parseInt(a.currentBid));
    }
    if (filter === 3) {
      console.log(filter);
      Arr = Arr.sort((a, b) => parseInt(a.bidcount) - parseInt(b.bidcount));
      console.log(Arr);
    }
    if (filter === 4) {
      Arr = Arr.sort((a, b) => parseInt(b.bidcount) - parseInt(a.bidcount));
      console.log(Arr);
    }
    return Arr;
  }
  useEffect(() => {
    console.log(filter);
    setSearchResults(SortList(props.products, filter));
    setFilter(0);
  }, [filter, searchResults]);

  function change() {
    const results = Arr.filter(function(l) {
      console.log(searchTerm);
      return l.name.toString().toLowerCase().match(searchTerm);
    });
    console.log(results);
    return results;
  }
  useEffect(() => {
    const results = Arr.filter(function(l) {
      return l.name.toString().toLowerCase().match(searchTerm);
    });
    setSearchResults(results);
  }, [searchTerm]);

  function RenderResults(prop) {
    return (
      <CardDeck>
        {prop.Array.map((product, key) => {
          return (
            <div className="my-2 col-12 col-md-4 col-sm-12">
              <Card
                Id={parseInt(product.Id)}
                Name={product.name}
                Hbid={window.web3.utils.fromWei(
                  product.currentBid.toString(),
                  "Ether"
                )}
                discription={product.infoArray.discription}
                img={`https://ipfs.infura.io/ipfs/${product.infoArray.hash}`}
              />
            </div>
          );
        })}
      </CardDeck>
    );
  }

  console.log(searchTerm);
  return (
    <div className="container">
      <h2>Search </h2>
      <form className="row">
        <div className="col-md-4 my-2 "></div>
        <div className="col-md-4 ">
          <input
            className={styles.Searchbar + " form-control mx-auto my-2"}
            placeholder="Search for..."
            onChange={handleInputChange}
            value={searchTerm}
          />
        </div>
        <div className="col-md-4 my-2 ">
          <SortDropdown />
        </div>
      </form>
      {searchTerm ? (
        <RenderResults Array={change()} />
      ) : (
        <RenderResults Array={searchResults} />
      )}
    </div>
  );
}

export default SearchPg;
