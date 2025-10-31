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
        callFormBurger: '#callFormBurger',
        successModal: '#successModal',
    };

    const stateClasses = {
        isActive: 'is-active',
        isLock: 'is-lock',
        isOpen: 'is-open',
        active: 'active',
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
    const callFormBurger = document.querySelector(selectors.callFormBurger);
    const successModal = document.querySelector(selectors.successModal);

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

    // Функция открытия модалки успеха
    function openSuccessModal() {
        if (successModal) {
            successModal.classList.add(stateClasses.active);
            lockScroll();
        }
    }

    // Функция закрытия модалки успеха
    function closeSuccessModal() {
        if (successModal) {
            successModal.classList.remove(stateClasses.active);
            unlockScroll();
        }
    }

    // Функция открытия главного меню
    function openMenu() {
        burgerButtonElement.classList.add(stateClasses.isActive);
        overlayElement.classList.add(stateClasses.isActive);
        if (burgerMenu) {
            burgerMenu.classList.add(stateClasses.isActive);
        }
        lockScroll();
    }

    // Функция закрытия главного меню
    function closeMenu() {
        burgerButtonElement.classList.remove(stateClasses.isActive);
        overlayElement.classList.remove(stateClasses.isActive);
        if (burgerMenu) {
            burgerMenu.classList.remove(stateClasses.isActive);
        }
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
    function toggleMenu(e) {
        // ВАЖНО: останавливаем всплытие события
        if (e) {
            e.stopPropagation();
        }
        
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

    // События
    // Клик по бургеру - ВАЖНО: stopPropagation чтобы не сработал глобальный обработчик
    burgerButtonElement.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu(e);
    });

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
        closeModal2.addEventListener('click', function (e) {
            e.preventDefault();
            closeEmailMenu(e);
        });
    }

    // Обработка отправки формы callFormBurger
    if (callFormBurger) {
        callFormBurger.addEventListener('submit', function (e) {
            e.preventDefault();

            // Закрываем бургер-меню
            closeMenu();

            // Через небольшую задержку показываем модалку успеха
            setTimeout(() => {
                openSuccessModal();

                // Автоматически закрываем через 5 секунд
                setTimeout(() => {
                    if (successModal && successModal.classList.contains(stateClasses.active)) {
                        closeSuccessModal();
                    }
                }, 5000);
            }, 300);

            // Сбрасываем форму
            callFormBurger.reset();
        });
    }

    // Закрытие successModal при клике вне контента
    if (successModal) {
        document.addEventListener('click', function (e) {
            if (successModal.classList.contains(stateClasses.active)) {
                const modalContent = successModal.querySelector('.modal__content');
                const isClickInsideContent = modalContent && modalContent.contains(e.target);

                if (!isClickInsideContent) {
                    closeSuccessModal();
                }
            }
        });
    }

    // Закрытие меню при клике ВНЕ области .header-burger__menu
    // ВАЖНО: используем setTimeout чтобы это сработало ПОСЛЕ toggleMenu
    document.addEventListener('click', function (e) {
        // Небольшая задержка, чтобы сначала сработал toggleMenu
        setTimeout(() => {
            // Проверяем, открыто ли меню
            if (overlayElement.classList.contains(stateClasses.isActive)) {
                // Проверяем, что клик НЕ внутри меню и НЕ по кнопке бургера
                const isClickInsideMenu = burgerMenu && burgerMenu.contains(e.target);
                const isClickOnBurger = burgerButtonElement.contains(e.target);

                if (!isClickInsideMenu && !isClickOnBurger) {
                    closeMenu();
                }
            }
        }, 0);
    });

    // Закрытие меню при нажатии Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (successModal && successModal.classList.contains(stateClasses.active)) {
                closeSuccessModal();
            } else if (emailMenu && emailMenu.classList.contains(stateClasses.isOpen)) {
                closeEmailMenu(e);
            } else if (hiddenMenu && hiddenMenu.classList.contains(stateClasses.isOpen)) {
                closeHiddenMenu(e);
            } else if (overlayElement.classList.contains(stateClasses.isActive)) {
                closeMenu();
            }
        }
    });
}

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

    // Function to close menu and reset all states
    function closeMenu() {
        menuContainer.classList.remove('open');
        html.classList.remove('is-lock');
        catalogBtn.classList.remove('active');
        menuItems.forEach(mi => mi.classList.remove('active'));
        submenuContents.forEach(content => content.classList.remove('active'));
    }

    catalogBtn.addEventListener('click', function (e) {
        e.stopPropagation();

        if (menuContainer.classList.contains('open')) {
            closeMenu();
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
            closeMenu();
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

    document.addEventListener('click', function (e) {
        if (searchBtn.classList.contains('active') && !searchBtn.contains(e.target)) {
            htmlSearch.classList.remove('is-lock');
            searchBtn.classList.remove('active');
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && searchBtn.classList.contains('active')) {
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
    document.addEventListener('click', function (e) {
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

            // Убираем класс с body после открытия successModal
            body.classList.remove('modal-open');

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

    if (!openwriteUsModalBtn || !writeUsModal || !successModal || !callForm2 || !closeModal2) {
        console.warn('Some modal elements are missing from the DOM');
        return;
    }

    function openModal(modal) {
        modal.classList.add('active');
        body.classList.add('modal-style');
    }

    function closeModalFunc(modal) {
        modal.classList.remove('active');
        body.classList.remove('modal-style');
    }

    // Открытие модального окна
    openwriteUsModalBtn.addEventListener('click', function (e) {
        e.preventDefault();
        openModal(writeUsModal);

        // Закрываем дропдаун, если он открыт
        const dropdown = openwriteUsModalBtn.closest('.dropdown');
        if (dropdown) {
            dropdown.classList.remove('active');
        }
    });

    // Закрытие по кнопке крестика
    closeModal2.addEventListener('click', function (e) {
        e.preventDefault();
        closeModalFunc(writeUsModal);
    });

    // Закрытие при клике ВНЕ modal__content
    document.addEventListener('click', function (e) {
        if (writeUsModal.classList.contains('active')) {
            const modalContent = writeUsModal.querySelector('.modal__content');
            const isClickInsideContent = modalContent && modalContent.contains(e.target);
            const isClickOnOpenButton = openwriteUsModalBtn.contains(e.target);

            if (!isClickInsideContent && !isClickOnOpenButton) {
                closeModalFunc(writeUsModal);
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
    callForm2.addEventListener('submit', function (e) {
        e.preventDefault();

        // Валидация email
        const emailInput = callForm2.querySelector('#Email');
        if (emailInput) {
            const emailValue = emailInput.value.trim();
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(emailValue)) {
                emailInput.classList.add('invalid');
                return;
            } else {
                emailInput.classList.remove('invalid');
            }
        }

        closeModalFunc(writeUsModal);

        setTimeout(() => {
            openModal(successModal);

            // Убираем класс modal-style с body после открытия successModal
            body.classList.remove('modal-style');

            setTimeout(() => {
                if (successModal.classList.contains('active')) {
                    closeModalFunc(successModal);
                }
            }, 5000);
        }, 300);

        callForm2.reset();
    });

    // Закрытие по клавише Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (writeUsModal.classList.contains('active')) {
                closeModalFunc(writeUsModal);
            }
            if (successModal.classList.contains('active')) {
                closeModalFunc(successModal);
            }
        }
    });

    // Удаление класса invalid при вводе в email
    const emailInput = callForm2.querySelector('#Email');
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
        button.addEventListener('click', function () {
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

    if (!overlay) return;

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
    const priceFrom = document.getElementById('price-from');
    const priceTo = document.getElementById('price-to');
    const sliderRange = document.querySelector('.filters__slider-range');
    const thumbFrom = document.querySelector('.filters__slider-thumb--from');
    const thumbTo = document.querySelector('.filters__slider-thumb--to');
    const slider = document.querySelector('.filters__slider');

    if (!priceFrom || !priceTo || !sliderRange || !thumbFrom || !thumbTo || !slider) return;

    const min = parseInt(priceFrom.min);
    const max = parseInt(priceFrom.max);

    if (isNaN(min) || isNaN(max)) return;

    class RangeSlider {
        constructor() {
            this.priceFrom = priceFrom;
            this.priceTo = priceTo;
            this.sliderRange = sliderRange;
            this.thumbFrom = thumbFrom;
            this.thumbTo = thumbTo;
            this.slider = slider;

            this.min = min;
            this.max = max;
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
    const checkboxes = document.querySelectorAll('.filters__checkbox');
    const resetBtn = document.querySelector('.filters__reset');

    if (!filterBtn || !filters) return;

    // Функция для обновления кнопки фильтра
    function updateFilterButton() {
        const selectedFilters = [];
        const filterGroups = {};

        // Собираем все отмеченные чекбоксы по группам
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const groupName = checkbox.name;
                if (!filterGroups[groupName]) {
                    filterGroups[groupName] = [];
                }
                filterGroups[groupName].push(checkbox.value);
            }
        });

        // Формируем названия групп для отображения
        const groupTitles = {
            'temperature': 'Кольорова температура',
            'power': 'Потужність (ВТ)',
            'angle': 'Кут розсіювання',
            'protection': 'Ступінь захисту',
            'installation': 'Тип установки'
        };

        // Добавляем названия групп, где есть выбранные фильтры
        Object.keys(filterGroups).forEach(groupName => {
            if (groupTitles[groupName]) {
                selectedFilters.push(groupTitles[groupName]);
            }
        });

        // Обновляем текст кнопки
        const filterContent = filterBtn.querySelector('.mobile-filter__content-option');
        if (filterContent) {
            if (selectedFilters.length > 0) {
                filterBtn.classList.add('has-filters');
                filterContent.textContent = selectedFilters.join(', ');
            } else {
                filterBtn.classList.remove('has-filters');
                filterContent.textContent = 'Немає фільтрів'; // Дефолтный текст
            }
        }
    }

    // Открытие/закрытие фильтров
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

    // Закрытие по кнопке
    if (filterCloseBtn) {
        filterCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            filters.classList.remove('active');
            body.classList.remove('modal-open');
        });
    }

    // Закрытие при клике вне фильтров
    document.addEventListener('click', (e) => {
        if (filters.classList.contains('active') && !filters.contains(e.target) && e.target.id !== 'filter') {
            filters.classList.remove('active');
            body.classList.remove('modal-open');
        }
    });

    // Предотвращение закрытия при клике внутри фильтров
    filters.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Отслеживание изменений чекбоксов
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateFilterButton();
        });
    });

    // Обработка кнопки "Скинути всі"
    if (resetBtn) {
        resetBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Снимаем все чекбоксы
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });

            // Сброс price range инпутов
            const priceFrom = document.getElementById('price-from');
            const priceTo = document.getElementById('price-to');
            if (priceFrom) priceFrom.value = priceFrom.getAttribute('min') || '100';
            if (priceTo) priceTo.value = priceTo.getAttribute('max') || '10000';

            // Сброс слайдера (если есть)
            const sliderRange = document.querySelector('.filters__slider-range');
            const thumbFrom = document.querySelector('.filters__slider-thumb--from');
            const thumbTo = document.querySelector('.filters__slider-thumb--to');

            if (sliderRange) {
                sliderRange.style.left = '0%';
                sliderRange.style.right = '0%';
            }
            if (thumbFrom) thumbFrom.style.left = '0%';
            if (thumbTo) thumbTo.style.left = '100%';

            // Очистка активных фильтров (если есть блок filters__active)
            const activeFiltersBlock = document.querySelector('.filters__active');
            if (activeFiltersBlock) {
                activeFiltersBlock.innerHTML = '';
                // Или скрываем блок
                // activeFiltersBlock.style.display = 'none';
            }

            updateFilterButton();
        });
    }

    // Инициализация при загрузке (если есть предвыбранные фильтры)
    updateFilterButton();
}

