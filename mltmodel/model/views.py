from .forms import DataFilterForm, FilterFormSet
from django.shortcuts import render
from django.contrib import messages
import json
import random

def index(request):
    if request.method == 'POST':
        form = DataFilterForm(request.POST)
        filter_formset = FilterFormSet(request.POST)
        
        if form.is_valid() and filter_formset.is_valid():
            request.session['form_data'] = request.POST.dict()
            messages.success(request, 'Успешно!')
        else:
            messages.error(request, 'Ошибка в отправке данных!')
    else:
        form = DataFilterForm()
        filter_formset = FilterFormSet()
    

    selected_years = request.GET.getlist('years')
    filters = []
    fields = request.GET.getlist('filters-field')
    filter_types = request.GET.getlist('filters-filter_type')
    values = request.GET.getlist('filters-value')

    for field, filter_type, value in zip(fields, filter_types, values):
        filters.append({
            'field': field,
            'filter_type': filter_type,
            'value': value
        })

    sample_data = {
        'inn': ['1234567890', '0987654321', '1122334455'],
        'acc_n': ['LS001', 'LS002', 'LS003'],
        'con_n': ['CON001', 'CON002', 'CON003'],
        'reg_week2': ['Москва', 'Санкт-Петербург', 'Новосибирск'],
        'activation_date': ['2021-01-01', '2022-02-02', '2023-03-03'],
        'phone_num': ['+79991234567', '+79997654321', '+79990001122'],
        'kontr_name': ['Контрагент A', 'Контрагент B', 'Контрагент C'],
        'app_class': ['84.071','534.068','735.060'],
        'app_class_text': ['AvtoS','FIX Телевидение','Пакетное ПО'],
        'categ': ['1','2','3'],
        'categ_txt': ['ЛФ.Холдинг.cross','SME.cross','Москва.Сервис-провайдеры'],
        'tariff_plan': ['1','2','3'],
        'tariff_plan_txt': ['Тариф 1','Тариф 2','Тариф 3'],
        'tp_group': ['1','2','3'],
        'tp_group_txt': ['Группа 1','Группа 2','Группа 3'],
        'service_id': ['1','2','3'],
        'service_id_txt': ['Сервис 1','Сервис 2','Сервис 3'],
        'service_type': ['2','1','9','10'],
        'service_type_txt': ['Периодическая','Разовая','Блокировка','Телефонная'],
        'group_id': ['1','2','3'],
        'group_id_txt': ['Группа A','Группа B','Группа C'],
        'trans_part': ['12.0','32.0','160.0'],
        'bsi_amount_trans_part': ['1','2','3'],
        'bsi_discount_trans': ['1','2','3'],
        'product': ['Моб','VAS','МНР'],
        'subproduct': ['Голос Антифрод','Моб','M2M-connectivity МНР', 'Моб МНР','Касперский B2B','Уверенный приём','Улучшение качества связи','MAAS MobileID','Умный дом','ЧатБот'],
        'period_date': ['01.12.2023','01.11.2023','01.10.2023'],
        'regid': ['71','67','66','68','60'],
        'segment': ['Малый бизнес','Гос заказчики','Нац клиенты', 'Крупный бизнес', 'Микро предприятия', 'Свой круг', 'Средний бизнес'],
        'region': ['1','2','3', '4', '5']
    }

    for filter in filters:
        if not filter['value']:
            possible_values = sample_data.get(filter['field'], [])
            filter['value'] = random.choice(possible_values) if possible_values else 'N/A'

    context = {
        'form': form,
        'filter_formset': filter_formset,
        'selected_data': {
            'years': selected_years,
            'filters': filters,
        },
        'sample_data': sample_data  
    }

    return render(request, 'model/index.html', context)
