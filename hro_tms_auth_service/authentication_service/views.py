from rest_framework.generics import ListAPIView
from authentication_service.serializers import (
    CustomTokenObtainPairSerializer,
    UserSerializer,
    CustomTokenVerifySerializer,
)

from rest_framework_simplejwt.views import (
    TokenVerifyView,
    TokenObtainPairView,
)
from .models import Area, CustomUser
from .serializers import AreaSerializer


class AreaListView(ListAPIView):
    queryset = Area.objects.all()
    serializer_class = AreaSerializer


class UsersListView(ListAPIView):
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class CustomTokenVerifyView(TokenVerifyView):
    serializer_class = CustomTokenVerifySerializer