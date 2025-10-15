from django.contrib import admin

from .models import (
    Madre,
    RegistroVital,
    ConsultaMatrona,
    Parto,
    FeedbackJefe
)

admin.site.register(Madre)
admin.site.register(RegistroVital)
admin.site.register(ConsultaMatrona)
admin.site.register(Parto)
admin.site.register(FeedbackJefe)

# 🔹 Personalización opcional del título del panel
admin.site.site_header = "Administración del Sistema Hospitalario"
admin.site.site_title = "Panel de Administración"
admin.site.index_title = "Gestión de Usuarios y Registros"