function initSortPopup() {
    const sortBtn = document.getElementById('sort');
    const sortPopup = document.getElementById('sortPopup');
    const sortClose = document.querySelector('.sort-popup__close');
    const sortRadios = document.querySelectorAll('.sort-popup__radio');
    const sortOption = document.querySelector('.mobile-filter__content-option');
    const body = document.body;

    if (!sortBtn || !sortPopup) return;

    // Открытие/закрытие попапа
    sortBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = sortPopup.classList.contains('active');

        if (isActive) {
            sortPopup.classList.remove('active');
            body.classList.remove('modal-open');
        } else {
            sortPopup.classList.add('active');
            body.classList.add('modal-open');
        }
    });

    // Закрытие по кнопке
    if (sortClose) {
        sortClose.addEventListener('click', (e) => {
            e.stopPropagation();
            sortPopup.classList.remove('active');
            body.classList.remove('modal-open');
        });
    }

    // Обработка выбора сортировки
    sortRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.checked && sortOption) {
                // Находим текст выбранной опции
                const selectedLabel = radio.closest('.sort-popup__label');
                const selectedText = selectedLabel.querySelector('.sort-popup__text').textContent;

                // Обновляем текст в кнопке
                sortOption.textContent = selectedText;

                // Закрываем попап после выбора
                setTimeout(() => {
                    sortPopup.classList.remove('active');
                    body.classList.remove('modal-open');
                }, 200);
            }
        });
    });

    // Закрытие при клике вне попапа
    document.addEventListener('click', (e) => {
        if (sortPopup.classList.contains('active') &&
            !sortPopup.contains(e.target) &&
            e.target.id !== 'sort' &&
            !sortBtn.contains(e.target)) {
            sortPopup.classList.remove('active');
            body.classList.remove('modal-open');
        }
    });

    // Предотвращение закрытия при клике внутри попапа
    sortPopup.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sortPopup.classList.contains('active')) {
            sortPopup.classList.remove('active');
            body.classList.remove('modal-open');
        }
    });
}

