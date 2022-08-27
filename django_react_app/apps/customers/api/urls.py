from django.urls import path
from django.conf.urls import include
from . import views


urlpatterns = [
    path('customers/',include([
        path('', views.customer_list, name='customer_list_api'),
        path('<int:pk>/', views.customers_detail, name='customer_detail_api'),
    ])) 
]