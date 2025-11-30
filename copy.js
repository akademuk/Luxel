// Функція для управління випадаючими списками (контакти і языки)
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

    // Функція блокировки скролла
    function lockScroll() {
        document.documentElement.classList.add(stateClasses.isLock);
        document.body.classList.add(stateClasses.isLock);
    }

    // Функція разблокировки скролла
    function unlockScroll() {
        document.documentElement.classList.remove(stateClasses.isLock);
        document.body.classList.remove(stateClasses.isLock);
    }

    // Функція открытия модалки успеха
    function openSuccessModal() {
        if (successModal) {
            successModal.classList.add(stateClasses.active);
            lockScroll();
        }
    }

    // Функція закриття модалки успеха
    function closeSuccessModal() {
        if (successModal) {
            successModal.classList.remove(stateClasses.active);
            unlockScroll();
        }
    }

    // Функція открытия главного меню
    function openMenu() {
        burgerButtonElement.classList.add(stateClasses.isActive);
        overlayElement.classList.add(stateClasses.isActive);
        if (burgerMenu) {
            burgerMenu.classList.add(stateClasses.isActive);
        }
        lockScroll();
    }

    // Функція закриття главного меню
    function closeMenu() {
        burgerButtonElement.classList.remove(stateClasses.isActive);
        overlayElement.classList.remove(stateClasses.isActive);
        if (burgerMenu) {
            burgerMenu.classList.remove(stateClasses.isActive);
        }
        unlockScroll();

        // Закриваем все вложенные меню
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
    burgerButtonElement.addEventListener('click', function (e) {
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

// Функція для управління каталогом меню
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
// Функція для управління пошуком
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

// Функція для іниціалізації Swiper злайдера
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
            loop: false,
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
                    slidesPerView: 'auto',
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

// Функція для управління табами
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

// Функція для управління модальними окнами
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

// Функція для управління модальним окном "Написати нам"
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

        // Закриваємо дропдаун, якщо він відкритий
        const dropdown = openwriteUsModalBtn.closest('.dropdown');
        if (dropdown) {
            dropdown.classList.remove('active');
        }
    });

    // Закриття по кнопке крестика
    closeModal2.addEventListener('click', function (e) {
        e.preventDefault();
        closeModalFunc(writeUsModal);
    });

    // Закриття при клике ВНЕ modal__content
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

// Функція для управління табами
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

                // Check if any other menus are still open
                const anyMenuOpen = document.querySelector('.slide-menu.active, #account-menu.active');
                if (!anyMenuOpen) {
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }

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

        // Close account menu if open
        const accountMenu = document.getElementById('account-menu');
        if (accountMenu) {
            accountMenu.classList.remove('active');
        }

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

    // Функція для оновлення кнопки фільтра
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

    // Ініціалізація при завантаженні (якщо є попередньо обрані фільтри)
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

    // Якщо елементів галереї немає на сторінці, просто виходимо з функції
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

        header.addEventListener('click', function () {
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
        } else {
            decreaseBtn.disabled = false;
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

// Функція для управління кількістю товару в cartModal2
function initQuantityControl2() {
    const decreaseBtn2 = document.getElementById('decreaseBtn2');
    const increaseBtn2 = document.getElementById('increaseBtn2');
    const quantityInput2 = document.getElementById('quantityInput2');

    if (!decreaseBtn2 || !increaseBtn2 || !quantityInput2) return;

    // Перевірка чи вже ініціалізовано
    if (decreaseBtn2.dataset.initialized === 'true') return;

    // Позначаємо як ініціалізоване
    decreaseBtn2.dataset.initialized = 'true';
    increaseBtn2.dataset.initialized = 'true';

    // Функція оновлення стану кнопки зменшення
    function updateDecreaseButton() {
        const value = parseInt(quantityInput2.value) || 1;
        if (value <= 1) {
            decreaseBtn2.disabled = true;
        } else {
            decreaseBtn2.disabled = false;
        }
    }

    // Зменшення кількості
    decreaseBtn2.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        let value = parseInt(quantityInput2.value) || 1;
        if (value > 1) {
            quantityInput2.value = value - 1;
            updateDecreaseButton();
        }
    });

    // Збільшення кількості
    increaseBtn2.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        let value = parseInt(quantityInput2.value) || 0;
        const max = parseInt(quantityInput2.max) || 999;
        if (value < max) {
            quantityInput2.value = value + 1;
            updateDecreaseButton();
        }
    });

    // Обробка ручного введення
    quantityInput2.addEventListener('input', () => {
        let value = parseInt(quantityInput2.value);
        const min = parseInt(quantityInput2.min) || 1;
        const max = parseInt(quantityInput2.max) || 999;

        if (isNaN(value) || quantityInput2.value === '') {
            return;
        }

        if (value < min) quantityInput2.value = min;
        if (value > max) quantityInput2.value = max;

        updateDecreaseButton();
    });

    // Обробка виходу з поля (blur)
    quantityInput2.addEventListener('blur', () => {
        if (quantityInput2.value === '' || isNaN(parseInt(quantityInput2.value))) {
            quantityInput2.value = 1;
            updateDecreaseButton();
        }
    });

    // Ініціалізація стану кнопки
    updateDecreaseButton();
}

// Функція для модалки додавання в кошик
function initCartModal() {
    const buyButtons = document.querySelectorAll('.js-buy-btn');
    const cartModal = document.getElementById('cartModal');
    const cartModal2 = document.getElementById('cartModal2');

    if (!buyButtons.length || (!cartModal && !cartModal2)) return;

    const body = document.body;

    buyButtons.forEach(buyBtn => {
        if (buyBtn.dataset.cartInitialized === 'true') return;
        buyBtn.dataset.cartInitialized = 'true';

        buyBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Перевіряємо розмір екрану
            const isMobile = window.innerWidth < 768;

            if (isMobile && cartModal2) {
                // На мобільних спочатку відкриваємо cartModal2
                cartModal2.classList.add('active');
                body.classList.add('is-lock');
            } else if (cartModal) {
                // На десктопі відкриваємо cartModal
                cartModal.classList.add('active');
                body.classList.add('is-lock');
            }
        });
    });

    // Функції закриття модалок
    function closeModal() {
        if (cartModal) {
            cartModal.classList.remove('active');
        }
        body.classList.remove('is-lock');
    }

    function closeModal2() {
        if (cartModal2) {
            cartModal2.classList.remove('active');
        }
        body.classList.remove('is-lock');
    }

    // Обробники для cartModal
    if (cartModal) {
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
    }

    // Обробники для cartModal2
    if (cartModal2) {
        const closeCartModal2 = document.getElementById('closeCartModal2');

        if (closeCartModal2) {
            closeCartModal2.addEventListener('click', closeModal2);
        }

        cartModal2.addEventListener('click', (e) => {
            if (e.target === cartModal2) {
                closeModal2();
            }
        });
    }

    // Обробка Escape для обох модалок
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (cartModal && cartModal.classList.contains('active')) {
                closeModal();
            }
            if (cartModal2 && cartModal2.classList.contains('active')) {
                closeModal2();
            }
        }
    });

    // Кнопка "Купити" в cartModal2 - переходить до cartModal
    const checkoutBtn2 = document.getElementById('checkoutBtn2');
    if (checkoutBtn2 && cartModal2 && cartModal) {
        checkoutBtn2.addEventListener('click', (e) => {
            e.preventDefault();
            // Закриваємо cartModal2
            cartModal2.classList.remove('active');
            // Відкриваємо cartModal
            cartModal.classList.add('active');
        });
    }

    // Кнопка "Купити" в cartModal - перехід на сторінку checkout
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            window.location.href = '/checkout.html';
        });
    }
}

