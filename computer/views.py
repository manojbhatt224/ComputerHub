
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import ComputerSerializer,SpecificationSerializer, ComputerListSerializer
from .renderer import ComputerRenderer
from .models import Computer, ComputerSpecification


class FetchSpecifications(APIView):
    def get(self, request, format=None):
        specifications = ComputerSpecification.objects.all()
        serializer=SpecificationSerializer(specifications, many=True)
        return Response({'msg':'Specifications Fetched', 'data':serializer.data}, status=status.HTTP_200_OK)

class CreateDisplayComputers(APIView):
    renderer_classes=[ComputerRenderer]
    def post(self, request, format=None):
        print("Post Requested")
        serializer= ComputerSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg':'Computer Was Created Successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, format=None):
        mycomputers = Computer.objects.all()
        serializer= ComputerListSerializer(mycomputers, many=True)
        return Response({'msg':'Computers Fetched', 'data':serializer.data}, status=status.HTTP_200_OK)

class UpdateDeleteViewComputer(APIView):
    renderer_classes=[ComputerRenderer]
    def get(self, request, pk):
        comp=get_object_or_404(Computer, pk=pk)
        serializer = ComputerSerializer(comp)
        return Response({'msg':'Success', 'data':serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, pk):
        comp=get_object_or_404(Computer, pk=pk)
        serializer = ComputerSerializer(comp, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'Updated Succesfully!', 'data':serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        computer = get_object_or_404(Computer,pk=pk)
        computer.delete()
        return Response({'msg':'Deleted Succesfully!'}, status=status.HTTP_204_NO_CONTENT)




