from rest_framework import serializers

from .models import Libro


class LibroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Libro
        fields = ('autor', 'titulo', )


class ValidateSerializer(serializers.Serializer):
    genero = serializers.CharField(max_length=10)

    def validate_genero(self, param):
        if param == "Terror" or param == "Novela" or param == "Comedia":
            return param
        else:
            raise serializers.ValidationError("Parametro no existe")

    def buscar(self):
        libros = Libro.objects.filter(genero=self.validated_data.get('genero'))
        resp = LibroSerializer(libros, many=True).data
        return resp

    def funcion1(self):
        print("Funcion 1")
        return 1

    def funcion2(self):
        print('Esto es la funcion 2')
        return 2


class DestroySerializer(serializers.Serializer):
    id = serializers.IntegerField()
    def validate_id(self, param):
        try:
            libro = Libro.objects.get(pk=param)
            return param
        except:
            raise serializers.ValidationError("Libro no existe")

    def borrar(self):
        print(self.validated_data.get('id'))
        libro = Libro.objects.get(pk=self.validated_data.get('id'))
        print(libro)
        libro.delete()
        return 'ok'