// Функція для повідомлення про наявність
function initNotifyAvailability() {
    const notifyBtn = document.getElementById('notifyBtn');
    const notifyBtnSidebar = document.getElementById('notifyBtnSidebar');
    const notifyModal = document.getElementById('notifyModal');
    const notifyForm = document.getElementById('notifyForm');

    if ((!notifyBtn && !notifyBtnSidebar) || !notifyModal || !notifyForm) return;

    const notifyPhone = document.getElementById('notifyPhone');
    const submitBtn = notifyForm.querySelector('button[type="submit"]');
    const errorSpan = notifyForm.querySelector('.novalid-style');

    // Функція відкриття модалки
    const openModal = (e) => {
        e.preventDefault();
        notifyModal.classList.add('active');
        document.body.classList.add('is-lock');

        // Добавляем класс invalid при открытии
        if (submitBtn) {
            submitBtn.classList.add('invalid');
        }
    };

    // Відкриття модалки для обох кнопок
    if (notifyBtn) {
        notifyBtn.addEventListener('click', openModal);
    }
    if (notifyBtnSidebar) {
        notifyBtnSidebar.addEventListener('click', openModal);
    }

    // Закриття модалки
    const closeModal = () => {
        notifyModal.classList.remove('active');
        document.body.classList.remove('is-lock');
        notifyForm.reset();
        // Возвращаем класс invalid и скрываем ошибку при закрытии
        if (submitBtn) submitBtn.classList.add('invalid');
        if (errorSpan) errorSpan.classList.add('hidden');
    };

    document.getElementById('closeNotifyModal')?.addEventListener('click', closeModal);

    notifyModal.addEventListener('click', (e) => {
        if (e.target === notifyModal) closeModal();
    });

    // Валідація та активація кнопки
    if (notifyPhone && submitBtn && errorSpan) {
        // Используем jQuery для совместимости с маской
        jQuery(notifyPhone).on('input keyup change', function () {
            // Маска: +38(999)999-99-99 - всього 12 цифр
            const cleanPhone = this.value.replace(/\D/g, '');

            // Управляем классом invalid вместо disabled
            if (cleanPhone.length < 12) {
                submitBtn.classList.add('invalid');
            } else {
                submitBtn.classList.remove('invalid');
            }

            // Скрываем ошибку при вводе
            errorSpan.classList.add('hidden');
        });

        // Обробник кліку на кнопку (спрацює навіть якщо кнопка invalid)
        submitBtn.addEventListener('click', (e) => {
            const cleanPhone = notifyPhone.value.replace(/\D/g, '');

            // Якщо телефон невалідний - показуємо помилку і блокуємо submit
            if (cleanPhone.length < 12) {
                e.preventDefault();
                e.stopPropagation();
                errorSpan.classList.remove('hidden');
                return;
            }

            // Якщо телефон валідний -ховаємо помилку і дозволяємо submit
            errorSpan.classList.add('hidden');
        });
    }

    // Відправка форми (спрацює тільки якщо валідація пройшла)
    notifyForm.addEventListener('submit', ( e) => {
        e.preventDefault();

        // Скрываем ошибку если была показана
        const errorSpanElement = notifyForm.querySelector('.novalid-style');
        if (errorSpanElement) errorSpanElement.classList.add('hidden');

        // Закрываем и показываем успех
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

// Функція для модальності характеристик
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

    // Закриття модалки
    const closeModal = () => {
        specsModal.classList.remove('active');
        body.classList.remove('is-lock');
    };

    const closeSpecsModal = document.getElementById('closeSpecsModal');
    if (closeSpecsModal) {
        closeSpecsModal.addEventListener('click', closeModal);
    }

    // Закриття по клику на overlay
    specsModal.addEventListener('click', (e) => {
        if (e.target === specsModal) closeModal();
    });

    // Закриття по Escape
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
    const reviewsBtns = document.querySelectorAll('.product-detail__reviews-rating-btn');
    const reviewsBtnMain = document.querySelector('.product-detail__reviews-btn');
    const reviewsModal = document.getElementById('reviewsModal');

    if (!reviewsModal) return;
    if (reviewsBtns.length === 0 && !reviewsBtnMain) return;

    // Відкриття модалки
    const openModal = (e) => {
        e?.preventDefault();
        reviewsModal.classList.add('active');
        document.body.classList.add('is-lock'); // Добавляем класс is-lock
    };

    // Закриття модалки
    const closeModal = () => {
        reviewsModal.classList.remove('active');
        document.body.classList.remove('is-lock'); // Удаляем класс is-lock
    };

    // Підключення подій до всіх кнопок з класом product-detail__reviews-rating-btn
    reviewsBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    // Підключення події до основної кнопки
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
                middle: ["counter"],
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



// Инициализация Fancybox для галерей в отзывах
function initReviewsGallery() {
    if (typeof Fancybox === 'undefined') return;

    // Инициализируем для галереи в модальном окне отзывов
    Fancybox.bind('[data-fancybox="galleryReviews"]', {
        Hash: false,
        Thumbs: {
            type: "classic",
            autoStart: true,
        },
        Toolbar: {
            display: {
                left: [],
                middle: ["counter"],
                right: ["close"],
            },
        },
        Carousel: {
            infinite: true,
        },
        dragToClose: false,
        animated: false,
        showClass: false,
        hideClass: false,
        closeButton: "outside",
        click: false, // Отключаем закрытие по клику
        caption: function (fancybox, slide) {
            // Получаем информацию об авторе из родительского элемента reviews-list__item
            const triggerElement = slide.triggerEl || slide.$trigger;
            const reviewItem = triggerElement?.closest('.reviews-list__item');

            if (reviewItem) {
                const author = reviewItem.querySelector('.reviews-list__item-autor h3')?.textContent || '';
                const date = reviewItem.querySelector('.reviews-list__item-autor time')?.textContent || '';

                if (author && date) {
                    return `
                        <h2 class="fancybox-title">${author}</h2>
                        <p class="fancybox-subtitle">${date}</p>
                    `;
                }
            }
            return '';
        },
        on: {
            ready: (fancybox) => {
                console.log('🟠 MODAL GALLERY - Ready event fired');

                // Добавляем кастомный класс к контейнеру для стилизации
                const container = document.querySelector('.fancybox__container');
                if (container) {
                    container.classList.add('fancybox-modal-gallery');
                }

                // Добавляем обработчик клика на backdrop для закрытия
                setTimeout(() => {
                    const backdrop = document.querySelector('.fancybox__backdrop');
                    if (backdrop) {
                        backdrop.addEventListener('click', (e) => {
                            console.log('🔵 Modal backdrop clicked');
                            if (e.target === backdrop) {
                                console.log('🔴 Closing modal gallery');
                                fancybox.close();
                            }
                        });
                    }

                    // Также добавляем клик на контейнер вне carousel
                    const container = document.querySelector('.fancybox__container');
                    if (container) {
                        container.addEventListener('click', (e) => {
                            if (!e.target.closest('.fancybox__carousel') &&
                                !e.target.closest('.fancybox__toolbar') &&
                                !e.target.closest('.fancybox__nav') &&
                                !e.target.closest('.f-thumbs') &&
                                !e.target.closest('button')) {
                                console.log('🔴 Closing modal gallery - click outside carousel');
                                fancybox.close();
                            }
                        });
                    }
                }, 100);

                try {
                    // Получаем карусель с миниатюрами
                    const thumbsPlugin = fancybox.plugins?.Thumbs;
                    if (!thumbsPlugin || !thumbsPlugin.carousel) return;

                    // Функция для управления кнопками навигации
                    const updateNavigationButtons = () => {
                        try {
                            const currentIndex = fancybox.getSlide()?.index ?? 0;
                            const totalSlides = fancybox.getSlideCount();

                            // Находим кнопки навигации
                            const prevButton = document.querySelector('.fancybox__nav .f-button[data-fancybox-prev]');
                            const nextButton = document.querySelector('.fancybox__nav .f-button[data-fancybox-next]');

                            // Отключаем кнопку "назад" на первом слайде
                            if (prevButton) {
                                // Удаляем старый обработчик если есть
                                if (prevButton._blockHandler) {
                                    prevButton.removeEventListener('click', prevButton._blockHandler, true);
                                    prevButton._blockHandler = null;
                                }

                                if (currentIndex === 0) {
                                    prevButton.disabled = true;
                                    prevButton.style.opacity = '0.3';
                                    prevButton.style.cursor = 'not-allowed';

                                    // Блокируем клик через capture phase
                                    prevButton._blockHandler = (e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        e.stopImmediatePropagation();
                                        console.log('🔴 Blocked prev click - already at first');
                                        return false;
                                    };
                                    prevButton.addEventListener('click', prevButton._blockHandler, true);
                                } else {
                                    prevButton.disabled = false;
                                    prevButton.style.opacity = '';
                                    prevButton.style.cursor = '';
                                }
                            }

                            // Отключаем кнопку "вперед" на последнем слайде
                            if (nextButton) {
                                // Удаляем старый обработчик если есть
                                if (nextButton._blockHandler) {
                                    nextButton.removeEventListener('click', nextButton._blockHandler, true);
                                    nextButton._blockHandler = null;
                                }

                                if (currentIndex === totalSlides - 1) {
                                    nextButton.disabled = true;
                                    nextButton.style.opacity = '0.3';
                                    nextButton.style.cursor = 'not-allowed';

                                    // Блокируем клик через capture phase
                                    nextButton._blockHandler = (e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        e.stopImmediatePropagation();
                                        console.log('🔴 Blocked next click - already at last');
                                        return false;
                                    };
                                    nextButton.addEventListener('click', nextButton._blockHandler, true);
                                } else {
                                    nextButton.disabled = false;
                                    nextButton.style.opacity = '';
                                    nextButton.style.cursor = '';
                                }
                            }

                            // Показываем миниатюры, если они скрыты
                            const thumbsWrapper = document.querySelector('.f-thumbs__viewport, .f-thumbs');
                            if (thumbsWrapper) {
                                thumbsWrapper.style.display = '';
                                thumbsWrapper.style.visibility = 'visible';
                                thumbsWrapper.style.opacity = '1';
                            }
                        } catch (err) {
                            console.warn('Error updating navigation buttons:', err);
                        }
                    };

                    // Функция для центрирования активной миниатюры
                    const centerThumb = () => {
                        try {
                            const currentIndex = fancybox.getSlide()?.index ?? 0;

                            // Ищем контейнер с миниатюрами
                            const thumbsWrapper = document.querySelector('.f-thumbs__viewport, .f-thumbs');
                            if (!thumbsWrapper) return;

                            const activeThumb = thumbsWrapper.querySelector(`.f-thumbs__slide:nth-child(${currentIndex + 1})`);
                            if (!activeThumb) return;

                            // Вычисляем позицию для центрирования
                            const containerWidth = thumbsWrapper.offsetWidth;
                            const thumbLeft = activeThumb.offsetLeft;
                            const thumbWidth = activeThumb.offsetWidth;
                            const scrollLeft = thumbLeft - (containerWidth / 2) + (thumbWidth / 2);

                            // Плавная прокрутка к центру
                            thumbsWrapper.scrollTo({
                                left: Math.max(0, scrollLeft),
                                behavior: 'smooth'
                            });
                        } catch (err) {
                            console.warn('Error centering thumb:', err);
                        }
                    };

                    // Инициализация при открытии
                    setTimeout(() => {
                        updateNavigationButtons();
                        centerThumb();
                    }, 150);

                    // Обновляем при смене слайда
                    fancybox.on('change', () => {
                        updateNavigationButtons();
                        centerThumb();
                    });
                } catch (err) {
                    console.warn('Error initializing click handlers:', err);
                }
            }
        }
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
    document.addEventListener('DOMContentLoaded', () => {
        initProductGallery();
        initReviewsGallery();
    });
} else {
    initProductGallery();
    initReviewsGallery();
}


function initWishlist() {
    const likedButtons = document.querySelectorAll('.product-detail__liked');
    const successModal3 = document.getElementById('successModal3');
    const successModal8 = document.getElementById('successModal8');

    if (!likedButtons.length || !successModal3) return;

    likedButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            btn.classList.toggle('active');

            if (btn.classList.contains('active')) {
                // Додано в обране
                successModal3.classList.add('active');

                setTimeout(() => {
                    successModal3.classList.remove('active');
                }, 3000);
            } else {
                // Видалено з обраного
                if (successModal8) {
                    successModal8.classList.add('active');

                    setTimeout(() => {
                        successModal8.classList.remove('active');
                    }, 3000);
                }
            }
        });
    });
}

function initializeReviewsSwiper() {
    // Проверяем, существует ли элемент с слайдером, чтобы избежать ошибок в случае его отсутствия
    const swiperElement = document.querySelector('.reviews-list__main');
    if (!swiperElement) return;

    const reviewsSwiper = new Swiper('.reviews-list__main', {
        loop: false,
        slidesPerView: 6,
        spaceBetween: 8,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            disabledClass: 'swiper-button-disabled', // Класс для отключенных кнопок
        }
    });

    // Добавляем слушателей событий для скрытия/отображения кнопок навигации в зависимости от состояния слайдера
    reviewsSwiper.on('slideChange', function () {
        toggleNavigationButtons(reviewsSwiper);
    });

    // Скрытие или отображение кнопок навигации в зависимости от возможности свайпать
    function toggleNavigationButtons(swiper) {
        const prevButton = document.querySelector('.swiper-button-prev');
        const nextButton = document.querySelector('.swiper-button-next');

        if (swiper.isBeginning) {
            prevButton.classList.add('swiper-button-disabled');
        } else {
            prevButton.classList.remove('swiper-button-disabled');
        }

        if (swiper.isEnd) {
            nextButton.classList.add('swiper-button-disabled');
        } else {
            nextButton.classList.remove('swiper-button-disabled');
        }
    }

    // Инициализируем начальное состояние кнопок
    toggleNavigationButtons(reviewsSwiper);
}

