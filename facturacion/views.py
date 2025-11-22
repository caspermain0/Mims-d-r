<<<<<<< HEAD
from typing import Any
from django.db.models import QuerySet
=======
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
from rest_framework import viewsets, generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Factura, DetalleFactura
from inventario.models import Medicamento
from usuarios.models import Usuario
from .serializers import FacturaSerializer, DetalleFacturaSerializer
from .permissions import EsEmpleadoOAdministrador
<<<<<<< HEAD
from .utils.pdf_generator import generar_pdf_factura
from django.core.mail import EmailMessage


# ======================================================
# 🔹 CRUD DE FACTURAS (EMPLEADO + ADMIN)
# ======================================================
=======


# ===============================
# 🔹 CRUD de Facturas
# ===============================
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
class FacturaViewSet(viewsets.ModelViewSet):
    queryset = Factura.objects.all().order_by('-fecha_emision')
    serializer_class = FacturaSerializer
    permission_classes = [EsEmpleadoOAdministrador]

<<<<<<< HEAD
    def perform_create(self, serializer) -> None:
        """
        Asigna automáticamente el empleado autenticado
        al crear una factura.
        """
=======
    def perform_create(self, serializer):
        """Al crear una factura, asigna el empleado autenticado automáticamente"""
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
        empleado = self.request.user if self.request.user.is_authenticated else None
        serializer.save(empleado=empleado)


<<<<<<< HEAD
# ======================================================
# 🔹 CRUD DE DETALLES (PROTEGIDO)
# ======================================================
=======
# ===============================
# 🔹 CRUD de Detalles de Factura
# ===============================
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
class DetalleFacturaViewSet(viewsets.ModelViewSet):
    queryset = DetalleFactura.objects.all()
    serializer_class = DetalleFacturaSerializer
    permission_classes = [EsEmpleadoOAdministrador]


<<<<<<< HEAD
# ======================================================
# 🧾 REGISTRO MANUAL DE FACTURA (USADO POR TU PANEL)
# ======================================================
class RegistrarFacturaView(APIView):
    permission_classes = [EsEmpleadoOAdministrador]

    def post(self, request) -> Response:
        data = request.data

        try:
            # Obtener cliente por ID
            cliente_id = data.get("cliente")
            cliente = get_object_or_404(Usuario, id=cliente_id)

            # Crear factura
=======
# ===============================
# 🧾 Registrar Factura manual (versión APIView)
# ===============================
class RegistrarFacturaView(APIView):
    permission_classes = [EsEmpleadoOAdministrador]

    def post(self, request):
        data = request.data

        try:
            cliente_id = data.get("cliente")
            cliente = get_object_or_404(Usuario, id=cliente_id)

>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
            factura = Factura.objects.create(
                cliente=cliente,
                empleado=request.user if request.user.is_authenticated else None,
                metodo_pago=data.get("metodo_pago", "efectivo"),
                direccion_entrega=data.get("direccion_entrega", ""),
                observaciones=data.get("observaciones", ""),
                total=data.get("total", 0)
            )

<<<<<<< HEAD
            # Crear detalles
            detalles = data.get("detalles", [])
            for d in detalles:
                medicamento = get_object_or_404(Medicamento, id=d.get("medicamento"))
=======
            detalles = data.get("detalles", [])
            for d in detalles:
                medicamento_id = d.get("medicamento")
                medicamento = get_object_or_404(Medicamento, id=medicamento_id)
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a

                DetalleFactura.objects.create(
                    factura=factura,
                    medicamento=medicamento,
                    cantidad=d.get("cantidad", 1),
                    precio_unitario=d.get("precio_unitario", 0),
                    subtotal=d.get("subtotal", 0)
                )
