from rest_framework import serializers
from .models import Pedido, DetallePedido
<<<<<<< HEAD
from inventario.serializer import MedicamentoSerializer

class DetallePedidoSerializer(serializers.ModelSerializer):
    medicamento = MedicamentoSerializer(read_only=True)
    medicamento_id = serializers.PrimaryKeyRelatedField(
        queryset=MedicamentoSerializer.Meta.model.objects.all(),
=======
from inventario.models import Medicamento
from facturacion.models import Factura
from decimal import Decimal

class DetallePedidoSerializer(serializers.ModelSerializer):
    medicamento = serializers.StringRelatedField(read_only=True)
    medicamento_id = serializers.PrimaryKeyRelatedField(
        queryset=Medicamento.objects.all(),
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
        source="medicamento",
        write_only=True
    )

    class Meta:
        model = DetallePedido
        fields = ["id", "medicamento", "medicamento_id", "cantidad", "subtotal"]

class PedidoSerializer(serializers.ModelSerializer):
    detalles = DetallePedidoSerializer(many=True, read_only=True)
    detalles_data = DetallePedidoSerializer(many=True, write_only=True, required=False)

    class Meta:
        model = Pedido
<<<<<<< HEAD
        fields = ["id", "cliente", "fecha_creacion", "estado", "total", "detalles", "detalles_data"]
=======
        fields = ["id", "cliente", "fecha_creacion", "estado", "total", "detalles", "detalles_data", "factura"]
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a

    def create(self, validated_data):
        detalles_data = validated_data.pop("detalles_data", [])
        pedido = Pedido.objects.create(**validated_data)
<<<<<<< HEAD
        total = 0
=======
        total = Decimal("0.00")
>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a

        for detalle_data in detalles_data:
            medicamento = detalle_data["medicamento"]
            cantidad = detalle_data["cantidad"]
            subtotal = medicamento.precio_venta * cantidad
            DetallePedido.objects.create(
                pedido=pedido, medicamento=medicamento, cantidad=cantidad, subtotal=subtotal
            )
            total += subtotal

        pedido.total = total
        pedido.save()
<<<<<<< HEAD
=======

        factura = Factura.objects.create(
            cliente=pedido.cliente,
            empleado=None,
            total=pedido.total,
            metodo_pago="pendiente",
            observaciones="Generada automáticamente desde el pedido."
        )
        pedido.factura = factura
        pedido.save()

>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
        return pedido

    def update(self, instance, validated_data):
        detalles_data = validated_data.pop("detalles_data", [])
        instance.estado = validated_data.get("estado", instance.estado)
        instance.save()

        if detalles_data:
            instance.detalles.all().delete()
<<<<<<< HEAD
            total = 0
=======
            total = Decimal("0.00")

>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
            for detalle_data in detalles_data:
                medicamento = detalle_data["medicamento"]
                cantidad = detalle_data["cantidad"]
                subtotal = medicamento.precio_venta * cantidad
                DetallePedido.objects.create(
                    pedido=instance, medicamento=medicamento, cantidad=cantidad, subtotal=subtotal
                )
                total += subtotal
<<<<<<< HEAD
=======

>>>>>>> 447bebc4543953f91b364b1d02bdfff52c66246a
            instance.total = total
            instance.save()

        return instance
