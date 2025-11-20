from rest_framework import serializers
from .models import Pedido, DetallePedido
from inventario.models import Medicamento
from facturacion.models import Factura
from decimal import Decimal

class DetallePedidoSerializer(serializers.ModelSerializer):
    medicamento = serializers.StringRelatedField(read_only=True)
    medicamento_id = serializers.PrimaryKeyRelatedField(
        queryset=Medicamento.objects.all(),
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
        fields = ["id", "cliente", "fecha_creacion", "estado", "total", "detalles", "detalles_data", "factura"]

    def create(self, validated_data):
        detalles_data = validated_data.pop("detalles_data", [])
        pedido = Pedido.objects.create(**validated_data)
        total = Decimal("0.00")

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

        factura = Factura.objects.create(
            cliente=pedido.cliente,
            empleado=None,
            total=pedido.total,
            metodo_pago="pendiente",
            observaciones="Generada automáticamente desde el pedido."
        )
        pedido.factura = factura
        pedido.save()

        return pedido

    def update(self, instance, validated_data):
        detalles_data = validated_data.pop("detalles_data", [])
        instance.estado = validated_data.get("estado", instance.estado)
        instance.save()

        if detalles_data:
            instance.detalles.all().delete()
            total = Decimal("0.00")

            for detalle_data in detalles_data:
                medicamento = detalle_data["medicamento"]
                cantidad = detalle_data["cantidad"]
                subtotal = medicamento.precio_venta * cantidad
                DetallePedido.objects.create(
                    pedido=instance, medicamento=medicamento, cantidad=cantidad, subtotal=subtotal
                )
                total += subtotal

            instance.total = total
            instance.save()

        return instance
