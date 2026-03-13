export function calculateTotal(cartItems) {
  return cartItems.reduce(
    (total, item) => total + item.product.productPrice * item.quantity,
    0
  );
}

// This returns the discounted price after applying button discount
export function calculateButtonDiscount(price, discountPercent) {
  return price - (price * discountPercent) / 100;
}

export function getCouponDiscount(couponCode, totalAmount) {
  let discountPercent = 0;

  switch (couponCode) {
    case "Naveen10":
      discountPercent = 10;
      break;
    case "Naveen20":
      discountPercent = 20;
      break;
    case "Naveen30":
      discountPercent = 30;
      break;
    default:
      discountPercent = 0;
  }

  const discountAmount = (totalAmount * discountPercent) / 100;

  return {
    isValid: discountPercent > 0,  
    discountPercent,
    discountAmount,
  };
}
