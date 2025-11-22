from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Rol  # ✅ importa el modelo Rol

Usuario = get_user_model()


# =========================
# SERIALIZER DE USUARIO
# =========================
class UsuarioSerializer(serializers.ModelSerializer):
<<<<<<< HEAD

    # ✔ Mostrar el label del rol (Administrador, Empleado, Cliente)
    rol_detalle = serializers.SerializerMethodField(read_only=True)
=======
    # ✅ Si el usuario tiene una FK a Rol, muestra los datos del rol
    rol_detalle = serializers.StringRelatedField(source="rol", read_only=True)
    direccion_completa = serializers.CharField(read_only=True)  # ✅ Sin source
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a

    class Meta:
        model = Usuario
        fields = [
            "id",
            "username",
            "email",
            "password",
            "nombre_completo",
            "telefono",
<<<<<<< HEAD
            "direccion",
            "rol",           # valor interno: admin, empleado, cliente
            "rol_detalle",   # label: Administrador, Empleado, Cliente
=======
            "calle",           # ✅ Este campo ahora sí existe
            "numero",          # ✅ Este campo ahora sí existe
            "direccion_completa",  # ✅ Este campo también existe
            "rol",             # puede ser FK o campo tipo CharField, según tu modelo
            "rol_detalle",     # se mostrará solo para lectura
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
            "num_doc",
        ]
        extra_kwargs = {
            "password": {"write_only": True}
        }

<<<<<<< HEAD
    # ✔ Convierte el valor en su etiqueta definida en choices
    def get_rol_detalle(self, obj):
        return obj.get_rol_display()

=======
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
    def create(self, validated_data):
        """Crear usuario con contraseña encriptada"""
        password = validated_data.pop("password", None)
        usuario = self.Meta.model(**validated_data)
        if password:
            usuario.set_password(password)
        usuario.save()
        return usuario

    def update(self, instance, validated_data):
        """Actualizar usuario (con manejo de contraseña)"""
        password = validated_data.pop("password", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


# =========================
# SERIALIZER DE ROL
# =========================
<<<<<<< HEAD

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ['id', 'nombre', 'descripcion', 'activo']
        read_only_fields = ['id']
=======
class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = "__all__"
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
