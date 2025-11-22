# usuarios/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RegistroUsuarioView,
    LoginUsuarioView,
    perfil_usuario,
<<<<<<< HEAD
=======
    actualizar_perfil,
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
    solicitar_recuperacion,
    cambiar_contrasena,
    UsuarioViewSet,
    RolViewSet,
)

<<<<<<< HEAD
# 🔹 Router para los CRUD automáticos
=======
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuarios')
router.register(r'roles', RolViewSet, basename='roles')

urlpatterns = [
<<<<<<< HEAD
    # 🔹 Endpoints personalizados
    path("registro/", RegistroUsuarioView.as_view(), name="registro_usuario"),
    path("login/", LoginUsuarioView.as_view(), name="login_usuario"),
    path("perfil/", perfil_usuario, name="perfil_usuario"),
    path("recuperar/", solicitar_recuperacion, name="solicitar_recuperacion"),
    path("cambiar-contrasena/", cambiar_contrasena, name="cambiar_contrasena"),
    path("editar-usuario/<int:pk>/", UsuarioViewSet.as_view({'put': 'update'}), name="editar_usuario"),

    # 🔹 Endpoints del router (CRUDs)
    path("", include(router.urls)),
]
=======
    path("registro/", RegistroUsuarioView.as_view(), name="registro_usuario"),
    path("login/", LoginUsuarioView.as_view(), name="login_usuario"),
    path("perfil/", perfil_usuario, name="perfil_usuario"),                 # ✅ Solo GET
    path("perfil/editar/", actualizar_perfil, name="actualizar_perfil"),    # ✅ Solo PUT
    path("recuperar/", solicitar_recuperacion, name="solicitar_recuperacion"),
    path("cambiar-contrasena/", cambiar_contrasena, name="cambiar_contrasena"),
    path("", include(router.urls)),
]
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
