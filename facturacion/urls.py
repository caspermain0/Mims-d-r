from django.urls import path, include
from rest_framework.routers import DefaultRouter
<<<<<<< HEAD

=======
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
from .views import (
    FacturaViewSet,
    DetalleFacturaViewSet,
    RegistrarFacturaView,
    FacturaListView,
<<<<<<< HEAD
    DetalleFacturaListView,
    HistorialFacturasView,
    MisFacturasView,
    EnviarFacturaEmailView
)

router = DefaultRouter()
router.register(r'facturas', FacturaViewSet, basename='facturas')
router.register(r'detalles', DetalleFacturaViewSet, basename='detalles')

urlpatterns = [
    path('', include(router.urls)),

    # Registrar factura manual (Usuario Empleado)
    path('registrar/', RegistrarFacturaView.as_view(), name='registrar-factura'),

    # Listados
    path('lista/', FacturaListView.as_view(), name='lista-facturas'),
    path('detalles/lista/', DetalleFacturaListView.as_view(), name='lista-detalles'),

    # Facturas según usuario autenticado
    path('cliente/historial/', HistorialFacturasView.as_view(), name='historial-cliente'),
    path('mis-facturas/', MisFacturasView.as_view(), name='mis-facturas'),

    path("facturas/enviar-email/<int:factura_id>/", EnviarFacturaEmailView.as_view(), name="enviar-factura-email"),
=======
    HistorialFacturasView,
    MisFacturasView,
)

# 🔹 Router para CRUD automático
router = DefaultRouter()
router.register(r'crud', FacturaViewSet, basename='factura-crud')
router.register(r'detalles-crud', DetalleFacturaViewSet, basename='detalle-crud')

urlpatterns = [
    path("registrar/", RegistrarFacturaView.as_view(), name="registrar_factura"),
    path("listar/", FacturaListView.as_view(), name="listar_facturas"),
    path("historial/", HistorialFacturasView.as_view(), name="historial_facturas"),
    path("mis-facturas/", MisFacturasView.as_view(), name="mis_facturas"),

    # Incluye las rutas del CRUD
    path("", include(router.urls)),
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
]
