from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fullname', models.CharField(max_length=255, unique=True)),
                ('phone', models.CharField(max_length=255, null=True)),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('address', models.CharField(max_length=255, null=True)),
            ],
            options={
                'db_table': 'user',
            },
        ),
    ]
