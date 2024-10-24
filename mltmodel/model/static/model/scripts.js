// model/static/model/scripts.js

document.addEventListener('DOMContentLoaded', function () {
    // Инициализация particles.js
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "opacity": {
                "value": 0.5,
                "random": true
            },
            "size": {
                "value": 3,
                "random": true
            },
            "move": {
                "enable": true,
                "speed": 1
            }
        },
        "interactivity": {
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                }
            },
            "modes": {
                "repulse": {
                    "distance": 100
                }
            }
        }
    });

    // Элементы страницы
    var confirmYearSelectionButton = document.getElementById('confirm-year-selection');
    var resetYearSelectionButton = document.getElementById('reset-year-button');
    var confirmFilterButtons = document.querySelectorAll('.confirm-filter');
    var resetFiltersButton = document.getElementById('reset-button');
    var selectedOutput = document.getElementById('selected-output');
    var addFilterButton = document.getElementById('add-filter');
    var filtersContainer = document.getElementById('filters-container');
    var selectedFilters = [];
    var totalForms = document.querySelector('#id_filters-TOTAL_FORMS');
    var initialForms = document.querySelector('#id_filters-INITIAL_FORMS');

    // Установим значения для скрытых полей TOTAL_FORMS и INITIAL_FORMS, если они не заданы
    if (totalForms) {
        totalForms.value = filtersContainer.children.length;
    }
    if (initialForms) {
        initialForms.value = 0;
    }

    // Функция для обновления отображения выбранных параметров
    function updateSelectedOutput(selectedYears, selectedFilters) {
        selectedOutput.innerHTML = '';
        if (selectedYears && selectedYears.length > 0) {
            var yearsPara = document.createElement('p');
            yearsPara.innerHTML = '<strong>Годы:</strong> ' + selectedYears.join(', ');
            selectedOutput.appendChild(yearsPara);
        }
        if (selectedFilters && selectedFilters.length > 0) {
            selectedFilters.forEach(function(filter) {
                var filterPara = document.createElement('p');
                filterPara.innerHTML = '<strong>' + capitalizeFirstLetter(filter.field) + ':</strong> ' +
                    (filter.filter_type === 'include' ? 'Включить' : 'Исключить') + ' ' + filter.value;
                selectedOutput.appendChild(filterPara);
            });
        }
    }

    // Вспомогательная функция для капитализации первой буквы
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Массивы для хранения выбранных годов и фильтров
    var selectedYears = [];
    var selectedFilters = [];

    // Обработка кнопки "Подтвердить выбор года"
    if (confirmYearSelectionButton) {
        confirmYearSelectionButton.addEventListener('click', function (e) {
            e.preventDefault(); // Останавливаем отправку формы
            var yearsCheckboxes = document.querySelectorAll('input[name="years"]');
            selectedYears = [];
            yearsCheckboxes.forEach(function (checkbox) {
                if (checkbox.checked) {
                    selectedYears.push(checkbox.value);
                }
            });
            updateSelectedOutput(selectedYears, selectedFilters);
        });
    }

    // Обработка кнопки "Сбросить выбор года"
    if (resetYearSelectionButton) {
        resetYearSelectionButton.addEventListener('click', function (e) {
            e.preventDefault();
            var yearsCheckboxes = document.querySelectorAll('input[name="years"]');
            yearsCheckboxes.forEach(function (checkbox) {
                checkbox.checked = false;
            });
            selectedYears = [];
            updateSelectedOutput(selectedYears, selectedFilters);
        });
    }

    // Обработка кнопок "Подтвердить фильтр"
    confirmFilterButtons.forEach(function(button) {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            var filterBlock = button.closest('.filter-block');
            var field = filterBlock.querySelector('select[name$="field"]').value;
            var filter_type = filterBlock.querySelector('select[name$="filter_type"]').value;
            var value = filterBlock.querySelector('input[name$="value"]').value;

            if (field && filter_type && value) {
                // Проверка, существует ли уже такой фильтр
                var existingFilterIndex = selectedFilters.findIndex(function(filter) {
                    return filter.field === field && filter.value === value;
                });
                if (existingFilterIndex === -1) {
                    selectedFilters.push({
                        field: field,
                        filter_type: filter_type,
                        value: value
                    });
                }
                updateSelectedOutput(selectedYears, selectedFilters);
            } else {
                alert('Пожалуйста, заполните все поля фильтра.');
            }
        });
    });

    // Обработка кнопки "Сбросить фильтры"
    if (resetFiltersButton) {
        resetFiltersButton.addEventListener('click', function (e) {
            e.preventDefault();
            selectedFilters = [];
            updateSelectedOutput(selectedYears, selectedFilters);
        });
    }

    // Обработка кнопки "Добавить фильтр"
    if (addFilterButton) {
        addFilterButton.addEventListener('click', function (e) {
        e.preventDefault();
        var field = document.querySelector('select[name$="field"]').value;
        var filter_type = document.querySelector('select[name$="filter_type"]').value;
        var value = document.querySelector('input[name$="value"]').value;

        if (field && filter_type && value) {
            var existingFilterIndex = selectedFilters.findIndex(function(filter) {
                return filter.field === field && filter.value === value;
            });
            if (existingFilterIndex === -1) {
                selectedFilters.push({
                    field: field,
                    filter_type: filter_type,
                    value: value
                });
            }
            updateSelectedOutput(selectedYears, selectedFilters);
        } else {
            alert('Пожалуйста, заполните все поля фильтра.');
        }
    });
    }

    // Обработка кнопок "Удалить" фильтр
    var deleteButtons = document.querySelectorAll('.btn-delete');
    deleteButtons.forEach(function(button) {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            var filterBlock = button.closest('.filter-block');
            var field = filterBlock.querySelector('select[name$="field"]').value;
            var value = filterBlock.querySelector('input[name$="value"]').value;

            // Удаление фильтра из выбранных фильтров
            selectedFilters = selectedFilters.filter(function(filter) {
                return !(filter.field === field && filter.value === value);
            });

            // Удаление блока фильтра из DOM
            filterBlock.remove();

            // Обновление отображения
            updateSelectedOutput(selectedYears, selectedFilters);
        });
    });

    // Обработка отправки формы
    var form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
        // Перед отправкой формы добавляем скрытые поля с выбранными параметрами
        // Удаляем существующие скрытые поля
        var existingHidden = form.querySelectorAll('.hidden-param');
        existingHidden.forEach(function(input) {
            input.remove();
        });

        // Добавляем выбранные годы
        selectedYears.forEach(function(year) {
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'years';
            input.value = year;
            input.classList.add('hidden-param');
            form.appendChild(input);
        });

        // Добавляем выбранные фильтры
        selectedFilters.forEach(function(filter) {
            var inputField = document.createElement('input');
            inputField.type = 'hidden';
            inputField.name = 'filters-field';
            inputField.value = filter.field;
            inputField.classList.add('hidden-param');
            form.appendChild(inputField);

            var inputFilterType = document.createElement('input');
            inputFilterType.type = 'hidden';
            inputFilterType.name = 'filters-filter_type';
            inputFilterType.value = filter.filter_type;
            inputFilterType.classList.add('hidden-param');
            form.appendChild(inputFilterType);

            var inputValue = document.createElement('input');
            inputValue.type = 'hidden';
            inputValue.name = 'filters-value';
            inputValue.value = filter.value;
            inputValue.classList.add('hidden-param');
            form.appendChild(inputValue);
        });
    });
});
