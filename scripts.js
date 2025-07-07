// Gestione del menu mobile
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle")
  const navMenu = document.querySelector(".nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")

  // Toggle menu mobile
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")

    // Animazione hamburger menu
    const spans = navToggle.querySelectorAll("span")
    spans.forEach((span, index) => {
      if (navMenu.classList.contains("active")) {
        if (index === 0) span.style.transform = "rotate(45deg) translate(5px, 5px)"
        if (index === 1) span.style.opacity = "0"
        if (index === 2) span.style.transform = "rotate(-45deg) translate(7px, -6px)"
      } else {
        span.style.transform = "none"
        span.style.opacity = "1"
      }
    })
  })

  // Chiudi menu quando si clicca su un link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      // Rimuovi anche la classe 'active' dal navToggle per reset animazione hamburger
      navToggle.classList.remove("active");

      const spans = navToggle.querySelectorAll("span")
      spans.forEach((span) => {
        span.style.transform = "none"
        span.style.opacity = "1"
      })
    })
  })

  // Smooth scrolling per i link di navigazione
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Evidenzia il link attivo nella navigazione
  function highlightActiveLink() {
    const sections = document.querySelectorAll("section")
    const navLinks = document.querySelectorAll(".nav-link")

    let current = ""
    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  }

  // Gestione del form di contatto
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Validazione form
      const nome = document.getElementById("nome").value.trim()
      const email = document.getElementById("email").value.trim()
      const messaggio = document.getElementById("messaggio").value.trim()

      if (!nome || !email || !messaggio) {
        window.MacelleriaTradizione.showNotification("Per favore, compila tutti i campi obbligatori.", "error")
        return
      }

      if (!isValidEmail(email)) {
        window.MacelleriaTradizione.showNotification("Per favor, inserisci un indirizzo email valido.", "error")
        return
      }

      // Simula invio form (in un caso reale, qui faresti una chiamata AJAX)
      const submitBtn = contactForm.querySelector(".submit-btn")
      const originalText = submitBtn.textContent

      submitBtn.textContent = "Invio in corso..."
      submitBtn.disabled = true

      setTimeout(() => {
        window.MacelleriaTradizione.showNotification(
          "Messaggio inviato con successo! Ti risponderemo presto.",
          "success",
        )
        contactForm.reset()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }

  // Funzione per validare email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Funzione per mostrare notifiche
  window.MacelleriaTradizione.showNotification = (message, type = "info") => {
    // Rimuovi notifiche esistenti
    const existingNotification = document.querySelector(".notification")
    if (existingNotification) {
      existingNotification.remove()
    }

    // Crea nuova notifica
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `

    // Aggiungi stili per la notifica
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === "success" ? "#4CAF50" : type === "error" ? "#f44336" : "#2196F3"};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
        `

    document.body.appendChild(notification)

    // Gestisci chiusura notifica
    const closeBtn = notification.querySelector(".notification-close")
    closeBtn.addEventListener("click", () => {
      notification.style.animation = "slideOutRight 0.3s ease-out"
      setTimeout(() => notification.remove(), 300)
    })

    // Auto-rimozione dopo 5 secondi
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = "slideOutRight 0.3s ease-out"
        setTimeout(() => notification.remove(), 300)
      }
    }, 5000)
  }

  // Aggiungi animazioni CSS per le notifiche
  const style = document.createElement("style")
  style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }

        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }

        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background-color 0.2s;
        }

        .notification-close:hover {
            background-color: rgba(255,255,255,0.2);
        }

        .nav-link.active {
            background: rgba(255,255,255,0.2);
        }
    `
  document.head.appendChild(style)

  // Gestione scroll per header trasparente
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header")
    // Keep it black regardless of scroll position
    header.style.background = "linear-gradient(135deg, #000000 0%, #222222 100%)" // Black gradient
    header.style.backdropFilter = "none" // Remove blur if it was causing issues or isn't desired with black background

    highlightActiveLink()
  })

  // Animazioni al scroll (Intersection Observer)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.8s ease-out forwards"
      }
    })
  }, observerOptions)

  // Osserva elementi per animazioni
  const animatedElements = document.querySelectorAll(".prodotto-card, .valore, .info-box, .chi-siamo-text")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    observer.observe(el)
  })

  // Sostituisci con questo codice semplificato:
  console.log("🥩 Macelleria Tradizione - Immagini caricate correttamente!")

  // Gestione click su CTA button
  const ctaButton = document.querySelector(".cta-button")
  if (ctaButton) {
    ctaButton.addEventListener("click", (e) => {
      e.preventDefault()
      const targetSection = document.querySelector("#prodotti")
      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  }

  // Prevenzione spam form
  const formSubmissionCount = 0
  const maxSubmissions = 3
  const timeWindow = 300000 // 5 minuti

  function canSubmitForm() {
    const now = Date.now()
    const submissions = JSON.parse(localStorage.getItem("formSubmissions") || "[]")

    // Filtra le submission nell'ultima finestra temporale
    const recentSubmissions = submissions.filter((time) => now - time < timeWindow)

    if (recentSubmissions.length >= maxSubmissions) {
      return false
    }

    // Aggiungi la nuova submission
    recentSubmissions.push(now)
    localStorage.setItem("formSubmissions", JSON.stringify(recentSubmissions))

    return true
  }

  // Modifica la gestione del form per includere la prevenzione spam
  if (contactForm) {
    const originalSubmitHandler = contactForm.onsubmit
    contactForm.addEventListener("submit", (e) => {
      if (!canSubmitForm()) {
        e.preventDefault()
        window.MacelleriaTradizione.showNotification(
          "Hai raggiunto il limite di invii. Riprova tra qualche minuto.",
          "error",
        )
        return false
      }
    })
  }

  console.log("🥩 Macelleria Tradizione - Website caricato correttamente!")
})

// Funzioni di utilità globali
window.MacelleriaTradizione = {
  // Funzione per aprire il dialer del telefono
  callUs: () => {
    window.location.href = "tel:+390123456789"
  },

  // Funzione per aprire l'app email
  emailUs: () => {
    window.location.href = "mailto:info@macelleriatradizione.it?subject=Richiesta Informazioni"
  },

  // Funzione per condividere la pagina
  share: () => {
    if (navigator.share) {
      navigator.share({
        title: "Macelleria Tradizione",
        text: "Scopri la migliore macelleria artigianale della città!",
        url: window.location.href,
      })
    } else {
      // Fallback per browser che non supportano Web Share API
      const url = window.location.href
      navigator.clipboard.writeText(url).then(() => {
        window.MacelleriaTradizione.showNotification("Link copiato negli appunti!", "success")
      })
    }
  },
}