function initGallery() {
    const thumbsElement = document.getElementById('galleryThumbs');
    const mainElement = document.getElementById('galleryMain');

    // Если элементов галереи нет на странице, просто выходим из функции
    if (!thumbsElement || !mainElement) {
        return;
    }

    var thumbsSwiper = new Swiper('#galleryThumbs', {
        spaceBetween: 16,
        slidesPerView: 'auto',
        freeMode: true,
        watchSlidesProgress: true,
        allowTouchMove: true,
        grabCursor: true,
        slideToClickedSlide: true,
        centeredSlides: false,
        resistance: true,
        resistanceRatio: 0.85,
    });

    var mainSwiper = new Swiper('#galleryMain', {
        spaceBetween: 0,
        slidesPerView: 1,
        loop: false,
        effect: 'slide',
        allowTouchMove: true,
        grabCursor: true,
        keyboard: {
            enabled: true,
        },
        thumbs: {
            swiper: thumbsSwiper,
        },
        navigation: {
            nextEl: '.product-detail-swiper-next',
            prevEl: '.product-detail-swiper-prev',
        },
        pagination: {
            el: '.product-detail__slider-pagination',
            clickable: true,
        },
        on: {
            slideChange: function () {
                if (thumbsSwiper) {
                    thumbsSwiper.update();
                }
            }
        }
    });

    thumbsSwiper.slides.forEach(function (slide, index) {
        slide.addEventListener('click', function () {
            mainSwiper.slideTo(index);
        });
    });

    Fancybox.bind('[data-fancybox="gallery"]', {
        Toolbar: {
            display: {
                left: [],
                middle: ['infobar'],
                right: ['slideshow', 'fullscreen', 'close'],
            },
        },
        Images: {
            zoom: true,
        },
        Thumbs: {
            autoStart: true,
        },
        animated: true,
        showClass: "f-fadeIn",
        hideClass: "f-fadeOut",
    });
}

