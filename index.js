window.addEventListener("load", () => {

searchButton = document.querySelector('#search-button');
searchBar = document.querySelector('#search-bar');
searchResultsWrapper = document.querySelector('#search-results-wrapper')
numberOfResults = document.querySelector('#number-of-results')

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



            while (searchResultsWrapper.lastChild) {
                searchResultsWrapper.removeChild(searchResultsWrapper.lastChild);
            }


        

        for(i=0;i<data.collection.items.length;i++){

            
            var img = document.createElement("img");

            path = data.collection.items[i].links[0].href

            img.src = path;

            searchResultsWrapper.appendChild(img);

    


        }

        numberOfResults.textContent = data.collection.items.length





    }






})









})