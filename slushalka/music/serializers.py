from rest_framework import serializers
from .models import Album, Albumauthors, Artist, Liked, Listened, Playlist, Playlisttrack, Track, Trackauthors, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['userid', 'username', 'login', 'description', 'regdate']
        read_only_fields = ['userid', 'regdate']

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['artistid', 'name', 'genre']

class AlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Album
        fields = ['albumid', 'title', 'duration', 'credate', 'description', 'listenings', 'genre']

class TrackSerializer(serializers.ModelSerializer):
    album = serializers.SerializerMethodField()
    artist = serializers.SerializerMethodField()

    class Meta:
        model = Track
        fields = ['trackid', 'name', 'duration', 'releasedate', 'lyrics', 'genre', 'album', 'artist']

    def get_album(self, obj):
        return obj.albumid.title if obj.albumid else None

    def get_artist(self, obj):
        from .models import Trackauthors
        return list(Trackauthors.objects.filter(trackid=obj).values_list('artistid__name', flat=True))

class PlaylistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlist
        fields = ['playlistid', 'title', 'duration', 'credate', 'description', 'listenings', 'userid']

class AlbumauthorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Albumauthors
        fields = '__all__'

class LikedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Liked
        fields = '__all__'

class ListenedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listened
        fields = '__all__'

class PlaylisttrackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playlisttrack
        fields = '__all__'

class TrackauthorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trackauthors
        fields = '__all__' 