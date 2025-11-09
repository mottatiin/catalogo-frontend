const filterBar = document.getElementById("filter")
const cards = Array.from(document.querySelectorAll("#products .card"))

filterBar.addEventListener("click", (e) => {
  const link = e.target.closest("a")
  if (!link) return
  e.preventDefault()

  filterBar
    .querySelectorAll("a.active")
    .forEach((a) => a.classList.remove("active"))
  link.classList.add("active")

  const f = link.dataset.filter
  cards.forEach((card) => {
    const show = f === "*" || card.dataset.cat === f

    if (show) {
      if (!card.classList.contains("hidden")) return

      card.classList.add("hidden", "fade-out")
      card.classList.remove("hidden")
      void card.offsetWidth
      card.classList.remove("fade-out")
    } else {
      if (card.classList.contains("hidden")) return

      card.classList.add("fade-out")
      const onEnd = (ev) => {
        if (ev.propertyName !== "opacity") return
        card.classList.add("hidden")
        card.classList.remove("fade-out")
        card.removeEventListener("transitionend", onEnd)
      }
      card.addEventListener("transitionend", onEnd)
    }
  })
})
