from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('backend/', include('backend.urls')),
    path('frontend/', include('frontend.urls')),
    path('admin/', admin.site.urls),
]