function toggleAnswerVisibility() {
    const toggleButtons = document.querySelectorAll('.reviews-list__item-description-answer-btn');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function () {
            const answerBox = button.closest('.reviews-list__item-description-answer');
            const contentBox = answerBox.querySelector('.reviews-list__item-description-answer--box');

            contentBox.classList.toggle('hidden');

            const isHidden = contentBox.classList.contains('hidden');
            const buttonText = isHidden ? 'Показати відповідь' : 'Приховати відповідь';
            button.querySelector('span').textContent = buttonText;
        });
    });
}

// Фільтрація відгуків
document.addEventListener('DOMContentLoaded', function () {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const reviewsItems = document.querySelectorAll('.reviews-list__item, .reviews-list__image');

    // Функція для сортування за датою (найновіші спочатку)
    function sortByDate() {
        const reviewsList = document.querySelector('.reviews-list');
        const items = Array.from(reviewsItems);

        items.sort((a, b) => {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            return dateB - dateA; // Новіші спочатку
        });

        items.forEach(item => reviewsList.appendChild(item));
    }

    // Функція для сортування за рейтингом (найвищий спочатку)
    function sortByRating() {
        const reviewsList = document.querySelector('.reviews-list');
        const items = Array.from(reviewsItems);

        items.sort((a, b) => {
            const ratingA = parseFloat(a.dataset.rating);
            const ratingB = parseFloat(b.dataset.rating);
            return ratingB - ratingA; // Вищий рейтинг спочатку
        });

        items.forEach(item => reviewsList.appendChild(item));
    }

    // Функція для фільтрації за наявністю фото
    function filterByPhotos() {
        reviewsItems.forEach(item => {
            if (item.dataset.hasPhotos === 'true') {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Функція для скидання фільтра (показати всі)
    function showAll() {
        reviewsItems.forEach(item => {
            item.style.display = '';
        });
    }

    // Обробка кліків на вкладки фільтрів
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Видалити активний клас з усіх вкладок
            filterTabs.forEach(t => t.classList.remove('active'));

            // Додати активний клас до поточної вкладки
            this.classList.add('active');

            // Показати всі елементи перед застосуванням нового фільтра
            showAll();

            // Застосувати відповідний фільтр
            const filter = this.dataset.filter;

            switch (filter) {
                case 'date':
                    sortByDate();
                    break;
                case 'rating':
                    sortByRating();
                    break;
                case 'photos':
                    filterByPhotos();
                    break;
            }
        });
    });

    // Ініціалізація: сортування за датою за замовчуванням
    sortByDate();

    // Обробка кнопок "Приховати відповідь"
    const answerButtons = document.querySelectorAll('.reviews-list__item-description-answer-btn');

    answerButtons.forEach(button => {
        button.addEventListener('click', function () {
            const answerBox = this.previousElementSibling;
            const span = this.querySelector('span');

            if (answerBox.style.display === 'none') {
                answerBox.style.display = '';
                span.textContent = 'Приховати відповідь';
            } else {
                answerBox.style.display = 'none';
                span.textContent = 'Показати відповідь';
            }
        });
    });
});



document.addEventListener('DOMContentLoaded', function () {
    // Перевірка на успішну реєстрацію після редіректу
    if (localStorage.getItem('registrationSuccess') === 'true') {
        const successModal = document.getElementById('successModal9');
        if (successModal) {
            successModal.classList.add('active');
            setTimeout(() => {
                successModal.classList.remove('active');
            }, 3000);
        }
        localStorage.removeItem('registrationSuccess');
    }

    // --- Елементи модалки реєстрації ---
    const modal = document.getElementById('newAccount');
    const openBtns = document.querySelectorAll('.modal__content-account-new');
    const closeBtns = document.querySelectorAll('[data-close="newAccount"]');

    // Кнопка "Назад"
    const backBtn = modal ? modal.querySelector('.modal-accaunt-prev') : null;

    // Крок 1: Реєстрація
    const headerRegister = document.getElementById('header-register');
    const stepRegister = document.getElementById('step-register');
    const registerForm = document.getElementById('registerForm');
    const registerBtn = document.getElementById('registerBtn');
    const nameInput = document.getElementById('registerName');
    const surnameInput = document.getElementById('registerSurname');
    const phoneInput = document.getElementById('registerPhone');

    // Елементи для Email (Toggle)
    const toggle = document.querySelector('.modal__toggle-input');
    const emailField = document.getElementById('emailField');
    const emailInput = emailField ? emailField.querySelector('input') : null;

    // Крок 2: Код підтвердження
    const headerCode = document.getElementById('header-register-code');
    const stepCode = document.getElementById('step-register-code');
    const codeForm = document.getElementById('registerCodeForm');
    const codeInput = document.getElementById('registerCodeInput');
    const codeBtn = codeForm ? codeForm.querySelector('.modal__form-btn') : null;
    const timerBlock = document.getElementById('registerTimerBlock');
    const timerText = document.getElementById('registerTimerText');
    const resendBtn = document.getElementById('registerResendBtn');
    const notReceivedBtn = document.getElementById('registerCodeNotReceivedBtn');

    let timerInterval;

    if (!modal) return;

    const modalContent = modal.querySelector('.modal__content');

    // Ініціалізація стану кнопки коду
    if (codeBtn) {
        codeBtn.disabled = true;
        codeBtn.classList.add('invalid');
    }

    // --- Відкриття/Закриття ---
    function openModal() {
        // Закриваємо інші модалки (наприклад, логін), якщо вони відкриті
        const loginMenu = document.getElementById('account-menu');
        if (loginMenu) loginMenu.classList.remove('active');

        modal.classList.add('active');
        document.body.classList.add('is-lock');
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('is-lock');

        const overlay = document.querySelector('.overlay');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';

        setTimeout(resetForm, 300);
    }

    // Обробники відкриття
    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    // Обробники закриття
    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
        });
    });

    // Закриття при кліку на фон
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // --- Обробка кнопки "Назад" ---
    if (backBtn) {
        backBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Якщо ми на першому кроці (форма реєстрації видна), закриваємо модалку
            if (stepRegister.style.display !== 'none') {
                closeModal();
                return;
            }

            // Повертаємося на крок 1
            headerRegister.style.display = 'flex';
            stepRegister.style.display = 'flex';
            headerCode.style.display = 'none';
            stepCode.style.display = 'none';

            // Видаляємо клас таймера
            if (modalContent) modalContent.classList.remove('modal__content-account-timer');

            // Зупиняємо таймер
            clearInterval(timerInterval);

            // Очищаємо поле введення коду та помилки
            if (codeInput) {
                codeInput.value = '';
                const errorSpan = codeInput.parentElement.querySelector('.novalid-style');
                if (errorSpan) errorSpan.style.display = 'none';
                codeInput.style.borderColor = '';
            }

            // Скидаємо стан кнопки підтвердження
            if (codeBtn) {
                codeBtn.disabled = true;
                codeBtn.classList.add('invalid');
            }
        });
    }

    // --- Таймер ---
    function startTimer(duration) {
        let timer = duration, minutes, seconds;

        timerBlock.style.display = 'flex';
        resendBtn.style.display = 'none';
        // notReceivedBtn не ховаємо, він залишається видимим

        clearInterval(timerInterval);

        timerInterval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            timerText.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                clearInterval(timerInterval);
                timerBlock.style.display = 'none';
                resendBtn.style.display = 'inline-block';
                notReceivedBtn.style.display = 'inline-block';
            }
        }, 1000);
    }

    // Кнопка "Надіслати повторно"
    if (resendBtn) {
        resendBtn.addEventListener('click', () => {
            console.log('Код отправлен повторно');
            startTimer(60);

            // Відображення successModal11
            const successModal11 = document.getElementById('successModal11');
            if (successModal11) {
                successModal11.classList.add('active');
                setTimeout(() => {
                    successModal11.classList.remove('active');
                }, 3000);
            }
        });
    }

    // Функция сброса формы
    function resetForm() {
        // Скидання видимості кроків
        if (headerRegister) headerRegister.style.display = 'flex';
        if (stepRegister) stepRegister.style.display = 'flex';
        if (headerCode) headerCode.style.display = 'none';
        if (stepCode) stepCode.style.display = 'none';

        // Видаляємо клас таймера
        if (modalContent) modalContent.classList.remove('modal__content-account-timer');

        // Очищення полів
        if (registerForm) registerForm.reset();
        if (codeForm) codeForm.reset();

        // Скидання стану toggle
        if (toggle) {
            toggle.checked = false;
            if (emailField) emailField.classList.remove('show');
        }

        // Приховування помилок
        const errorSpans = modal.querySelectorAll('.novalid-style');
        errorSpans.forEach(span => span.style.display = 'none');
        const inputs = modal.querySelectorAll('input');
        inputs.forEach(input => input.style.borderColor = '');

        // Блокування кнопки
        if (registerBtn) registerBtn.disabled = true;
        if (codeBtn) {
            codeBtn.disabled = true;
            codeBtn.classList.add('invalid');
        }

        // Скидання таймера
        clearInterval(timerInterval);
    }

    // --- Валідація Кроку 1 ---
    function validateRegisterForm() {
        if (!nameInput || !surnameInput || !phoneInput || !registerBtn) return;

        const isNameValid = nameInput.value.trim().length > 0;
        const isSurnameValid = surnameInput.value.trim().length > 0;
        // Проста перевірка телефону (довжина цифр)
        const phoneVal = phoneInput.value.replace(/\D/g, '');
        const isPhoneValid = phoneVal.length >= 10;

        // Валідація Email залежно від Toggle
        let isEmailValid = true;
        if (toggle && toggle.checked) {
            if (emailInput) {
                const emailVal = emailInput.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isEmailValid = emailRegex.test(emailVal);
            } else {
                isEmailValid = false;
            }
        }

        if (isNameValid && isSurnameValid && isPhoneValid && isEmailValid) {
            registerBtn.disabled = false;
        } else {
            registerBtn.disabled = true;
        }
    }

    [nameInput, surnameInput, phoneInput].forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                // Приховуємо помилку при введенні
                const errorSpan = input.parentElement.querySelector('.novalid-style');
                if (errorSpan) errorSpan.style.display = 'none';
                input.style.borderColor = '';

                validateRegisterForm();
            });

            if (input === phoneInput) {
                input.addEventListener('blur', () => {
                    const phoneVal = input.value.replace(/\D/g, '');
                    if (phoneVal.length > 0 && phoneVal.length < 10) {
                        const errorSpan = input.parentElement.querySelector('.novalid-style');
                        if (errorSpan) errorSpan.style.display = 'block';
                        input.style.borderColor = '#E31E24';
                    }
                });
            }
        }
    });

    // Слухач для Toggle
    if (toggle && emailField) {
        toggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                emailField.classList.add('show');
            } else {
                emailField.classList.remove('show');
                // Якщо закрили, очищаємо помилки email
                if (emailInput) {
                    const errorSpan = emailInput.parentElement.querySelector('.novalid-style');
                    if (errorSpan) errorSpan.style.display = 'none';
                    emailInput.style.borderColor = '';
                }
            }
            validateRegisterForm();
        });
    }

    // Слухач для Email input
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            const errorSpan = emailInput.parentElement.querySelector('.novalid-style');
            if (errorSpan) errorSpan.style.display = 'none';
            emailInput.style.borderColor = '';
            validateRegisterForm();
        });
    }

    // --- Відправка Кроку 1 ---
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Додаткова перевірка телефону перед відправкою
            const phoneVal = phoneInput.value.replace(/\D/g, '');
            if (phoneVal.length < 10) {
                const errorSpan = phoneInput.parentElement.querySelector('.novalid-style');
                if (errorSpan) errorSpan.style.display = 'block';
                phoneInput.style.borderColor = '#E31E24';
                return;
            }

            // Перевірка Email при сабміті, якщо toggle увімкнено
            if (toggle && toggle.checked && emailInput) {
                const emailVal = emailInput.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailVal)) {
                    const errorSpan = emailInput.parentElement.querySelector('.novalid-style');
                    if (errorSpan) errorSpan.style.display = 'block';
                    emailInput.style.borderColor = '#E31E24';
                    return;
                }
            }

            // Перемикання кроків
            headerRegister.style.display = 'none';
            stepRegister.style.display = 'none';
            headerCode.style.display = 'flex';
            stepCode.style.display = 'flex';

            // Додаємо клас до контенту
            if (modalContent) modalContent.classList.add('modal__content-account-timer');

            // Показуємо кнопку повторної відправки відразу, без запуску таймера
            if (timerBlock) timerBlock.style.display = 'none';
            if (resendBtn) resendBtn.style.display = 'inline-block';
            if (notReceivedBtn) notReceivedBtn.style.display = 'inline-block';
        });
    }

    // --- Таймер ---
    function startTimer(duration) {
        let timer = duration, minutes, seconds;

        if (timerBlock) timerBlock.style.display = 'block';
        if (resendBtn) resendBtn.style.display = 'none';
        // notReceivedBtn не ховаємо, він залишається видимим

        clearInterval(timerInterval);

        timerInterval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            if (timerText) timerText.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                clearInterval(timerInterval);
                if (timerBlock) timerBlock.style.display = 'none';
                if (resendBtn) resendBtn.style.display = 'inline-block';
                if (notReceivedBtn) notReceivedBtn.style.display = 'inline-block';
            }
        }, 1000);
    }

    if (resendBtn) {
        resendBtn.addEventListener('click', () => {
            startTimer(60);

            // Відображення successModal11
            const successModal11 = document.getElementById('successModal11');
            if (successModal11) {
                successModal11.classList.add('active');
                setTimeout(() => {
                    successModal11.classList.remove('active');
                }, 3000);
            }
        });
    }

    // --- Відправка Кроку 2 (Код) ---
    if (codeForm) {
        codeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const code = codeInput.value.trim();
            const errorSpan = codeInput.parentElement.querySelector('.novalid-style');

            if (code === '1234') {
                closeModal();

                // Зберігаємо прапорець успішної реєстрації
                localStorage.setItem('registrationSuccess', 'true');

                // Перенаправляємо на сторінку акаунту
                window.location.href = 'accaunt.html';
            } else {
                if (errorSpan) errorSpan.style.display = 'block';
                codeInput.style.borderColor = '#E31E24';
            }
        });

        if (codeInput) {
            codeInput.addEventListener('input', function () {
                const errorSpan = this.parentElement.querySelector('.novalid-style');
                if (errorSpan) errorSpan.style.display = 'none';
                this.style.borderColor = '';

                if (codeBtn) {
                    if (this.value.trim().length > 0) {
                        codeBtn.disabled = false;
                        codeBtn.classList.remove('invalid');
                    } else {
                        codeBtn.disabled = true;
                        codeBtn.classList.add('invalid');
                    }
                }
            });
        }
    }
});

