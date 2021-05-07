pragma solidity ^0.5.16;


contract Auction {
    
    uint public productCount = 0;
    
    mapping(uint => Product)public products;
    
    struct User{
        uint id;
        string name;
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
    }
    
    event ProductCreated(
        uint Id,
        string name,
        uint baseprice,
        address owner,
        bool purchased
    );
    
    event bidplaced(
        uint Id,
        string name,
        uint baseprice,
        address payable owner,
        bool purchased,
        uint createdAt,
        uint currentBid,
        address payable currentBidder
        );
        
    event closeauction (
        uint Id,
        string name,
        uint baseprice,
        bool purchased,
        uint currentBid,
        address payable currentBidder
        );
    
    modifier Auctionactive (uint _id){
        require(block.timestamp - products[_id].createdAt <= 1 minutes  );
        _;
    }
    
    
    function createProduct(string memory _name, uint _baseprice) public payable{
        //verify the product
        require(bytes(_name).length > 0);
        require(_baseprice >0);
        //increment productCount

        productCount++;

        //create the product
        products[productCount] = Product(productCount,_name,_baseprice,msg.sender,false, block.timestamp,_baseprice,msg.sender);
       
        //trigger an event
        emit ProductCreated(productCount,_name,_baseprice,msg.sender,false);
    
    }
    
    modifier validAuction(uint _id) {
        products[_id].Id <= productCount;
        _;
    }
    
    function placeBid (uint _id) Auctionactive(_id)
    public payable{
        products[_id].currentBid = products[_id].currentBid + 0.5*1000000000000000000 ;
        products[_id].currentBidder = msg.sender;
        
        emit bidplaced(_id,products[_id].name,products[_id].baseprice,products[_id].owner,products[_id].purchased,block.timestamp,
        products[_id].currentBid,products[_id].currentBidder );
        
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
        _product.owner = msg.sender;
        
        
        // Mark as purchased
        _product.purchased = true;
        
        
        // Update the product
        products[_id] = _product;

        // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
        
        
        emit closeauction(_product.Id,_product.name ,_product.baseprice,true,_product.currentBid, _product.owner  );

    }
    
    
}