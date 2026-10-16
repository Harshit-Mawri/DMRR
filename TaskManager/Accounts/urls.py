from django.urls import path
from Accounts.views import *

urlpatterns = [
    path("signup/",Signup,name="create-user"),
    path("fetchUser/",FetchUser,name="fetch-user"),
    path("updateUser<str:pk>/",UpdateUser,name="update-user"),
    path("deleteUser<str:pk>/",DeleteUser,name="delete-user"),
    path("login/",Login,name="login-user")
]