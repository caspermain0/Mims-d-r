from rest_framework import viewsets, generics, permissions
<<<<<<< HEAD
from .models import Medicamento, Categoria, MovimientoInventario
from .serializer import MedicamentoSerializer, CategoriaSerializer, CategoriaConMedicamentosSerializer
=======
from rest_framework.response import Response
from .models import Medicamento, Categoria, MovimientoInventario
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
from .serializer import (
    MedicamentoSerializer,
    CategoriaSerializer,
    MovimientoInventarioSerializer
)
from .permissions import EsEmpleadoOPermisoAdmin

<<<<<<< HEAD
# =========================
# 🧩 CRUD DE CATEGORÍAS
# =========================
class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [EsEmpleadoOPermisoAdmin]

    def perform_destroy(self, instance):
        """Inactivar en lugar de eliminar físicamente."""
        instance.activo = False
        instance.save()
=======
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a

# =========================
# 💊 CRUD DE MEDICAMENTOS
# =========================
class MedicamentoViewSet(viewsets.ModelViewSet):
    queryset = Medicamento.objects.all()
    serializer_class = MedicamentoSerializer
    permission_classes = [EsEmpleadoOPermisoAdmin]

<<<<<<< HEAD
=======
    def get_serializer_context(self):
        """Pasa el request al contexto para las imágenes."""
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
    def perform_destroy(self, instance):
        """Inactivar medicamento en lugar de eliminar."""
        instance.estado = False
        instance.save()

<<<<<<< HEAD
=======

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


>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
# =========================
# 📦 CRUD DE MOVIMIENTOS DE INVENTARIO
# =========================
class MovimientoInventarioViewSet(viewsets.ModelViewSet):
    queryset = MovimientoInventario.objects.all()
    serializer_class = MovimientoInventarioSerializer
    permission_classes = [EsEmpleadoOPermisoAdmin]

<<<<<<< HEAD
=======
    def get_serializer_context(self):
        """Pasa el request al contexto."""
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
# =========================
# 🔐 VISTAS BASADAS EN GENERICS
# =========================

# 🔹 Listar medicamentos (solo empleados o admins)
class MedicamentoListView(generics.ListAPIView):
    queryset = Medicamento.objects.filter(estado=True)
    serializer_class = MedicamentoSerializer
    permission_classes = [permissions.IsAuthenticated]

<<<<<<< HEAD
=======
    def get_serializer_context(self):
        """Pasa el request al contexto para las imágenes."""
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
# 🔹 Crear medicamento
class MedicamentoCreateView(generics.CreateAPIView):
    queryset = Medicamento.objects.all()
    serializer_class = MedicamentoSerializer
    permission_classes = [EsEmpleadoOPermisoAdmin]

<<<<<<< HEAD
=======
    def get_serializer_context(self):
        """Pasa el request al contexto."""
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
# 🔹 Ver, actualizar o eliminar medicamento
class MedicamentoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Medicamento.objects.all()
    serializer_class = MedicamentoSerializer
    permission_classes = [EsEmpleadoOPermisoAdmin]

<<<<<<< HEAD
=======
    def get_serializer_context(self):
        """Pasa el request al contexto."""
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


# 🔹 Catálogo público (sin login)
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
class MedicamentoListPublicAPIView(generics.ListAPIView):
    queryset = Medicamento.objects.filter(estado=True)
    serializer_class = MedicamentoSerializer
    permission_classes = [permissions.AllowAny]

<<<<<<< HEAD
# 🔹 Lista de categorías activas
class CategoriaListPublicAPIView(generics.ListAPIView):
    queryset = Categoria.objects.filter(activo=True)
    serializer_class = CategoriaSerializer
    permission_classes = [permissions.AllowAny]

# 🔹 Opcional: Categorías con sus medicamentos anidados
class CategoriaConMedicamentosListAPIView(generics.ListAPIView):
    queryset = Categoria.objects.filter(activo=True)
    serializer_class = CategoriaConMedicamentosSerializer
    permission_classes = [permissions.AllowAny]
=======
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
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
