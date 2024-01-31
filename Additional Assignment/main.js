let exploreEl = document.getElementById("explore");
let youtubeContainer = document.getElementById("youtubeContainer");

let ulContainer = document.createElement("ul");
ulContainer.setAttribute("type", "none");
let ulContainer_book = document.createElement("ul");
ulContainer_book.setAttribute("type", "none");
let spinner = document.getElementById("spinner");
let bookContainer = document.getElementById("bookContainer");
let displayPara = document.getElementById("paraEl");
let displayPara2 = document.getElementById("paraEl2");

function displayResult(result) {
    console.log(result);
    let titleEl = document.createElement("h3");
    titleEl.classList.add("list-head");
    titleEl.textContent = result.snippet.title;

    let imgEl = document.createElement("img");
    imgEl.src = result.snippet.thumbnails.medium.url;
    imgEl.classList.add("image_video");

    let watchUrl = "https://www.youtube.com/watch?v=" + result.id.videoId;
    let liElem = document.createElement("li");

    let anchorEl = document.createElement("a");
    anchorEl.textContent = result.snippet.title;
    anchorEl.target = "_blank";
    anchorEl.href = watchUrl;
    anchorEl.classList.add("anchor");

    let mainDiv = document.createElement("div");
    mainDiv.classList.add("list-item-youtube");
    mainDiv.appendChild(imgEl);
    mainDiv.appendChild(anchorEl);
    liElem.appendChild(mainDiv);
    ulContainer.appendChild(liElem);
    youtubeContainer.appendChild(ulContainer);
}

function displayBooks(bookData) {
    console.log(bookData);
    let search = bookData.key;
    let book = `https://openlibrary.org/${search}`;
    let liEl = document.createElement("li");

    let anchorEl = document.createElement("a");
    anchorEl.href = book;
    anchorEl.textContent = bookData.title;
    anchorEl.classList.add("anchor");

    liEl.appendChild(anchorEl);
    liEl.classList.add("book-heading");
    ulContainer_book.appendChild(liEl);
    bookContainer.appendChild(ulContainer_book);
}

function searchForResult(event) {
    if (event.key === "Enter") {
        spinner.classList.remove("d-none");
        let searchValue = exploreEl.value;
        let options = {
            method: "GET"
        };

        
        let api_key = "AIzaSyAlxa67pEbE1qHT6k0mJcZ4G0_dMUjeS2o";

        let book_url = `https://openlibrary.org/search.json?q=${searchValue}&sort=new&limit=70`;
        fetch(book_url, options)
            .then(function (response) {
                
                displayPara2.textContent="";
                ulContainer_book.textContent=null;
                spinner.classList.add("d-none");
                return response.json();
            })
            .then(function (bookData) {
                for (let items of bookData.docs) {
                    displayBooks(items);
                }
            });

        let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${20}&q=${searchValue}&type=video&key=${api_key}`;
        fetch(url, options)
            .then(function (response) {
                displayPara.textContent="";
                ulContainer.textContent=null;
                spinner.classList.add("d-none");
                return response.json();
            })
            .then(function (json) {
                
                spinner.classList.add("d-none");
                for (let items of json.items) {
                    displayResult(items);
                }
            });
    }
}

exploreEl.addEventListener("keydown", searchForResult);
