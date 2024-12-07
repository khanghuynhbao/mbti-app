from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('', include('mbti_app.urls')),  # Đưa URL app vào dự án
]

from django.conf.urls import handler404
from django.shortcuts import render

def custom_404_view(request, exception):
    return render(request, '404.html', status=404)

handler404 = custom_404_view