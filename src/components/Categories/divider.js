import React from 'react'
import Categories from "./index.js"
import Mobileview from './Cat_mobview.js'
function Divider(props) {
    
      const viewportContext = React.createContext({});
      const ViewportProvider = ({ children }) => {
        const [width, setWidth] = React.useState(window.innerWidth);
        const [height, setHeight] = React.useState(window.innerHeight);
        const handleWindowResize = () => {
          setWidth(window.innerWidth);
          setHeight(window.innerHeight);
        };
      
        React.useEffect(() => {
          window.addEventListener("resize", handleWindowResize);
          return () => window.removeEventListener("resize", handleWindowResize);
        }, []);
        return (
          <viewportContext.Provider value={{ width, height }}>
            {children}
          </viewportContext.Provider>
        );
      };
      const useViewport = () => {
        const { width, height } = React.useContext(viewportContext);
        return { width, height };
      }
      const MyComponent = () => {
        const { width } = useViewport();
        const breakpoint = 992;
      
      return width > breakpoint ?<Categories products={props.products} hashes={props.hashes} account={props.account} placeBid={props.placeBid} closeAuction={props.closeAuction} />:
      <Mobileview  products={props.products} hashes={props.hashes} account={props.account} placeBid={props.placeBid} closeAuction={props.closeAuction}  />
      }
       
       
      return (
        <ViewportProvider>
          <MyComponent />
        </ViewportProvider>
      );
}
export default Divider

