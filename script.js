const imagesBox = document.getElementById("images-box");
const user_search_query = document.getElementById("user_search_query");
const search_button = document.getElementById("search_button");
let search_query = "";

const fetch_image = async (query) => {
  const api_key = "23769202-6fa079976c6dad18b1f3fc9bf";
  const url = `https://pixabay.com/api?key=${api_key}&q=${query}`;

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
    let newElement = document.createElement("img");
    newElement.src = image["largeImageURL"];
    newElement.width = 200;
    imagesBox.append(newElement);
  });
};

user_search_query.addEventListener("change", (e) => {
  search_query = e.target.value;
  console.log(search_query);
});

search_button.addEventListener("click", () => {
  render_images(search_query);
});

