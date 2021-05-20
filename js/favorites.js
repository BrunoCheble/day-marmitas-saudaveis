const myfavorites = {
    id: 'favorites',
    getFavorites: function() 
    {
        if (localStorage.getItem(this.id) == null) {
            localStorage.setItem(this.id,'');
        }

        let favorites = localStorage.getItem(this.id);

        if (favorites == null || favorites == '') {
            favorites = [];
        }
        else {
            favorites = favorites.split(',');
        }

        return favorites;
    },
    getIndexFavoriteProduct: function(product_id) 
    {        
        return this.getFavorites().indexOf(String(product_id));
    },
    existFavoriteProduct: function(product_id) 
    {        
        return this.getIndexFavoriteProduct(product_id) > -1;
    },
    saveStorage: function(favorites)
    {
        localStorage.setItem(this.id, favorites);
    },
    removeFavoriteProduct: function(product_id) 
    {
        const index = this.getIndexFavoriteProduct(product_id);
        if (index > -1) {
            let favorites = this.getFavorites()
            favorites.splice(index, 1);
            this.saveStorage(favorites);
        }
    },
    addFavoriteProduct: function(product_id) 
    {
        if (!this.existFavoriteProduct(product_id)) {
            let favorites = this.getFavorites();
            favorites.push(String(product_id));
            this.saveStorage(favorites);
        }
    },
    updateFavorites: function(product_id) 
    {
        if (this.existFavoriteProduct(product_id)) {
            this.removeFavoriteProduct(product_id);
        }
        else {
            this.addFavoriteProduct(product_id);
        }
    },
    getTotalFavorites: function() {
        return this.getFavorites().length;
    },
    sendFavoriteToWhastapp: function() {
        const number = '+5521971560455';
        const link = window.location.origin+'/favorites.html?f='+this.getFavorites();
        
        var url = 'https://api.whatsapp.com/send?phone=' 
           + number 
           + '&text=' 
           + encodeURIComponent(link)
        
        window.open(url);
    },
    sendProductToWhastapp: function(product_name) {
        const number = '+5521971560455';
        const link = window.location.origin+'/favorites.html?f='+this.getFavorites();
        product_name = product_name + ' : ';

        var url = 'https://api.whatsapp.com/send?phone=' 
           + number 
           + '&text=' 
           + product_name
           + encodeURIComponent(link)
        
        window.open(url);
    }
}