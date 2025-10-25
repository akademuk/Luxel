// Функция для управления выпадающими списками (контакты и языки)
function initDropdowns() {
    let isContactOpen = false;
    let isLanguageOpen = false;
    let currentLanguage = 'UA';

    function toggleDropdown() {
        const content = document.getElementById('dropdownContent');
        const arrow = document.getElementById('dropdownArrow');

        if (isLanguageOpen) {
            toggleDropdownLanguage();
        }

        isContactOpen = !isContactOpen;
        content.classList.toggle('open');
        arrow.classList.toggle('open');
    }

    function toggleDropdownLanguage() {
        const menu = document.getElementById('dropdownMenuLanguage');
        const arrow = document.getElementById('dropdownArrowLanguage');

        if (isContactOpen) {
            toggleDropdown();
        }

        isLanguageOpen = !isLanguageOpen;

        if (isLanguageOpen) {
            menu.classList.add('open');
            arrow.classList.add('open');
        } else {
            menu.classList.remove('open');
            arrow.classList.remove('open');
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
    }

    function selectLanguage(code, event) {
        currentLanguage = code;
        document.getElementById('selectedLanguage').textContent = code;

        const options = document.querySelectorAll('.header__promo-language-dropdown-option');
        options.forEach(option => {
            option.classList.remove('active');
        });

        if (event && event.target) {
            event.target.classList.add('active');
        }
        toggleDropdownLanguage();
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
        const languageDropdown = document.querySelector('.header__promo-language-dropdown');

        if (contactDropdown && !contactDropdown.contains(event.target) && isContactOpen) {
            isContactOpen = false;
            document.getElementById('dropdownContent').classList.remove('open');
            document.getElementById('dropdownArrow').classList.remove('open');
        }

        if (languageDropdown && !languageDropdown.contains(event.target) && isLanguageOpen) {
            isLanguageOpen = false;
            document.getElementById('dropdownMenuLanguage').classList.remove('open');
            document.getElementById('dropdownArrowLanguage').classList.remove('open');
        }
    });

    // Глобальные функции для доступа извне
    window.toggleDropdown = toggleDropdown;
    window.toggleDropdownLanguage = toggleDropdownLanguage;
    window.selectLanguage = selectLanguage;
    window.closeAllDropdowns = closeAllDropdowns;
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

    // Check if all required elements exist
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

    requestCallBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        openModal(callModal);
    });

    closeModal.addEventListener('click', function () {
        closeModalFunc(callModal);
    });


    callModal.addEventListener('click', function (e) {
        if (e.target === callModal || e.target.classList.contains('modal__overlay')) {
            closeModalFunc(callModal);
        }
    });

    successModal.addEventListener('click', function (e) {
        if (e.target === successModal || e.target.classList.contains('modal__overlay')) {
            closeModalFunc(successModal);
        }
    });

    document.querySelectorAll('.modal__content').forEach(content => {
        content.addEventListener('click', function (e) {
            e.stopPropagation();
        });
    });

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

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModalFunc(callModal);
            closeModalFunc(successModal);
        }
    });

    if (typeof jQuery !== 'undefined' && jQuery.fn.mask) {
        jQuery('input[type="tel"]').mask('+38(999)999-99-99');
    }
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
}

// Запуск приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', initApp);
window.addEventListener('resize', initSwiperProduct);