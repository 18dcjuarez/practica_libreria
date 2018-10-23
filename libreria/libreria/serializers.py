from rest_framework import serializers

from .models import Libro


class LibroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Libro
        fields = ('autor', 'titulo', )


class ValidateSerializer(serializers.Serializer):
    genero = serializers.CharField(max_length=10)

    def validate_genero(self, param):
        print("param de validate_genero: " + param)
        if param == "Terror" or param == "Novela" or param == "Comedia":
            print("Param ok")
            return param
        else:
            print("param mal")
            raise serializers.ValidationError("Parametro no existe")

    def buscar(self):
        print("validated data:")
        print(self.validated_data.get('genero'))
        libros = Libro.objects.filter(genero=self.validated_data.get('genero'))
        print(libros)

        resp = LibroSerializer(libros, many=True).data
        print(resp)

        return resp
