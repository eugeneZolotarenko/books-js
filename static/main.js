async function getData() {
  let response = await fetch("./books.json")
  return await response.json()
}

function createBooks(data) {
  const booksContainer = document.querySelector("#books-container")
  booksContainer.innerHTML = ""

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
  })
}

function previewPopupOperations(data) {
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

const stringForSorting = (str, category) => {
  if (category === "releaseDate") {
    const dateArr = str.toString().split("/")
    return `${dateArr.pop()}${dateArr.shift()}`
  } else {
    return str.toString().split(" ").pop()
  }
}

const sortData = (category, data) =>
  [...data].sort((a, b) =>
    stringForSorting(a[category], category).localeCompare(
      stringForSorting(b[category], category)
    )
  )

const getLocalStorageItem = (name) => {
  if (localStorage.getItem(name)) {
    return localStorage.getItem(name)
  }
}

function sortByRadio(data) {
  const sortedItems = document.querySelectorAll(".js-filter-item")

  let category = getLocalStorageItem("filterCategory")

  sortedItems.forEach((item) => {
    const radio = item.querySelector(".js-filter-radio")

    if (category) {
      createBooks(sortData(category, data))
      previewPopupOperations(sortData(category, data))
      if (radio && radio.dataset.name.includes(category)) {
        radio.checked = true
      }
    }

    item.addEventListener("click", () => {
      if (radio && radio.checked) {
        category = radio.dataset.name
        localStorage.setItem("filterCategory", category)
        createBooks(sortData(category, data))
        previewPopupOperations(sortData(category, data))
        filterByPageQuantity(sortData(category, data))
      }
    })
  })
  return category && sortData(category, data)
}

const delay = (fn, ms) => {
  let timer = 0
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(fn.bind(this, ...args), ms || 0)
  }
}

function filterByPageQuantity(data) {
  const textInput = document.querySelector("#page-quantity-filter-text")
  let value = getLocalStorageItem("minPages")

  const getPagesQuantity = () => {
    const filteredData = data.filter((book) => {
      return book.pages >= value
    })
    createBooks(filteredData)
    previewPopupOperations(filteredData)
  }

  if (value) {
    getPagesQuantity()
    textInput.value = value
  }

  textInput.addEventListener(
    "keyup",
    delay((e) => {
      value = textInput.value === "" ? 0 : parseInt(textInput.value)
      if (
        (parseInt(e.key) >= 0 && parseInt(e.key) <= 9) ||
        e.key === "Backspace"
      ) {
        localStorage.setItem("minPages", value)
        getPagesQuantity()
      }
    }, 400)
  )
}

async function startAplication() {
  let data = await getData()
  createBooks(data)
  previewPopupOperations(data)
  sortByRadio(data)
  filterByPageQuantity(data)
}
startAplication()
