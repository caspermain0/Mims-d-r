from rest_framework import viewsets, generics, permissions
from rest_framework.response import Response
from .models import Medicamento, Categoria, MovimientoInventario
from .serializer import (
    MedicamentoSerializer,
    CategoriaSerializer,
    MovimientoInventarioSerializer
)
from .permissions import EsEmpleadoOPermisoAdmin


# =========================
# 💊 CRUD DE MEDICAMENTOS
# =========================
class MedicamentoViewSet(viewsets.ModelViewSet):
    queryset = Medicamento.objects.all()
    serializer_class = MedicamentoSerializer
    permission_classes = [EsEmpleadoOPermisoAdmin]

    def get_serializer_context(self):
        """Pasa el request al contexto para las imágenes."""
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def perform_destroy(self, instance):
        """Inactivar medicamento en lugar de eliminar."""
        instance.estado = False
        instance.save()


# =========================
# 🧩 CRUD DE CATEGORÍAS
# =========================
class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [EsEmpleadoOPermisoAdmin]

    def get_serializer_context(self):
        """Pasa el request al contexto."""
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def perform_destroy(self, instance):
        """Inactivar en lugar de eliminar físicamente."""
        instance.activo = False
        instance.save()


# =========================
# 📦 CRUD DE MOVIMIENTOS DE INVENTARIO
# =========================
class MovimientoInventarioViewSet(viewsets.ModelViewSet):
    queryset = MovimientoInventario.objects.all()
    serializer_class = MovimientoInventarioSerializer
    permission_classes = [EsEmpleadoOPermisoAdmin]

    def get_serializer_context(self):
        """Pasa el request al contexto."""
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


# =========================
# 🔐 VISTAS BASADAS EN GENERICS
# =========================

# 🔹 Listar medicamentos (solo empleados o admins)
class MedicamentoListView(generics.ListAPIView):
    queryset = Medicamento.objects.filter(estado=True)
    serializer_class = MedicamentoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_context(self):
        """Pasa el request al contexto para las imágenes."""
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


# 🔹 Crear medicamento
class MedicamentoCreateView(generics.CreateAPIView):
    queryset = Medicamento.objects.all()
    serializer_class = MedicamentoSerializer
    permission_classes = [EsEmpleadoOPermisoAdmin]

    def get_serializer_context(self):
        """Pasa el request al contexto."""
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


# 🔹 Ver, actualizar o eliminar medicamento
class MedicamentoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Medicamento.objects.all()
    serializer_class = MedicamentoSerializer
    permission_classes = [EsEmpleadoOPermisoAdmin]

    def get_serializer_context(self):
        """Pasa el request al contexto."""
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


# 🔹 Catálogo público (sin login)
class MedicamentoListPublicAPIView(generics.ListAPIView):
    queryset = Medicamento.objects.filter(estado=True)
    serializer_class = MedicamentoSerializer
    permission_classes = [permissions.AllowAny]

    def get_serializer_context(self):
        """Pasa el request al contexto para las imágenes."""
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


# =========================
# 💊 Catálogo alternativo (nombre descriptivo)
# =========================
class MedicamentoCatalogoPublico(generics.ListAPIView):
    queryset = Medicamento.objects.filter(estado=True)
    serializer_class = MedicamentoSerializer
    permission_classes = [permissions.AllowAny]

    def get_serializer_context(self):
        """Pasa el request al contexto para las imágenes."""
        context = super().get_serializer_context()
        context['request'] = self.request
        return context