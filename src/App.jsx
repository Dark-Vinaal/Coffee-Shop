import React, { useRef, useState } from "react";
import "./App.css";

const App = () => {
  const coffeeMenu = [
    {
      id: 1,
      name: "Espresso",
      description: "Rich & intense",
      price: 3,
      icon: "☕",
    },
    {
      id: 2,
      name: "Latte",
      description: "Smooth & creamy",
      price: 4,
      icon: "🥛",
    },
    {
      id: 3,
      name: "Cappuccino",
      description: "Bold & foamy",
      price: 4.5,
      icon: "☕",
    },
    {
      id: 4,
      name: "Americano",
      description: "Classic & strong",
      price: 3.5,
      icon: "🫘",
    },
    {
      id: 5,
      name: "Mocha",
      description: "Chocolate & coffee",
      price: 5,
      icon: "🍫",
    },
    {
      id: 6,
      name: "Cold Coffee",
      description: "Chilled & refreshing",
      price: 5.5,
      icon: "🧊",
    },
  ];

  const [order, setOrder] = useState([]);
  const [name, setName] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [message, setMessage] = useState("");
  const cartRef = useRef(null);

  const addToOrder = (coffee) => {
    setOrder([...order, coffee]);
  };

  const removeFromOrder = (index) => {
    setOrder(order.filter((_, i) => i !== index));
  };

  const clearOrder = () => {
    setOrder([]);
  };

  const openCart = () => {
    cartRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const openCheckout = () => {
    if (order.length === 0) {
      setMessage("Your cart is empty!");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setShowCheckout(true);
  };

  const placeOrder = () => {
    if (!name.trim()) return;

    setShowCheckout(false);
    setMessage(`🛍️ Order placed successfully! Thank you, ${name}.`);
    setOrder([]);
    setName("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  const total = order.reduce((sum, coffee) => sum + coffee.price, 0);

  return (
    <div className="app">
      {message && (
        <div className="toast">
          <span>✓</span>
          {message}
        </div>
      )}

      {showCheckout && (
        <div className="modal-overlay">
          <div className="checkout-modal">
            <button
              className="modal-close"
              onClick={() => setShowCheckout(false)}
            >
              ×
            </button>

            <div className="modal-icon">☕</div>

            <p className="modal-label">ALMOST THERE</p>
            <h2>Complete Your Order</h2>

            <p className="modal-description">
              Enter your name and we'll start preparing your coffee.
            </p>

            <label>Your Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              autoFocus
            />

            <div className="modal-total">
              <span>Order Total</span>
              <strong>${total.toFixed(2)}</strong>
            </div>

            <button
              className="confirm-order"
              onClick={placeOrder}
              disabled={!name.trim()}
            >
              Confirm Order →
            </button>
          </div>
        </div>
      )}

      <header>
        <div className="brand">
          <div className="logo">☕</div>
          <div>
            <h1>BREW.</h1>
            <p>COFFEE HOUSE</p>
          </div>
        </div>

        <button className="order-count" onClick={openCart}>
          <span>🛒</span>
          <span>{order.length}</span>
        </button>
      </header>

      <main>
        <section className="hero">
          <span className="tag">FRESHLY BREWED</span>
          <h2>
            Good coffee.
            <br />
            <span>Better days.</span>
          </h2>
          <p>
            Choose your favourite brew and we'll make it just the way you like
            it.
          </p>
        </section>

        <div className="shop">
          <section className="menu-section">
            <div className="section-title">
              <div>
                <p>OUR SELECTION</p>
                <h2>Coffee Menu</h2>
              </div>
              <span>{coffeeMenu.length} drinks</span>
            </div>

            <div className="coffee-grid">
              {coffeeMenu.map((coffee) => (
                <div className="coffee-card" key={coffee.id}>
                  <div className="coffee-icon">{coffee.icon}</div>

                  <div className="coffee-info">
                    <h3>{coffee.name}</h3>
                    <p>{coffee.description}</p>

                    <div className="coffee-bottom">
                      <strong>${coffee.price.toFixed(2)}</strong>

                      <button
                        onClick={() => addToOrder(coffee)}
                        title={`Add ${coffee.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="order-section" ref={cartRef}>
            <div className="order-header">
              <div>
                <p>YOUR CART</p>
                <h2>Your Order</h2>
              </div>

              <span>
                {order.length} {order.length === 1 ? "item" : "items"}
              </span>
            </div>

            {order.length > 0 ? (
              <>
                <div className="order-list">
                  {order.map((coffee, index) => (
                    <div className="order-item" key={index}>
                      <div className="mini-icon">{coffee.icon}</div>

                      <div className="item-info">
                        <h4>{coffee.name}</h4>
                        <p>${coffee.price.toFixed(2)}</p>
                      </div>

                      <button
                        className="remove"
                        onClick={() => removeFromOrder(index)}
                        title="Remove item"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="summary">
                  <div>
                    <span>Items</span>
                    <span>{order.length}</span>
                  </div>

                  <div className="total">
                    <span>Total</span>
                    <strong>${total.toFixed(2)}</strong>
                  </div>
                </div>

                <button className="checkout" onClick={openCheckout}>
                  Place Order →
                </button>

                <button className="clear" onClick={clearOrder}>
                  Clear Order
                </button>
              </>
            ) : (
              <div className="empty">
                <div>☕</div>
                <h3>Your cup is empty</h3>
                <p>Add something delicious from our menu.</p>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer>
        <marquee
          behavior="alternate"
          direction="right"
          scrollAmount="3"
          className="brand-marquee"
        >
          <p>☕ BREW. Coffee House</p>
          <span>Made fresh, served with love.</span>
        </marquee>
      </footer>
    </div>
  );
};

export default App;
