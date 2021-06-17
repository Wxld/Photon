const auth = "563492ad6f91700001000001be5db8fd0beb4cde90b6ad8e4aeb6059";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;
const more = document.querySelector(".more");
let pageC = 1,pageD = 1;
let fetchLink;
let currentSearch;

searchInput.addEventListener("input",updateInput);
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    currentSearch=searchValue;
    searchPhotos(searchValue);
});
more.addEventListener("click",loadMore);

function updateInput(e){
    console.log(e.target.value);
    searchValue = e.target.value;
}

function addImg(data){
    data.photos.forEach(photo => {
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `
        <img src=${photo.src.large}></img>
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}><i class="fas fa-download"></i></a>
        </div>
        `;
        gallery.appendChild(galleryImg);
    });
} 

async function fetchApi(url){
    const dataFetch = await fetch(url,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    });
    const data = await dataFetch.json();
    return data;
}

async function curatedPhotos(){
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data = await fetchApi(fetchLink);
    addImg(data);
}

async function searchPhotos(query){
    clear();
    etchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
    const data = await fetchApi(fetchLink);
    addImg(data);
}

function clear(){
    gallery.innerHTML="";
    //searchInput.value="";
}

async function loadMore(){
    if(currentSearch){
        pageD++;
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${pageD}`;
    }else{
        pageC++;
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${pageC}`;
    }
    const data = await fetchApi(fetchLink);
    addImg(data);
}
curatedPhotos();
