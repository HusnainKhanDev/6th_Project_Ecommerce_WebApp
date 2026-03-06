from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model
User = get_user_model()  # automatically gets whatever AUTH_USER_MODEL is set to
from .serializers import User_Serializer

class signup(APIView):
    def post(self, request):
        user_data = request.data.get('data')

        # WRITING — incoming data passed with data= keyword
        serializedData = User_Serializer(data=user_data)  # ✅ data=request.data directly
        # validating incoming JSON → saving to DB ✓

        if serializedData.is_valid():
            serializedData.save()
            return Response({'message': 'Account created, please login'}, status=201)
        return Response(serializedData.errors, status=400)


class signin(APIView):
    def post(self, request):
        email = request.data.get('email')     
        password = request.data.get('password') 

        user = authenticate(request, email=email, password=password)  # ✅ pass request too
        if user is None:
            return Response({"error": "Invalid credentials"}, status=401)
        
        token = AccessToken.for_user(user)
        response = Response({'message': 'Login successful'}, status=200)
        response.set_cookie(
            key='Token',
            value=str(token),  # ✅ convert to string
            httponly=True,
            secure=False,
            samesite='Lax',
            max_age=24*60*60
        )
        return response