from django.shortcuts import get_object_or_404

from rest_framework import viewsets
from rest_framework.response import Response

from .serializers import LibroSerializer, ValidateSerializer, UpdateSerializer
from .models import Libro


class LibroViewSet(viewsets.ModelViewSet):
    serializer_class = LibroSerializer
    queryset = Libro.objects.all()

    def list(self, request):
        data1 = request.query_params.dict()
        search = ValidateSerializer(data=data1)
        print("sale de search: ")
        search.is_valid(raise_exception=True)
        resp = search.buscar()
        return Response(resp)

    def partial_update(self, request, pk=None):
        data1 = request.data
        data1['id'] = pk
        libro = UpdateSerializer(data=data1)
        libro.is_valid(raise_exception=True)
        response = libro.update()
        return Response(response)
