from django import forms
from django.forms import formset_factory

class DataFilterForm(forms.Form):
    YEARS_CHOICES = [
        ('2021', '2021'),
        ('2022', '2022'),
        ('2023', '2023'),
        ('2024', '2024'),
    ]
    years = forms.MultipleChoiceField(
        choices=YEARS_CHOICES,
        widget=forms.CheckboxSelectMultiple,
        required=False,
        label='Выберите год(ы)'
    )

class FilterForm(forms.Form):
    FIELD_CHOICES = [
        ('inn', 'ИНН'),
        ('acc_n', 'Номер счета'),
        ('con_n', 'КОН'),
        ('reg_week2', 'Регион'),
        ('activation_date', 'Дата активации'),
        ('phone_num', 'Номер телефона'),
        ('kontr_name', 'Имя контрагента'),
        ('app_class', 'Класс приложения'),
        ('app_class_text', 'Текст класса приложения'),
        ('_categ', 'Категория'),
        ('_categ_txt', 'Текст категории'),
        ('tariff_plan', 'Тарифный план'),
        ('tariff_plan_txt', 'Текст тарифного плана'),
        ('tp_group', 'Группа TP'),
        ('tp_group_txt', 'Текст группы TP'),
        ('service_id', 'ID сервиса'),
        ('service_id_txt', 'Текст ID сервиса'),
        ('service_type', 'Тип сервиса'),
        ('service_type_txt', 'Текст типа сервиса'),
        ('group_id', 'ID группы'),
        ('group_id_txt', 'Текст ID группы'),
        ('trans_part', 'Часть транзакции'),
        ('bsi_amount_trans_part', 'Сумма BSI части транзакции'),
        ('bsi_discount_trans', 'Скидка BSI на транзакцию'),
        ('product', 'Продукт'),
        ('subproduct', 'Подпродукт'),
        ('period_date', 'Период даты'),
        ('regid', 'Региональный ID'),
        ('segment', 'Сегмент'),
        ('region', 'Регион'),
    ]
    FILTER_TYPE_CHOICES = [
        ('include', 'Включить'),
        ('exclude', 'Исключить'),
    ]
    field = forms.ChoiceField(
        choices=FIELD_CHOICES,
        label='Поле',
        widget=forms.Select(attrs={'class': 'form-control filter-field'})
    )
    filter_type = forms.ChoiceField(
        choices=FILTER_TYPE_CHOICES,
        label='Тип фильтра',
        widget=forms.Select(attrs={'class': 'form-control filter-type'})
    )
    value = forms.CharField(
        max_length=100,
        label='Значение',
        widget=forms.TextInput(attrs={'class': 'form-control filter-value'})
    )


FilterFormSet = formset_factory(FilterForm, extra=1, can_delete=True)
