from django.contrib import admin

from .models import Customer


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('pk','first_name', 'last_name', 'email', 'phone','address','description')
    search_fields = ('first_name', 'last_name', 'email', 'phone','address',)
    list_filter = ['first_name', 'last_name', 'email', 'phone','address',]
