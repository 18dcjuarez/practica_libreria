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
