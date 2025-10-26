// Функция для управления выпадающими списками (контакты и языки)
function initDropdowns() {
    let isContactOpen = false;
    let isLanguageOpen = false;
    let isLanguage2Open = false;
    let currentLanguage = 'UA';

    function toggleDropdown() {
        const content = document.getElementById('dropdownContent');
        const arrow = document.getElementById('dropdownArrow');

        if (isLanguageOpen) {
            toggleDropdownLanguage();
        }
        if (isLanguage2Open) {
            toggleDropdownLanguage2();
        }

        isContactOpen = !isContactOpen;
        if (content) content.classList.toggle('open');
        if (arrow) arrow.classList.toggle('open');
    }

    function toggleDropdownLanguage() {
        const menu = document.getElementById('dropdownMenuLanguage');
        const arrow = document.getElementById('dropdownArrowLanguage');

        if (isContactOpen) {
            toggleDropdown();
        }
        if (isLanguage2Open) {
            toggleDropdownLanguage2();
        }

        isLanguageOpen = !isLanguageOpen;

        if (menu && arrow) {
            if (isLanguageOpen) {
                menu.classList.add('open');
                arrow.classList.add('open');
            } else {
                menu.classList.remove('open');
                arrow.classList.remove('open');
            }
        }
    }

    function toggleDropdownLanguage2() {
        const menu = document.getElementById('dropdownMenuLanguage2');
        const arrow = document.getElementById('dropdownArrowLanguage2');

        if (isContactOpen) {
            toggleDropdown();
        }
        if (isLanguageOpen) {
            toggleDropdownLanguage();
        }

        isLanguage2Open = !isLanguage2Open;

        if (menu && arrow) {
            if (isLanguage2Open) {
                menu.classList.add('open');
                arrow.classList.add('open');
            } else {
                menu.classList.remove('open');
                arrow.classList.remove('open');
            }
        }
    }

    function closeAllDropdowns() {
        if (isContactOpen) {
            isContactOpen = false;
            const content = document.getElementById('dropdownContent');
            const arrow = document.getElementById('dropdownArrow');
            if (content) content.classList.remove('open');
            if (arrow) arrow.classList.remove('open');
        }

        if (isLanguageOpen) {
            isLanguageOpen = false;
            const menu = document.getElementById('dropdownMenuLanguage');
            const arrow = document.getElementById('dropdownArrowLanguage');
            if (menu) menu.classList.remove('open');
            if (arrow) arrow.classList.remove('open');
        }

        if (isLanguage2Open) {
            isLanguage2Open = false;
            const menu = document.getElementById('dropdownMenuLanguage2');
            const arrow = document.getElementById('dropdownArrowLanguage2');
            if (menu) menu.classList.remove('open');
            if (arrow) arrow.classList.remove('open');
        }
    }

    function selectLanguage(code, event) {
        currentLanguage = code;
        
        // Обновляем текст в обоих дропдаунах
        const languageText1 = document.getElementById('selectedLanguage');
        const languageText2 = document.getElementById('selectedLanguage2');
        
        if (languageText1) languageText1.textContent = code;
        if (languageText2) languageText2.textContent = code;

        const options = document.querySelectorAll('.header__promo-language-dropdown-option');
        options.forEach(option => {
            option.classList.remove('active');
        });

        if (event && event.target) {
            event.target.classList.add('active');
        }
        
        // Закрываем оба дропдауна
        if (isLanguageOpen) toggleDropdownLanguage();
        if (isLanguage2Open) toggleDropdownLanguage2();
    }

    // Закрытие дропдаунов при клике на кнопку модального окна
    const openModalBtn = document.getElementById('openwriteUsModal');
    if (openModalBtn) {
        openModalBtn.addEventListener('click', function () {
            closeAllDropdowns();
        });
    }

    // Закрытие дропдаунов при клике вне их области
    document.addEventListener('click', function (event) {
        const contactDropdown = document.querySelector('.header__promo-dropdown');
        const languageDropdowns = document.querySelectorAll('.header__promo-language-dropdown');

        if (contactDropdown && !contactDropdown.contains(event.target) && isContactOpen) {
            isContactOpen = false;
            const content = document.getElementById('dropdownContent');
            const arrow = document.getElementById('dropdownArrow');
            if (content) content.classList.remove('open');
            if (arrow) arrow.classList.remove('open');
        }

        // Проверяем клик вне каждого языкового дропдауна
        let clickedInsideAnyLanguageDropdown = false;
        languageDropdowns.forEach(dropdown => {
            if (dropdown.contains(event.target)) {
                clickedInsideAnyLanguageDropdown = true;
            }
        });

        if (!clickedInsideAnyLanguageDropdown) {
            if (isLanguageOpen) {
                isLanguageOpen = false;
                const menu = document.getElementById('dropdownMenuLanguage');
                const arrow = document.getElementById('dropdownArrowLanguage');
                if (menu) menu.classList.remove('open');
                if (arrow) arrow.classList.remove('open');
            }
            
            if (isLanguage2Open) {
                isLanguage2Open = false;
                const menu = document.getElementById('dropdownMenuLanguage2');
                const arrow = document.getElementById('dropdownArrowLanguage2');
                if (menu) menu.classList.remove('open');
                if (arrow) arrow.classList.remove('open');
            }
        }
    });

    // Глобальные функции для доступа извне
    window.toggleDropdown = toggleDropdown;
    window.toggleDropdownLanguage = toggleDropdownLanguage;
    window.toggleDropdownLanguage2 = toggleDropdownLanguage2;
    window.selectLanguage = selectLanguage;
    window.closeAllDropdowns = closeAllDropdowns;
}

