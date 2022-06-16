from rest_framework import serializers
from django.contrib.auth.models import User

from rest_framework.authtoken.models import Token
from companys.serializers import CompanySerializer


class UserSerializer(serializers.ModelSerializer):
    Company = CompanySerializer(read_only=True, many=True)

    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {
            'password': {
                'write_only': True, 'required': True
            }
        }


def create(self, validated_data):
    user = User.objects.create_user(**validated_data)
    Token.objects.create(user=user)
    return user