function initProductAccordion() {
    const accordion = document.querySelector('.product-detail__description');
    if (!accordion) return;

    const items = accordion.querySelectorAll('.product-detail__accordion-item');

    items.forEach(item => {
        const header = item.querySelector('.product-detail__accordion-header');
        const content = item.querySelector('.product-detail__accordion-content');

        if (!header || !content) return;

        content.hidden = true;

        header.addEventListener('click', () => {
            const isOpen = !content.hidden;

            items.forEach(i => i.querySelector('.product-detail__accordion-content').hidden = true);

            content.hidden = isOpen ? true : false;
        });
    });
}

function initAccordionProduct() {
    const accordionContainer = document.querySelector('.product-detail__description');
    
    if (!accordionContainer) {
        return;
    }

    const accordionItems = accordionContainer.querySelectorAll('.product-detail__accordion-item');
    
    if (accordionItems.length === 0) {
        return;
    }

    function closeAllPanels() {
        accordionItems.forEach(item => {
            const header = item.querySelector('.product-detail__accordion-header');
            const panel = item.querySelector('.product-detail__accordion-panel');
            
            header.setAttribute('aria-expanded', 'false');
            item.classList.remove('is-open');
            panel.classList.remove('is-open');
        });
    }

    function togglePanel(header) {
        const accordionItem = header.closest('.product-detail__accordion-item');
        const panel = accordionItem.querySelector('.product-detail__accordion-panel');
        const isExpanded = header.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            header.setAttribute('aria-expanded', 'false');
            accordionItem.classList.remove('is-open');
            panel.classList.remove('is-open');
        } else {
            closeAllPanels();
            header.setAttribute('aria-expanded', 'true');
            accordionItem.classList.add('is-open');
            panel.classList.add('is-open');
        }
    }

    accordionItems.forEach(item => {
        const header = item.querySelector('.product-detail__accordion-header');
        
        header.setAttribute('aria-expanded', 'false');
        
        header.addEventListener('click', function() {
            togglePanel(this);
        });
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = initAccordionProduct;
}

// Функція для управління кількістю товару
function initQuantityControl() {
  const decreaseBtn = document.getElementById('decreaseBtn');
  const increaseBtn = document.getElementById('increaseBtn');
  const quantityInput = document.getElementById('quantityInput');

  if (!decreaseBtn || !increaseBtn || !quantityInput) return;

  // Перевірка чи вже ініціалізовано
  if (decreaseBtn.dataset.initialized === 'true') return;
  
  // Позначаємо як ініціалізоване
  decreaseBtn.dataset.initialized = 'true';
  increaseBtn.dataset.initialized = 'true';

  // Функція оновлення стану кнопки зменшення
  function updateDecreaseButton() {
    const value = parseInt(quantityInput.value) || 1;
    if (value <= 1) {
      decreaseBtn.disabled = true;
      decreaseBtn.style.opacity = '0.5';
      decreaseBtn.style.cursor = 'not-allowed';
    } else {
      decreaseBtn.disabled = false;
      decreaseBtn.style.opacity = '1';
      decreaseBtn.style.cursor = 'pointer';
    }
  }

  // Зменшення кількості
  decreaseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    let value = parseInt(quantityInput.value) || 1;
    if (value > 1) {
      quantityInput.value = value - 1;
      updateDecreaseButton();
    }
  });

  // Збільшення кількості
  increaseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    let value = parseInt(quantityInput.value) || 0;
    const max = parseInt(quantityInput.max) || 999;
    if (value < max) {
      quantityInput.value = value + 1;
      updateDecreaseButton();
    }
  });

  // Обробка ручного введення
  quantityInput.addEventListener('input', () => {
    let value = parseInt(quantityInput.value);
    const min = parseInt(quantityInput.min) || 1;
    const max = parseInt(quantityInput.max) || 999;

    // Якщо порожнє поле або NaN
    if (isNaN(value) || quantityInput.value === '') {
      return; // Дозволяємо порожнє поле під час введення
    }

    if (value < min) quantityInput.value = min;
    if (value > max) quantityInput.value = max;

    updateDecreaseButton();
  });

  // Обробка виходу з поля (blur) - встановлюємо мінімум якщо порожнє
  quantityInput.addEventListener('blur', () => {
    if (quantityInput.value === '' || isNaN(parseInt(quantityInput.value))) {
      quantityInput.value = 1;
      updateDecreaseButton();
    }
  });

  // Ініціалізація стану кнопки
  updateDecreaseButton();
}

