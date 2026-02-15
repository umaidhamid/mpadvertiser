export const getCart = () => {
    if (typeof window === "undefined") return [];
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (product) => {
    const cart = getCart();

    const existing = cart.find(item => item._id === product._id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            _id: product._id,
            name: product.name,
            price: product.finalprice,
            image: product.image?.url,
            quantity: 1,
        });
    }

    saveCart(cart);
};
