from rest_framework.response import Response
from .serializers import UserSerializer, LoginSerializer
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAdminUser
# Create your views here.
@api_view(["POST"])
@permission_classes([IsAdminUser])
def Signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response(
            {"message": "User registered successfully"},
            status=201
        )

    return Response(serializer.errors, status=400)

@api_view(["POST"])
@permission_classes([IsAdminUser])
def Login(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = authenticate(
        username=serializer.validated_data["email"], 
        password=serializer.validated_data["password"],
    )

    if user is None:
        return Response(
            {"error": "Invalid email or password"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    return Response(
        {"message": "Login successful", "email": user.email},
        status=status.HTTP_200_OK,
    )

@api_view(["Get"])
@permission_classes([IsAdminUser])
def FetchUser(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)

    if serializer.data:
        return Response(
            {"message": "Users fetched successfully", "users": serializer.data},
            status=status.HTTP_200_OK
        )

    return Response(serializer.errors, status=400)

@api_view(["PUT", "PATCH"])
@permission_classes([IsAdminUser])
def UpdateUser(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(
        {"message": " not found"},
        status=status.HTTP_404_NOT_FOUND
        )
    partial = request.method == "PATCH"
    serializer = UserSerializer(
        user,
        data=request.data,
        partial=partial
    )
    if serializer.is_valid():
        serializer.save()
        return Response(
            {
                "message": " updated successfully",
                "user": serializer.data
            },
            status=status.HTTP_200_OK
        )
    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def DeleteUser(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(
            {"message": " not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    user.delete()

    return Response(
        {"message": " deleted successfully"},
        status=status.HTTP_200_OK
    )
