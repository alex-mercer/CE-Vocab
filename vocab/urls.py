from django.conf.urls import patterns, include, url

from vocab import views

urlpatterns = patterns('',
                       url(r'^$', views.index, name='index'),
                       url(r'^cache.manifest$', views.cache, name='cache'),
                       url(r'^contribute$', views.contribute, name='contribute'),
)