class MenuHeaderIntegration {
  constructor(config = {}) {
    this.config = {
      menuContainerId: config.menuContainerId || 'menu-container',
      headerMenuId: config.headerMenuId || 'header-menu',
      submenuClass: config.submenuClass || 'submenu-box',
      activeClass: config.activeClass || 'active',
      ...config
    };
    this.menuData = [];
    this.activeSubmenu = null;
    this.init();
  }

  init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    this.extractMenuData();
    this.injectMenuIntoHeader();
    this.attachEventListeners();
    this.setupClickOutside();
  }

  extractMenuData() {
    const menuContainer = document.getElementById(this.config.menuContainerId);
    if (!menuContainer) return;

    const menuItems = menuContainer.querySelectorAll(':scope > ul > li, :scope > li');
    this.menuData = Array.from(menuItems).map(item => {
      const link = item.querySelector('a');
      const submenu = item.querySelector('ul');
      return {
        text: link ? link.textContent.trim() : item.textContent.trim(),
        href: link ? link.getAttribute('href') : '#',
        hasSubmenu: !!submenu,
        submenuItems: submenu ? this.extractSubmenuItems(submenu) : []
      };
    });
  }

  extractSubmenuItems(submenu) {
    const items = submenu.querySelectorAll(':scope > li');
    return Array.from(items).map(item => {
      const link = item.querySelector('a');
      return {
        text: link ? link.textContent.trim() : item.textContent.trim(),
        href: link ? link.getAttribute('href') : '#'
      };
    });
  }

  injectMenuIntoHeader() {
    const headerMenu = document.getElementById(this.config.headerMenuId);
    if (!headerMenu) return;

    headerMenu.innerHTML = '';
    const menuList = document.createElement('ul');
    menuList.className = 'header-menu-list';

    this.menuData.forEach((item, index) => {
      const menuItem = this.createMenuItem(item, index);
      menuList.appendChild(menuItem);
    });

    headerMenu.appendChild(menuList);
  }

  createMenuItem(item, index) {
    const li = document.createElement('li');
    li.className = 'header-menu-item';
    li.dataset.menuIndex = index;

    const link = document.createElement('a');
    link.href = item.hasSubmenu ? '#' : item.href;
    link.textContent = item.text;
    link.className = 'header-menu-link';

    if (item.hasSubmenu) {
      link.classList.add('has-submenu');
      const arrow = document.createElement('span');
      arrow.className = 'submenu-arrow';
      arrow.innerHTML = ' ▼';
      link.appendChild(arrow);
    }

    li.appendChild(link);

    if (item.hasSubmenu) {
      const submenuBox = this.createSubmenuBox(item.submenuItems, index);
      li.appendChild(submenuBox);
    }

    return li;
  }

  createSubmenuBox(items, parentIndex) {
    const submenuBox = document.createElement('div');
    submenuBox.className = this.config.submenuClass;
    submenuBox.dataset.parentIndex = parentIndex;
    submenuBox.style.display = 'none';

    const submenuList = document.createElement('ul');
    submenuList.className = 'submenu-list';

    items.forEach(item => {
      const li = document.createElement('li');
      li.className = 'submenu-item';
      const link = document.createElement('a');
      link.href = item.href;
      link.textContent = item.text;
      link.className = 'submenu-link';
      li.appendChild(link);
      submenuList.appendChild(li);
    });

    submenuBox.appendChild(submenuList);
    return submenuBox;
  }

  attachEventListeners() {
    const headerMenu = document.getElementById(this.config.headerMenuId);
    if (!headerMenu) return;

    headerMenu.addEventListener('click', (e) => {
      const menuLink = e.target.closest('.header-menu-link');
      if (!menuLink) return;

      const menuItem = menuLink.closest('.header-menu-item');
      const hasSubmenu = menuLink.classList.contains('has-submenu');

      if (hasSubmenu) {
        e.preventDefault();
        this.toggleSubmenu(menuItem);
      }
    });
  }

  toggleSubmenu(menuItem) {
    const submenuBox = menuItem.querySelector(`.${this.config.submenuClass}`);
    if (!submenuBox) return;

    const isActive = submenuBox.style.display === 'block';
    this.closeAllSubmenus();

    if (!isActive) {
      submenuBox.style.display = 'block';
      menuItem.classList.add(this.config.activeClass);
      this.activeSubmenu = submenuBox;
      this.positionSubmenu(menuItem, submenuBox);
    } else {
      this.activeSubmenu = null;
    }
  }

  positionSubmenu(menuItem, submenuBox) {
    submenuBox.style.position = 'absolute';
    submenuBox.style.top = '100%';
    submenuBox.style.left = '0';
    submenuBox.style.minWidth = '200px';
    
    setTimeout(() => {
      const submenuRect = submenuBox.getBoundingClientRect();
      if (submenuRect.right > window.innerWidth) {
        submenuBox.style.left = 'auto';
        submenuBox.style.right = '0';
      }
    }, 0);
  }

  closeAllSubmenus() {
    const allSubmenus = document.querySelectorAll(`.${this.config.submenuClass}`);
    const allMenuItems = document.querySelectorAll('.header-menu-item');
    
    allSubmenus.forEach(submenu => submenu.style.display = 'none');
    allMenuItems.forEach(item => item.classList.remove(this.config.activeClass));
    this.activeSubmenu = null;
  }

  setupClickOutside() {
    document.addEventListener('click', (e) => {
      const headerMenu = document.getElementById(this.config.headerMenuId);
      if (!headerMenu) return;
      
      const isClickInside = headerMenu.contains(e.target);
      if (!isClickInside && this.activeSubmenu) {
        this.closeAllSubmenus();
      }
    });
  }

  reload() {
    this.setup();
  }

  destroy() {
    const headerMenu = document.getElementById(this.config.headerMenuId);
    if (headerMenu) headerMenu.innerHTML = '';
    this.closeAllSubmenus();
  }
}

function initMenuIntegration(config) {
  return new MenuHeaderIntegration(config);
}

if (typeof window !== 'undefined') {
  window.MenuHeaderIntegration = MenuHeaderIntegration;
  window.initMenuIntegration = initMenuIntegration;
}

document.addEventListener('DOMContentLoaded', () => {
  if (!window.menuIntegration) {
    window.menuIntegration = initMenuIntegration();
  }
});