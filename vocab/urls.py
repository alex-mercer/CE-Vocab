from django.conf.urls import patterns, url

from vocab import views

urlpatterns = patterns('',
                       url(r'^$', views.index, name='index'),
                       url(r'^cache.manifest$', views.cache, name='cache'),
                       url(r'^about$', views.about, name='about_us'),
                       url(r'^contribute$', views.contribute, name='contribute'),
)