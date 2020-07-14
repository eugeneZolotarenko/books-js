import filterByPageQuantity from "./components/filterByPageQuantity.js"
import resetFilters from "./components/resetFilters.js"

async function getData() {
  let response = await fetch("./books.json")
  return await response.json()
}

async function startAplication() {
  let data = await getData()
  filterByPageQuantity(data)
  resetFilters(data)
}
startAplication()
