from django.db import models

class Album(models.Model):
    albumid = models.AutoField(db_column='AlbumID', primary_key=True)
    title = models.CharField(unique=True, max_length=50)
    duration = models.TimeField()
    credate = models.DateField(db_column='creDate')
    description = models.CharField(max_length=255, blank=True, null=True)
    listenings = models.IntegerField()
    genre = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'album'

class Albumauthors(models.Model):
    albumid = models.ForeignKey(Album, models.DO_NOTHING, db_column='AlbumID')
    artistid = models.ForeignKey('Artist', models.DO_NOTHING, db_column='ArtistID')

    class Meta:
        managed = False
        db_table = 'albumauthors'
        unique_together = (('albumid', 'artistid'),)

class Artist(models.Model):
    artistid = models.AutoField(db_column='ArtistID', primary_key=True)
    name = models.CharField(unique=True, max_length=30)
    genre = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'artist'

class Liked(models.Model):
    userid = models.ForeignKey('User', models.DO_NOTHING, db_column='UserID')
    trackid = models.ForeignKey('Track', models.DO_NOTHING, db_column='TrackID')

    class Meta:
        managed = False
        db_table = 'liked'
        unique_together = (('userid', 'trackid'),)

class Listened(models.Model):
    userid = models.ForeignKey('User', models.DO_NOTHING, db_column='UserID')
    trackid = models.ForeignKey('Track', models.DO_NOTHING, db_column='TrackID')

    class Meta:
        managed = False
        db_table = 'listened'
        unique_together = (('userid', 'trackid'),)

class Playlist(models.Model):
    playlistid = models.AutoField(db_column='PlaylistID', primary_key=True)
    title = models.CharField(unique=True, max_length=50)
    duration = models.TimeField()
    credate = models.DateField(db_column='creDate')
    description = models.CharField(max_length=255, blank=True, null=True)
    listenings = models.IntegerField()
    userid = models.ForeignKey('User', models.DO_NOTHING, db_column='UserID')

    class Meta:
        managed = False
        db_table = 'playlist'

class Playlisttrack(models.Model):
    playlistid = models.ForeignKey(Playlist, models.DO_NOTHING, db_column='PlaylistID')
    trackid = models.ForeignKey('Track', models.DO_NOTHING, db_column='TrackID')

    class Meta:
        managed = False
        db_table = 'playlisttrack'
        unique_together = (('playlistid', 'trackid'),)

class Track(models.Model):
    trackid = models.AutoField(db_column='TrackID', primary_key=True)
    name = models.CharField(unique=True, max_length=50)
    duration = models.TimeField()
    releasedate = models.DateField(db_column='releaseDate')
    lyrics = models.TextField(blank=True, null=True)
    genre = models.CharField(max_length=20, blank=True, null=True)
    albumid = models.ForeignKey(Album, models.DO_NOTHING, db_column='AlbumID', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'track'

class Trackauthors(models.Model):
    trackid = models.ForeignKey(Track, models.DO_NOTHING, db_column='TrackID')
    artistid = models.ForeignKey(Artist, models.DO_NOTHING, db_column='ArtistID')

    class Meta:
        managed = False
        db_table = 'trackauthors'
        unique_together = (('trackid', 'artistid'),)

class User(models.Model):
    userid = models.AutoField(db_column='UserID', primary_key=True)
    username = models.CharField(unique=True, max_length=30)
    login = models.CharField(unique=True, max_length=20)
    password = models.CharField(max_length=20)
    description = models.CharField(max_length=255, blank=True, null=True)
    regdate = models.DateField(db_column='regDate')

    class Meta:
        managed = False
        db_table = 'user' 