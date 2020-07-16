import sortBooks from "./sortBooks.js"
import { delay, getLocalStorageItem } from "../helpers.js"

const sortBooksWithPagesQuantity = (data, value) => {
  const filteredData = data.filter((book) => book.pages >= value)
  sortBooks(filteredData)
}

const listenTextInput = (e, data) => {
  const value = e.target.value === "" ? 0 : parseInt(e.target.value)
  if (
    (parseInt(e.key) >= 0 && parseInt(e.key) <= 9) ||
    e.key === "Backspace" ||
    e.key === "ArrowDown" ||
    e.key === "ArrowUp"
  ) {
    localStorage.setItem("minPages", value)
    sortBooksWithPagesQuantity(data, value)
  }
}

function filterByPageQuantity(data) {
  const textInput = document.querySelector("#page-quantity-filter-text")
  const value = getLocalStorageItem("minPages")

  if (value) {
    sortBooksWithPagesQuantity(data, value)
    textInput.value = value
  } else {
    sortBooks(data)
    textInput.value = ""
  }

  textInput.addEventListener(
    "keyup",
    delay((e) => listenTextInput(e, data), 400)
  )
}

export default filterByPageQuantity
