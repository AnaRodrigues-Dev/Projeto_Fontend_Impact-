const menuButton = document.querySelector('.menu-button');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

function toggleSidebar() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    
    const icon = menuButton.querySelector('i');
    if (sidebar.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

menuButton.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', toggleSidebar);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        toggleSidebar();
    }
});

function updateCartBadge() {
    const cartCount = document.querySelector('.cart-count');
    const itemCount = 0;
    
    cartCount.textContent = itemCount;
    
    if (itemCount == 0) {
        cartCount.style.display = 'none';
    } else {
        cartCount.style.display = 'inline-block';
    }
}

let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});