// Функція для модалки додавання в кошик
function initCartModal() {
  const buyBtn = document.getElementById('buyBtn');
  const cartModal = document.getElementById('cartModal');

  if (!buyBtn || !cartModal) return;

  if (buyBtn.dataset.cartInitialized === 'true') return;
  buyBtn.dataset.cartInitialized = 'true';

  const body = document.body;

  buyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cartModal.classList.add('active');
    body.classList.add('is-lock'); 
  });

  function closeModal() {
    cartModal.classList.remove('active');
    body.classList.remove('is-lock');
  }

  const closeCartModal = document.getElementById('closeCartModal');
  const continueShoppingBtn = document.getElementById('continueShoppingBtn');

  if (closeCartModal) {
    closeCartModal.addEventListener('click', closeModal);
  }

  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', closeModal);
  }

  cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartModal.classList.contains('active')) {
      closeModal();
    }
  });

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      window.location.href = '/checkout'; 
    });
  }
}

// Функція для повідомлення про наявність
function initNotifyAvailability() {
  const notifyBtn = document.getElementById('notifyBtn');
  const notifyModal = document.getElementById('notifyModal');
  const notifyForm = document.getElementById('notifyForm');

  if (!notifyBtn || !notifyModal || !notifyForm) return;

  // Відкриття модалки
  notifyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    notifyModal.classList.add('active');
    document.body.classList.add('is-lock');
  });

  // Закриття модалки
  const closeModal = () => {
    notifyModal.classList.remove('active');
    document.body.classList.remove('is-lock');
    notifyForm.reset();
  };

  document.getElementById('closeNotifyModal')?.addEventListener('click', closeModal);

  notifyModal.addEventListener('click', (e) => {
    if (e.target === notifyModal) closeModal();
  });

  // Валідація та активація кнопки
  const notifyPhone = document.getElementById('notifyPhone');
  const submitBtn = notifyForm.querySelector('button[type="submit"]');

  if (notifyPhone && submitBtn) {
    notifyPhone.addEventListener('input', () => {
      const cleanPhone = notifyPhone.value.replace(/\D/g, '');
      submitBtn.disabled = cleanPhone.length !== 12;
    });
  }

  // Відправка форми
  notifyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    closeModal();

    const successModal2 = document.getElementById('successModal2');
    if (successModal2) {
      // Убираем блокировку фона ДО отображения successModal2
      document.body.classList.remove('is-lock');

      successModal2.classList.add('active');
      
      // Закрытие модалки через 3 секунды
      setTimeout(() => {
        successModal2.classList.remove('active');
      }, 3000);
    }
  });
}

