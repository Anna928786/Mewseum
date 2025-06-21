//圖片資料
const images = [
    '../img/singleshoppage/canvasprint.svg',
    '../img/singleshoppage/2.svg',
    '../img/singleshoppage/3.svg',
    '../img/singleshoppage/4.svg'
];

//電腦小圖換大圖
class DesktopGallery {
    constructor(){
        this.mainImage = document.getElementById('mainImage');
        this.thumbnails = document.querySelectorAll('.thumbnail');
        this.init();
    }

    init(){
        this.thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                this.changeMainImage(index);
                this.updateActiveThumbnail(index);
            });
        });
    }

    changeMainImage(index) {
        this.mainImage.style.opacity = '0';
        setTimeout(() => {
            this.mainImage.src = images[index];
            this.mainImage.style.opacity = '1';
        }, 150);
    }

    updateActiveThumbnail(activeIndex) {
        this.thumbnails.forEach((thumbnail, index) => {
            thumbnail.classList.toggle('active', index === activeIndex);
        })
    }
}

//手機板輪播
class MobileCarousel {
    constructor() {
        this.container = document.getElementById('carouselContainer');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.navDots = document.querySelectorAll('.nav_dot');
        this.currentSlide = 0;
        this.totalSlides = images.length;
        this.isTransitioning = false;
        this.init();
    }

    init() {
        //箭頭按鈕事件
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        //導航點事件
        this.navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        }); 

        //觸摸滑動事件
        this.initTouchEvents();
    }   

    prevSlide() {
        if (this.isTransitioning) return;
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlide();
    }

    nextSlide() {
        if (this.isTransitioning) return;
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlide();
    }

    goToSlide(index) {
        if (this.isTransitioning) return;
        this.currentSlide = index;
        this.updateSlide();
    }

    updateSlide() {
        this.isTransitioning = true;
        const translateX = -this.currentSlide * 100;
        this.container.style.transform = `translateX(${translateX}%)`;

        // 更新導航點
        this.navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });

        // 等待過渡動畫完成
        setTimeout(() => {
            this.isTransitioning = false;
        }, 300);
    }

    initTouchEvents() {
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let isDragging = false;
        let hasTriggered = false;

        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
            hasTriggered = false;
        }, { passive: true });

        this.container.addEventListener('touchmove', (e) => {
            if (!isDragging || hasTriggered || this.isTransitioning) return;
            
            currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = startX - currentX;
            const diffY = startY - currentY;
            
            // 確保是水平滑動而非垂直滑動
            if (Math.abs(diffY) > Math.abs(diffX)) {
                return;
            }
            
            // 防止頁面垂直滾動
            e.preventDefault();
            
            // 觸發距離
            if (Math.abs(diffX) > 80) {
                hasTriggered = true;
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        }, { passive: false });

        this.container.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            // 如果在touchmove中沒有觸發，在touchend時檢查
            if (!hasTriggered && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            
            isDragging = false;
            hasTriggered = false;
        }, { passive: true });

        // 取消觸摸事件
        this.container.addEventListener('touchcancel', () => {
            isDragging = false;
            hasTriggered = false;
        }, { passive: true });
    }

    startAutoPlay(interval = 3000) {
        setInterval(() => {
            if (!this.isTransitioning) {
                this.nextSlide();
            }
        }, interval);
    }
}


        // 數量選擇器功能
        class QuantitySelector {
            constructor() {
                this.input = document.querySelector('input[type="number"]');
                this.decreaseBtn = document.getElementById('decreaseBtn');
                this.increaseBtn = document.getElementById('increaseBtn');
                this.init();
            }

            init() {
                this.decreaseBtn.addEventListener('click', () => this.decrease());
                this.increaseBtn.addEventListener('click', () => this.increase());
                this.input.addEventListener('change', () => this.validateInput());
            }

            decrease() {
                const currentValue = parseInt(this.input.value);
                if (currentValue > 1) {
                    this.input.value = currentValue - 1;
                }
            }

            increase() {
                const currentValue = parseInt(this.input.value);
                this.input.value = currentValue + 1;
            }

            validateInput() {
                const value = parseInt(this.input.value);
                if (isNaN(value) || value < 1) {
                    this.input.value = 1;
                }
            }
        }

        // 購物車和收藏功能
        class ProductActions {
            constructor() {
                this.addToCartBtn = document.getElementById('addToCartBtn');
                this.wishlistBtn = document.getElementById('wishlistBtn');
                this.quantityInput = document.querySelector('input[type="number"]');
                this.init();
            }

            init() {
                this.addToCartBtn.addEventListener('click', () => this.addToCart());
                this.wishlistBtn.addEventListener('click', () => this.toggleWishlist());
            }

            addToCart() {
                const quantity = parseInt(this.quantityInput.value);
                
                // 添加載入動畫
                this.addToCartBtn.innerHTML = '加入中...';
                this.addToCartBtn.disabled = true;
                
                // 模擬添加到購物車的過程
                setTimeout(() => {
                    alert(`已加入 ${quantity} 件商品到購物車！`);
                    this.addToCartBtn.innerHTML = `
                <span style="font-size: 16px;">加入購物車</span>
                <img src="../img/icon/cart_white.png" alt="購物車" style="width: 20px; height: 20px;">`;
                    this.addToCartBtn.disabled = false;
                }, 1000);
            }

            toggleWishlist() {
                const isWishlisted = this.wishlistBtn.classList.contains('wishlisted');
                
                if (isWishlisted) {
                    this.wishlistBtn.classList.remove('wishlisted');
                    this.wishlistBtn.style.backgroundColor = '#FFFFFF';
                    alert('已從收藏清單移除');
                } else {
                    this.wishlistBtn.classList.add('wishlisted');
                    this.wishlistBtn.style.backgroundColor = '#FF729A';
                    alert('已加入收藏清單');
                }
            }
        } 

//初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    new DesktopGallery();
    new MobileCarousel();
    new QuantitySelector();
    new ProductActions();
});