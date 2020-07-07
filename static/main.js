async function getData() {
  let response = await fetch("./books.json")
  return await response.json()
}

function appendBooks(data) {
  data.map((item, i) => {
    const book = `
    <li class="book">
        <span class="book__number">${i + 1}</span>
        <a
        class="book__link"
        href="${item.link}"
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

async function createBooks() {
  const data = await getData()
  appendBooks(data)
}
createBooks()
