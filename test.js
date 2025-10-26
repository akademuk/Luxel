
    (function () {
        'use strict';

        // Конфігурація
        const config = {
            selectors: {
                filters: '[data-js-filters]',
                filterGroup: '[data-js-filter-group]',
                filterHeader: '[data-js-filter-header]',
                filterCheckbox: '[data-js-filter-checkbox]',
                rangeFrom: '[data-js-range-from]',
                rangeTo: '[data-js-range-to]',
                slider: '[data-js-slider]',
                sliderTrack: '[data-js-slider-track]',
                sliderThumb: '[data-js-slider-thumb]',
                viewButtons: '[data-view]',
                showCount: '[data-show-count]',
                sortBy: '[data-sort-by]',
                productsContainer: '.shop-layout__products',
                toolbar: '.toolbar',
            },
            classes: {
                collapsed: 'filters__group--collapsed',
                viewActive: 'active',
                gridView: 'products-grid',
                listView: 'products-list',
            },
        };

        // Стан
        const state = {
            selectedFilters: {},
            priceRange: {
                min: 100,
                max: 10000,
                from: 100,
                to: 10000,
            },
            view: 'grid',
            showCount: 12,
            sortBy: 'default',
            products: [],
            activeTagsContainer: null,
        };

        // Моковані дані товарів
        const mockProducts = [
            { id: 1, name: 'LED Лампа A60', price: 250, temperature: '4000', power: '12', angle: '120', protection: 'IP20', installation: 'indoor', rating: 4.5, image: 'https://placehold.co/300x300?text=LED+A60' },
            { id: 2, name: 'LED Лампа Premium', price: 450, temperature: '6000', power: '18', angle: '240', protection: 'IP40', installation: 'indoor', rating: 4.8, image: 'https://placehold.co/300x300?text=LED+Premium' },
            { id: 3, name: 'LED Прожектор', price: 1200, temperature: '6500', power: '24', angle: '120', protection: 'IP65', installation: 'outdoor', rating: 4.7, image: 'https://placehold.co/300x300?text=LED+Flood' },
            { id: 4, name: 'LED Панель', price: 850, temperature: '4000', power: '18', angle: '120', protection: 'IP40', installation: 'indoor', rating: 4.6, image: 'https://placehold.co/300x300?text=LED+Panel' },
            { id: 5, name: 'LED Стрічка', price: 320, temperature: '5000', power: '12', angle: '120', protection: 'IP20', installation: 'indoor', rating: 4.3, image: 'https://placehold.co/300x300?text=LED+Strip' },
            { id: 6, name: 'LED Downlight', price: 580, temperature: '6000', power: '18', angle: '240', protection: 'IP40', installation: 'indoor', rating: 4.5, image: 'https://placehold.co/300x300?text=Downlight' },
            { id: 7, name: 'LED Вуличний', price: 1500, temperature: '6500', power: '24', angle: '120', protection: 'IP65', installation: 'outdoor', rating: 4.9, image: 'https://placehold.co/300x300?text=Street+LED' },
            { id: 8, name: 'LEDSpot', price: 420, temperature: '4000', power: '12', angle: '120', protection: 'IP20', installation: 'indoor', rating: 4.4, image: 'https://placehold.co/300x300?text=LED+Spot' },
        ];

        // Ініціалізація
        function init() {
            state.products = mockProducts;

            initGroupToggles();
            initCheckboxes();
            initPriceRange();
            initToolbar();
            createActiveTagsContainer();

            applyFilters();
        }

        // Створення контейнера для активних фільтрів
        function createActiveTagsContainer() {
            const toolbar = document.querySelector(config.selectors.toolbar);
            if (!toolbar) return;

            const container = document.createElement('div');
            container.className = 'active-filters';
            container.innerHTML = `
            <div class="active-filters__content" data-active-tags></div>
        `;

            toolbar.parentNode.insertBefore(container, toolbar.nextSibling);
            state.activeTagsContainer = container.querySelector('[data-active-tags]');
        }

        // Оновлення активних фільтрів (тегів)
        function updateActiveTags() {
            if (!state.activeTagsContainer) return;

            const tags = [];

            // Чекбокси
            Object.keys(state.selectedFilters).forEach(filterName => {
                state.selectedFilters[filterName].forEach(value => {
                    const checkbox = document.querySelector(`[name="${filterName}"][value="${value}"]`);
                    if (!checkbox) return;

                    const label = checkbox.closest('.filters__option')?.querySelector('.filters__label span:first-child')?.textContent || value;

                    tags.push({
                        type: 'checkbox',
                        name: filterName,
                        value: value,
                        label: label,
                    });
                });
            });

            // Ціна
            if (state.priceRange.from !== state.priceRange.min || state.priceRange.to !== state.priceRange.max) {
                tags.push({
                    type: 'price',
                    label: `від ${state.priceRange.from} до ${state.priceRange.to}`,
                });
            }

            // Рендер тегів
            if (tags.length === 0) {
                state.activeTagsContainer.innerHTML = '';
                return;
            }

            state.activeTagsContainer.innerHTML = tags.map(tag => {
                if (tag.type === 'checkbox') {
                    return `
                    <div class="active-filter-tag" data-filter-name="${tag.name}" data-filter-value="${tag.value}">
                        <span>${tag.label}</span>
                        <button class="active-filter-tag__remove" aria-label="Видалити фільтр">×</button>
                    </div>
                `;
                } else {
                    return `
                    <div class="active-filter-tag" data-filter-type="price">
                        <span>${tag.label}</span>
                        <button class="active-filter-tag__remove" aria-label="Скинути ціну">×</button>
                    </div>
                `;
                }
            }).join('');

            // Додаємо обробники
            state.activeTagsContainer.querySelectorAll('.active-filter-tag__remove').forEach(btn => {
                btn.addEventListener('click', function () {
                    const tag = this.closest('.active-filter-tag');
                    const filterName = tag.getAttribute('data-filter-name');
                    const filterValue = tag.getAttribute('data-filter-value');
                    const filterType = tag.getAttribute('data-filter-type');

                    if (filterType === 'price') {
                        resetPriceRange();
                    } else {
                        const checkbox = document.querySelector(`[name="${filterName}"][value="${filterValue}"]`);
                        if (checkbox) {
                            checkbox.checked = false;
                            handleCheckboxChange(checkbox);
                        }
                    }
                });
            });
        }

        // Скидання ціни
        function resetPriceRange() {
            const fromInput = document.querySelector(config.selectors.rangeFrom);
            const toInput = document.querySelector(config.selectors.rangeTo);

            state.priceRange.from = state.priceRange.min;
            state.priceRange.to = state.priceRange.max;

            if (fromInput) fromInput.value = state.priceRange.min;
            if (toInput) toInput.value = state.priceRange.max;

            updateSliderUI();
            applyFilters();
        }

        // Ініціалізація згортання груп
        function initGroupToggles() {
            const headers = document.querySelectorAll(config.selectors.filterHeader);

            headers.forEach((header) => {
                header.addEventListener('click', function () {
                    const group = this.closest(config.selectors.filterGroup);
                    if (!group) return;

                    const isCollapsed = group.classList.contains(config.classes.collapsed);

                    if (isCollapsed) {
                        group.classList.remove(config.classes.collapsed);
                        this.querySelector('.filters__group-toggle').textContent = '−';
                    } else {
                        group.classList.add(config.classes.collapsed);
                        this.querySelector('.filters__group-toggle').textContent = '+';
                    }
                });
            });
        }

        // Ініціалізація чекбоксів
        function initCheckboxes() {
            const checkboxes = document.querySelectorAll(config.selectors.filterCheckbox);

            checkboxes.forEach((checkbox) => {
                checkbox.addEventListener('change', function () {
                    handleCheckboxChange(this);
                });
            });
        }

        // Обробка зміни чекбокса
        function handleCheckboxChange(checkbox) {
            const filterName = checkbox.name;
            const filterValue = checkbox.value;

            if (!state.selectedFilters[filterName]) {
                state.selectedFilters[filterName] = [];
            }

            if (checkbox.checked) {
                if (!state.selectedFilters[filterName].includes(filterValue)) {
                    state.selectedFilters[filterName].push(filterValue);
                }
            } else {
                state.selectedFilters[filterName] = state.selectedFilters[filterName].filter(
                    val => val !== filterValue
                );

                if (state.selectedFilters[filterName].length === 0) {
                    delete state.selectedFilters[filterName];
                }
            }

            applyFilters();
        }

        // Ініціалізація цінового діапазону
        function initPriceRange() {
            const fromInput = document.querySelector(config.selectors.rangeFrom);
            const toInput = document.querySelector(config.selectors.rangeTo);
            const slider = document.querySelector(config.selectors.slider);
            const thumbFrom = document.querySelector('[data-js-slider-thumb="from"]');
            const thumbTo = document.querySelector('[data-js-slider-thumb="to"]');

            if (!fromInput || !toInput || !slider || !thumbFrom || !thumbTo) return;

            fromInput.value = state.priceRange.from;
            toInput.value = state.priceRange.to;
            updateSliderUI();

            fromInput.addEventListener('input', function () {
                let value = parseInt(this.value) || state.priceRange.min;
                value = Math.max(state.priceRange.min, Math.min(value, state.priceRange.to));
                this.value = value;
                state.priceRange.from = value;
                updateSliderUI();
                debouncedFilter();
            });

            toInput.addEventListener('input', function () {
                let value = parseInt(this.value) || state.priceRange.max;
                value = Math.min(state.priceRange.max, Math.max(value, state.priceRange.from));
                this.value = value;
                state.priceRange.to = value;
                updateSliderUI();
                debouncedFilter();
            });

            let activeThumb = null;

            function startDrag(thumb) {
                activeThumb = thumb;
                document.addEventListener('mousemove', onDrag);
                document.addEventListener('mouseup', stopDrag);
                document.body.style.userSelect = 'none';
            }

            function onDrag(e) {
                if (!activeThumb) return;

                const sliderRect = slider.getBoundingClientRect();
                const sliderWidth = sliderRect.width;
                let position = e.clientX - sliderRect.left;
                position = Math.max(0, Math.min(position, sliderWidth));

                const percent = position / sliderWidth;
                const range = state.priceRange.max - state.priceRange.min;
                let value = Math.round(state.priceRange.min + percent * range);

                const thumbType = activeThumb.getAttribute('data-js-slider-thumb');

                if (thumbType === 'from') {
                    value = Math.min(value, state.priceRange.to);
                    state.priceRange.from = value;
                    fromInput.value = value;
                } else {
                    value = Math.max(value, state.priceRange.from);
                    state.priceRange.to = value;
                    toInput.value = value;
                }

                updateSliderUI();
                debouncedFilter();
            }

            function stopDrag() {
                activeThumb = null;
                document.removeEventListener('mousemove', onDrag);
                document.removeEventListener('mouseup', stopDrag);
                document.body.style.userSelect = '';
            }

            thumbFrom.addEventListener('mousedown', (e) => {
                e.preventDefault();
                startDrag(thumbFrom);
            });

            thumbTo.addEventListener('mousedown', (e) => {
                e.preventDefault();
                startDrag(thumbTo);
            });
        }

        function updateSliderUI() {
            const sliderTrack = document.querySelector(config.selectors.sliderTrack);
            const thumbFrom = document.querySelector('[data-js-slider-thumb="from"]');
            const thumbTo = document.querySelector('[data-js-slider-thumb="to"]');

            if (!sliderTrack || !thumbFrom || !thumbTo) return;

            const range = state.priceRange.max - state.priceRange.min;
            const fromPercent = ((state.priceRange.from - state.priceRange.min) / range) * 100;
            const toPercent = ((state.priceRange.to - state.priceRange.min) / range) * 100;

            thumbFrom.style.left = fromPercent + '%';
            thumbTo.style.left = toPercent + '%';
            sliderTrack.style.left = fromPercent + '%';
            sliderTrack.style.width = (toPercent - fromPercent) + '%';
        }

        // Ініціалізація тулбара
        function initToolbar() {
            // Перемикачі вигляду
            const viewButtons = document.querySelectorAll(config.selectors.viewButtons);
            viewButtons.forEach(btn => {
                btn.addEventListener('click', function () {
                    const view = this.getAttribute('data-view');
                    state.view = view;

                    viewButtons.forEach(b => b.classList.remove(config.classes.viewActive));
                    this.classList.add(config.classes.viewActive);

                    renderProducts();
                });
            });

            // Кількість товарів
            const showCount = document.querySelector(config.selectors.showCount);
            if (showCount) {
                showCount.addEventListener('change', function () {
                    state.showCount = this.value === 'all' ? Infinity : parseInt(this.value);
                    renderProducts();
                });
            }

            // Сортування
            const sortBy = document.querySelector(config.selectors.sortBy);
            if (sortBy) {
                sortBy.addEventListener('change', function () {
                    state.sortBy = this.value;
                    applyFilters();
                });
            }
        }

        // Debounce
        let debounceTimer;
        function debouncedFilter() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(applyFilters, 300);
        }

        // Застосування фільтрів
        function applyFilters() {
            let filtered = [...state.products];

            // Фільтрація по чекбоксах
            Object.keys(state.selectedFilters).forEach(filterName => {
                const values = state.selectedFilters[filterName];
                filtered = filtered.filter(product => values.includes(product[filterName]));
            });

            // Фільтрація по ціні
            filtered = filtered.filter(product =>
                product.price >= state.priceRange.from && product.price <= state.priceRange.to
            );

            // Сортування
            filtered = sortProducts(filtered);

            // Оновлення тегів
            updateActiveTags();

            // Рендер
            renderProducts(filtered);
        }

        // Сортування
        function sortProducts(products) {
            const sorted = [...products];

            switch (state.sortBy) {
                case 'price-asc':
                    sorted.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    sorted.sort((a, b) => b.price - a.price);
                    break;
                case 'name-asc':
                    sorted.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'name-desc':
                    sorted.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                case 'rating-desc':
                    sorted.sort((a, b) => b.rating - a.rating);
                    break;
            }

            return sorted;
        }

        // Рендер товарів
        function renderProducts(products = state.products) {
            const container = document.querySelector(config.selectors.productsContainer);
            if (!container) return;

            const displayProducts = products.slice(0, state.showCount);

            container.className = `shop-layout__products ${state.view === 'grid' ? config.classes.gridView : config.classes.listView}`;

            if (displayProducts.length === 0) {
                container.innerHTML = '<p class="no-products">Товарів не знайдено</p>';
                return;
            }

            container.innerHTML = displayProducts.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-card__image">
                <h3 class="product-card__title">${product.name}</h3>
                <div class="product-card__rating">⭐ ${product.rating}</div>
                <div class="product-card__price">${product.price} ₴</div>
                <button class="product-card__btn">Купити</button>
            </div>
        `).join('');
        }

        // Публічний API
        window.shopFilters = {
            reset: function () {
                const checkboxes = document.querySelectorAll(config.selectors.filterCheckbox);
                checkboxes.forEach(cb => cb.checked = false);

                resetPriceRange();

                state.selectedFilters = {};
                applyFilters();
            },
            getState: function () {
                return {
                    filters: state.selectedFilters,
                    priceRange: { from: state.priceRange.from, to: state.priceRange.to },
                };
            },
        };

        // Запуск
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    })();
