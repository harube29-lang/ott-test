/* ===========================
   Scroll Animation (Intersection Observer)
=========================== */
export const initScrollAnimation = () => {
  const targets = document.querySelectorAll('.fade-up')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 }
  )

  targets.forEach((el) => observer.observe(el))
}

/* ===========================
   Navigation Active Section Tracking
=========================== */
export const initNavTracking = () => {
  const sections = document.querySelectorAll('section[id]')
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove('active')
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('active')
            }
          })
        }
      })
    },
    { threshold: 0.4 }
  )

  sections.forEach((section) => observer.observe(section))
}
