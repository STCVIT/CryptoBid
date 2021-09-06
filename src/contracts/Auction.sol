pragma solidity ^0.8.4;
pragma experimental ABIEncoderV2;
contract Auction {

    string[] public arrayhashes;


    uint public productCount = 0;
    uint public usercount = 0;
    string hash;

     function set(string memory _hash) public {
        hash = _hash;
        arrayhashes.push(_hash);
    }

    //read function
    function get() public view returns (string memory) {
    return hash;
  }
    
    mapping(uint => Product) public products;
    mapping(uint => User)public user;

    struct User{
        uint id;
        string productname;
        string name;
        string email;
        string addres;
        string location;
        
    }
   
    struct Product {
        uint Id;
        string name;
        uint baseprice;
        address payable owner;
        bool purchased;
        uint createdAt;
        uint currentBid;
        address payable currentBidder;
        uint currentbidtime;
        Information infoArray;
        uint bidcount;
        string publickey;
    }

    struct Information {
        string discription;
        string category;
        uint bidinc;
        uint endtime;
        string hash;
        bool claimed;
        
    }
    
    event ProductCreated(
        uint Id,
        string name,
        uint baseprice,
        address owner,
        bool purchased,
        string discription,
        uint bidcount,
        string category
    );
    
    event bidplaced(
        uint Id,
        string name,
        uint baseprice,
        address payable owner,
        bool purchased,
        uint createdAt,
        uint currentBid,
        address payable currentBidder,
        uint bidcount,
        string category
        );
        
    event closeauction (
        uint Id,
        string name,
        uint baseprice,
        bool purchased,
        uint currentBid,
        address payable currentBidder,
        uint bidcount,
        string category
        );
        
    event ProductEvent (Product);
    
    modifier Auctionactive (uint _id){
        require(block.timestamp - products[_id].createdAt <= 200  );
        _;
    }

    function createUser(string memory _name,string memory _email,string memory _address,string memory _location ,string memory _productname) public {
        usercount++;
        user[usercount] = User(usercount,_productname,_name,_email,_address, _location);
    }

    function createProduct(string memory _name, uint _baseprice, string memory _discription, string memory _category, string memory _publickey, uint _bidinc, uint _etime, string memory _hash) public payable{
        //verify the product
        require(bytes(_name).length > 0);
        require(_baseprice >0);
        //increment productCount

        productCount++;
        products[productCount].Id = productCount;
        products[productCount].name =_name;
        products[productCount].baseprice =_baseprice;
        products[productCount].owner = payable(msg.sender);
        products[productCount].purchased =false;
        products[productCount].createdAt =block.timestamp*1000;
        products[productCount].currentBid = _baseprice ;
        products[productCount].currentBidder = payable(0);
        products[productCount].currentbidtime =block.timestamp*1000;
        products[productCount].infoArray.discription =_discription;
        products[productCount].infoArray.category =_category;
        products[productCount].bidcount = 0;
        products[productCount].publickey = _publickey;
        products[productCount].infoArray.bidinc = _bidinc;
        products[productCount].infoArray.endtime =  _etime;
        products[productCount].infoArray.hash = _hash;
        products[productCount].infoArray.claimed = false;
        
        //create the product
        //products[productCount] = Product(productCount,_name,_baseprice,msg.sender,false, block.timestamp,_baseprice,msg.sender,block.timestamp, _discription,0, _category);
       
        //trigger an event
        //emit ProductCreated(productCount,_name,_baseprice,msg.sender,false,_discription,0, _category);
        
        emit ProductEvent(products[productCount]);
    
    }
    
    modifier validAuction(uint _id) {
        products[_id].Id <= productCount;
        _;
    }

    modifier validbid(uint _id){
        require (block.timestamp*1000 - products[_id].currentbidtime >= 15 seconds);
        _;
    }


    function checkvalidity (address payable _owner, address payable _account ) public returns (bool){

        require(_owner == _account);


        return true;
    }
    
    function placeBid (uint _id)  payable public{
        
        Product storage product = products[_id];

        //difference between bids should be greater than 15 seconds
        require(block.timestamp*1000 - product.currentbidtime >= 15 seconds, "abcd");
        
        require(block.timestamp*1000 < product.infoArray.endtime , "efg");
        
         // bid should be greater than minPrice
        require(msg.value>=product.baseprice,"bid value shouldn't be less than the reserve value");
        
        // you should not be the last bidder , no point in outdoing your own bid
        require(msg.sender != product.currentBidder,"bidder can't out so their own bid");
        
        // the incoming value should be greater than previous bid
        require(msg.value >= product.currentBid,"big value not greater than previous bid"); 
        
        
        
        if(product.currentBid>0){
            product.currentBidder.transfer(product.currentBid -    (product.infoArray.bidinc)  );
        }
        
        product.currentBid =  product.currentBid +   (product.infoArray.bidinc)   ;
        
        

        
        product.currentBidder = payable(msg.sender);
        product.currentbidtime = block.timestamp*1000;
        product.bidcount = products[_id].bidcount + 1;
        
        
        emit ProductEvent(product);
    
        
        //emit bidplaced(_id,products[_id].name,products[_id].baseprice,products[_id].owner,products[_id].purchased,block.timestamp,
        //products[_id].currentBid,products[_id].currentBidder,products[_id].bidcount, products[_id].infoArray.category  );
        
    }
    
    function closeAuction(uint _id) payable public  {
        //require(block.timestamp - products[_id].createdAt >= 120, "auction not ended"  );

         Product storage product = products[_id];
        
        //bidding time
        require(product.infoArray.endtime < block.timestamp*1000,"bidding for product is not over yet");
        
        //claimer must be bidder
        
        require(msg.sender == product.currentBidder,"you are not eligible to claim this product");
        
        product.currentBid = product.currentBid  -   (product.infoArray.bidinc) ;
        
        // money sent to seller
        product.owner.transfer(product.currentBid);
        
        // set product status sold to true
        product.purchased = true;
        
        
        emit ProductEvent(product);
         
        
        
        //emit closeauction(_product.Id,_product.name ,_product.baseprice,true,_product.currentBid, _product.owner,products[_id].bidcount ,products[_id].infoArray.category);

    }
    
    
     function closeAuctionOwner(uint _id) payable public  {

         Product storage product = products[_id];
        
        //claimer must be owner
        
        require(msg.sender == product.owner,"you are not eligible to close this auction");
        
        product.currentBid = product.currentBid  -   (product.infoArray.bidinc) ;
        
        // money sent to seller
        product.owner.transfer(product.currentBid);
        
        // set product status sold to true
        product.purchased = true;
        
        
        emit ProductEvent(product);
         
        
        
        //emit closeauction(_product.Id,_product.name ,_product.baseprice,true,_product.currentBid, _product.owner,products[_id].bidcount ,products[_id].infoArray.category);

    }

    
    function getnow()view public returns(uint) {
        return block.timestamp*1000;
    }
    
}