function initShoppingCart() {
    const FREE_DELIVERY_THRESHOLD = 2000; // 2000 грн для безкоштовної доставки
    const productList = document.querySelector('.shopping-cart-product-list');
    const emptyCart = document.querySelector('.shopping-cart-empty');
    const filledCart = document.querySelector('.shopping-cart-product');
    const togetherSection = document.querySelector('.shopping-cart-together');
    const promoToggle = document.querySelector('.promo-code__toggle');
    const promoContent = document.querySelector('.promo-code__content');
    const promoInput = document.querySelector('.promo-code__input');
    const promoApply = document.querySelector('.promo-code__apply');
    const promoErrors = document.querySelectorAll('.promo-code__error'); // Изменено на querySelectorAll
    const appliedPromo = document.getElementById('applied-promo');
    const promoName = document.getElementById('promo-name');
    const removePromo = document.getElementById('remove-promo');
    const shoppingCart = document.getElementById('cart-menu');
    const shoppingCartClose = document.querySelector('.shopping-cart__close');
    const emptyCartBtn = document.querySelector('.shopping-cart-empty-btn');
    const basketValues = document.querySelectorAll('.bascet-value'); // Получаем все элементы
    const cartButtons = document.querySelectorAll('[data-menu="cart"]'); // Кнопки открытия корзины
    const promoInputClose = document.querySelector('.promo-code__input-close');

    // Модалки
    const successModal5 = document.getElementById('successModal5');
    const successModal6 = document.getElementById('successModal6');
    const successModal7 = document.getElementById('successModal7');
    const deleteProductModal = document.getElementById('delateProductModal');
    const deleteProductText = document.querySelector('.delate-product-text');

    // Функція для обновлення всіх блоків помилок промокоду
    function updatePromoErrors(text, color = '') {
        promoErrors.forEach(errorEl => {
            errorEl.textContent = text;
            if (color) {
                errorEl.style.color = color;
            }
        });
    }

    // Функції для модалок
    function showModal(modal) {
        modal.classList.add('active');
        document.body.classList.add('is-lock');
        setTimeout(() => {
            modal.classList.remove('active');
            document.body.classList.remove('is-lock');
        }, 3000);
    }

    // Открытие корзины
    function openCart() {
        shoppingCart.classList.add('active');
        document.body.classList.add('is-lock');
        const overlay = document.querySelector('.overlay');
        if (overlay) {
            overlay.classList.add('active');
        }
        
        // Добавляем класс active к родительским элементам кнопок корзины
        cartButtons.forEach(button => {
            const parentItem = button.closest('.mobile-nav__item');
            if (parentItem) {
                parentItem.classList.add('active');
            }
        });
    }

    // Закриття корзини
    function closeCart() {
        shoppingCart.classList.remove('active');
        // Принудительно убираем все возможные классы блокировки
        document.body.classList.remove('is-lock');
        document.body.classList.remove('modal-open');
        document.body.classList.remove('modal-style');
        document.documentElement.classList.remove('is-lock');
        
        // Принудительно убираем inline стили
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        
        const overlay = document.querySelector('.overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
        
        // Убираем класс active с родительских элементов кнопок корзины
        cartButtons.forEach(button => {
            const parentItem = button.closest('.mobile-nav__item');
            if (parentItem) {
                parentItem.classList.remove('active');
            }
        });
    }

    // Открытие корзины по кнопкам
    cartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    });

    // Закриття по кнопке close
    if (shoppingCartClose) {
        shoppingCartClose.addEventListener('click', (e) => {
            e.preventDefault();
            closeCart();
        });
    }

    // Закриття по кнопке shopping-cart-empty-btn
    if (emptyCartBtn) {
        emptyCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeCart();
        });
    }

    // Закриття при клике вне shopping-cart__content
    if (shoppingCart) {
        shoppingCart.addEventListener('click', function (e) {
            if (!e.target.closest('.shopping-cart__content')) {
                closeCart();
            }
        });
    }

    // Оновлення кількості товарів у всіх .bascet-value
    function updateBasketValue() {
        if (basketValues.length === 0) return;
        
        const items = productList.querySelectorAll('.shopping-cart-product-item');
        const itemCount = items.length;
        
        // Обновляем все элементы с классом .bascet-value
        basketValues.forEach(basketValue => {
            if (itemCount > 0) {
                basketValue.textContent = itemCount;
                basketValue.style.display = 'flex';
            } else {
                basketValue.style.display = 'none';
            }
        });
    }

    // Оновлення стану кнопки зменшення кількості
    function updateDecrementButton(productItem) {
        const quantityEl = productItem.querySelector('.shopping-cart-product-item-quantity-number');
        const decrementBtn = productItem.querySelector('.decrement');
        const quantity = parseInt(quantityEl.textContent);
        
        if (quantity <= 1) {
            decrementBtn.disabled = true;
            
        } else {
            decrementBtn.disabled = false;
          
        }
    }

    // Оновлення стану корзини
    // Оновлення стану корзини
    function updateCartState() {
        if (!productList) return;
        const items = productList.querySelectorAll('.shopping-cart-product-item');
        const itemCount = items.length;
        // 1. Показати порожню корзину або заповнену
        if (itemCount === 0) {
            emptyCart.classList.add('active');
            filledCart.classList.remove('active');
        } else {
            emptyCart.classList.remove('active');
            filledCart.classList.add('active');
        }

        // 2. Показати "Разом з цим беруть" тільки якщо 1 товар
        if (itemCount === 1) {
            togetherSection.classList.add('active');
        } else {
            togetherSection.classList.remove('active');
        }

        // Оновити лічильник
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            if (itemCount === 0) {
                cartCount.style.display = 'none';
            } else {
                cartCount.style.display = 'inline';
                cartCount.textContent = `(${itemCount})`;
            }
        }

        // Оновити всі .bascet-value
        updateBasketValue();

        // 3. Оновити загальні суми та прогрес-бар
        updateTotals();

        // 4. Оновити стан кнопок зменшення для всіх товарів
        items.forEach(item => updateDecrementButton(item));
    }

    // Оновлення загальних сум та прогрес-бару
    function updateTotals() {
        if (!productList) return;
        const items = productList.querySelectorAll('.shopping-cart-product-item');
        let totalCurrent = 0;
        let totalOld = 0;

        items.forEach(item => {
            const quantity = parseInt(item.querySelector('.shopping-cart-product-item-quantity-number').textContent);
            const price = parseFloat(item.dataset.price);
            const oldPrice = parseFloat(item.dataset.oldPrice);

            totalCurrent += price * quantity;
            totalOld += oldPrice * quantity;
        });

        const discount = totalOld - totalCurrent;

        // Оновити відображення сум
        document.getElementById('total-current').textContent = totalCurrent.toFixed(2) + ' ₴';
        document.getElementById('total-old').textContent = totalOld.toFixed(2) + ' ₴';
        document.getElementById('total-discount').textContent = '-' + discount.toFixed(2) + ' ₴';

        // Оновити прогрес-бар з градієнтом від червоного до зеленого
        const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - totalCurrent);
        const progress = Math.min(100, (totalCurrent / FREE_DELIVERY_THRESHOLD) * 100);

        const progressFill = document.getElementById('progress-fill');
        const messageBlock = document.querySelector('.delivery-progress__message');
        const successBlock = document.querySelector('.delivery-progress__success');

        progressFill.style.width = progress + '%';

        // Видаляємо всі попередні класи
        progressFill.classList.remove('progress-low', 'progress-medium', 'progress-high', 'progress-complete');

        // Додаємо потрібний клас в залежності від прогресу
        if (progress >= 100) {
            progressFill.classList.add('progress-complete');
            // Ховаємо повідомлення про додавання товарів, показуємо вітання
            messageBlock.style.display = 'none';
            successBlock.style.display = 'block';
        } else {
            // Показуємо повідомлення про додавання товарів, ховаємо вітання
            messageBlock.style.display = 'block';
            successBlock.style.display = 'none';
            document.getElementById('remaining-amount').textContent = remaining.toFixed(0);

            if (progress >= 66) {
                progressFill.classList.add('progress-high');
            } else if (progress >= 33) {
                progressFill.classList.add('progress-medium');
            } else {
                progressFill.classList.add('progress-low');
            }
        }
    }

    // Оновлення ціни товару - тепер НЕ змінюємо ціну в карточці
    function updateItemPrice() {
        // Просто оновлюємо загальні суми
        updateTotals();
    }

    // Модалка підтвердження видалення
    function showDeleteConfirmation(productItem) {
        const productName = productItem.querySelector('.shopping-cart-product-item-header h2')?.textContent.trim() || 'товар';
        
        if (deleteProductText) {
            deleteProductText.textContent = productName;
        }
        
        deleteProductModal.classList.add('active');
        document.body.classList.add('is-lock');

        const cancelBtn = deleteProductModal.querySelector('.cancel-delete');
        const confirmBtn = deleteProductModal.querySelector('.confirm-delete');

        function closeModal() {
            deleteProductModal.classList.remove('active');
            // Принудительно убираем блокировку при закрытии модалки
            document.body.classList.remove('is-lock');
            document.body.classList.remove('modal-open');
            document.body.classList.remove('modal-style');
            document.documentElement.classList.remove('is-lock');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }

        function handleCancel() {
            closeModal();
        }

        function handleConfirm() {
            closeModal();

            productItem.style.transition = 'opacity 0.3s, transform 0.3s';
            productItem.style.opacity = '0';
            productItem.style.transform = 'translateX(20px)';

            setTimeout(() => {
                productItem.remove();
                updateCartState();
                showModal(successModal7);
            }, 300);

            closeAllPopups();
        }

        cancelBtn.addEventListener('click', handleCancel);
        confirmBtn.addEventListener('click', handleConfirm);
    }

    // Делегування подій
    if (productList) {
        productList.addEventListener('click', function (e) {
            const target = e.target.closest('button');
            if (!target) return;

            const productItem = target.closest('.shopping-cart-product-item');
            if (!productItem) return;
            // Збільшення кількості
            if (target.classList.contains('increment')) {
                const quantityEl = productItem.querySelector('.shopping-cart-product-item-quantity-number');
                let quantity = parseInt(quantityEl.textContent);
                quantityEl.textContent = quantity + 1;
                updateItemPrice();
                updateDecrementButton(productItem);
            }

            // Зменшення кількості
            if (target.classList.contains('decrement')) {
                const quantityEl = productItem.querySelector('.shopping-cart-product-item-quantity-number');
                let quantity = parseInt(quantityEl.textContent);
                if (quantity > 1) {
                    quantityEl.textContent = quantity - 1;
                    updateItemPrice();
                    updateDecrementButton(productItem);
                }
            }

            // Відкриття меню
            if (target.classList.contains('shopping-cart-product-item-menu')) {
                e.stopPropagation();
                const popup = productItem.querySelector('.product-menu-popup');
                const isActive = popup.classList.contains('active');

                closeAllPopups();

                if (!isActive) {
                    popup.classList.add('active');
                }
            }

            // Додати в обране
            if (target.classList.contains('favorite-product-btn')) {
                const isActive = target.classList.toggle('active');
                if (isActive) {
                    showModal(successModal5);
                }
                closeAllPopups();
            }

            // Видалення товару
            if (target.classList.contains('delete-product-btn')) {
                showDeleteConfirmation(productItem);
            }
        });
    }

    // Закриття всіх попапів
    function closeAllPopups() {
        document.querySelectorAll('.product-menu-popup').forEach(popup => {
            popup.classList.remove('active');
        });
    }

    // Закриття попапів при кліку поза ними
    document.addEventListener('click', closeAllPopups);

    // Промокод
    if (promoToggle) {
        promoToggle.addEventListener('click', function () {
            promoToggle.classList.toggle('active');
            promoContent.classList.toggle('active');
            updatePromoErrors(''); // Очищаем все блоки ошибок
            promoInput.style.borderColor = '';
        });
    }

    // Закрытие промокода по кнопке close (только на мобильных)
    if (promoInputClose) {
        promoInputClose.addEventListener('click', function (e) {
            e.stopPropagation();
            if (window.innerWidth < 768) {
                promoContent.classList.remove('active');
            }
        });
    }

    // Закрытие промокода при клике вне input-wrapper (только на мобильных)
    if (promoContent) {
        promoContent.addEventListener('click', function (e) {
            if (window.innerWidth < 768) {
                if (!e.target.closest('.promo-code__input-wrapper')) {
                    promoContent.classList.remove('active');
                }
            }
        });
    }

    // Видалення помилки при введенні
    if (promoInput) {
        promoInput.addEventListener('input', function () {
            updatePromoErrors(''); // Очищаем все блоки ошибок
            promoInput.style.borderColor = '';
        });
    }

    if (promoApply) {
        promoApply.addEventListener('click', function () {
            const code = promoInput.value.trim();
            if (code === '') {
                updatePromoErrors('Введіть промокод', '#EF0022');
                promoInput.style.borderColor = '#EF0022';
            } else if (code.toLowerCase() === 'test123') {
                updatePromoErrors('✓ Промокод активовано!', '#4CAF50');
                promoInput.style.borderColor = '';

                // Показуємо застосований промокод
                appliedPromo.style.display = 'flex';
                promoName.textContent = code;
                document.querySelector('.promocode-text').textContent = code;

                // ХоваємоToggle та Content
                promoToggle.style.display = 'none';
                promoContent.classList.remove('active');

                promoInput.value = '';

                showModal(successModal6);
            } else {
                updatePromoErrors('Не дійсний промокод', '#EF0022');
                promoInput.style.borderColor = '#EF0022';
            }
        });
    }

    // Видалення промокоду
    if (removePromo) {
        removePromo.addEventListener('click', function () {
            appliedPromo.style.display = 'none';
            promoName.textContent = '';
            updatePromoErrors(''); // Очищаем все блоки ошибок
            promoInput.style.borderColor = '';

            // Показуємо знову Toggle
            promoToggle.style.display = 'flex';
        });
    }

    // Ініціалізація
    if (appliedPromo) {
        appliedPromo.style.display = 'none';
    }
    updateCartState();
}

