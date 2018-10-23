# Generated by Django 2.1.2 on 2018-10-22 16:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Libro',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo', models.TextField(max_length=10)),
                ('genero', models.TextField(max_length=20)),
                ('anio', models.IntegerField()),
                ('autor', models.TextField(max_length=20)),
                ('editorial', models.TextField(max_length=15)),
                ('disponible', models.BooleanField(default=False)),
                ('creado', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
