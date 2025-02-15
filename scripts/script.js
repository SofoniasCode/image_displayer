document.addEventListener("DOMContentLoaded", () => {
  const imagesBox = document.getElementById("image-list");
  const userSearchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const showMoreButton = document.getElementById("show-more-button");

  let searchQuery = ""
  let imagesArray = []
  let pageNumber = 1

  const fetchImages = async (query, page = 1) => {
    const apiKey = "23769202-6fa079976c6dad18b1f3fc9bf"
    const url = `https://pixabay.com/api?key=${apiKey}&q=${encodeURIComponent(
      query
    )}&page=${page}`

    try {
      const response = await fetch(url)
      return await response.json()
    } catch (error) {
      alert("sorry were having problems fetching the images 🙏")
      console.log(`error: ${error}`)
      return { hits: [] }
    }
  }

  const renderImages = (images) => {
    images.forEach((image) => {
      const divElement = document.createElement("div")
      divElement.classList.add("image-card")

      const imgElement = document.createElement("img")
      imgElement.classList.add("image-img")
      imgElement.src = image.largeImageURL

      const userProfileImg = document.createElement("img")
      userProfileImg.classList.add("image-card-user-profile")
      if (image.userImageURL) {
        userProfileImg.src = image.userImageURL
      } else {
        userProfileImg.src = "https://icons-for-free.com/default-user.png"
      }

      const userName = document.createElement("p")
      userName.textContent = image.user

      const innerDivElement = document.createElement("div")
      innerDivElement.classList.add("image-card-user-div")
      innerDivElement.append(userProfileImg, userName)

      divElement.append(imgElement, innerDivElement)
      imagesBox.appendChild(divElement)
    })
  }

  const handleSearch = async () => {
    imagesBox.innerHTML = ""
    pageNumber = 1
    imagesArray = []

    const data = await fetchImages(searchQuery, pageNumber)
    imagesArray = data.hits
    renderImages(imagesArray)

    if (imagesArray.length) {
      showMoreButton.style.display = "block"
    }
  }

  const handleShowMore = async () => {
    pageNumber += 1
    const data = await fetchImages(searchQuery, pageNumber)
    const newImages = data.hits

    if (newImages.length) {
      imagesArray = [...imagesArray, ...newImages]
      renderImages(newImages)
    } else {
      showMoreButton.style.display = "none"
    }
  }

  userSearchInput.addEventListener(
    "input",
    (e) => (searchQuery = e.target.value)
  )
  searchButton.addEventListener("click", handleSearch)
  showMoreButton.addEventListener("click", handleShowMore)
})
