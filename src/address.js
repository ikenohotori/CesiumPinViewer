function getLongitude(AdressText) {
    return new Promise((resolve,reject) =>{
        try
        {
            const uri = 'https://msearch.gsi.go.jp/address-search/AddressSearch?q=' + AdressText;
            const encodedurl = encodeURI(uri);
            fetch(encodedurl)
            .then(response => response.json())
            .then((data) => {  
                // 経度, 緯度
                LongitudeInfo = {
                    "longitude" :data[0].geometry.coordinates[0],
                    "latitude" :data[0].geometry.coordinates[1]
                }
                return resolve(LongitudeInfo);
            })
            .catch(err =>{
                return reject(err);
            });
        }
        catch(err)
        {
            console.log(err)
        }
    })
}

module.exports = { 
    getLongitude
}