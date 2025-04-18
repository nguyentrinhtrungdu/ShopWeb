
from django.urls import path,include
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),
    path('User/', include('app.User.url')),
    path('Product/', include('app.Product.url')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
