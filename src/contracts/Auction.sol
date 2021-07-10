pragma solidity ^0.5.16;
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
    
    modifier Auctionactive (uint _id){
        require(block.timestamp - products[_id].createdAt <= 1 minutes  );
        _;
    }

    function createUser(string memory _name,string memory _email,string memory _address,string memory _productname) public {
        usercount++;
        user[usercount] = User(usercount,_productname,_name,_email,_address);
    }

    
    
    function createProduct(string memory _name, uint _baseprice, string memory _discription, string memory _category, string memory _publickey, uint _bidinc) public payable{
        //verify the product
        require(bytes(_name).length > 0);
        require(_baseprice >0);
        //increment productCount

        productCount++;
        products[productCount].Id = productCount;
        products[productCount].name =_name;
        products[productCount].baseprice =_baseprice;
        products[productCount].owner =msg.sender;
        products[productCount].purchased =false;
        products[productCount].createdAt =block.timestamp;
        products[productCount].currentBid =_baseprice;
        products[productCount].currentBidder =msg.sender;
        products[productCount].currentbidtime =block.timestamp;
        products[productCount].infoArray.discription =_discription;
        products[productCount].infoArray.category =_category;
        products[productCount].bidcount = 0;
        products[productCount].publickey = _publickey;
        products[productCount].infoArray.bidinc = _bidinc;

        //create the product
        //products[productCount] = Product(productCount,_name,_baseprice,msg.sender,false, block.timestamp,_baseprice,msg.sender,block.timestamp, _discription,0, _category);
       
        //trigger an event
        emit ProductCreated(productCount,_name,_baseprice,msg.sender,false,_discription,0, _category);
    
    }
    
    modifier validAuction(uint _id) {
        products[_id].Id <= productCount;
        _;
    }

    modifier validbid(uint _id){
        require (block.timestamp - products[_id].currentbidtime >= 15 seconds);
        _;
    }


    function checkvalidity (address payable _owner, address payable _account ) public returns (bool){

        require(_owner == _account);


        return true;
    }
    
    function placeBid (uint _id) Auctionactive(_id) validbid(_id)
    public payable{
        products[_id].currentBid = products[_id].currentBid + (products[productCount].infoArray.bidinc) ;
        products[_id].currentBidder = msg.sender;
        products[_id].currentbidtime = block.timestamp;
        products[_id].bidcount = products[_id].bidcount + 1;
    
        
        emit bidplaced(_id,products[_id].name,products[_id].baseprice,products[_id].owner,products[_id].purchased,block.timestamp,
        products[_id].currentBid,products[_id].currentBidder,products[_id].bidcount, products[_id].infoArray.category  );
        
    }

    function Auctionstatus(uint _id) public returns(bool){
        if (block.timestamp - products[_id].createdAt < 1 minutes){
            return true;
        }
        else{
            return false;
        }
    }
    
    function closeAuction(uint _id) validAuction(_id) public payable {

         if (Auctionstatus(_id)){
            return;
        }
        require(block.timestamp - products[_id].createdAt >= 1 minutes  );

        //fetch the product
        Product memory _product = products[_id];
        
        //fetch the owner
        address payable _seller = _product.owner;
        
        // Require that there is enough Ether in the transaction
        require(msg.value >= _product.currentBid);
        
         // Require that the product has not been purchased already
        require(!_product.purchased);
        
         // Require that the buyer is not the seller
        require(_seller != msg.sender);

        // Transfer ownership to the buyer
        //_product.owner = msg.sender;
        
        
        // Mark as purchased
        _product.purchased = true;
        
        
        // Update the product
        products[_id] = _product;

        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
        
        
        emit closeauction(_product.Id,_product.name ,_product.baseprice,true,_product.currentBid, _product.owner,products[_id].bidcount ,products[_id].infoArray.category);

    }
    
    
}