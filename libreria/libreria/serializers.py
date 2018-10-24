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

class CrearLibroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Libro
        fields = '__all__'

    def crear(self):
        print("eso en crear")
        print(self.validated_data)
        libro = Libro()
        libro.titulo = self.validated_data.get('titulo')
        libro.autor = self.validated_data.get('autor')
        libro.anio = self.validated_data.get('anio')
        libro.genero = self.validated_data.get('genero')
        libro.editorial = self.validated_data.get('editorial')
        libro.disponible = self.validated_data.get('disponible')
        libro.save()
        return CrearLibroSerializer(libro).data
