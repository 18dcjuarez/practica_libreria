from rest_framework import viewsets
from rest_framework.response import Response

from .serializers import LibroSerializer, CrearLibroSerializer, UpdateSerializer, DestroySerializer, FilterSerializer, CountSerializer, ContarSerializer
from rest_framework.decorators import action

from .models import Libro


class LibroViewSet(viewsets.ModelViewSet):
    serializer_class = LibroSerializer
    queryset = Libro.objects.all()

    # def list(self, request):
    #     data1 = request.query_params.dict()
    #     search = ValidateSerializer(data=data1)
    #     search.is_valid(raise_exception=True)
    #     resp = search.buscar()
    #     return Response(resp)

    def destroy(self, request, pk=None):
        data1 = dict()
        data1['id'] = pk
        print(data1)
        serializer = DestroySerializer(data=data1)
        serializer.is_valid(raise_exception=True)
        respuesta = serializer.borrar()
        return Response(respuesta)

    def create(self, request):
        serializer = CrearLibroSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        resp = serializer.crear()
        return Response(resp)

    def partial_update(self, request, pk=None):
        data1 = request.data
        data1['id'] = pk
        libro = UpdateSerializer(data=data1)
        libro.is_valid(raise_exception=True)
        response = libro.update()
        return Response(response)

    def list(self, request):
        data1 = request.query_params.dict()
        search = FilterSerializer(data=data1)
        search.is_valid(raise_exception=True)
        resp = search.buscar()
        return Response(resp)

    @action(detail=False,methods=['get'])
    def count(self, request):
        data1 = request.query_params.dict()
        serializer = CountSerializer(data=data1)
        serializer.is_valid(raise_exception=True)
        resp = serializer.contar()
        print("estoy en count")
        return Response (resp)

    @action(detail=True,methods=['get'])
    def count(self, request, pk=None ):
        print("estoy en count")
        print(pk)
        data1 = dict()
        data1['genero'] = pk
        print(data1)
        serializer = ContarSerializer(data=data1)
        serializer.is_valid(raise_exception=True)
        resp = serializer.buscar()
        return Response(resp)






