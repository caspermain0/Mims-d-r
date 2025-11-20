from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoriaViewSet,
    MedicamentoViewSet,
    MedicamentoListView,
    MedicamentoCreateView,
    MedicamentoDetailView,
    MedicamentoListPublicAPIView,
)

# =========================
# 🚀 Router para CRUD automáticos (ViewSets)
# =========================
router = DefaultRouter()
router.register('medicamentos-crud', MedicamentoViewSet, basename='medicamentos')
router.register('categorias', CategoriaViewSet, basename='categorias')

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

    # 🔹 Incluye las rutas automáticas del router
    path("", include(router.urls)),
]
