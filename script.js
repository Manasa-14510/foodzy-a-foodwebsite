// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  // Login/Signup Form Toggle
  const loginBtn = document.querySelector(".login-btn")
  const signupBtn = document.querySelector(".signup-btn")
  const showSignupBtn = document.querySelector(".show-signup")
  const showLoginBtn = document.querySelector(".show-login")
  const loginForm = document.querySelector(".login-form")
  const signupForm = document.querySelector(".signup-form")
  const loginFormContainer = document.querySelector(".login-form-container")
  const loginContent = document.querySelector(".login-content")

  // Cart functionality
  let cart = JSON.parse(localStorage.getItem("foodzyCart")) || []
  updateCartCount()

  // Add event listeners for login/signup forms if they exist
  if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault()
      loginFormContainer.style.display = "block"
      loginContent.style.display = "none"
      loginForm.style.display = "block"
      signupForm.style.display = "none"
    })
  }

  if (signupBtn) {
    signupBtn.addEventListener("click", (e) => {
      e.preventDefault()
      loginFormContainer.style.display = "block"
      loginContent.style.display = "none"
      loginForm.style.display = "none"
      signupForm.style.display = "block"
    })
  }

  if (showSignupBtn) {
    showSignupBtn.addEventListener("click", (e) => {
      e.preventDefault()
      loginForm.style.display = "none"
      signupForm.style.display = "block"
    })
  }

  if (showLoginBtn) {
    showLoginBtn.addEventListener("click", (e) => {
      e.preventDefault()
      signupForm.style.display = "none"
      loginForm.style.display = "block"
    })
  }

  // Login form submission
  const loginFormElement = document.getElementById("loginForm")
  if (loginFormElement) {
    loginFormElement.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      // Simple validation
      if (email && password) {
        // In a real app, you would validate with a server
        // For demo purposes, we'll just redirect to home
        window.location.href = "home.html"
      } else {
        alert("Please fill in all fields")
      }
    })
  }

  // Signup form submission
  const signupFormElement = document.getElementById("signupForm")
  if (signupFormElement) {
    signupFormElement.addEventListener("submit", (e) => {
      e.preventDefault()
      const fullname = document.getElementById("fullname").value
      const email = document.getElementById("signup-email").value
      const password = document.getElementById("signup-password").value
      const confirmPassword = document.getElementById("confirm-password").value

      // Simple validation
      if (fullname && email && password && confirmPassword) {
        if (password !== confirmPassword) {
          alert("Passwords do not match")
          return
        }
        // In a real app, you would register with a server
        // For demo purposes, we'll just redirect to home
        window.location.href = "home.html"
      } else {
        alert("Please fill in all fields")
      }
    })
  }

  // Carousel functionality
  const carouselSlides = document.querySelectorAll(".carousel-slide")
  const prevBtn = document.querySelector(".carousel-btn.prev")
  const nextBtn = document.querySelector(".carousel-btn.next")
  const dots = document.querySelectorAll(".dot")
  let currentSlide = 0

  if (carouselSlides.length > 0) {
    function showSlide(n) {
      carouselSlides.forEach((slide) => slide.classList.remove("active"))
      dots.forEach((dot) => dot.classList.remove("active"))

      currentSlide = (n + carouselSlides.length) % carouselSlides.length

      carouselSlides[currentSlide].classList.add("active")
      dots[currentSlide].classList.add("active")
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        showSlide(currentSlide - 1)
      })
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        showSlide(currentSlide + 1)
      })
    }

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index)
      })
    })

    // Auto slide
    setInterval(() => {
      showSlide(currentSlide + 1)
    }, 5000)
  }

  // Menu category switching
  const categoryItems = document.querySelectorAll(".category-list li")
  const categorySections = document.querySelectorAll(".category-section")

  if (categoryItems.length > 0) {
    categoryItems.forEach((item) => {
      item.addEventListener("click", function () {
        const category = this.getAttribute("data-category")

        // Update active class on category items
        categoryItems.forEach((item) => item.classList.remove("active"))
        this.classList.add("active")

        // Show the corresponding category section
        categorySections.forEach((section) => {
          section.classList.remove("active")
          if (section.id === category) {
            section.classList.add("active")
          }
        })
      })
    })
  }

  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn, .add-btn")

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id")
      const name = this.getAttribute("data-name")
      const price = Number.parseFloat(this.getAttribute("data-price"))
      const image = this.getAttribute("data-image")

      // Check if item already exists in cart
      const existingItemIndex = cart.findIndex((item) => item.id === id)

      if (existingItemIndex !== -1) {
        // Item exists, increment quantity
        cart[existingItemIndex].quantity += 1
      } else {
        // Add new item to cart
        cart.push({
          id,
          name,
          price,
          image,
          quantity: 1,
        })
      }

      // Save cart to localStorage
      localStorage.setItem("foodzyCart", JSON.stringify(cart))

      // Update cart count
      updateCartCount()

      // Show notification
      alert(`${name} added to cart!`)
    })
  })

  // Update cart count
  function updateCartCount() {
    const cartCountElements = document.querySelectorAll(".cart-count")
    const count = cart.reduce((total, item) => total + item.quantity, 0)

    cartCountElements.forEach((element) => {
      element.textContent = count
    })
  }

  // Render cart items
  const cartItemsContainer = document.getElementById("cartItems")

  if (cartItemsContainer) {
    if (cart.length === 0) {
      // Cart is empty
      cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <a href="menu.html" class="browse-menu-btn">Browse Menu</a>
                </div>
            `
    } else {
      // Render cart items
      let cartHTML = ""
      let subtotal = 0

      cart.forEach((item) => {
        const itemTotal = item.price * item.quantity
        subtotal += itemTotal

        cartHTML += `
                    <div class="cart-item" data-id="${item.id}">
                        <div class="cart-item-img">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        </div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease-btn" data-id="${item.id}">-</button>
                            <span class="quantity-value">${item.quantity}</span>
                            <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
                        </div>
                        <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
                        <button class="remove-btn" data-id="${item.id}">Remove</button>
                    </div>
                `
      })

      cartItemsContainer.innerHTML = cartHTML

      // Calculate and display totals
      const tax = subtotal * 0.1 // 10% tax
      const deliveryFee = 2.99
      const total = subtotal + tax + deliveryFee

      document.getElementById("subtotal").textContent = `$${subtotal.toFixed(2)}`
      document.getElementById("tax").textContent = `$${tax.toFixed(2)}`
      document.getElementById("total").textContent = `$${total.toFixed(2)}`

      // Add event listeners for quantity buttons
      const decreaseButtons = document.querySelectorAll(".decrease-btn")
      const increaseButtons = document.querySelectorAll(".increase-btn")
      const removeButtons = document.querySelectorAll(".remove-btn")

      decreaseButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const id = this.getAttribute("data-id")
          const itemIndex = cart.findIndex((item) => item.id === id)

          if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1
            localStorage.setItem("foodzyCart", JSON.stringify(cart))
            location.reload() // Reload to update cart
          }
        })
      })

      increaseButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const id = this.getAttribute("data-id")
          const itemIndex = cart.findIndex((item) => item.id === id)

          cart[itemIndex].quantity += 1
          localStorage.setItem("foodzyCart", JSON.stringify(cart))
          location.reload() // Reload to update cart
        })
      })

      removeButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const id = this.getAttribute("data-id")
          cart = cart.filter((item) => item.id !== id)
          localStorage.setItem("foodzyCart", JSON.stringify(cart))
          location.reload() // Reload to update cart
        })
      })
    }
  }

  // Buy Now button
  const buyNowBtn = document.getElementById("buyNowBtn")

  if (buyNowBtn) {
    buyNowBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        alert("Your cart is empty. Add some items before checkout.")
      } else {
        window.location.href = "checkout.html"
      }
    })
  }

  // Render order items on checkout page
  const orderItemsContainer = document.getElementById("orderItems")

  if (orderItemsContainer) {
    let orderHTML = ""
    let subtotal = 0

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity
      subtotal += itemTotal

      orderHTML += `
                <div class="order-item">
                    <div class="order-item-img">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="order-item-details">
                        <div class="order-item-name">${item.name}</div>
                        <div class="order-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
                    </div>
                    <div class="order-item-quantity">$${itemTotal.toFixed(2)}</div>
                </div>
            `
    })

    orderItemsContainer.innerHTML = orderHTML

    // Calculate and display totals
    const tax = subtotal * 0.1 // 10% tax
    const deliveryFee = 2.99
    const total = subtotal + tax + deliveryFee

    document.getElementById("checkoutSubtotal").textContent = `$${subtotal.toFixed(2)}`
    document.getElementById("checkoutTax").textContent = `$${tax.toFixed(2)}`
    document.getElementById("checkoutTotal").textContent = `$${total.toFixed(2)}`
  }

  // Place Order button
  const placeOrderBtn = document.getElementById("placeOrderBtn")
  const orderConfirmation = document.getElementById("orderConfirmation")
  const backToHomeBtn = document.getElementById("backToHomeBtn")

  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", () => {
      const fullName = document.getElementById("fullName").value
      const phone = document.getElementById("phone").value
      const email = document.getElementById("email").value
      const address = document.getElementById("address").value
      const city = document.getElementById("city").value
      const zipCode = document.getElementById("zipCode").value

      // Simple validation
      if (fullName && phone && email && address && city && zipCode) {
        // Generate random order number
        const orderNumber = Math.floor(100000 + Math.random() * 900000)
        document.getElementById("orderNumber").textContent = orderNumber

        // Show confirmation
        orderConfirmation.style.display = "flex"

        // Clear cart
        localStorage.removeItem("foodzyCart")
      } else {
        alert("Please fill in all required fields")
      }
    })
  }

  if (backToHomeBtn) {
    backToHomeBtn.addEventListener("click", () => {
      window.location.href = "home.html"
    })
  }

  // Logout functionality
  const logoutBtn = document.querySelector(".logout-btn")

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      // In a real app, you would handle server-side logout
      window.location.href = "index.html"
    })
  }

  // Contact form submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const name = document.getElementById("name").value
      const email = document.getElementById("contactEmail").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Simple validation
      if (name && email && subject && message) {
        alert("Thank you for your message! We will get back to you soon.")
        contactForm.reset()
      } else {
        alert("Please fill in all fields")
      }
    })
  }
})

