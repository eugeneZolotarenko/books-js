import createPreviewPopup from "./createPreviewPopup.js"

function createBooks(data) {
  const booksContainer = document.querySelector("#books-container")
  const booksWrapperContainer = document.querySelector(
    "#books-wrapper-container"
  )

  booksContainer.innerHTML = ""
  if (document.querySelector("#nobooks-header")) {
    const noBooksHeader = document.querySelector("#nobooks-header")
    noBooksHeader.parentNode.removeChild(noBooksHeader)
  }

  if (data.length > 0) {
    data.map((item) => {
      const book = `
        <li class="book js-book" data-id=${item.id}>
            <span class="book__number">${item.id}</span>
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
                <li class="book__info-additional-item">Release Date: ${item.releaseDate}</li>
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
      booksContainer.insertAdjacentHTML("beforeend", book)
      createPreviewPopup(data)
    })
  } else {
    const noBooks = `
      <h3 class="book__no-books" id="nobooks-header">There are no books for your criteria</h3>
    `
    booksWrapperContainer.insertAdjacentHTML("beforeend", noBooks)
  }
}

export default createBooks
