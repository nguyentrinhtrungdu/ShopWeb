
from django.urls import path,include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('User/', include('User.url')),
    path('Product/', include('Product.url')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
