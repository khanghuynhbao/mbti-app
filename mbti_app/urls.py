from django.urls import path # type: ignore
from . import views

urlpatterns = [
    path('', views.trac_nghiem_tinh_cach_mbti, name='home'),
    path('trac-nghiem-tinh-cach-mbti/', views.trac_nghiem_tinh_cach_mbti, name='trac_nghiem_tinh_cach_mbti'),
    path('lam-kiem-tra/', views.lam_kiem_tra, name='lam_kiem_tra'),
    path('cac-loai-tinh-cach/', views.cac_loai_tinh_cach, name='cac_loai_tinh_cach'),
    path('tra-cuu/', views.tra_cuu, name='tra_cuu'),
    path('thong-ke/', views.thong_ke, name='thong_ke'),
    path('tinh-cach/<str:mbti_type>/', views.tinh_cach, name='tinh_cach'), 
    path('ket-qua/', views.ket_qua, name='ket_qua'),
    path('ket-qua/<str:mbti_type>/', views.ket_qua, name='ket_qua'),
]
