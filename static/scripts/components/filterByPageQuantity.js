import sortBooks from "./sortBooks.js"
import { delay, getLocalStorageItem } from "../helpers.js"

function filterByPageQuantity(data) {
  const textInput = document.querySelector("#page-quantity-filter-text")
  let value = getLocalStorageItem("minPages")

  const sortBooksWithPagesQuantity = () => {
    const filteredData = data.filter((book) => {
      return book.pages >= value
    })
    sortBooks(filteredData)
  }

  if (value) {
    sortBooksWithPagesQuantity()
    textInput.value = value
  } else {
    sortBooks(data)
    textInput.value = ""
  }

  textInput.addEventListener(
    "keyup",
    delay((e) => {
      value = textInput.value === "" ? 0 : parseInt(textInput.value)
      if (
        (parseInt(e.key) >= 0 && parseInt(e.key) <= 9) ||
        e.key === "Backspace" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowUp"
      ) {
        localStorage.setItem("minPages", value)
        sortBooksWithPagesQuantity()
      }
    }, 400)
  )
}

export default filterByPageQuantity
