from rest_framework import serializers
from .models import User


class User_Serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'full_name', 'phone', 'password']
        extra_kwargs = {
            'password': {'write_only': True}  # password never returned in response
        }


    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)  # ✅ hashes password
        return user
#  User.objects.create() does not save password hashed but create_user does so we modify the serializer default create method