from django.urls import path
from authentication_service import views

app_name = 'authentication_service'

urlpatterns = [
    path('users/', views.UsersListView.as_view(), name='users-list'),
    path('token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/verify/', views.CustomTokenVerifyView.as_view(), name='token_verify'),
    path('areas/', views.AreaListView.as_view(), name='area-list'),
]