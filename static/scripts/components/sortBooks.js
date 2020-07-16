import createBooks from "./createBooks.js"
import { getLocalStorageItem } from "../helpers.js"

const valueForSorting = (val, category) =>
  category === "releaseDate"
    ? val.toString().split("/").reverse().join("")
    : val.toString().split(" ").pop()

const sortData = (category, data) =>
  [...data].sort((a, b) =>
    valueForSorting(a[category], category).localeCompare(
      valueForSorting(b[category], category)
    )
  )

function sortBooks(data) {
  const sortedItems = document.querySelectorAll(".js-filter-item")

  let category = getLocalStorageItem("filterCategory")

  sortedItems.forEach((item) => {
    const radio = item.querySelector(".js-filter-radio")

    if (category) {
      createBooks(sortData(category, data))
      if (radio && radio.dataset.name.includes(category)) {
        radio.checked = true
      }
    } else {
      createBooks(data)
      radio.checked = false
    }

    item.addEventListener("click", () => {
      if (radio && radio.checked) {
        category = radio.dataset.name
        localStorage.setItem("filterCategory", category)
        createBooks(sortData(category, data))
      }
    })
  })
}

export default sortBooks
