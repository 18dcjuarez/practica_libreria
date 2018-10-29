from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import LibroSerializer, CrearLibroSerializer,\
                        UpdateSerializer, DestroySerializer, \
                        FilterSerializer, CountSerializer, \
                        GeneroCountSerializer
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

    @action(detail=False, methods=['GET'])
    def count(self, request):
        count = CountSerializer()
        total = count.contar()
        # resp = dict()
        # resp['count'] = total
        resp = {'count': total}
        return Response(resp)

    @action(detail=True, methods=['GET'])
    def genero_count(self, request, pk=None):
        data = dict()
        data['genero'] = pk
        serializer = GeneroCountSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        resp = serializer.buscar_genero()
        return Response(resp)
