var superagent = require('superagent')


var defaultShopHandler = function(res) {
    res.body.map(shop=>console.log(this.shopCounter++ +'->'+shop.country.id + ':' + shop.branding.name))
    this.getSomeShops(this.shopCounter,this.resHandler,this.errHandler)        
    console.log('send a request with offset ='+this.shopCounter)
}

var defaultOfferHandler = function(res) {
    res.body.map(offer=>console.log(this.offerCounter++ +'->'+offer.id + ':' + offer.heading))
    this.getSomeOffers(this.offerCounter,this.offerHandler,this.errHandler)        
    console.log('send a request with offset ='+this.offerCounter)
}


var defaultErrHandler = function(err) {console.log(err)}




var shopgun = {
    shopCounter:0,
    offerCounter:0,

    query:{r_lat:56.295328, r_lng:10.212781,r_radius:200000,limit:100},

    getSomeShops:function(count,res,err){    
        superagent.get('https://api.etilbudsavis.dk/v2/stores').
        set('offset',count).query(this.query).
        then(this.shopHandler,this.errHandler);
    },
    
    getSomeOffers:function(count,res,err){    
        superagent.get('https://api.etilbudsavis.dk/v2/offers').
        set('offset',count).query(this.query).
        then(this.offerHandler,this.errHandler);
    }
    
}
shopgun.shopHandler=defaultShopHandler.bind(shopgun)
shopgun.errHandler=defaultErrHandler.bind(shopgun)
shopgun.offerHandler=defaultOfferHandler.bind(shopgun)

shopgun.getAllShops = function() {  
    this.getSomeShops(this.shopCounter,this.shopHandler,this.errHandler)
}
shopgun.getAllOffers = function(){
    this.getSomeOffers(this.offerCounter,this.offerHandler,this.errHandler)
}




