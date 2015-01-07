# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('vocab', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='entry',
            old_name='defintion_en',
            new_name='definition_en',
        ),
        migrations.RenameField(
            model_name='entry',
            old_name='defintion_fa',
            new_name='definition_fa',
        ),
    ]
