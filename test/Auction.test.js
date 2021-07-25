const { assert, should } = require("chai");

// const { default: it } = require("date-fns/esm/locale/it/index.js");
// const { default: it } = require("date-fns/esm/locale/it/index.js");

var Auction = artifacts.require("./Auction.sol");

require('chai')
    .use(require('chai-as-promised'))
    .should()



contract('Auction', ([deployer,seller,buyer]) => {
    let auction;
    before(async () => {
        auction = await Auction.deployed()
    })

    describe('deployment', async () => {
        it('it deploys successfully', async () => {
            const address = await auction.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)

        })
       
    })

    describe('products', async () => {
        let result,productCount;

        before(async () => {
            result = await auction.createProduct("iphone",'1000000000000000000','hello','hello','hello','1000000000000000000', '1627058361000', 'ababababba', {from :seller})
            productCount = await auction.productCount()
        })

        it('creates products', async () => {
            assert.equal(productCount, 1)
            //console.log(result.logs[0])
            const event = result.logs[0].args
            assert.equal(event[0].Id , productCount)
            assert.equal(event[0].owner , seller)
            

           //failure product must have a name
           await auction.createProduct("",'1000000000000000000','hello','hello','hello','1000000000000000000', '1626987970000','abaab', {from :seller}).should.be.rejected;
            //failure product must have a name
            await auction.createProduct("iphone",'','hello','hello','hello','1000000000000000000', '1626975189000','aababa', {from :seller}).should.be.rejected;
    
        })

        it('place bid', async () => {
            // let oldSellerBalance = await web3.eth.getBalance(seller)
            // oldSellerBalance = new web3.utils.BN(oldSellerBalance)

            //succcess bidder makes bidder
            result = await auction.placeBid(productCount, {from:buyer , value: '1000000000000000000'   })


            const event = result.logs[0].args
            assert.equal(event[0].currentBid, '2000000000000000000')
            assert.equal(event[0].currentBidder, buyer)
        })

        it('close auction owner', async () => {
            // let oldSellerBalance = await web3.eth.getBalance(seller)
            // oldSellerBalance = new web3.utils.BN(oldSellerBalance)

            //succcess bidder makes bidder
            result = await auction.closeAuctionOwner(productCount, {from:seller })


            const event = result.logs[0].args
            assert.equal(event[0].currentBid, '1000000000000000000')
            assert.equal(event[0].currentBidder, buyer)
        })

        it('close auction ', async () => {
            // let oldSellerBalance = await web3.eth.getBalance(seller)
            // oldSellerBalance = new web3.utils.BN(oldSellerBalance)

            //succcess bidder makes bidder
            result = await auction.closeAuction(productCount, {from: buyer })


            const event = result.logs[0].args
            assert.equal(event[0].currentBid, '1000000000000000000')
            assert.equal(event[0].currentBidder, buyer)
        })
    })
} )