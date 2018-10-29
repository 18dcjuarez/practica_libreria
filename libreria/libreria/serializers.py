from rest_framework import serializers

from .models import Libro


class LibroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Libro
        # fields = ('autor', 'titulo', )
        fields = '__all__'


# class ValidateSerializer(serializers.Serializer):
#     genero = serializers.CharField(max_length=10, required=False)
#
#     def validate_genero(self, param):
#         if param == "Terror" or param == "Novela" or param == "Comedia":
#             return param
#         else:
#             raise serializers.ValidationError("Parametro no existe")
#
#     def buscar(self):
#         libros = Libro.objects.filter(genero=self.validated_data.get('genero'))
#         resp = LibroSerializer(libros, many=True).data
#         return resp
#
#     def funcion1(self):
#         print("Funcion 1")
#         return 1
#
#     def funcion2(self):
#         print('Esto es la funcion 2')
#         return 2


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


class UpdateSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    titulo = serializers.CharField(required=False)
    genero = serializers.CharField(required=False)
    anio = serializers.IntegerField(required=False)
    autor = serializers.CharField(required=False)
    editorial = serializers.CharField(required=False)
    disponible = serializers.BooleanField(required=False)

    def validate_id(self, param):
        if Libro.objects.filter(id=param):
            return param
        else:
            raise serializers.ValidationError("Id no existe")

    def update(self):
        libro = Libro.objects.get(pk=self.validated_data.get('id'))
        # print(self.validated_data)
        libro.titulo = self.validated_data.get('titulo', libro.titulo)
        libro.genero = self.validated_data.get('genero', libro.genero)
        libro.anio = self.validated_data.get('anio', libro.anio)
        libro.autor = self.validated_data.get('autor', libro.autor)
        libro.editorial = self.validated_data.get('editorial', libro.editorial)
        libro.disponible = self.validated_data.get('disponible', libro.disponible)
        libro.save()
        return LibroSerializer(libro).data


class FilterSerializer(serializers.Serializer):
    genero = serializers.CharField(max_length=10, required=False)
    titulo = serializers.CharField(max_length=10, required=False)
    autor = serializers.CharField(max_length=10, required=False)

    def buscar(self):
        libros = Libro.objects.filter(genero__icontains=self.validated_data.get('genero', ''),
                                      titulo__icontains=self.validated_data.get('titulo', ''),
                                      autor__icontains=self.validated_data.get('autor', ''))
        resp = LibroSerializer(libros, many=True).data
        return resp


class CountSerializer(serializers.Serializer):

   def contar(self):
        libros = Libro.objects.all().count()
        print(libros)

        return libros

class ContarSerializer(serializers.Serializer):

    genero = serializers.CharField(max_length=10, required=False)


    def buscar(self):
        print("estoy en buscar")
        # print(self.validated_data.get('genero'))


        #resp = LibroSalidaSerializer(libros, many=True).data
        libros = Libro.objects.filter(genero=self.validated_data.get('genero'))
        resp = LibroSalidaSerializer(libros, many=True).data

        return resp


    def validate_genero(self,param):
        cadena = 'x'
        if param.find(cadena)==-1:
            print("no contiene la letra x")
            return param
        else:
            raise serializers.ValidationError("El genero contiene la letra x")



class LibroSalidaSerializer(LibroSerializer):

    cuenta = serializers.SerializerMethodField()

    def get_cuenta(self, data):
        libros = Libro.objects.filter(genero=data.genero)
        return libros.count()





