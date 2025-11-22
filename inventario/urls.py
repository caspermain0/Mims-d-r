from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoriaViewSet,
    MedicamentoViewSet,
<<<<<<< HEAD
    MovimientoInventarioViewSet,
=======
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
    MedicamentoListView,
    MedicamentoCreateView,
    MedicamentoDetailView,
    MedicamentoListPublicAPIView,
<<<<<<< HEAD
    CategoriaListPublicAPIView,
    CategoriaConMedicamentosListAPIView,  # nueva vista anidada
=======
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
)

# =========================
# 🚀 Router para CRUD automáticos (ViewSets)
# =========================
router = DefaultRouter()
<<<<<<< HEAD
router.register(r'categorias', CategoriaViewSet, basename='categoria')
router.register(r'medicamentos-crud', MedicamentoViewSet, basename='medicamento-crud')
router.register(r'movimientos', MovimientoInventarioViewSet, basename='movimiento-inventario')
=======
router.register('medicamentos-crud', MedicamentoViewSet, basename='medicamentos')
router.register('categorias', CategoriaViewSet, basename='categorias')
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a

# =========================
# 🌐 URL patterns
# =========================
urlpatterns = [
    # 🔹 API protegida (empleado/admin)
    path("medicamentos/", MedicamentoListView.as_view(), name="medicamentos_lista"),
    path("medicamentos/crear/", MedicamentoCreateView.as_view(), name="medicamento_crear"),
    path("medicamentos/<int:pk>/", MedicamentoDetailView.as_view(), name="medicamento_detalle"),

    # 🔹 API pública (catálogo)
    path("catalogo/", MedicamentoListPublicAPIView.as_view(), name="catalogo_api"),
<<<<<<< HEAD
    path("catalogo/categorias/", CategoriaListPublicAPIView.as_view(), name="catalogo_categorias"),
    path("catalogo/categorias-con-medicamentos/", CategoriaConMedicamentosListAPIView.as_view(), name="catalogo_categorias_anidadas"),

    # 🔹 Incluye las rutas automáticas del router (CRUD)
=======

    # 🔹 Incluye las rutas automáticas del router
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
    path("", include(router.urls)),
]