function initReviewModal() {
    // Элементы
    const modalAddReview = document.getElementById('addReviews');
    const modalReviews = document.getElementById('reviewsModal');
    const closeModalBtn = document.getElementById('closeModal');
    const form = document.getElementById('reviewForm');
    const submitBtn = document.getElementById('submitBtn');
    const body = document.body;

    // Success-модалка
    const successModal = document.getElementById('successModal4');

    // Рейтинг
    const ratingStars = document.querySelectorAll('.star-btn');
    let selectedRating = 0;

    // Поля
    const comment = document.getElementById('comment');
    const charCount = document.getElementById('charCount');
    const advantages = document.getElementById('advantages');
    const advCount = document.getElementById('advCount');
    const disadvantages = document.getElementById('disadvantages');
    const disCount = document.getElementById('disCount');

    // Зображення
    const fileInput = document.getElementById('fileInput');
    const imagePreview = document.getElementById('imagePreview');
    const uploadLabel = document.querySelector('.upload-label');
    const fileSizeNoteBox = document.querySelector('.file-size-note-box');
    const fileSizeNoteError = document.querySelector('.file-size-note-error');
    const fileSizeNote = document.querySelector('.file-size-note');
    let uploadedFiles = [];

    // Универсальные функции модалок
    function openModal(modalEl) {
        if (!modalEl) return;
        modalEl.classList.add('active');
        body.classList.add('is-lock');
    }

    function closeModal(modalEl) {
        if (!modalEl) return;
        modalEl.classList.remove('active');
        const anyOpen = document.querySelector('.modal.active');
        if (!anyOpen) body.classList.remove('is-lock');
    }

    function closeAllModals() {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    // Открыть форму отзывов по клику на кнопки с классом reviews-modal-btn
    document.addEventListener('click', (e) => {
        if (e.target.closest('.reviews-modal-btn')) {
            openModal(modalAddReview);
        }
    });

    // Закриття модалки по кнопке
    closeModalBtn?.addEventListener('click', () => {
        closeModal(modalAddReview);
    });

    // Закриття при клику на backdrop (для всіх модалок с класом .modal)
    document.addEventListener('click', (e) => {
        const modalEl = e.target.closest('.modal');
        if (modalEl && e.target === modalEl) closeModal(modalEl);
    });

    // Делегирование кликов по кнопкам закрытия
    document.addEventListener('click', (e) => {
        const closeBtn = e.target.closest('[data-modal-close], .modal__back, .js-modal-close');
        if (closeBtn) {
            const modalEl = closeBtn.closest('.modal');
            if (modalEl) closeModal(modalEl);
        }
    });

    // Рейтинг зірок
    ratingStars.forEach(star => {
        star.addEventListener('click', function () {
            selectedRating = parseInt(this.dataset.rating);

            ratingStars.forEach((s, index) => {
                if (index < selectedRating) {
                    s.classList.add('active');
                    s.classList.remove('inactive');
                } else {
                    s.classList.remove('active');
                    s.classList.add('inactive');
                }
            });

            validateForm();
        });
    });

    // Лічильники
    if (comment && charCount) {
        comment.addEventListener('input', function () {
            charCount.textContent = this.value.length;
            validateForm();
        });
    }

    if (advantages && advCount) {
        advantages.addEventListener('input', function () {
            advCount.textContent = this.value.length;
        });
    }

    // Завантаження файлів
    if (fileInput && imagePreview && fileSizeNoteError) {
        fileInput.addEventListener('change', function (e) {
            const files = Array.from(e.target.files);
            const maxSize = 10 * 1024 * 1024; // 10 MB в байтах
            let hasOversizedFile = false;

            files.forEach(file => {
                if (file.type.startsWith('image/')) {
                    if (file.size > maxSize) {
                        hasOversizedFile = true;
                    } else {
                        uploadedFiles.push(file);

                        const reader = new FileReader();
                        reader.onload = function (ev) {
                            const previewItem = document.createElement('div');
                            previewItem.className = 'preview-item';
                            previewItem.innerHTML = `
                                <img src="${ev.target.result}" alt="Preview">
                                <button type="button" class="remove-image" aria-label="Remove image">×</button>
                            `;
                            imagePreview.appendChild(previewItem);
                        };
                        reader.readAsDataURL(file);
                    }
                }
            });

            // Показ/приховування повідомлення про помилку
            if (hasOversizedFile) {
                fileSizeNoteError.style.display = 'block';
                fileInput.value = '';
            } else {
                fileSizeNoteError.style.display = 'none';
            }
        });
    }

    // Видалення одного зображення
    if (imagePreview) {
        imagePreview.addEventListener('click', function (e) {
            if (e.target.classList.contains('remove-image')) {
                const idx = Array.from(imagePreview.children).indexOf(e.target.closest('.preview-item'));
                if (idx > -1) uploadedFiles.splice(idx, 1);
                e.target.closest('.preview-item').remove();
            }
        });
    }

    // Валідація
    function validateForm() {
        if (!comment || !submitBtn) return;
        const isValid = selectedRating > 0 && comment.value.trim().length > 0;
        submitBtn.disabled = !isValid;
    }

    // Сброс формы
    function resetReviewForm() {
        if (!form) return;
        form.reset();
        selectedRating = 0;
        uploadedFiles = [];
        imagePreview.innerHTML = '';
        if (charCount) charCount.textContent = '0';
        if (fileSizeNoteError) fileSizeNoteError.style.display = 'none';
        ratingStars.forEach(s => {
            s.classList.remove('active');
            s.classList.add('inactive');
        });
        if (submitBtn) submitBtn.disabled = true;
    }

    // Відправка форми
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = {
                rating: selectedRating,
                comment: comment.value,
                advantages: advantages ? advantages.value : '',
                disadvantages: disadvantages ? disadvantages.value : '',
                images: uploadedFiles.length
            };

            console.log('Дані відгуку:', formData);

            // 1) Закриваем модалку формы
            closeModal(modalAddReview);

            // 2) Открываем success-модалку
            if (successModal) {
                successModal.classList.add('active');

                // 3) Закриваем successModal4 через 3 секунды
                setTimeout(() => {
                    successModal.classList.remove('active');
                }, 3000);
            }

            // 4) Очищаем форму
            resetReviewForm();
        });
    }
}


