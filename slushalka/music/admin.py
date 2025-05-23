from django.contrib import admin
from .models import Track, Album, Artist, Playlist, Albumauthors, Trackauthors, Playlisttrack, Liked, Listened

# Register your models here.
admin.site.register(Track)
admin.site.register(Album)
admin.site.register(Artist)
admin.site.register(Playlist)
admin.site.register(Albumauthors)
admin.site.register(Trackauthors)
admin.site.register(Playlisttrack)
admin.site.register(Liked)
admin.site.register(Listened)
