window.addEventListener("load", () => {

searchButton = document.querySelector('#search-button');
searchBar = document.querySelector('#search-bar');
resultImages = document.querySelectorAll('.result-images')

var url = 'https://images-api.nasa.gov/search?q='

const requestOptions = {

    method: 'GET',
    headers: {'Content-Type' : 'application/json'},

}

searchButton.addEventListener("click", () => {

    var query = searchBar.value;

    var encodedURI = url + encodeURIComponent(query) + '&media_type=image';
    
    console.log('searching at: ' + encodedURI);

    fetch(encodedURI,requestOptions)
    .then(res => res.json())
    .then(data => {


        console.log(data.status)
        console.log(data)

        search(data);


    })

    function search(data){

        var path;

        for(i=0;i<resultImages.length;i++){

            path = data.collection.items[i].links[0].href

            resultImages[i].src = path;

    


        }


    }






})









})