function initHeader() {
  const selectors = {
    overlay: '[data-js-header-overlay]',
    burgerButton: '[data-js-header-burger-button]',
    closeButton: '.header-burger__menu-close',
    menuLinks: '.header-burger__menu-main-link',
    supportButton: '.header-burger__menu-btn',
    hiddenMenu: '.header-burger__menu-top-hidden',
    backButton1: '#back1',
    burgerFormButton: '#burgerform',
    emailMenu: '.header-burger__menu-top-hidden-email',
    backButton2: '#back2',
    closeModal2: '#closeModal2',
    callForm2: '#callForm2',
    burgerMenu: '.header-burger__menu',
  };

  const stateClasses = {
    isActive: 'is-active',
    isLock: 'is-lock',
    isOpen: 'is-open',
  };

  // Ищем элементы
  const overlayElement = document.querySelector(selectors.overlay);
  const burgerButtonElement = document.querySelector(selectors.burgerButton);
  const closeButtonElement = document.querySelector(selectors.closeButton);
  const menuLinks = document.querySelectorAll(selectors.menuLinks);
  const supportButton = document.querySelector(selectors.supportButton);
  const hiddenMenu = document.querySelector(selectors.hiddenMenu);
  const backButton1 = document.querySelector(selectors.backButton1);
  const burgerFormButton = document.querySelector(selectors.burgerFormButton);
  const emailMenu = document.querySelector(selectors.emailMenu);
  const backButton2 = document.querySelector(selectors.backButton2);
  const closeModal2 = document.querySelector(selectors.closeModal2);
  const callForm2 = document.querySelector(selectors.callForm2);
  const burgerMenu = document.querySelector(selectors.burgerMenu);

  if (!burgerButtonElement || !overlayElement) {
    console.warn('Burger button or overlay not found');
    return;
  }

  // Функция блокировки скролла
  function lockScroll() {
    document.documentElement.classList.add(stateClasses.isLock);
    document.body.classList.add(stateClasses.isLock);
  }

  // Функция разблокировки скролла
  function unlockScroll() {
    document.documentElement.classList.remove(stateClasses.isLock);
    document.body.classList.remove(stateClasses.isLock);
  }

  // Функция открытия главного меню
  function openMenu() {
    burgerButtonElement.classList.add(stateClasses.isActive);
    overlayElement.classList.add(stateClasses.isActive);
    lockScroll();
  }

  // Функция закрытия главного меню
  function closeMenu() {
    burgerButtonElement.classList.remove(stateClasses.isActive);
    overlayElement.classList.remove(stateClasses.isActive);
    unlockScroll();
    
    // Закрываем все вложенные меню
    if (hiddenMenu) {
      hiddenMenu.classList.remove(stateClasses.isOpen);
    }
    if (emailMenu) {
      emailMenu.classList.remove(stateClasses.isOpen);
    }
  }

  // Переключение главного меню
  function toggleMenu() {
    if (overlayElement.classList.contains(stateClasses.isActive)) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Открытие меню "Підтримка"
  function openHiddenMenu(e) {
    e.preventDefault();
    if (hiddenMenu) {
      hiddenMenu.classList.add(stateClasses.isOpen);
    }
  }

  // Закрытие меню "Підтримка"
  function closeHiddenMenu(e) {
    e.preventDefault();
    if (hiddenMenu) {
      hiddenMenu.classList.remove(stateClasses.isOpen);
    }
  }

  // Открытие меню с формой email
  function openEmailMenu(e) {
    e.preventDefault();
    if (emailMenu) {
      emailMenu.classList.add(stateClasses.isOpen);
    }
  }

  // Закрытие меню email
  function closeEmailMenu(e) {
    if (e) e.preventDefault();
    if (emailMenu) {
      emailMenu.classList.remove(stateClasses.isOpen);
    }
  }

  // Обработка отправки формы
  function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(callForm2);
    
    console.log('Форма отправлена');
    
    // Сбрасываем форму
    callForm2.reset();
    
    // Закрываем всё меню полностью
    closeMenu();
  }

  // События
  // Клик по бургеру
  burgerButtonElement.addEventListener('click', toggleMenu);

  // Клик по кнопке закрытия главного меню
  if (closeButtonElement) {
    closeButtonElement.addEventListener('click', closeMenu);
  }

  // Клик по ссылкам меню
  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Клик по кнопке "Підтримка"
  if (supportButton) {
    supportButton.addEventListener('click', openHiddenMenu);
  }

  // Клик по кнопке "Задати питання" (назад из меню Підтримка)
  if (backButton1) {
    backButton1.addEventListener('click', closeHiddenMenu);
  }

  // Клик по кнопке "Написати на пошту"
  if (burgerFormButton) {
    burgerFormButton.addEventListener('click', openEmailMenu);
  }

  // Клик по кнопке "Напишіть нам" (назад из формы)
  if (backButton2) {
    backButton2.addEventListener('click', closeEmailMenu);
  }

  // Клик по кнопке закрытия формы (крестик)
  if (closeModal2) {
    closeModal2.addEventListener('click', function(e) {
      e.preventDefault();
      closeEmailMenu(e);
    });
  }

  // Обработка отправки формы
  if (callForm2) {
    callForm2.addEventListener('submit', handleFormSubmit);
  }

  // Закрытие меню при клике ВНЕ области .header-burger__menu
  document.addEventListener('click', function(e) {
    // Проверяем, открыто ли меню
    if (overlayElement.classList.contains(stateClasses.isActive)) {
      // Проверяем, что клик НЕ внутри меню и НЕ по кнопке бургера
      const isClickInsideMenu = burgerMenu && burgerMenu.contains(e.target);
      const isClickOnBurger = burgerButtonElement.contains(e.target);
      
      if (!isClickInsideMenu && !isClickOnBurger) {
        closeMenu();
      }
    }
  });

  // Закрытие меню при нажатии Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (emailMenu && emailMenu.classList.contains(stateClasses.isOpen)) {
        closeEmailMenu(e);
      } else if (hiddenMenu && hiddenMenu.classList.contains(stateClasses.isOpen)) {
        closeHiddenMenu(e);
      } else if (overlayElement.classList.contains(stateClasses.isActive)) {
        closeMenu();
      }
    }
  });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', initHeader);


