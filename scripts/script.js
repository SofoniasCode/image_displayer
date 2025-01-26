const images_container = document.getElementById("image-container");
const imagesBox = document.getElementById("image-list");
const user_search_query = document.getElementById("search-input");
const search_button = document.getElementById("search-button");
const showMoreButton = document.getElementById("show-more-button");
let search_query = "";
let images_array = [];
let pageNumber = 1;

const fetch_image = async (query, pageNumber = 1) => {
  const api_key = "23769202-6fa079976c6dad18b1f3fc9bf";
  const url = `https://pixabay.com/api?key=${api_key}&q=${encodeURIComponent(
    query
  )}&page=${pageNumber}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const get_images = async (search_query) => {
  while (imagesBox.firstChild) {
    imagesBox.removeChild(imagesBox.firstChild);
  }
  const images = await fetch_image(search_query, pageNumber);
  images_array = images["hits"];
  render_images(images_array);
};

const render_images = (images_array) => {
  images_array.forEach((image) => {
    let divElement = document.createElement("div");
    let pElement = document.createElement("p");
    let imageDetails = document.createElement("p")
    let imageDiv = document.createElement("div")
    let innerDivElement = document.createElement("div");
    let userProfileImg = document.createElement("img");
    let userName = document.createElement("p");
    let imgElement = document.createElement("img");

    // add clases to the elements
    divElement.classList.add("image-card");
    imgElement.classList.add("image-img");
    imageDiv.classList.add("image-card-div");
    imageDetails.classList.add("image-card-div-details")
    innerDivElement.classList.add("image-card-user-div");

    //edit the content of the elements
    imgElement.src = image["largeImageURL"];
    userName.textContent = image["user"];
    const defaultUserImage =
      "https://www.google.com/imgres?q=user%20profile%20icon&imgurl=https%3A%2F%2Ficons-for-free.com%2Fiff%2Fpng%2F512%2Fprofile%2Bprofile%2Bpage%2Buser%2Bicon-1320186864367220794.png&imgrefurl=https%3A%2F%2Ficons-for-free.com%2Fprofile%2Bprofile%2Bpage%2Buser%2Bicon-1320186864367220794%2F&docid=xTynO1wjSx90OM&tbnid=DsjF-Ux6VqbQ7M&vet=12ahUKEwiNxYHvmpSLAxUMSvEDHa-GO60QM3oECDkQAA..i&w=512&h=512&hcb=2&ved=2ahUKEwiNxYHvmpSLAxUMSvEDHa-GO60QM3oECDkQAA";
    userProfileImg.src = image["userImageURL"]
      ? image["userImageURL"]
      : defaultUserImage;

      imageDetails.textContent="View Details"

    //append the elements tp the div
    imageDiv.append(imgElement)
    imageDiv.append(imageDetails)
    divElement.append(imageDiv);
    innerDivElement.append(userProfileImg);
    innerDivElement.append(userName);

    //add the div to the dom
    divElement.append(innerDivElement);
    imagesBox.append(divElement);

    showMoreButton.style.display = "block";
  });
};

if (showMoreButton) {
  showMoreButton.addEventListener("click", async (e) => {
    showMoreButton.style.display = "none";
    pageNumber += 1;

    const images = await fetch_image(search_query, pageNumber);
    const add_images_array = images["hits"];
    images_array = images_array.concat(add_images_array);
    render_images(images_array);
    showMoreButton.style.display = "block";
  });
}

user_search_query.addEventListener("change", (e) => {
  search_query = e.target.value;
  console.log(search_query);
});

search_button.addEventListener("click", () => {
  get_images(search_query);
});
