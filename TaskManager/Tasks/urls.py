from django.urls import path
from Tasks.views import *

urlpatterns = [
    path("create/",Create,name="create-task"),
    path("read/",Read,name="read-task"),
    path("update/<str:pk>/",Update,name="update-task"),
    path("delete/<str:pk>/",Delete,name="delete-task")
]