// Функція для модалки характеристик
function initSpecificationsModal() {
  const toggleBtn = document.querySelector('[data-spec="toggle"]');
  const specsModal = document.getElementById('specsModal');

  if (!toggleBtn || !specsModal) return;

  const body = document.body;

  const productCode = document.querySelector('.product-detail__code')?.textContent?.trim() || '063-NEL 18W';
  const articleCodeElement = document.getElementById('articleCode');

  if (articleCodeElement) {
    articleCodeElement.textContent = productCode;
  }

  // Открытие модалки
  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    specsModal.classList.add('active');
    body.classList.add('is-lock'); 
  });

  // Закрытие модалки
  const closeModal = () => {
    specsModal.classList.remove('active');
    body.classList.remove('is-lock');
  };

  const closeSpecsModal = document.getElementById('closeSpecsModal');
  if (closeSpecsModal) {
    closeSpecsModal.addEventListener('click', closeModal);
  }

  // Закрытие по клику на overlay
  specsModal.addEventListener('click', (e) => {
    if (e.target === specsModal) closeModal();
  });

  // Закрытие по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && specsModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Копирование артикула
  const copyArticleBtn = document.getElementById('copyArticleBtn');
  const articleCode = document.getElementById('articleCode');

  if (copyArticleBtn && articleCode) {
    copyArticleBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(articleCode.textContent.trim());

        // Добавляем класс "copied"
        copyArticleBtn.classList.add('copied');

        // Убираем класс через 2 секунды
        setTimeout(() => {
          copyArticleBtn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Ошибка копирования:', err);
      }
    });
  }
}

