from django.shortcuts import render
from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from .models import Album, Albumauthors, Artist, Liked, Listened, Playlist, Playlisttrack, Track, Trackauthors, User
from .serializers import (
    AlbumSerializer, AlbumauthorsSerializer, ArtistSerializer, LikedSerializer, ListenedSerializer,
    PlaylistSerializer, PlaylisttrackSerializer, TrackSerializer, TrackauthorsSerializer, UserSerializer
)
from django.contrib.auth.models import User as DjangoUser
from rest_framework.serializers import ModelSerializer, CharField, EmailField
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken

# Create your views here.

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class AlbumauthorsViewSet(viewsets.ModelViewSet):
    queryset = Albumauthors.objects.all()
    serializer_class = AlbumauthorsSerializer

class ArtistViewSet(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class LikedViewSet(viewsets.ModelViewSet):
    queryset = Liked.objects.all()
    serializer_class = LikedSerializer

class ListenedViewSet(viewsets.ModelViewSet):
    queryset = Listened.objects.all()
    serializer_class = ListenedSerializer

class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Playlist.objects.filter(userid=self.request.user)

class PlaylisttrackViewSet(viewsets.ModelViewSet):
    queryset = Playlisttrack.objects.all()
    serializer_class = PlaylisttrackSerializer

class TrackViewSet(viewsets.ModelViewSet):
    queryset = Track.objects.all()
    serializer_class = TrackSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class TrackauthorsViewSet(viewsets.ModelViewSet):
    queryset = Trackauthors.objects.all()
    serializer_class = TrackauthorsSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class RegisterSerializer(ModelSerializer):
    password = CharField(write_only=True)
    email = EmailField(required=True)

    class Meta:
        model = DjangoUser
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = DjangoUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class RegisterView(generics.CreateAPIView):
    queryset = DjangoUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer)
        token, created = Token.objects.get_or_create(user=user)
        headers = self.get_success_headers(serializer.data)
        return Response({'user': serializer.data, 'token': token.key}, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        return serializer.save()

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        return Response({
            'username': user.username,
            'email': user.email,
        })

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        user = token.user
        return Response({
            'token': token.key,
            'user': {
                'username': user.username,
                'email': user.email,
            }
        })
