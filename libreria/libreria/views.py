from rest_framework import generics
from rest_framework import viewsets
from rest_framework.response import Response

from .serializers import LibroSerializer, ValidateSerializer, DestroySerializer
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

    def destroy(self, request, pk=None):
        data1 = dict()
        data1['id'] = pk
        print(data1)
        serializer = DestroySerializer(data=data1)
        serializer.is_valid(raise_exception=True)
        respuesta = serializer.borrar()
        return Response(respuesta)