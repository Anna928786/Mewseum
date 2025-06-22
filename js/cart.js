
// 購物車數量控制功能
function changeQuantity(productId, change) {
    // 取得目前數量元素
    const quantityElement = document.getElementById(`quantity-${productId}`);
    // 取得目前數量值
    let currentQuantity = parseInt(quantityElement.textContent);
    
    // 計算新數量（最小為1）
    const newQuantity = Math.max(1, currentQuantity + change);
    
    // 更新數量顯示
    quantityElement.textContent = newQuantity;
    
    // 更新該商品的小計
    updateSubtotal(productId, newQuantity);
    
    // 更新總計
    updateCartTotal();
}

// 更新單一商品小計
function updateSubtotal(productId, quantity) {
    // 根據商品ID獲取單價
    const prices = {
        1: 950,  // 橘貓與他的珍珠耳環
        2: 1000  // 拿破貓
    };
    
    const price = prices[productId];
    
    // 計算小計
    const subtotal = price * quantity;
    
    // 更新小計顯示，保留移除按鈕
    const subtotalElement = document.getElementById(`subtotal-${productId}`);
    const removeButton = subtotalElement.querySelector('.remove_item');
    subtotalElement.innerHTML = `$${subtotal.toLocaleString()} `;
    subtotalElement.appendChild(removeButton);
}

// 更新購物車總計
function updateCartTotal() {
    let total = 0;
    
    // 遍歷所有商品計算總金額
    document.querySelectorAll('[id^="subtotal-"]').forEach(subtotalElement => {
        // 只取價格部分，排除按鈕文字
        const priceText = subtotalElement.textContent.split(' ')[0]; // 取第一個部分（價格）
        const subtotalValue = parseInt(priceText.replace('$', '').replace(/,/g, ''));
        total += subtotalValue;
    });
    
    // 更新總計顯示
    document.getElementById('cart-subtotal').textContent = `$${total.toLocaleString()}`;
    document.getElementById('cart-total').textContent = `$${total.toLocaleString()}`;
}


// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', function() {
    // 確保總計正確顯示
    updateCartTotal();
    
    console.log('購物車功能已載入');
});