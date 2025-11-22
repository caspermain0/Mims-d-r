from django.db import models
<<<<<<< HEAD
from usuarios.models import Usuario
from inventario.models import Medicamento
=======
from decimal import Decimal
from inventario.models import Medicamento
from usuarios.models import Usuario
from facturacion.models import Factura
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a

class Pedido(models.Model):
    ESTADOS = [
        ("pendiente", "Pendiente"),
        ("procesado", "Procesado"),
        ("entregado", "Entregado"),
        ("cancelado", "Cancelado"),
    ]
<<<<<<< HEAD

    cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="pedidos")
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=20, choices=ESTADOS, default="pendiente")
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
=======
    id = models.AutoField(primary_key=True)
    cliente = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="pedidos")
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=20, choices=ESTADOS, default="pendiente")
    total = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal("0.00"))
    factura = models.OneToOneField(Factura, on_delete=models.SET_NULL, null=True, blank=True, related_name="pedido")
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a

    def __str__(self):
        return f"Pedido #{self.id} - {self.cliente.username}"

<<<<<<< HEAD

=======
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
class DetallePedido(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name="detalles")
    medicamento = models.ForeignKey(Medicamento, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=1)
<<<<<<< HEAD
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def save(self, *args, **kwargs):
        # Calcular subtotal automático
=======
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal("0.00"))

    def save(self, *args, **kwargs):
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
        if self.medicamento:
            self.subtotal = self.medicamento.precio_venta * self.cantidad
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.medicamento.nombre} x {self.cantidad}"
