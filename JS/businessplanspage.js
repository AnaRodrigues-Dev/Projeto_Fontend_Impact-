document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.plan-card__button');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            alert(`Um email será encaminhado para você com todas as informações de contratação.`);
        });
    });

    const navLinks = document.querySelectorAll('.nav-list a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});