from rest_framework.routers import DefaultRouter

from .api_views import (
    MadreViewSet,
    RegistroVitalViewSet,
    ConsultaMatronaViewSet,
    PartoViewSet,
    FeedbackJefeViewSet,

    UserViewSet,
    GroupViewSet,
)

router = DefaultRouter()

# 🔹 Usuarios
router.register(r'users', UserViewSet, basename='users')

# 🔹 Grupos
router.register(r'groups', GroupViewSet, basename='groups')

# 🔹 Modelos
router.register(r'madres', MadreViewSet, basename='madres')
router.register(r'vitales', RegistroVitalViewSet, basename='vitales')
router.register(r'consultas', ConsultaMatronaViewSet, basename='consultas')
router.register(r'partos', PartoViewSet, basename='partos')
router.register(r'feedback', FeedbackJefeViewSet, basename='feedback')

urlpatterns = router.urls
