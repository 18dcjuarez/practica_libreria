from django.db import models
#Importando  el modelo


class Libro(models.Model):
    titulo = models.TextField(null=False, max_length=10)
    genero = models.TextField(null=False, max_length=20)
    anio = models.IntegerField(null=False)
    autor = models.TextField(null=False, max_length=20)
    editorial = models.TextField(null=False, max_length=15)
    disponible = models.BooleanField(default=False)
    creado = models.DateTimeField(auto_now_add=True)
