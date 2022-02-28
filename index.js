window.addEventListener("load", () => {

searchButton = document.querySelector('#search-button');
searchBar = document.querySelector('#search-bar');
resultImage = document.querySelector('.result-image')

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

        changeImage(data);


    })

    function changeImage(data){

        var path = data.collection.items[0].links[0].href

        resultImage.src = path;

    }






})









})