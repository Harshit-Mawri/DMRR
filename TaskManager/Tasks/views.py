
from .serializers import TaskSerializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import TASKS
from rest_framework.permissions import IsAuthenticated


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def Create(request):
    serializer = TaskSerializers(data=request.data)

    if serializer.is_valid():
        serializer.save(user=request.user)

        return Response(
            {
                "message": "Task Added",
                "task": serializer.data
            },
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def Read(request):
    data = TASKS.objects.filter(user=request.user)
    serializer = TaskSerializers(data, many=True)

    return Response(
        {
            "message": "Tasks retrieved" if serializer.data else "No tasks listed",
            "task": serializer.data
        },
        status=status.HTTP_200_OK
    )


@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated])
def Update(request, pk):
    try:
        task = TASKS.objects.get(pk=pk, user=request.user)
    except TASKS.DoesNotExist:
        return Response(
            {"message": "Task not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    partial = request.method == "PATCH"

    serializer = TaskSerializers(
        task,
        data=request.data,
        partial=partial
    )

    if serializer.is_valid():
        serializer.save(user=request.user)

        return Response(
            {
                "message": "Task updated successfully",
                "task": serializer.data
            },
            status=status.HTTP_200_OK
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def Delete(request, pk):
    try:
        task = TASKS.objects.get(pk=pk, user=request.user)
    except TASKS.DoesNotExist:
        return Response(
            {"message": "Task not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    task.delete()

    return Response(
        {"message": "Task deleted successfully"},
        status=status.HTTP_200_OK
    )
