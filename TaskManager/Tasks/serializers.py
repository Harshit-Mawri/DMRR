from rest_framework import serializers
from .models import TASKS

class TaskSerializers(serializers.ModelSerializer):
    id = serializers.CharField(read_only=True)
    class Meta:
        model = TASKS
        fields = ["id", "title", "description", "created"]