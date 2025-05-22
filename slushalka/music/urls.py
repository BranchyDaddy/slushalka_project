from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import RegisterView, ProfileView, CustomAuthToken

router = DefaultRouter()
router.register(r'albums', views.AlbumViewSet)
router.register(r'artists', views.ArtistViewSet)
router.register(r'tracks', views.TrackViewSet)
router.register(r'playlists', views.PlaylistViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', CustomAuthToken.as_view(), name='login'),
    path('users/profile/', ProfileView.as_view(), name='profile'),
    path('', include(router.urls)),
] 