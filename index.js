window.addEventListener("load", () => {

    searchButton = document.querySelector('#search-button');
    searchBar = document.querySelector('#search-bar');
    searchResultsWrapper = document.querySelector('#search-results-wrapper')
    numberOfResults = document.querySelector('#number-of-results')

    var url = 'https://images-api.nasa.gov/search?q='

    const requestOptions = {

        method: 'GET',
        headers: { 'Content-Type': 'application/json' },

    }

    searchButton.addEventListener("click", () => {

        var query = searchBar.value;

        var encodedURI = url + encodeURIComponent(query) + '&media_type=image';

        console.log('searching at: ' + encodedURI);

        fetch(encodedURI, requestOptions)
            .then(res => res.json())
            .then(data => {


                console.log(data.status);
                console.log(data);

                search(data, query);


            })

    })



    function search(data, query) {

        var path;

        if (query === "" || query === " ") { //get this working (in case of no input)

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
            numberOfResults.textContent = "No results found. "
        }


        while (searchResultsWrapper.lastChild) {
            searchResultsWrapper.removeChild(searchResultsWrapper.lastChild);
        }


        const resultsSet = new Set();

        for (i = 0; i < data.collection.items.length; i++) {

            if (resultsSet.has(data.collection.items[i].links[0].href)) {

                continue; //to prevent duplicate images

            }

            resultsSet.add(data.collection.items[i].links[0].href);


            var resultCard = document.createElement("div"),
                infoSection = document.createElement("div"),
                imgcontainer = document.createElement("div"),
                img = document.createElement("img"),
                title = document.createElement("h3"),
                date = document.createElement("p");

            img.className = "result-image";
            resultCard.className = "result-card";
            infoSection.className = "info-section";
            imgcontainer.className = "img-container";


            path = data.collection.items[i].links[0].href;

            title.textContent = data.collection.items[i].data[0].title;
            date.textContent = "Timestamp: " + data.collection.items[i].data[0].date_created;

            img.src = path;

            searchResultsWrapper.appendChild(resultCard);
            resultCard.appendChild(img);
            resultCard.appendChild(infoSection);
            infoSection.appendChild(title);
            infoSection.appendChild(date);




        }







    }






})

