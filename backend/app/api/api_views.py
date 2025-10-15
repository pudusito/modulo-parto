# app/api/views.py
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

from django.contrib.auth.models import User, Group
from ..models import Madre, RegistroVital, ConsultaMatrona, Parto, FeedbackJefe
from .serializers import *



# 🔹 Madre (paciente)
class MadreViewSet(viewsets.ModelViewSet):
    queryset = Madre.objects.all()
    serializer_class = MadreSerializer
    permission_classes = [permissions.AllowAny]


# 🔹 Registro de signos vitales
class RegistroVitalViewSet(viewsets.ModelViewSet):
    queryset = RegistroVital.objects.all()
    serializer_class = RegistroVitalSerializer
    permission_classes = [permissions.AllowAny]  # permisos por grupo

"""     def perform_create(self, serializer):
        serializer.save(enfermero=self.request.user) """


# 🔹 Consultas médicas
class ConsultaMatronaViewSet(viewsets.ModelViewSet):
    queryset = ConsultaMatrona.objects.all()
    serializer_class = ConsultaMatronaSerializer
    permission_classes = [permissions.AllowAny]


# 🔹 Partos
class PartoViewSet(viewsets.ModelViewSet):
    queryset = Parto.objects.all()
    serializer_class = PartoSerializer
    permission_classes = [permissions.AllowAny]



# 🔹 Feedback del jefe hospital
class FeedbackJefeViewSet(viewsets.ModelViewSet):
    queryset = FeedbackJefe.objects.all()
    serializer_class = FeedbackJefeSerializer
    permission_classes = [permissions.AllowAny]
    """ permission_classes = [permissions.DjangoModelPermissions] #  permisos por grupo """

"""     def perform_create(self, serializer):
        serializer.save(jefe=self.request.user) """



# Usuarios
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return User.objects.all().order_by('id')

# Grupos
class GroupViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Group.objects.all().order_by('id')
    serializer_class = None  # no necesitamos un serializer complejo

    def list(self, request, *args, **kwargs):
        grupos = Group.objects.all().values('id', 'name')
        return Response(list(grupos))
    
