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
        require(block.timestamp - products[_id].createdAt <= 3600  );
        _;
    }
    
    modifier validBid(uint _id, uint _bid){
        require (_bid > products[_id].currentBid);
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
    
    function placeBid (uint _id, uint _bid, address payable _buyer) validBid(_id, _bid) Auctionactive(_id)
    public payable{
        products[_id].currentBid = _bid;
        products[_id].currentBidder = _buyer;
        
        emit bidplaced(_id,products[_id].name,products[_id].baseprice,products[_id].owner,products[_id].purchased,block.timestamp,
        products[_id].currentBid,products[_id].currentBidder );
        
    }
    
    function closeAuction(uint _id) Auctionactive(_id) validAuction(_id) public payable {
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
        
        
        emit closeauction(_product.Id,_product.name ,_product.baseprice,true,_product.currentBid,msg.sender );

    }
    
    
}