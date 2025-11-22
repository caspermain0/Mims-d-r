<<<<<<< HEAD
from typing import Any
from rest_framework.permissions import BasePermission, SAFE_METHODS


class EsEmpleadoOAdministrador(BasePermission):
    """
    Permite acceso total a admin y empleados.
    Los clientes solo pueden leer (GET).
    """

    def has_permission(self, request, view) -> bool: # type: ignore
        user = request.user

        # No autenticado → solo lectura
        if not user or not user.is_authenticated:
            return request.method in SAFE_METHODS

        # Admin o empleado → acceso total
        if getattr(user, "rol", None) in ("admin", "empleado"):
            return True

        # Cliente → solo lectura
        return request.method in SAFE_METHODS

    def has_object_permission(self, request, view, obj: Any) -> bool: # type: ignore
        user = request.user
        rol = getattr(user, "rol", None)

        # Admin y empleado → acceso total
        if rol in ("admin", "empleado"):
            return True

        # Cliente → solo puede ver sus propias facturas
        if rol == "cliente":
            if request.method in SAFE_METHODS:
                return getattr(obj, "cliente", None) == user
            return False
=======
from rest_framework import permissions

class EsEmpleadoOAdministrador(permissions.BasePermission):
    """
    Permite acceso total solo a empleados y administradores.
    Los clientes pueden ver pero no crear, editar o eliminar.
    """

    def has_permission(self, request, view):
        user = request.user

        # Si no está autenticado → acceso solo lectura (GET)
        if not user.is_authenticated:
            return request.method in permissions.SAFE_METHODS

        # Administrador o empleado → acceso total
        if user.rol in ["administrador", "empleado"]:
            return True

        # Cliente → solo puede ver
        return request.method in permissions.SAFE_METHODS

    def has_object_permission(self, request, view, obj):
        user = request.user

        # Admin y empleado → acceso total
        if user.rol in ["administrador", "empleado"]:
            return True

        # Cliente → solo puede ver sus propias facturas
        if user.rol == "cliente":
            return request.method in permissions.SAFE_METHODS and obj.cliente == user
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a

        return False
