import filterByPageQuantity from "./filterByPageQuantity.js"

function resetFilters(data) {
  const reset = () => {
    localStorage.clear()
    filterByPageQuantity(data)
  }
  const resetBtn = document.querySelector("#reset-filters-button")

  const activeKeys = {}
  const onKeysDown = (onkeyup = (e) => {
    if (e.keyCode === 17 || e.keyCode === 82) {
      e.preventDefault()
      activeKeys[e.keyCode] = e.type === "keydown"
      if (activeKeys[17] && activeKeys[82]) {
        reset()
      }
    }
  })

  resetBtn.addEventListener("click", () => reset())
  document.addEventListener("keydown", onKeysDown)
}

export default resetFilters