<<<<<<< HEAD
            return Response(
                {"mensaje": "Factura registrada correctamente", "factura_id": factura.cliente},
=======

            return Response(
                {"mensaje": "Factura registrada correctamente", "factura_id": factura.id},
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
                status=status.HTTP_201_CREATED
            )

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


<<<<<<< HEAD
# ======================================================
# 📋 LISTAR TODAS LAS FACTURAS (ADMIN / EMPLEADO)
# ======================================================
class FacturaListView(generics.ListAPIView):
    serializer_class = FacturaSerializer
    permission_classes = [EsEmpleadoOAdministrador]

    def get_queryset(self) -> QuerySet: # type: ignore
        return Factura.objects.all().order_by('-fecha_emision')


# ======================================================
# 💊 LISTAR DETALLES
# ======================================================
class DetalleFacturaListView(generics.ListAPIView):
    serializer_class = DetalleFacturaSerializer
    permission_classes = [EsEmpleadoOAdministrador]

    def get_queryset(self) -> QuerySet: # type: ignore
        return DetalleFactura.objects.all()


# ======================================================
# 🧍 FACTURAS DEL CLIENTE AUTENTICADO
# ======================================================
=======
# ===============================
# 📋 Listar todas las facturas (empleados/admin)
# ===============================
class FacturaListView(generics.ListAPIView):
    queryset = Factura.objects.all().order_by('-fecha_emision')
    serializer_class = FacturaSerializer
    permission_classes = [EsEmpleadoOAdministrador]


# ===============================
# 💊 Listar Detalles
# ===============================
class DetalleFacturaListView(generics.ListAPIView):
    queryset = DetalleFactura.objects.all()
    serializer_class = DetalleFacturaSerializer
    permission_classes = [EsEmpleadoOAdministrador]


# ===============================
# 🧍 Historial del Cliente autenticado
# ===============================
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
class HistorialFacturasView(generics.ListAPIView):
    serializer_class = FacturaSerializer
    permission_classes = [permissions.IsAuthenticated]

<<<<<<< HEAD
    def get_queryset(self) -> QuerySet: # type: ignore
        return Factura.objects.filter(cliente=self.request.user).order_by('-fecha_emision')


# ======================================================
# 👨‍💼 FACTURAS SEGÚN EL ROL DEL USUARIO
# ======================================================
=======
    def get_queryset(self):
        """Devuelve solo las facturas del cliente logueado"""
        return Factura.objects.filter(cliente=self.request.user).order_by('-fecha_emision')


# ===============================
# 👨‍💼 Facturas por rol del usuario autenticado
# ===============================
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
class MisFacturasView(generics.ListAPIView):
    serializer_class = FacturaSerializer
    permission_classes = [permissions.IsAuthenticated]

<<<<<<< HEAD
    def get_queryset(self) -> QuerySet: # type: ignore 
        user = self.request.user
        rol = getattr(user, "rol", None)

        if rol == "empleado":
            return Factura.objects.filter(empleado=user).order_by('-fecha_emision')

        if rol == "admin":
            return Factura.objects.all().order_by('-fecha_emision')

        if rol == "cliente":
            return Factura.objects.filter(cliente=user).order_by('-fecha_emision')

        return Factura.objects.none()



class EnviarFacturaEmailView(APIView):
    permission_classes = [permissions.IsAuthenticated]  # Solo empleados/admins

    def post(self, request, factura_id):
        factura = get_object_or_404(Factura, id=factura_id)

        if not factura.cliente.email:
            return Response({"error": "El cliente no tiene correo registrado."}, status=status.HTTP_400_BAD_REQUEST)

        # Generar PDF
        pdf_buffer = generar_pdf_factura(factura)

        # Crear email
        email = EmailMessage(
            subject=f"Factura #{factura.id}",
            body=f"Estimado/a {factura.cliente.username},\nAdjuntamos su factura #{factura.id}.",
            from_email="tu_correo@dominio.com",
            to=[factura.cliente.email],
        )
        email.attach(f"factura_{factura.id}.pdf", pdf_buffer.read(), "application/pdf")

        try:
            email.send()
            factura.correo_enviado = True
            factura.save()
            return Response({"mensaje": "Factura enviada por email correctamente"})
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
=======
    def get_queryset(self):
        user = self.request.user

        if user.rol == "empleado":
            # Facturas que registró el empleado
            return Factura.objects.filter(empleado=user).order_by('-fecha_emision')

        elif user.rol == "administrador":
            # Todas las facturas
            return Factura.objects.all().order_by('-fecha_emision')

        elif user.rol == "cliente":
            # Solo las del cliente
            return Factura.objects.filter(cliente=user).order_by('-fecha_emision')

        return Factura.objects.none()
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
