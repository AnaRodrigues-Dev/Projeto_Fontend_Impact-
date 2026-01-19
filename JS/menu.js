if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

const dropdownBtns = document.querySelectorAll('.dropdown-btn');

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

document.addEventListener('DOMContentLoaded', () => {
    dropdownBtns.forEach(btn => {
        const content = btn.nextElementSibling;
        content.classList.remove('show');
        btn.classList.remove('active');
    });
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});