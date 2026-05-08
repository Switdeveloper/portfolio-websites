import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, itemCount, total, updateQuantity, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <span className="text-6xl mb-4 block">🪴</span>
        <h2 className="font-display text-2xl font-semibold text-verdant-700 mb-3">Your cart is empty</h2>
        <p className="text-verdant-400 mb-8">Time to find your next green companion!</p>
        <Link to="/shop" className="btn-primary inline-block">
          Browse Plants →
        </Link>
      </div>
    );
  }

  const shipping = total >= 50 ? 0 : 9.99;
  const tax = total * 0.08;
  const grand = total + shipping + tax;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-verdant-700">Your Cart</h1>
          <p className="text-verdant-400 mt-1">{itemCount} item{itemCount !== 1 ? 's' : ''} in your cart</p>
        </div>
        <button onClick={clearCart} className="text-sm text-verdant-400 hover:text-red-500 transition-colors">
          Clear Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-2xl p-5 shadow-sm flex gap-5">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <p className="text-xs font-medium text-verdant-400 uppercase">{item.category}</p>
                    <h3 className="font-display text-lg font-semibold text-verdant-700 truncate">{item.name}</h3>
                    <p className="text-sm text-verdant-500 mt-0.5">${item.price.toFixed(2)} each</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-verdant-300 hover:text-red-400 transition-colors p-1"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg border border-verdant-200 flex items-center justify-center text-verdant-600 hover:bg-verdant-50 transition-colors"
                    >
                      −
                    </button>
                    <span className="font-medium text-verdant-700 w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg border border-verdant-200 flex items-center justify-center text-verdant-600 hover:bg-verdant-50 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-display text-lg font-bold text-verdant-600">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
            <h3 className="font-display text-lg font-semibold text-verdant-700 mb-5">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-verdant-600">
                <span>Subtotal ({itemCount} items)</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-verdant-600">
                <span>Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-verdant-500">FREE</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-verdant-400">Free shipping on orders over $50</p>
              )}
              <div className="flex justify-between text-verdant-600">
                <span>Estimated Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-verdant-100 pt-3">
                <div className="flex justify-between font-bold text-verdant-700">
                  <span>Total</span>
                  <span className="font-display text-xl">${grand.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Promo code */}
            <div className="mt-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 px-3 py-2.5 border border-verdant-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-verdant-400"
                />
                <button className="px-4 py-2.5 bg-verdant-50 text-verdant-600 rounded-xl text-sm font-medium hover:bg-verdant-100 transition-colors">
                  Apply
                </button>
              </div>
            </div>

            <button className="btn-primary w-full mt-4 text-center">
              Proceed to Checkout →
            </button>

            <Link to="/shop" className="block text-center mt-3 text-sm text-verdant-400 hover:text-verdant-600 transition-colors">
              Continue Shopping
            </Link>

            {/* Trust badges */}
            <div className="mt-5 pt-4 border-t border-verdant-100 flex justify-center gap-4 text-verdant-300">
              <span title="Secure checkout">🔒</span>
              <span title="30-day guarantee">✅</span>
              <span title="Free returns">↩️</span>
              <span title="Carbon neutral">🌱</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}