// Функция для управления каталогом меню
function initCatalogMenu() {
    const menuItems = document.querySelectorAll('.menu__container-list-item');
    const submenuContents = document.querySelectorAll('.menu__container-submenus-content');
    const menuContainer = document.querySelector('.menu__container');
    const catalogBtn = document.getElementById('catalogBtn');
    const html = document.documentElement;

    if (!catalogBtn || !menuContainer) {
        console.warn('Catalog menu elements are missing from the DOM');
        return;
    }

    catalogBtn.addEventListener('click', function (e) {
        e.stopPropagation();

        if (menuContainer.classList.contains('open')) {
            menuContainer.classList.remove('open');
            html.classList.remove('is-lock');
            catalogBtn.classList.remove('active');
        } else {
            menuContainer.classList.add('open');
            html.classList.add('is-lock');
            catalogBtn.classList.add('active');
        }
    });

    menuItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.stopPropagation();
            const category = this.getAttribute('data-category');

            menuItems.forEach(mi => mi.classList.remove('active'));
            this.classList.add('active');

            menuContainer.classList.add('open');
            html.classList.add('is-lock');
            catalogBtn.classList.add('active');

            submenuContents.forEach(content => {
                content.classList.remove('active');
            });

            const activeSubmenu = document.querySelector(`[data-submenu="${category}"]`);
            if (activeSubmenu) {
                activeSubmenu.classList.add('active');
            }
        });
    });

    document.addEventListener('click', function (e) {
        if (!menuContainer.contains(e.target) && !catalogBtn.contains(e.target)) {
            menuContainer.classList.remove('open');
            html.classList.remove('is-lock');
            catalogBtn.classList.remove('active');

            menuItems.forEach(mi => mi.classList.remove('active'));
        }
    });
}

// Функция для управления поиском
function initSearch() {
    const searchBtn = document.querySelector('.header__body-btn-search');
    const htmlSearch = document.documentElement;

    if (!searchBtn) {
        console.warn('Search button element is missing from the DOM');
        return;
    }

    searchBtn.addEventListener('click', function (e) {
        e.stopPropagation();

        if (!searchBtn.classList.contains('active')) {
            htmlSearch.classList.add('is-lock');
            searchBtn.classList.add('active');
        } else {
            htmlSearch.classList.remove('is-lock');
            searchBtn.classList.remove('active');
        }
    });
}