function initAddressTab() {
    const addressModal = document.getElementById('modal-address');
    const addAddressBtn = document.getElementById('btn-add-address');
    const headerAddBtn = document.getElementById('btn-add-address-header');
    const saveBtn = document.getElementById('btn-save-address');
    const form = document.getElementById('address-form');
    
    // Delete Modal Elements
    const deleteModal = document.getElementById('modal-delete-address');
    const confirmDeleteBtn = document.getElementById('btn-confirm-delete-address');
    const deleteSuccessModal = document.getElementById('modal-address-deleted-success');
    
    let currentEditingCard = null;
    let cardToDelete = null;
    
    // Helper to toggle label disabled state
    function toggleLabel(element, isDisabled) {
        const formGroup = element.closest('.form-group');
        if (formGroup) {
            const label = formGroup.querySelector('.form-label');
            if (label) {
                if (isDisabled) label.classList.add('disabled');
                else label.classList.remove('disabled');
            }
        }
    }

    function setSelectValue(selectId, value) {
        const select = document.getElementById(selectId);
        if (!select) return;
        const input = select.querySelector('input[type="hidden"]');
        const selected = select.querySelector('.select-selected');
        const option = select.querySelector(`.select-items div[data-value="${value}"]`);
        
        if (input) input.value = value || '';
        if (selected) {
            if (option) {
                selected.innerHTML = option.innerHTML;
            } else {
                // Reset to default if value is empty
                if (!value) {
                    if (selectId === 'select-country') selected.innerHTML = 'Оберіть країну';
                    if (selectId === 'select-region') selected.innerHTML = 'Оберіть область';
                    if (selectId === 'select-city') selected.innerHTML = 'Оберіть місто';
                    if (selectId === 'select-delivery') selected.innerHTML = 'Оберіть спосіб доставки';
                    if (selectId === 'select-street') selected.innerHTML = 'Оберіть вулицю';
                    if (selectId === 'select-branch') selected.innerHTML = 'Оберіть відділення';
                }
            }
        }
        
        // Unlock logic
        if (value) {
            select.classList.remove('disabled');
            toggleLabel(select, false);
        }
    }

    function populateForm(data) {
        // Set values
        setSelectValue('select-country', data.country);
        setSelectValue('select-region', data.region);
        setSelectValue('select-city', data.city);
        setSelectValue('select-delivery', data.delivery);
        
        // Handle Delivery Change Logic to show/hide sections
        handleDeliveryChange(data.delivery);
        
        if (data.delivery === 'address' || data.delivery === 'courier') {
            setSelectValue('select-street', data.street);
            if (form.querySelector('input[name="house"]')) form.querySelector('input[name="house"]').value = data.house;
            if (form.querySelector('input[name="apartment"]')) form.querySelector('input[name="apartment"]').value = data.apartment;
            if (form.querySelector('input[name="zip"]')) form.querySelector('input[name="zip"]').value = data.zip;
            
            // Enable inputs
            const addressDetails = document.getElementById('address-details');
            if (addressDetails) {
                const inputs = addressDetails.querySelectorAll('input');
                inputs.forEach(input => {
                    input.disabled = false;
                    toggleLabel(input, false);
                });
            }
        } else {
            setSelectValue('select-branch', data.branch);
        }
        
        validateAddressForm();
    }

    function openAddressModal(e, isEdit = false) {
        if (e) e.preventDefault();
        
        const title = addressModal.querySelector('.acc-modal__title');

        if (!isEdit) {
            currentEditingCard = null;
            if (title) title.textContent = 'Додати адресу';
            
            // Reset form
            if (form) form.reset();
            
            // Reset selects
            const selects = addressModal.querySelectorAll('.custom-select');
            selects.forEach(s => {
                setSelectValue(s.id, '');
                // Reset disabled states
                if (s.id !== 'select-country') {
                    s.classList.add('disabled');
                    toggleLabel(s, true);
                } else {
                    s.classList.remove('disabled');
                    toggleLabel(s, false);
                }
            });
            
            // Hide details
            const addressDetails = document.getElementById('address-details');
            if (addressDetails) {
                addressDetails.style.display = 'none';
                addressDetails.classList.add('disabled');
                const inputs = addressDetails.querySelectorAll('input');
                inputs.forEach(input => {
                    input.disabled = true;
                    toggleLabel(input, true);
                });
            }

            const novaPoshtaDetails = document.getElementById('nova-poshta-details');
            if (novaPoshtaDetails) {
                novaPoshtaDetails.style.display = 'none';
                novaPoshtaDetails.classList.add('disabled');
                const inputs = novaPoshtaDetails.querySelectorAll('input');
                inputs.forEach(input => {
                    input.disabled = true;
                    toggleLabel(input, true);
                });
            }
            
            // Disable save button
            if (saveBtn) saveBtn.disabled = true;
        } else {
            if (title) title.textContent = 'Редагувати адресу';
        }

        addressModal.classList.add('open');
        document.body.classList.add('is-lock');
    }
    
    // Відкриття модалки
    if (addAddressBtn && addressModal) {
        addAddressBtn.addEventListener('click', (e) => openAddressModal(e, false));
    }

    if (headerAddBtn && addressModal) {
        headerAddBtn.addEventListener('click', (e) => openAddressModal(e, false));
    }

    // Закриття модалки
    const closeBtns = addressModal ? addressModal.querySelectorAll('.acc-modal__close') : [];
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            addressModal.classList.remove('open');
            document.body.classList.remove('is-lock');
        });
    });
    
    // Close Delete Modal
    if (deleteModal) {
        const closeDeleteBtns = deleteModal.querySelectorAll('[data-close-modal]');
        closeDeleteBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                deleteModal.classList.remove('open');
                document.body.classList.remove('is-lock');
            });
        });
    }

    // Custom Select Logic
    const selects = addressModal ? addressModal.querySelectorAll('.custom-select') : [];
    
    // Define specific selects for sequential logic
    const countrySelect = document.getElementById('select-country');
    const regionSelect = document.getElementById('select-region');
    const citySelect = document.getElementById('select-city');
    const deliverySelect = document.getElementById('select-delivery');

    // Initialize disabled states (only if not editing)
    // ... (Logic moved to openAddressModal)
    
    selects.forEach(select => {
        const selected = select.querySelector('.select-selected');
        const items = select.querySelector('.select-items');
        const input = select.querySelector('input[type="hidden"]');
        const options = items ? items.querySelectorAll('div') : [];
        
        if (selected && items) {
            selected.addEventListener('click', (e) => {
                e.stopPropagation();
                if (select.classList.contains('disabled')) return;
                
                closeAllSelects(select);
                items.classList.toggle('select-hide');
                selected.classList.toggle('select-arrow-active');
            });
            
            options.forEach(option => {
                option.addEventListener('click', (e) => {
                    e.stopPropagation();
                    selected.innerHTML = option.innerHTML;
                    input.value = option.dataset.value;
                    items.classList.add('select-hide');
                    selected.classList.remove('select-arrow-active');
                    
                    // Sequential unlocking logic
                    if (select.id === 'select-country') {
                        if (regionSelect) {
                            regionSelect.classList.remove('disabled');
                            toggleLabel(regionSelect, false);
                        }
                    } else if (select.id === 'select-region') {
                        if (citySelect) {
                            citySelect.classList.remove('disabled');
                            toggleLabel(citySelect, false);
                        }
                    } else if (select.id === 'select-city') {
                        if (deliverySelect) {
                            deliverySelect.classList.remove('disabled');
                            toggleLabel(deliverySelect, false);
                        }
                    } else if (select.id === 'select-delivery') {
                        handleDeliveryChange(option.dataset.value);
                    } else if (select.id === 'select-street') {
                        const addressDetails = document.getElementById('address-details');
                        if (addressDetails) {
                            const inputsToEnable = addressDetails.querySelectorAll('input[name="house"], input[name="apartment"], input[name="zip"]');
                            inputsToEnable.forEach(input => {
                                input.disabled = false;
                                toggleLabel(input, false);
                            });
                        }
                    }
                    
                    validateAddressForm();
                });
            });
        }
    });
    
    function closeAllSelects(elmnt) {
        const items = document.querySelectorAll('.select-items');
        const selecteds = document.querySelectorAll('.select-selected');
        
        for (let i = 0; i < selecteds.length; i++) {
            if (elmnt !== selecteds[i].parentElement) {
                selecteds[i].classList.remove('select-arrow-active');
            }
        }
        for (let i = 0; i < items.length; i++) {
            if (elmnt !== items[i].parentElement) {
                items[i].classList.add('select-hide');
            }
        }
    }
    
    document.addEventListener('click', closeAllSelects);
    
    // Delivery Logic
    const addressDetails = document.getElementById('address-details');
    const novaPoshtaDetails = document.getElementById('nova-poshta-details');
    
    function handleDeliveryChange(value) {
        const streetSelect = document.getElementById('select-street');
        const branchSelect = document.getElementById('select-branch');
        
        if (value === 'address' || value === 'courier') {
            if (addressDetails) {
                addressDetails.style.display = 'flex';
                addressDetails.classList.remove('disabled');
                
                // Enable street input
                const streetInput = document.getElementById('input-street');
                if (streetInput) streetInput.disabled = false;

                // Disable other inputs initially
                const inputsToDisable = addressDetails.querySelectorAll('input[name="house"], input[name="apartment"], input[name="zip"]');
                inputsToDisable.forEach(input => {
                    input.disabled = true;
                    toggleLabel(input, true);
                });

                if (streetSelect) {
                    streetSelect.classList.remove('disabled');
                    toggleLabel(streetSelect, false);
                }
            }
            if (novaPoshtaDetails) {
                novaPoshtaDetails.style.display = 'none';
                novaPoshtaDetails.classList.add('disabled');
                const inputs = novaPoshtaDetails.querySelectorAll('input');
                inputs.forEach(input => {
                    input.disabled = true;
                    toggleLabel(input, true);
                });
                if (branchSelect) {
                    branchSelect.classList.add('disabled');
                    toggleLabel(branchSelect, true);
                }
            }
        } else if (value === 'nova_poshta' || value === 'nova_poshta_locker' || value === 'ukr_poshta') {
            if (addressDetails) {
                addressDetails.style.display = 'none';
                addressDetails.classList.add('disabled');
                const inputs = addressDetails.querySelectorAll('input');
                inputs.forEach(input => {
                    input.disabled = true;
                    toggleLabel(input, true);
                });
                if (streetSelect) {
                    streetSelect.classList.add('disabled');
                    toggleLabel(streetSelect, true);
                }
            }
            if (novaPoshtaDetails) {
                novaPoshtaDetails.style.display = 'block';
                novaPoshtaDetails.classList.remove('disabled');
                const inputs = novaPoshtaDetails.querySelectorAll('input');
                inputs.forEach(input => {
                    input.disabled = false;
                    toggleLabel(input, false);
                });
                if (branchSelect) {
                    branchSelect.classList.remove('disabled');
                    toggleLabel(branchSelect, false);
                }
            }
        }
    }
    
    // Validation
    function validateAddressForm() {
        if (!saveBtn || !form) return;
        
        const country = document.getElementById('input-country').value;
        const region = document.getElementById('input-region').value;
        const city = document.getElementById('input-city').value;
        const delivery = document.getElementById('input-delivery').value;
        
        let isValid = country && region && city && delivery;
        
        if (isValid) {
            if (delivery === 'address' || delivery === 'courier') {
                const street = document.getElementById('input-street').value;
                const house = form.querySelector('input[name="house"]').value.trim();
                const apartment = form.querySelector('input[name="apartment"]').value.trim();
                const zip = form.querySelector('input[name="zip"]').value.trim();

                if (!street || !house || !zip) isValid = false;
            } else if (delivery === 'nova_poshta' || delivery === 'nova_poshta_locker' || delivery === 'ukr_poshta') {
                const branch = document.getElementById('input-branch').value;
                if (!branch) isValid = false;
            }
        }
        
        saveBtn.disabled = !isValid;
    }
    
    if (form) {
        form.addEventListener('input', validateAddressForm);
        form.addEventListener('change', validateAddressForm);
        form.addEventListener('keyup', validateAddressForm);
    }

    function updateCardUI(card, iconSrc, deliveryText, addressText) {
        const iconImg = card.querySelector('.address-card-icon-img');
        if (iconImg) iconImg.src = iconSrc;
        
        const labelSpan = card.querySelector('.address-card__label');
        if (labelSpan) labelSpan.textContent = deliveryText;

        const addressTextDiv = card.querySelector('.address-card__text');
        if (addressTextDiv) addressTextDiv.textContent = addressText;
    }

    function bindCardEvents(card) {
        // Menu
        const menuBtn = card.querySelector('.address-card__menu-btn');
        const menu = card.querySelector('.address-card__menu');
        
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close other menus
            document.querySelectorAll('.address-card__menu.active').forEach(m => {
                if (m !== menu) m.classList.remove('active');
            });
            menu.classList.toggle('active');
        });

        // Edit
        const editBtn = card.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => {
            currentEditingCard = card;
            const data = JSON.parse(card.dataset.addressData || '{}');
            populateForm(data);
            openAddressModal(new Event('click'), true);
            // Close menu
            menu.classList.remove('active');
        });

        // Delete
        const deleteBtn = card.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            cardToDelete = card;
            if (deleteModal) {
                deleteModal.classList.add('open');
                document.body.classList.add('is-lock');
            }
            // Close menu
            menu.classList.remove('active');
        });
    }
    
    // Global listener for closing menus (Add only once)
    if (!window.addressMenuListenerAdded) {
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.address-card__menu') && !e.target.closest('.address-card__menu-btn')) {
                document.querySelectorAll('.address-card__menu.active').forEach(m => m.classList.remove('active'));
            }
        });
        window.addressMenuListenerAdded = true;
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Gather data
            const country = document.getElementById('input-country').value;
            const region = document.getElementById('input-region').value;
            const cityVal = document.getElementById('input-city').value;
            const delivery = document.getElementById('input-delivery').value;
            
            const formData = {
                country,
                region,
                city: cityVal,
                delivery,
                street: document.getElementById('input-street').value,
                house: form.querySelector('input[name="house"]').value,
                apartment: form.querySelector('input[name="apartment"]').value,
                zip: form.querySelector('input[name="zip"]').value,
                branch: document.getElementById('input-branch').value
            };

            let iconSrc = 'icons/location.svg';
            let addressText = '';
            let deliveryText = '';
            let cityText = cityVal;

            // Get city text
            const citySelect = document.getElementById('select-city');
            if (citySelect) {
                const selectedOption = citySelect.querySelector(`.select-items div[data-value="${cityVal}"]`);
                if (selectedOption) cityText = selectedOption.textContent;
            }

            // Get delivery text
            const deliverySelect = document.getElementById('select-delivery');
            if (deliverySelect) {
                const selectedOption = deliverySelect.querySelector(`.select-items div[data-value="${delivery}"]`);
                if (selectedOption) deliveryText = selectedOption.textContent;
            }

            if (delivery === 'address' || delivery === 'courier') {
                const streetVal = formData.street;
                const house = formData.house;
                const apartment = formData.apartment;
                
                // Get street text
                let streetText = streetVal;
                const streetSelect = document.getElementById('select-street');
                if (streetSelect) {
                    const selectedOption = streetSelect.querySelector(`.select-items div[data-value="${streetVal}"]`);
                    if (selectedOption) streetText = selectedOption.textContent;
                }
                
                addressText = `${cityText}, ${streetText} ${house}`;
                if (apartment) addressText += `, кв. ${apartment}`;
                
                if (delivery === 'courier') {
                    iconSrc = 'icons/delivery.svg';
                }
            } else if (delivery === 'nova_poshta' || delivery === 'nova_poshta_locker' || delivery === 'ukr_poshta') {
                const branchVal = formData.branch;
                let branchText = branchVal;
                const branchSelect = document.getElementById('select-branch');
                if (branchSelect) {
                    const selectedOption = branchSelect.querySelector(`.select-items div[data-value="${branchVal}"]`);
                    if (selectedOption) branchText = selectedOption.textContent;
                }
                
                if (delivery === 'ukr_poshta') {
                    iconSrc = 'icons/ukr.png';
                } else {
                    iconSrc = 'icons/np-logo.png';
                }
                
                addressText = `${cityText}, ${branchText}`;
            }
            
            if (currentEditingCard) {
                // Update Existing
                updateCardUI(currentEditingCard, iconSrc, deliveryText, addressText);
                currentEditingCard.dataset.addressData = JSON.stringify(formData);
                
                // Show Success Modal
                const successModal = document.getElementById('successModal12');
                if (successModal) {
                    successModal.classList.add('active');
                    setTimeout(() => successModal.classList.remove('active'), 3000);
                }
            } else {
                // Create New
                const template = document.getElementById('address-card-template');
                const cardFragment = template.content.cloneNode(true);
                const card = cardFragment.querySelector('.address-card');

                updateCardUI(card, iconSrc, deliveryText, addressText);
                card.dataset.addressData = JSON.stringify(formData);
                bindCardEvents(card);

                // Update list
                const list = document.getElementById('address-list');
                const empty = document.querySelector('.address-empty');
                
                if (list && empty) {
                    empty.style.display = 'none';
                    list.style.display = 'flex';
                    
                    if (headerAddBtn) headerAddBtn.style.display = 'flex';
                    
                    // Insert card
                    list.appendChild(card);
                }
            }
            
            // Close modal
            if (addressModal) {
                addressModal.classList.remove('open');
                document.body.classList.remove('is-lock');
            }
        });
    }

    // Confirm Delete Action
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', () => {
            if (cardToDelete) {
                cardToDelete.remove();
                cardToDelete = null;
                
                // Check Empty
                const list = document.getElementById('address-list');
                if (list.children.length === 0) {
                     const empty = document.querySelector('.address-empty');
                     empty.style.display = 'flex';
                     list.style.display = 'none';

                     if (headerAddBtn) headerAddBtn.style.display = 'none';
                }

                // Close Delete Modal
                if (deleteModal) deleteModal.classList.remove('open');
                
                // Show Success
                if (deleteSuccessModal) {
                    deleteSuccessModal.classList.add('active');
                    setTimeout(() => {
                        deleteSuccessModal.classList.remove('active');
                        document.body.classList.remove('is-lock');
                    }, 3000);
                } else {
                    document.body.classList.remove('is-lock');
                }
            }
        });
    }
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
    initSortPopup();
    initGallery();
    initProductAccordion();
    initAccordionProduct();
    initQuantityControl();
    initQuantityControl2();
    initCartModal();
    initNotifyAvailability();
    initSpecificationsModal();
    initReviewsModal();
    initProductGallery();
    initializeReviewsSwiper();
    toggleAnswerVisibility();
    initShoppingCart();
    initReviewModal();
    initAddressTab();
}

