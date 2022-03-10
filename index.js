window.addEventListener("load", () => {

    searchButton = document.querySelector('#search-button');
    form = document.querySelector('.form');
    searchBar = document.querySelector('#search-bar');
    searchResultsWrapper = document.querySelector('#search-results-wrapper');
    numberOfResults = document.querySelector('#number-of-results');
    loadingWrapper = document.querySelector('#loading-wrapper');

    var url = 'https://images-api.nasa.gov/search?q=';

    const requestOptions = {

        method: 'GET',
        headers: { 'Content-Type': 'application/json' },

    }

    form.addEventListener("submit", (evt) => {

        evt.preventDefault();

        loadingWrapper.style.display = 'grid';

        var query = searchBar.value;

        var encodedURI = url + encodeURIComponent(query) + '&media_type=image';


        fetch(encodedURI, requestOptions)
            .then(handleErrors)
            .then(res => res.json())
            .then(data => {

                console.log(data)

                search(data, query);


                loadingWrapper.style.display = 'none';

            })


    })

    function handleErrors(res) {
        if (!res.ok) {
            numberOfResults.textContent = 'An error has occurred: ' + res.status;
        }
        return res;
    }



    function search(data, query) {

        var path;

        if (query === "" || query === " ") {

            numberOfResults.textContent = "Please enter a search query "

            return null;
        }

        if (data.collection.items.length >= 100) {
            numberOfResults.style.display = "block";
            numberOfResults.textContent = "Your search for \"" + query + "\" returned more than " + data.collection.items.length + " results "
        } else if (data.collection.items.length > 0) {
            numberOfResults.style.display = "block";
            numberOfResults.textContent = "Your search for \"" + query + "\" returned " + data.collection.items.length + " results "
        } else {
            numberOfResults.style.display = "block";
            numberOfResults.textContent = "No results found. ";
        }


        while (searchResultsWrapper.lastChild) {
            searchResultsWrapper.removeChild(searchResultsWrapper.lastChild);
        }


        for (i = 0; i < data.collection.items.length; i++) {

            var resultCard = document.createElement("div"),
                infoSection = document.createElement("div"),
                imgContainer = document.createElement("div"),
                img = document.createElement("img"),
                title = document.createElement("h3"),
                description = document.createElement("p"),
                date = document.createElement("p");

            img.className = "result-image";
            resultCard.className = "result-card";
            infoSection.className = "info-section";
            imgContainer.className = "img-container";

            path = data.collection.items[i].links[0].href;

            title.textContent = data.collection.items[i].data[0].title;
            description.textContent = data.collection.items[i].data[0].description_508
            date.textContent = "Timestamp: " + data.collection.items[i].data[0].date_created;

            img.src = path;

            searchResultsWrapper.appendChild(resultCard);
            resultCard.appendChild(img);
            resultCard.appendChild(infoSection);
            infoSection.appendChild(title);
            infoSection.appendChild(description)
            infoSection.appendChild(date);



        }





    }






})