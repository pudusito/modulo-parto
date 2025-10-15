from rest_framework import serializers
from ..models import Madre, RegistroVital, ConsultaMatrona, Parto, FeedbackJefe
from django.contrib.auth.models import User, Group

# 🔹 Serializers de modelos básicos
class MadreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Madre
        fields = '__all__'


class RegistroVitalSerializer(serializers.ModelSerializer):
    # Solo enfermeros
    enfermero = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(groups__name="Enfermero")
    )

    class Meta:
        model = RegistroVital
        fields = '__all__'


class ConsultaMatronaSerializer(serializers.ModelSerializer):
    # Solo matronas
    matrona = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(groups__name="Matrona")
    )

    class Meta:
        model = ConsultaMatrona
        fields = '__all__'


class PartoSerializer(serializers.ModelSerializer):
    # Solo Medico
    medico = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(groups__name="Medico")
    )

    class Meta:
        model = Parto
        fields = '__all__'


class FeedbackJefeSerializer(serializers.ModelSerializer):
    # Solo jefes
    jefe = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(groups__name="Jefe")
    )

    class Meta:
        model = FeedbackJefe
        fields = '__all__'


# 🔹 Serializador de usuario con gestión de grupos y rol principal
class UserSerializer(serializers.ModelSerializer):
    # campo para asignar un grupo al crear/editar
    grupo = serializers.CharField(write_only=True, required=False)
    # lista de grupos del usuario (read-only)
    grupos = serializers.SerializerMethodField(read_only=True)
    # rol principal (tomamos el primer grupo si existe)
    rol = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'grupo', 'grupos', 'rol']
        extra_kwargs = {'password': {'write_only': True}}

    def get_grupos(self, obj):
        return [g.name for g in obj.groups.all()]

    def get_rol(self, obj):
        grupos = obj.groups.all()
        return grupos[0].name if grupos else None

    def create(self, validated_data):
        grupo_nombre = validated_data.pop('grupo', None)
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()

        if grupo_nombre:
            grupo = Group.objects.filter(name=grupo_nombre).first()
            if grupo:
                user.groups.add(grupo)
        return user

    def update(self, instance, validated_data):
        grupo_nombre = validated_data.pop('grupo', None)
        instance.username = validated_data.get('username', instance.username)
        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)

        if grupo_nombre:
            instance.groups.clear()
            grupo = Group.objects.filter(name=grupo_nombre).first()
            if grupo:
                instance.groups.add(grupo)

        instance.save()
        return instance
