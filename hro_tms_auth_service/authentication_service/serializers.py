from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenVerifySerializer,
)
from rest_framework import serializers
from .models import CustomUser, Area, Clinic


class ClinicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clinic
        fields = "__all__"


class AreaSerializer(serializers.ModelSerializer):
    area_clinics = ClinicSerializer(many=True)
    class Meta:
        model = Area
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    area = AreaSerializer()
    class Meta:
        model = CustomUser
        exclude = [
            "password",
            "is_superuser",
            "is_staff",
            "is_active",
        ]


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        user_serializer = UserSerializer(user)
        token['user'] = user_serializer.data
        print(token['user'])
        return token


class CustomTokenVerifySerializer(TokenVerifySerializer):
    def validate(self, attrs):
        from jwt import decode as jwt_decode
        from django.conf import settings
        super().validate(attrs)
        user_id = jwt_decode(attrs.get('token'), settings.SECRET_KEY, algorithms=[
                             'HS256'])['user']['id']
        if user_id:
            user = CustomUser.objects.get(id=user_id)
            return {"current_user": UserSerializer(user).data}