// Функция для инициализации Swiper слайдера
function initSwiper() {
    if (typeof Swiper !== 'undefined') {
        new Swiper(".hero__slider", {
            slidesPerView: 1,
            spaceBetween: 16,
            loop: true, // Додаємо безкінечний цикл
            autoplay: {
                delay: 5000, // Затримка 5 секунд між слайдами
                disableOnInteraction: false, // Автоплей продовжується після взаємодії
                pauseOnMouseEnter: true, // Пауза при наведенні миші
            },
            navigation: {
                nextEl: ".hero-swiper-next",
                prevEl: ".hero-swiper-prev",
            },
            pagination: {
                el: ".hero__slider-pagination",
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '"><span class="swiper-pagination-bullet-progress"></span></span>';
                },
            },
            breakpoints: {
                1280: {
                    slidesPerView: 3,
                },

                992: {
                    slidesPerView: 2,
                },

                768: {
                    slidesPerView: 1,
                }
            },
            // Додаємо обробник для прогрес-бару
            on: {
                init: function () {
                    updatePaginationProgress(this);
                },
                slideChange: function () {
                    updatePaginationProgress(this);
                },
                autoplayTimeLeft: function (swiper, time, progress) {
                    // Отримуємо DOM елемент пагінації
                    const paginationEl = typeof swiper.pagination.el === 'string'
                        ? document.querySelector(swiper.pagination.el)
                        : swiper.pagination.el;

                    if (paginationEl) {
                        const bullets = paginationEl.querySelectorAll('.swiper-pagination-bullet');
                        const activeIndex = swiper.realIndex;

                        bullets.forEach((bullet, index) => {
                            const progressBar = bullet.querySelector('.swiper-pagination-bullet-progress');
                            if (progressBar) {
                                if (index < activeIndex) {
                                    // Пройдені слайди - повністю заповнені
                                    progressBar.style.width = '100%';
                                } else if (index === activeIndex) {
                                    // Активний слайд - прогрес заповнення
                                    progressBar.style.width = ((1 - progress) * 100) + '%';
                                } else {
                                    // Майбутні слайди - порожні
                                    progressBar.style.width = '0%';
                                }
                            }
                        });
                    }
                }
            }
        });
    }
}

function updatePaginationProgress(swiper) {
    // Отримуємо DOM елемент пагінації
    const paginationEl = typeof swiper.pagination.el === 'string'
        ? document.querySelector(swiper.pagination.el)
        : swiper.pagination.el;

    if (paginationEl) {
        const bullets = paginationEl.querySelectorAll('.swiper-pagination-bullet-progress');
        bullets.forEach(bullet => {
            bullet.style.width = '0%';
        });
    }
}

// Хранилище инстансов Swiper
const swiperInstances = {
    popular: null,
    new: null
};

// Функция для инициализации Swiper слайдера
function initSwiperPopular() {
    if (typeof Swiper !== 'undefined') {
        // Уничтожаем предыдущий инстанс, если существует
        if (swiperInstances.popular) {
            swiperInstances.popular.destroy(true, true);
        }

        swiperInstances.popular = new Swiper(".offers__slider--popular", {
            slidesPerView: 2,
            spaceBetween: 8,
            navigation: {
                nextEl: ".offers-popular-swiper-next",
                prevEl: ".offers-popular-swiper-prev",
            },
            scrollbar: {
                el: ".offers-popular-swiper-scrollbar",
                draggable: true,
            },
            breakpoints: {
                992: {
                    slidesPerView: 3,
                },
                1280: {
                    slidesPerView: 4,
                    spaceBetween: 16,
                },
            },
            observer: true,
            observeParents: true,
        });
    }
}

// Функция для инициализации Swiper слайдера
function initSwiperShop() {
    if (typeof Swiper !== 'undefined') {
        // Уничтожаем предыдущий инстанс, если существует
        if (swiperInstances.shop) {
            swiperInstances.shop.destroy(true, true);
        }

        swiperInstances.shop = new Swiper(".shop-slider__swiper", {
            slidesPerView: 'auto',
            spaceBetween: 8,
            navigation: {
                nextEl: ".shop-slider-swiper-next",
                prevEl: ".shop-slider-swiper-prev",
            },
             breakpoints: {
                1024: {
                    spaceBetween: 16,
                },
            },
        });
    }
}

// Функция для инициализации Swiper слайдера
function initSwiperNew() {
    if (typeof Swiper !== 'undefined') {
        // Уничтожаем предыдущий инстанс, если существует
        if (swiperInstances.new) {
            swiperInstances.new.destroy(true, true);
        }

        swiperInstances.new = new Swiper(".offers__slider--new", {
            slidesPerView: 2,
            spaceBetween: 8,
            navigation: {
                nextEl: ".offers-new-swiper-next",
                prevEl: ".offers-new-swiper-prev",
            },
            scrollbar: {
                el: ".offers-new-swiper-scrollbar",
                draggable: true,
            },
            breakpoints: {
                992: {
                    slidesPerView: 3,
                },
                1280: {
                    slidesPerView: 4,
                    spaceBetween: 16,
                },
            },
            observer: true,
            observeParents: true,
        });
    }
}

// Функция для инициализации Swiper слайдера
function initSwiperPromotions() {
    if (typeof Swiper !== 'undefined') {
        swiperInstances.popular = new Swiper(".promotions__slider", {
            slidesPerView: 2,
            spaceBetween: 8,
            navigation: {
                nextEl: ".promotions-swiper-next",
                prevEl: ".promotions-swiper-prev",
            },
            scrollbar: {
                el: ".promotions-swiper-scrollbar",
                draggable: true,
            },
            breakpoints: {
                992: {
                    slidesPerView: 3,
                },
                1280: {
                    slidesPerView: 4,
                    spaceBetween: 16,
                },
            }
        });
    }
}