// Функція для модалки відгуків
function initReviewsModal() {
  const reviewsBtn = document.querySelector('.product-detail__reviews-rating-btn');
  const reviewsBtnMain = document.querySelector('.product-detail__reviews-btn');
  const reviewsModal = document.getElementById('reviewsModal');
  
  if (!reviewsModal) return;
  if (!reviewsBtn && !reviewsBtnMain) return;

  // Відкриття модалки
  const openModal = (e) => {
    e?.preventDefault();
    reviewsModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Закриття модалки
  const closeModal = () => {
    reviewsModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Підключення подій до кнопок
  reviewsBtn?.addEventListener('click', openModal);
  reviewsBtnMain?.addEventListener('click', openModal);

  // Закриття модалки
  document.getElementById('closeReviewsModal')?.addEventListener('click', closeModal);

  reviewsModal.addEventListener('click', (e) => {
    if (e.target === reviewsModal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && reviewsModal.classList.contains('active')) {
      closeModal();
    }
  });
}

function initProductGallery() {
  if (typeof Fancybox === 'undefined') return;

  Fancybox.close(true);

  if (window.location.hash) {
    history.replaceState(null, null, ' ');
  }

  const productTitle = document.querySelector('.product-detail__title')?.textContent || '';
  const productCode = document.querySelector('.product-detail__code')?.textContent || '';

  Fancybox.bind('[data-fancybox="gallery"]', {
    Hash: false,
    Thumbs: {
      type: "classic",
      autoStart: true,
    },
    Toolbar: {
      display: {
        left: [],
        middle: [],
        right: ["close"],
      },
      autoEnable: true,
    },
    caption: function (fancybox, slide) {
      return `
        <h2 class="fancybox-title">${productTitle}</h2>
        <p class="fancybox-subtitle">Арт.: ${productCode}</p>
      `;
    },
    
    // 🔒 Полностью отключаем анимации
    animated: false,
    showClass: false,
    hideClass: false,
    dragToClose: false,
    compact: false,
    animationEffect: false,
    animationDuration: 0,
    transitionEffect: false,
    transitionDuration: 0,

    // 🧭 Отключаем свайпы и перетаскивание
    Carousel: {
      friction: 0,        // Без инерции
      Panzoom: {
        touch: false,     // Отключить тач-жесты
      },
      dragFree: false,    // Без свободного перетаскивания
      slides: {
        drag: false,      // Запрещаем drag свайпы
      }
    },

    keyboard: {
      Escape: "close",
      Delete: "close",
      Backspace: "close",
      PageUp: "prev",
      PageDown: "next",
      ArrowUp: "prev",
      ArrowDown: "next",
      ArrowRight: "next",
      ArrowLeft: "prev",
    },
    Image: {
      zoom: false,
      click: false,
      wheel: false,
      fit: "contain",
    },

    on: {
      ready: (fancybox) => {
        const container = document.querySelector('.fancybox__container');
        const carousel = document.querySelector('.fancybox__carousel');
        const toolbar = document.querySelector('.fancybox__toolbar');
        const footer = document.querySelector('.fancybox__footer');

        if (container) container.classList.remove('is-compact');

        if (carousel && toolbar && footer) {
          carousel.insertBefore(toolbar, carousel.firstChild);
          carousel.appendChild(footer);
        }

        const backdrop = document.querySelector('.fancybox__backdrop');
        if (backdrop) {
          backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) fancybox.close();
          });
        }

        if (carousel) {
          carousel.addEventListener('click', (e) => {
            const isImage = e.target.closest('.fancybox__content');
            const isThumbs = e.target.closest('.f-thumbs, .fancybox__thumbs');
            const isButton = e.target.closest('.f-button');
            const isNav = e.target.closest('.fancybox__nav');
            const isToolbar = e.target.closest('.fancybox__toolbar');
            const isCaptionText = e.target.closest('.fancybox__caption') ||
                                  e.target.classList.contains('fancybox-title') ||
                                  e.target.classList.contains('fancybox-subtitle');

            if (!isImage && !isThumbs && !isButton && !isNav && !isToolbar && !isCaptionText) {
              fancybox.close();
            }
          });
        }
      },
      destroy: () => {
        if (window.location.hash) {
          history.replaceState(null, null, ' ');
        }
      }
    },
  });
}



window.addEventListener('beforeunload', () => {
  if (typeof Fancybox !== 'undefined') {
    Fancybox.close(true);
  }
});

window.addEventListener('load', () => {
  if (typeof Fancybox !== 'undefined') {
    Fancybox.close(true);
  }
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductGallery);
} else {
  initProductGallery();
}


function initWishlist() {
  const likedButtons = document.querySelectorAll('.product-detail__liked');
  const successModal3 = document.getElementById('successModal3');

  if (!likedButtons.length || !successModal3) return;

  likedButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      btn.classList.toggle('active');

      if (btn.classList.contains('active')) {
        successModal3.classList.add('active');

        setTimeout(() => {
          successModal3.classList.remove('active');
        }, 3000);
      }
    });
  });
}


document.addEventListener('DOMContentLoaded', initWishlist);


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
    initSortPopup();
    initGallery();
    initProductAccordion();
    initAccordionProduct();
    initQuantityControl();
    initCartModal();
    initNotifyAvailability();
    initSpecificationsModal();
    initReviewsModal();
    initProductGallery();
}

// Запуск приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', initApp);
window.addEventListener('resize', initSwiperProduct);
