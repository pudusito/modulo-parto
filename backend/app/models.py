# app/models.py
from django.db import models
from django.contrib.auth.models import User

# 🔹 Paciente (madre)
class Madre(models.Model):
    nombre = models.CharField(max_length=100)
    rut = models.CharField(max_length=15, unique=True)
    edad = models.IntegerField()

    def __str__(self):
        return self.nombre

# 🔹 Registro de signos vitales (por enfermero)
class RegistroVital(models.Model):
    madre = models.ForeignKey(Madre, on_delete=models.CASCADE, related_name='vitales')
    enfermero = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    altura = models.FloatField(null=True)
    peso = models.FloatField(default=0)
    temperatura = models.FloatField()
    presion = models.CharField(max_length=20)
    frecuencia_cardiaca = models.IntegerField()
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Registro vital de {self.madre.nombre} ({self.fecha.date()})"

# 🔹 Consultas médicas (por matrona)
class ConsultaMatrona(models.Model):
    madre = models.ForeignKey(Madre, on_delete=models.CASCADE, related_name='consultas')
    matrona = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    numero_consulta = models.IntegerField()
    detalle = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Consulta {self.numero_consulta} - {self.madre.nombre}"

# 🔹 Parto (gestión del procedimiento)
class Parto(models.Model):
    TIPOS = [
        ('natural', 'Natural'),
        ('cesarea', 'Cesárea'),
        ('instrumental', 'Instrumental'),
    ]
    madre = models.ForeignKey(Madre, on_delete=models.CASCADE)
    tipo = models.CharField(max_length=20, choices=TIPOS)
    medico = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='partos_dirigidos')
    equipo_asignado = models.ManyToManyField(User, related_name='partos_participantes', blank=True)
    hora_inicio = models.DateTimeField()
    hora_termino = models.DateTimeField(blank=True, null=True)
    resultado = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Parto de {self.madre.nombre} ({self.tipo})"

# 🔹 Feedback del jefe hospital
class FeedbackJefe(models.Model):
    parto = models.OneToOneField(Parto, on_delete=models.CASCADE, related_name='feedback')
    jefe = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    comentario = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback {self.parto.id} por {self.jefe}"
