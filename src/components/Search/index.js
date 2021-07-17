import React , {useState ,useEffect} from 'react'
import Card from "../Posts";
import styles from "./search.module.css"
import {CardDeck} from 'react-bootstrap'
import Dropdown from 'react-multilevel-dropdown';

function SearchPg(props) {
  var term = window.location.pathname.split('=');
  term = term[1];
  const [searchTerm, setSearchTerm] = useState(term);
  const [searchResults, setSearchResults] = useState(props.products);
  const handleInputChange = e => {
    setSearchTerm(e.target.value);
  }



 function change() {
  const results =props.products.filter(function(l) {
    return( l.name.toLowerCase().match(searchTerm))
  });
  return results;
 }
  useEffect(() => {
    const results =props.products.filter(function(l) {
      return( l.name.toLowerCase().match(searchTerm))
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
            img={`https://ipfs.infura.io/ipfs/${props.hashes[key]}`}
          />
  </div>
      );
            })}
            
  </CardDeck>
   
  )
}

  console.log(searchTerm);
  return (
    <div className="container">
        <h2>Search </h2>
      <form className="row">
        <div className="col-md-4 my-2 "> 
          </div>
        <div  className="col-md-4 ">
        <input
            className={styles.Searchbar + " form-control mx-auto my-2"}
            placeholder="Search for..."
            onChange={handleInputChange}
            value={searchTerm}
          />
        </div>
          <div className="col-md-4 my-2 ">
       
          </div>
          
        </form>
         {
           searchTerm ? <RenderResults Array = {change()} />
              : <RenderResults Array= {searchResults} />  
         }
        </div>
  )
}

export default SearchPg
