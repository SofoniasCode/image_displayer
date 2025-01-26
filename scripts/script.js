
const imagesBox = document.getElementById("images-result");
const user_search_query = document.getElementById("search-input");
const search_button = document.getElementById("search-button");
let search_query = "";

const fetch_image = async (query) => {
  const api_key = "23769202-6fa079976c6dad18b1f3fc9bf";
  const url = `https://pixabay.com/api?key=${api_key}&q=${encodeURIComponent(query)}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const render_images = async (search_query) => {
  while (imagesBox.firstChild) {
    imagesBox.removeChild(imagesBox.firstChild);
  }
  const images = await fetch_image(search_query);
  const images_array = images["hits"];

  images_array.forEach((image) => {
    let divElement = document.createElement("div");
    let pElement = document.createElement("p");
    let imgElement = document.createElement("img");
    
    // add clases to the elements
    divElement.classList.add('image-card')
    pElement.classList.add('image-title')
    imgElement.classList.add('image-img')

    //edit the content of the elements
    imgElement.src = image["largeImageURL"];
    pElement.textContent = "description"

    //append the elements tp the div
    divElement.append(imgElement)
    divElement.append(pElement)

    //add the div to the dom
    imagesBox.append(divElement);
  });
};

user_search_query.addEventListener("change", (e) => {
  search_query = e.target.value;
  console.log(search_query);
});

search_button.addEventListener("click", () => {
  render_images(search_query);
});