// Функция для инициализации Swiper слайдера
function initSwiperBlog() {
    if (typeof Swiper !== 'undefined') {
        swiperInstances.popular = new Swiper(".blog__slider", {
            slidesPerView: 'auto',
            spaceBetween: 16,
            navigation: {
                nextEl: ".blog-swiper-next",
                prevEl: ".blog-swiper-prev",
            },
            scrollbar: {
                el: ".blog-swiper-scrollbar",
                draggable: true,
            },
            breakpoints: {
                992: {
                    slidesPerView: 2,
                },
                1280: {
                    slidesPerView: 3,
                },
            }
        });
    }
}

// Функция для инициализации Swiper слайдера
function initSwiperReviews() {
    if (typeof Swiper !== 'undefined') {
        swiperInstances.popular = new Swiper(".reviews__slider", {
            slidesPerView: 1,
            spaceBetween: 16,
            navigation: {
                nextEl: ".reviews-swiper-next",
                prevEl: ".reviews-swiper-prev",
            },
            breakpoints: {
                992: {
                    slidesPerView: 2,
                },
                1280: {
                    slidesPerView: 3,
                },
            }
        });
    }
}

// Функция для управления табами
function initTabs() {
    const tabButtons = document.querySelectorAll('.offers__tab-button');
    const tabContents = document.querySelectorAll('.offers__tab-content');

    if (!tabButtons.length || !tabContents.length) {
        return;
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');

                // Обновляем слайдеры после переключения таба
                setTimeout(() => {
                    if (swiperInstances.popular) {
                        swiperInstances.popular.update();
                    }
                    if (swiperInstances.new) {
                        swiperInstances.new.update();
                    }
                }, 100);
            }
        });
    });
}

// Функция для управления модальными окнами
function initModals() {
    const requestCallBtn = document.getElementById('requestCallBtn');
    const callModal = document.getElementById('callModal');
    const successModal = document.getElementById('successModal');
    const callForm = document.getElementById('callForm');
    const closeModal = document.getElementById('closeModal');
    const body = document.body;

    if (!requestCallBtn || !callModal || !successModal || !callForm || !closeModal) {
        console.warn('Some modal elements are missing from the DOM');
        return;
    }

    function openModal(modal) {
        modal.classList.add('active');
        body.classList.add('modal-open');
    }

    function closeModalFunc(modal) {
        modal.classList.remove('active');
        body.classList.remove('modal-open');
    }

    // Открытие модального окна
    requestCallBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openModal(callModal);
    });

    // Закрытие по кнопке крестика
    closeModal.addEventListener('click', function (e) {
        e.preventDefault();
        closeModalFunc(callModal);
    });

    // Закрытие при клике ВНЕ modal__content
    document.addEventListener('click', function(e) {
        // Проверяем, открыто ли модальное окно
        if (callModal.classList.contains('active')) {
            // Проверяем, что клик НЕ внутри modal__content и НЕ по кнопке открытия
            const modalContent = callModal.querySelector('.modal__content');
            const isClickInsideContent = modalContent && modalContent.contains(e.target);
            const isClickOnOpenButton = requestCallBtn.contains(e.target);
            
            if (!isClickInsideContent && !isClickOnOpenButton) {
                closeModalFunc(callModal);
            }
        }
        
        if (successModal.classList.contains('active')) {
            const modalContent = successModal.querySelector('.modal__content');
            const isClickInsideContent = modalContent && modalContent.contains(e.target);
            
            if (!isClickInsideContent) {
                closeModalFunc(successModal);
            }
        }
    });

    // Обработка отправки формы
    callForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        closeModalFunc(callModal);
        
        setTimeout(() => {
            openModal(successModal);

            setTimeout(() => {
                if (successModal.classList.contains('active')) {
                    closeModalFunc(successModal);
                }
            }, 5000);
        }, 300);
        
        callForm.reset();
    });

    // Закрытие по клавише Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (callModal.classList.contains('active')) {
                closeModalFunc(callModal);
            }
            if (successModal.classList.contains('active')) {
                closeModalFunc(successModal);
            }
        }
    });

    // Маска для телефона
    if (typeof jQuery !== 'undefined' && jQuery.fn.mask) {
        jQuery('input[type="tel"]').mask('+38(999)999-99-99');
    }
}

// Защита от двойной инициализации
if (!window.modalsInitialized) {
    document.addEventListener('DOMContentLoaded', initModals);
    window.modalsInitialized = true;
}

