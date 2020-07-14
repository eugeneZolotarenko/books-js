function createPreviewPopup(data) {
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

export default createPreviewPopup
