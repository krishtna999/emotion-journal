# Generated by Django 2.2.6 on 2019-10-08 08:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tag', '0002_auto_20191008_0845'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='segmenttag',
            name='unique tag per event',
        ),
        migrations.AddConstraint(
            model_name='segmenttag',
            constraint=models.UniqueConstraint(fields=('name', 'segment'), name='unique tag per segment'),
        ),
    ]