// Функция для управления модальным окном "Написать нам"
function initWriteUsModal() {
    const openwriteUsModalBtn = document.getElementById('openwriteUsModal');
    const writeUsModal = document.getElementById('writeUs');
    const successModal = document.getElementById('successModal');
    const callForm2 = document.getElementById('callForm2');
    const closeModal2 = document.getElementById('closeModal2');
    const body = document.body;

    // Check if all required elements exist
    if (!openwriteUsModalBtn || !writeUsModal || !successModal || !callForm2 || !closeModal2) {
        console.warn('Some modal elements are missing from the DOM');
        return;
    }

    function openModal(modal) {
        modal.classList.add('active');
        body.classList.add('modal-open');
    }

    function closeModalFunc(modal) {
        modal.classList.remove('active');
        body.classList.remove('modal-open');
    }

    // Открытие модалки при клике на кнопку в дропдауне
    openwriteUsModalBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        openModal(writeUsModal);

        // Закрываем дропдаун, если он открыт
        const dropdown = openwriteUsModalBtn.closest('.dropdown');
        if (dropdown) {
            dropdown.classList.remove('active');
        }
    });

    // Закрытие модалки по кнопке
    closeModal2.addEventListener('click', function () {
        closeModalFunc(writeUsModal);
    });

    // Закрытие модалки по клику на оверлей
    writeUsModal.addEventListener('click', function (e) {
        if (e.target === writeUsModal || e.target.classList.contains('modal__overlay')) {
            closeModalFunc(writeUsModal);
        }
    });

    // Закрытие модалки успеха по клику на оверлей
    successModal.addEventListener('click', function (e) {
        if (e.target === successModal || e.target.classList.contains('modal__overlay')) {
            closeModalFunc(successModal);
        }
    });

    // Предотвращение закрытия при клике на контент модалки
    document.querySelectorAll('.modal__content').forEach(content => {
        content.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    });

    // Обработка отправки формы
    callForm2.addEventListener('submit', function (e) {
        e.preventDefault();

        // Валидация email
        const emailInput = document.getElementById('Email');
        const emailValue = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailValue)) {
            emailInput.classList.add('invalid');
            return;
        } else {
            emailInput.classList.remove('invalid');
        }

        closeModalFunc(writeUsModal);
        setTimeout(() => {
            openModal(successModal);

            // Автоматическое закрытие модалки успеха через 5 секунд
            setTimeout(() => {
                if (successModal.classList.contains('active')) {
                    closeModalFunc(successModal);
                }
            }, 5000);
        }, 300);

        callForm2.reset();
    });

    // Закрытие модалок по Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModalFunc(writeUsModal);
            closeModalFunc(successModal);
        }
    });

    // Удаление класса invalid при вводе в email
    const emailInput = document.getElementById('Email');
    if (emailInput) {
        emailInput.addEventListener('input', function () {
            this.classList.remove('invalid');
        });
    }
}

// Функція для аккордеона, щоб відкривати тільки один елемент
function initAccordion() {
    const accordions = document.querySelectorAll('.cta-info__accordion');

    accordions.forEach(function (button) {
        button.addEventListener('click', function () {
            const panel = this.nextElementSibling;
            const isCurrentlyActive = this.classList.contains('active');

            // Удаляем активные классы со всех аккордеонов и панелей
            accordions.forEach(function (acc) {
                acc.classList.remove('active');
                const accPanel = acc.nextElementSibling;
                if (accPanel) {
                    accPanel.classList.remove('active');
                }
            });

            // Если текущий аккордеон не был активным, активируем его
            if (!isCurrentlyActive) {
                this.classList.add('active');
                if (panel) {
                    panel.classList.add('active');
                }
            }
        });
    });
}

// Функция для управления табами
function initTabsTop() {
    const tabButtons = document.querySelectorAll('.section-top__tab-button');
    const tabContents = document.querySelectorAll('.section-top-content');

    if (!tabButtons.length || !tabContents.length) {
        return;
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Удаляем active класс у всех кнопок
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Удаляем active класс у всех контентов
            tabContents.forEach(content => {
                content.classList.remove('active');
            });

            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

let swiper = null;

function initSwiperProduct() {
    if (window.innerWidth < 768 && swiper === null) {
        swiper = new Swiper('.premium-products__body', {
            slidesPerView: 1,
            spaceBetween: 0,
            navigation: {
                nextEl: '.premium-swiper-next',
                prevEl: '.premium-swiper-prev',
            },
            pagination: {
                el: '.premium-slider-pagination',
                clickable: true,
            },
            loop: false,
        });
    } else if (window.innerWidth >= 768 && swiper !== null) {
        swiper.destroy(true, true);
        swiper = null;
    }
}

function initAccordionFooter(accordionSelector = '.footer__accordion') {
  const accordion = document.querySelector(accordionSelector);
  
  if (!accordion) return;

  const items = accordion.querySelectorAll('.footer__accordion-item');
  const buttons = accordion.querySelectorAll('.footer__accordion-button');

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const item = items[index];
      const isActive = item.classList.contains('is-active');
      
      if (isActive) {
        item.classList.remove('is-active');
        button.setAttribute('aria-expanded', 'false');
      } else {
        items.forEach(i => i.classList.remove('is-active'));  
        buttons.forEach(b => b.setAttribute('aria-expanded', 'false'));  
        item.classList.add('is-active');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function initFilters() {
    // --- Акордеон для груп фільтрів ---
    const groups = document.querySelectorAll('.filters__group');

    groups.forEach(group => {
        const header = group.querySelector('.filters__group-header');
        if (!header) return;

        header.addEventListener('click', () => {
            // Закриваємо всі інші групи
            groups.forEach(g => {
                if (g !== group) {
                    g.classList.remove('active');
                }
            });

            // Перемикаємо поточну
            group.classList.toggle('active');
        });
    });

    // --- Базова функціональність для слайдера ціни ---
    const priceFrom = document.getElementById('price-from');
    const priceTo = document.getElementById('price-to');
    const sliderRange = document.querySelector('.filters__slider-range');
    const thumbFrom = document.querySelector('.filters__slider-thumb--from');
    const thumbTo = document.querySelector('.filters__slider-thumb--to');

    if (!priceFrom || !priceTo || !sliderRange || !thumbFrom || !thumbTo) return;

    function updateSlider() {
        const min = parseInt(priceFrom.min);
        const max = parseInt(priceFrom.max);
        const valFrom = parseInt(priceFrom.value);
        const valTo = parseInt(priceTo.value);

        const percentFrom = ((valFrom - min) / (max - min)) * 100;
        const percentTo = ((valTo - min) / (max - min)) * 100;

        sliderRange.style.left = percentFrom + '%';
        sliderRange.style.right = (100 - percentTo) + '%';

        thumbFrom.style.left = percentFrom + '%';
        thumbTo.style.left = percentTo + '%';
    }

    priceFrom.addEventListener('input', updateSlider);
    priceTo.addEventListener('input', updateSlider);

    updateSlider();
}

function initViewSwitcher() {
    const viewButtons = document.querySelectorAll('.toolbar__view-btn');
    const productsContainer = document.querySelector('.shop-layout__products');

    if (!viewButtons.length || !productsContainer) return;

    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Снимаем активность со всех кнопок
            viewButtons.forEach(btn => btn.classList.remove('active'));
            
            // Активируем нажатую
            this.classList.add('active');
            
            // Получаем значение из data-view (например: "grid" или "list")
            const view = this.getAttribute('data-view');
            
            // Сбрасываем классы вида
            productsContainer.classList.remove('grid', 'list');
            
            // Применяем новый класс
            productsContainer.classList.add(view);
        });
    });
}

