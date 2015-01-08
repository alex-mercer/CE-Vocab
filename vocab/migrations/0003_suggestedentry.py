# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('vocab', '0002_auto_20150108_0227'),
    ]

    operations = [
        migrations.CreateModel(
            name='SuggestedEntry',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('contributor', models.CharField(max_length=100)),
                ('word', models.CharField(max_length=100)),
                ('definition_fa', models.TextField(blank=True)),
                ('definition_en', models.TextField(blank=True)),
                ('example', models.TextField(blank=True)),
                ('unit', models.ForeignKey(to='vocab.BookUnit')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
