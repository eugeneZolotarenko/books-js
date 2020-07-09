async function getData() {
  let response = await fetch("./books.json")
  return await response.json()
}

function appendBooks(data) {
  data.map((item, i) => {
    const book = `
    <li class="book js-book" data-id=${item.id}>
        <span class="book__number">${i + 1}</span>
        <a
        class="book__open-preview js-open-preview"
        href=""
        >
        <img
            class="book_image"
            src="${item.cover.small}"
        />
        </a>
        <div class="book__info">
        <h4 class="book__info-title">${item.title}</h4>
        <h5 class="book__info-author">By ${item.author}</h5>
        <ul class="book__info-additional">
            <li class="book__info-additional-item">Release Date: ${
              item.releaseDate
            }</li>
            <li class="book__info-additional-item">Pages: ${item.pages}</li>
            <li class="book__info-additional-item">
            Link:
            <a
                class="book__info-additional-item-link"
                href="${item.link}"
                >shop</a
            >
            </li>
        </ul>
        </div>
    </li>
    `
    document
      .querySelector("#books-container")
      .insertAdjacentHTML("beforeend", book)
  })
}

function showPopup(data) {
  document.querySelectorAll(".js-book").forEach((book) => {
    book.querySelector(".js-open-preview").addEventListener("click", (e) => {
      e.preventDefault()

      const previewObj = data.find(
        (item) => item.id === parseInt(book.dataset.id)
      )

      const preview = document.querySelector("#book-preview-popup-image")
      preview.src = previewObj.cover.large
      preview.alt = previewObj.title

      const overlay = document.querySelector("#book-preview-popup")
      overlay.classList.add("active")
      const closeButton = document.querySelector("#close-book-preview-popup")

      const closeBookPreviewPopup = (e) => {
        if (e.target !== preview) {
          overlay.classList.remove("active")
        }
      }

      overlay.addEventListener("click", closeBookPreviewPopup)
      closeButton.addEventListener("click", closeBookPreviewPopup)
    })
  })
}

async function createBooks() {
  const data = await getData()
  appendBooks(data)
  showPopup(data)
}
createBooks()
