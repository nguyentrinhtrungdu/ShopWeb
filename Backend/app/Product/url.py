
from django.urls import path
from . import views
urlpatterns = [
    path('', views.ProductView.as_view()),
    path('<int:product_id>', views.ProductDetailView.as_view()),
]
