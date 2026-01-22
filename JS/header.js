if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

const menuButton = document.querySelector('.menu-button');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const dropdownBtns = document.querySelectorAll('.dropdown-btn');

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

dropdownBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const content = this.nextElementSibling;
        const isOpen = this.classList.contains('active');
        
        if (isOpen) {
            content.classList.remove('show');
            this.classList.remove('active');
        } else {
            const parent = this.closest('ul');
            const siblings = parent.querySelectorAll(':scope > li > .dropdown-btn.active');
            
            siblings.forEach(sibling => {
                if (sibling !== this) {
                    sibling.nextElementSibling.classList.remove('show');
                    sibling.classList.remove('active');
                }
            });
            
            content.classList.add('show');
            this.classList.add('active');
        }
    });
});

const headerDropdowns = document.querySelectorAll('#header-menu .has-dropdown');

headerDropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('a');
    
    trigger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        headerDropdowns.forEach(other => {
            if (other !== dropdown) {
                other.classList.remove('active');
            }
        });
        
        dropdown.classList.toggle('active');
    });
});

document.addEventListener('click', function(e) {
    if (!e.target.closest('#header-menu .has-dropdown')) {
        headerDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

function updateCartBadge() {
    const cartCount = document.querySelector('.cart-count');
    const itemCount = 0;
    
    cartCount.textContent = itemCount;
    
    if (itemCount > 0) {
        cartCount.style.display = 'flex';
    } else {
        cartCount.style.display = 'none';
    }
}

let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    
    dropdownBtns.forEach(btn => {
        const content = btn.nextElementSibling;
        content.classList.remove('show');
        btn.classList.remove('active');
    });
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});