// Запуск приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', initApp);
window.addEventListener('resize', initSwiperProduct);




<!-- Module 4: Main Controller (The Glue) -->
<script>
  const AccountController = {
    currentEditField: null,
    pendingNav: null,

    init() {
      // Prevent FOUC
      this.hideElementsImmediately();

      document.addEventListener('DOMContentLoaded', () => {
        UIManager.init();
        DatePicker.init();
        ProfileManager.init();
        this.bindEvents();
      });
    },

    hideElementsImmediately() {
      // Immediate execution before DOMContentLoaded
      (function () {
        var addBtns = document.querySelectorAll('.btn-add-value');
        addBtns.forEach(function (btn) { btn.style.display = 'none'; });
        var footer = document.querySelector('.profile-card__footer');
        if (footer) { footer.style.display = 'none'; }

        // Show order tabs initially if on orders tab (CSS hides it by default)
        const orderTabs = document.querySelector('.profile-card__order-tabs');
        const activeTab = document.querySelector('.account-nav__item.active');
        if (orderTabs && activeTab && activeTab.getAttribute('data-tab') === 'orders') {
          orderTabs.style.display = 'flex';
        }

        // Reviews Tabs
        const reviewsTabs = document.querySelector('.profile-card__reviews-tabs');
        if (reviewsTabs) {
          if (activeTab && activeTab.getAttribute('data-tab') === 'reviews') {
            reviewsTabs.style.display = 'flex';
          } else {
            reviewsTabs.style.display = 'none';
          }
        }

        // Hide answer blocks initially
        document.querySelectorAll('.profile-card__reviews-item-body-hidden').forEach(el => el.style.display = 'none');

        // Hide "Hide answer" span initially
        document.querySelectorAll('.profile-card__reviews-item-body-open').forEach(btn => {
          const spans = btn.querySelectorAll('.reviews-item-open');
          if (spans.length > 1) spans[1].style.display = 'none';
        });
      })();
    }, bindEvents() {
      // --- Profile Actions ---
      document.getElementById('btn-edit-mode').addEventListener('click', () => ProfileManager.toggleEditMode(true));

      document.getElementById('btn-cancel-edit').addEventListener('click', () => {
        if (ProfileManager.isDirty) {
          UIManager.openModal('modal-unsaved');
        } else {
          ProfileManager.toggleEditMode(false);
        }
      });

      document.getElementById('btn-save-changes').addEventListener('click', () => {
        UIManager.openModal('modal-confirm-save');
      });

      // --- Edit Buttons (Pencils) ---
      document.querySelectorAll('.btn-edit-field').forEach(btn => {
        btn.addEventListener('click', (e) => this.handleEditClick(e));
      });

      // --- Add Buttons ---
      document.getElementById('btn-add-email').addEventListener('click', () => {
        this.currentEditField = 'email';
        UIManager.openModal('modal-email');
      });
      document.getElementById('btn-add-dob').addEventListener('click', () => {
        this.currentEditField = 'dob';
        DatePicker.reset();
        UIManager.openModal('modal-dob');
      });

      // --- Generic Modal Logic ---
      document.getElementById('btn-confirm-generic').addEventListener('click', () => {
        const val = document.getElementById('modal-generic-input').value;
        ProfileManager.updateField(this.currentEditField, val);
        UIManager.closeModal('modal-generic');
      });

      // --- Email Modal Logic ---
      const emailInput = document.getElementById('modal-email-input');
      emailInput.addEventListener('input', (e) => this.validateEmail(e.target.value));

      document.getElementById('btn-confirm-email').addEventListener('click', () => {
        ProfileManager.updateField('email', emailInput.value);
        UIManager.closeModal('modal-email');
      });

      // --- DOB Modal Logic ---
      document.getElementById('btn-confirm-dob').addEventListener('click', () => {
        const dateStr = DatePicker.getSelectedDate();
        if (dateStr) {
          ProfileManager.updateField('dob', dateStr);
          UIManager.closeModal('modal-dob');
        }
      });

      // --- Navigation Protection ---
      document.querySelectorAll('.account-nav__item').forEach(item => {
        item.addEventListener('click', (e) => this.handleNavigation(e, item));
      });

      // --- Unsaved Changes Modal Actions ---
      document.getElementById('btn-unsaved-cancel').addEventListener('click', () => UIManager.closeModal('modal-unsaved'));

      document.getElementById('btn-unsaved-continue').addEventListener('click', () => {
        UIManager.closeModal('modal-unsaved');
        ProfileManager.revertChanges();
        ProfileManager.toggleEditMode(false);
        if (this.pendingNav) {
          this.performNavigation(this.pendingNav);
        }
      });

      document.getElementById('btn-unsaved-save').addEventListener('click', () => {
        UIManager.closeModal('modal-unsaved');
        this.saveAndExit();
      });

      // --- Confirm Save Modal Actions ---
      document.getElementById('btn-confirm-save-cancel').addEventListener('click', () => UIManager.closeModal('modal-confirm-save'));

      document.getElementById('btn-confirm-save-continue').addEventListener('click', () => {
        // "Continue" here means discard changes
        UIManager.closeModal('modal-confirm-save');
        ProfileManager.revertChanges();
        ProfileManager.toggleEditMode(false);
      });

      document.getElementById('btn-confirm-save-save').addEventListener('click', () => {
        UIManager.closeModal('modal-confirm-save');
        this.saveAndExit();
      });

      // --- Logout & Delete ---
      document.getElementById('logout-btn').addEventListener('click', () => UIManager.openModal('modal-logout'));
      document.getElementById('btn-confirm-logout').addEventListener('click', () => window.location.href = '/');

      document.querySelector('.account-sidebar__delete').addEventListener('click', (e) => {
        e.preventDefault();
        UIManager.openModal('modal-delete-account');
      });
      document.getElementById('btn-confirm-delete').addEventListener('click', () => {
        UIManager.closeModal('modal-delete-account');
        UIManager.openModal('modal-delete-success');
      });

      // --- Reviews Logic ---
      document.querySelectorAll('.profile-card__reviews__tab-button').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.profile-card__reviews__tab-button').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const tab = btn.getAttribute('data-tab');
          document.querySelectorAll('.profile-card__reviews-item').forEach(item => {
            if (item.classList.contains(tab)) {
              item.style.display = 'flex';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });

      document.querySelectorAll('.profile-card__reviews-item-body-open').forEach(btn => {
        btn.addEventListener('click', () => {
          const parent = btn.closest('.profile-card__reviews-item-body');
          const hiddenBlock = parent.querySelector('.profile-card__reviews-item-body-hidden');
          const spans = btn.querySelectorAll('.reviews-item-open');

          if (hiddenBlock) {
            if (hiddenBlock.style.display === 'none') {
              hiddenBlock.style.display = 'block';
              if (spans.length > 1) {
                spans[0].style.display = 'none';
                spans[1].style.display = 'flex';
              }
            } else {
              hiddenBlock.style.display = 'none';
              if (spans.length > 1) {
                spans[0].style.display = 'flex';
                spans[1].style.display = 'none';
              }
            }
          }
        });
      });
    },

    handleEditClick(e) {
      const btn = e.currentTarget;
      const type = btn.dataset.type;
      const fieldName = btn.dataset.name;
      const label = btn.dataset.label;

      this.currentEditField = fieldName;

      if (type === 'text' || type === 'phone') {
        this.openGenericModal(label, fieldName, type);
      } else if (type === 'email') {
        const currentVal = ProfileManager.getFieldValue(fieldName);
        document.getElementById('modal-email-input').value = currentVal;
        this.validateEmail(currentVal);
        UIManager.openModal('modal-email');
      } else if (type === 'dob') {
        DatePicker.reset();
        UIManager.openModal('modal-dob');
      }
    },

    openGenericModal(label, fieldName, type) {
      document.getElementById('modal-generic-title').textContent = `Редагувати ${label}`;
      document.getElementById('modal-generic-label').textContent = label;

      const input = document.getElementById('modal-generic-input');
      input.value = ProfileManager.getFieldValue(fieldName);

      if (type === 'phone') {
        input.setAttribute('type', 'tel');
        if ($.fn.mask) $(input).mask("+380 (99) 999-99-99");
      } else {
        input.setAttribute('type', 'text');
        if ($.fn.mask) $(input).unmask();
      }

      UIManager.openModal('modal-generic');
    },

    validateEmail(val) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = regex.test(val);
      const errorMsg = document.getElementById('modal-email-error');
      const btn = document.getElementById('btn-confirm-email');

      if (val.length > 0 && !isValid) {
        errorMsg.style.display = 'block';
        btn.disabled = true;
      } else {
        errorMsg.style.display = 'none';
        btn.disabled = !isValid;
      }
    },

    handleNavigation(e, item) {
      if (item.id === 'logout-btn') return; // Handled separately

      if (ProfileManager.isDirty) {
        e.preventDefault();
        e.stopPropagation();
        this.pendingNav = item;
        UIManager.openModal('modal-unsaved');
      } else {
        this.performNavigation(item);
      }
    },

    performNavigation(item) {
      document.querySelectorAll('.account-nav__item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const tabId = item.getAttribute('data-tab');
      if (tabId) {
        document.querySelectorAll('.tab-content').forEach(content => {
          content.classList.remove('active');
        });
        const targetContent = document.getElementById(tabId);
        if (targetContent) {
          targetContent.classList.add('active');
        }
      }

      // Handle Order Tabs Visibility
      const orderTabs = document.querySelector('.profile-card__order-tabs');
      if (orderTabs) {
        if (tabId === 'orders') {
          orderTabs.style.display = 'flex';
        } else {
          orderTabs.style.display = 'none';
        }
      }

      // Handle Reviews Tabs Visibility
      const reviewsTabs = document.querySelector('.profile-card__reviews-tabs');
      if (reviewsTabs) {
        if (tabId === 'reviews') {
          reviewsTabs.style.display = 'flex';
        } else {
          reviewsTabs.style.display = 'none';
        }
      }

      // Handle Header Add Button Visibility
      const headerAddBtn = document.getElementById('btn-add-address-header');
      const addressList = document.getElementById('address-list');
      if (headerAddBtn) {
        // Show only if on address tab AND list is not empty (hidden)
        // Note: address-list is hidden by default style="display:none" when empty.
        // We check if address-list is visible (display != none) which implies it has items.
        // Or check children count.
        if (tabId === 'address' && addressList && addressList.style.display !== 'none') {
          headerAddBtn.style.display = 'flex';
        } else {
          headerAddBtn.style.display = 'none';
        }
      }

      this.pendingNav = null;
    },

    saveAndExit() {
      ProfileManager.saveChanges();
      ProfileManager.toggleEditMode(false);
      UIManager.showSuccessBanner('successModal12');
    }
  };

  // Start the application
  AccountController.init();
</script>