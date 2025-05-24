from django.contrib import admin
from .models import Track, Album, Artist, Playlist, Albumauthors, Trackauthors, Playlisttrack, Liked, Listened
from .utils import handle_uploaded_image

# Register your models here.
@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = ('albumid', 'title', 'cover')
    search_fields = ('title',)

    def save_model(self, request, obj, form, change):
        if 'cover' in request.FILES:
            obj.cover = handle_uploaded_image(request.FILES['cover'], 'album', obj.albumid)
        super().save_model(request, obj, form, change)

@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ('artistid', 'name', 'photo')
    search_fields = ('name',)

    def save_model(self, request, obj, form, change):
        if 'photo' in request.FILES:
            obj.photo = handle_uploaded_image(request.FILES['photo'], 'artist', obj.artistid)
        super().save_model(request, obj, form, change)

@admin.register(Track)
class TrackAdmin(admin.ModelAdmin):
    list_display = ('trackid', 'name', 'cover', 'audio_file')
    search_fields = ('name',)

    def save_model(self, request, obj, form, change):
        if 'cover' in request.FILES:
            obj.cover = handle_uploaded_image(request.FILES['cover'], 'track', obj.trackid)
        super().save_model(request, obj, form, change)

admin.site.register(Playlist)
admin.site.register(Albumauthors)
admin.site.register(Trackauthors)
admin.site.register(Playlisttrack)
admin.site.register(Liked)
admin.site.register(Listened)