function initSlideMenu() {
    const overlay = document.querySelector('.overlay');
    const menuButtons = document.querySelectorAll('[data-menu]');
    const closeButtons = document.querySelectorAll('[data-close]');
    const submenuLinks = document.querySelectorAll('[data-submenu]');
    const backButtons = document.querySelectorAll('[data-back]');

    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const menuId = button.getAttribute('data-menu') + '-menu';
            const menu = document.getElementById(menuId);

            if (menu) {
                menu.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const menuId = button.getAttribute('data-close');
            const menu = document.getElementById(menuId);

            if (menu) {
                menu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';

                document.querySelectorAll('.submenu.active').forEach(submenu => {
                    submenu.classList.remove('active');
                });
            }
        });
    });

    overlay.addEventListener('click', () => {
        document.querySelectorAll('.slide-menu.active').forEach(menu => {
            menu.classList.remove('active');
        });
        document.querySelectorAll('.submenu.active').forEach(submenu => {
            submenu.classList.remove('active');
        });
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    submenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const submenuId = 'submenu-' + link.getAttribute('data-submenu');
            const submenu = document.getElementById(submenuId);

            if (submenu) {
                submenu.classList.add('active');
            }
        });
    });

    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            const submenuId = 'submenu-' + button.getAttribute('data-back');
            const submenu = document.getElementById(submenuId);

            if (submenu) {
                submenu.classList.remove('active');
            }
        });
    });
}

function initRangeSlider() {
    class RangeSlider {
        constructor() {
            this.priceFrom = document.getElementById('price-from');
            this.priceTo = document.getElementById('price-to');
            this.sliderRange = document.querySelector('.filters__slider-range');
            this.thumbFrom = document.querySelector('.filters__slider-thumb--from');
            this.thumbTo = document.querySelector('.filters__slider-thumb--to');
            this.slider = document.querySelector('.filters__slider');

            this.min = parseInt(this.priceFrom.min);
            this.max = parseInt(this.priceFrom.max);
            this.isDragging = false;
            this.currentThumb = null;

            this.init();
        }

        init() {
            this.updateSlider();
            this.attachEventListeners();
        }

        attachEventListeners() {
            this.priceFrom.addEventListener('input', () => this.handleInputChange('from'));
            this.priceTo.addEventListener('input', () => this.handleInputChange('to'));

            this.thumbFrom.addEventListener('mousedown', (e) => this.startDrag(e, 'from'));
            this.thumbTo.addEventListener('mousedown', (e) => this.startDrag(e, 'to'));

            this.thumbFrom.addEventListener('touchstart', (e) => this.startDrag(e, 'from'), { passive: false });
            this.thumbTo.addEventListener('touchstart', (e) => this.startDrag(e, 'to'), { passive: false });

            document.addEventListener('mousemove', (e) => this.onDrag(e));
            document.addEventListener('mouseup', () => this.stopDrag());
            document.addEventListener('touchmove', (e) => this.onDrag(e), { passive: false });
            document.addEventListener('touchend', () => this.stopDrag());

            this.slider.addEventListener('click', (e) => this.handleTrackClick(e));

            this.thumbFrom.addEventListener('keydown', (e) => this.handleKeyboard(e, 'from'));
            this.thumbTo.addEventListener('keydown', (e) => this.handleKeyboard(e, 'to'));
        }

        handleInputChange(type) {
            let valFrom = parseInt(this.priceFrom.value);
            let valTo = parseInt(this.priceTo.value);

            if (valFrom < this.min) valFrom = this.min;
            if (valTo > this.max) valTo = this.max;

            if (type === 'from' && valFrom >= valTo) {
                valFrom = valTo - 10;
                this.priceFrom.value = valFrom;
            }

            if (type === 'to' && valTo <= valFrom) {
                valTo = valFrom + 10;
                this.priceTo.value = valTo;
            }

            this.updateSlider();
        }

        startDrag(e, type) {
            e.preventDefault();
            this.isDragging = true;
            this.currentThumb = type;

            if (type === 'from') {
                this.thumbFrom.classList.add('dragging');
            } else {
                this.thumbTo.classList.add('dragging');
            }
        }

        onDrag(e) {
            if (!this.isDragging) return;

            e.preventDefault();

            const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            const rect = this.slider.getBoundingClientRect();
            const percent = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
            const value = Math.round((percent / 100) * (this.max - this.min) + this.min);

            if (this.currentThumb === 'from') {
                const maxValue = parseInt(this.priceTo.value) - 10;
                this.priceFrom.value = Math.min(value, maxValue);
            } else {
                const minValue = parseInt(this.priceFrom.value) + 10;
                this.priceTo.value = Math.max(value, minValue);
            }

            this.updateSlider();
        }

        stopDrag() {
            if (!this.isDragging) return;

            this.isDragging = false;
            this.thumbFrom.classList.remove('dragging');
            this.thumbTo.classList.remove('dragging');
            this.currentThumb = null;
        }

        handleTrackClick(e) {
            if (this.isDragging) return;
            if (e.target.classList.contains('filters__slider-thumb')) return;

            const rect = this.slider.getBoundingClientRect();
            const percent = ((e.clientX - rect.left) / rect.width) * 100;
            const value = Math.round((percent / 100) * (this.max - this.min) + this.min);

            const currentFrom = parseInt(this.priceFrom.value);
            const currentTo = parseInt(this.priceTo.value);

            if (Math.abs(value - currentFrom) < Math.abs(value - currentTo)) {
                this.priceFrom.value = Math.min(value, currentTo - 10);
            } else {
                this.priceTo.value = Math.max(value, currentFrom + 10);
            }

            this.updateSlider();
        }

        handleKeyboard(e, type) {
            const step = 100;
            let value = parseInt(type === 'from' ? this.priceFrom.value : this.priceTo.value);

            switch (e.key) {
                case 'ArrowLeft':
                case 'ArrowDown':
                    e.preventDefault();
                    value -= step;
                    break;
                case 'ArrowRight':
                case 'ArrowUp':
                    e.preventDefault();
                    value += step;
                    break;
                default:
                    return;
            }

            if (type === 'from') {
                this.priceFrom.value = Math.max(this.min, Math.min(value, parseInt(this.priceTo.value) - 10));
            } else {
                this.priceTo.value = Math.min(this.max, Math.max(value, parseInt(this.priceFrom.value) + 10));
            }

            this.updateSlider();
        }

        updateSlider() {
            const valFrom = parseInt(this.priceFrom.value);
            const valTo = parseInt(this.priceTo.value);

            const percentFrom = ((valFrom - this.min) / (this.max - this.min)) * 100;
            const percentTo = ((valTo - this.min) / (this.max - this.min)) * 100;

            this.sliderRange.style.left = percentFrom + '%';
            this.sliderRange.style.right = (100 - percentTo) + '%';

            this.thumbFrom.style.left = percentFrom + '%';
            this.thumbTo.style.left = percentTo + '%';
        }
    }

    new RangeSlider();
}

function initMobileFilter() {
    const filterBtn = document.getElementById('filter');
    const filterCloseBtn = document.getElementById('filterBtn');
    const filters = document.querySelector('.filters');
    const body = document.body;

    if (!filterBtn || !filters) return;

    filterBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = filters.classList.contains('active');
        
        if (isActive) {
            filters.classList.remove('active');
            body.classList.remove('modal-open');
        } else {
            filters.classList.add('active');
            body.classList.add('modal-open');
        }
    });

    if (filterCloseBtn) {
        filterCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            filters.classList.remove('active');
            body.classList.remove('modal-open');
        });
    }

    document.addEventListener('click', (e) => {
        if (filters.classList.contains('active') && !filters.contains(e.target) && e.target.id !== 'filter') {
            filters.classList.remove('active');
            body.classList.remove('modal-open');
        }
    });

    filters.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Главная функция инициализации
function initApp() {
    initDropdowns();
    initCatalogMenu();
    initSearch();
    initSwiper();
    initModals();
    initTabs();
    initSwiperPopular();
    initSwiperNew();
    initWriteUsModal();
    initSwiperPromotions();
    initSwiperBlog();
    initSwiperReviews();
    initAccordion();
    initTabsTop();
    initSwiperProduct();
    initAccordionFooter();
    initHeader();
    initSwiperShop();
    initFilters();
    initViewSwitcher();
    initSlideMenu();
    initRangeSlider();
    initMobileFilter();
}

// Запуск приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', initApp);
window.addEventListener('resize', initSwiperProduct);