"""
WSGI config for Trendora E-commerce project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'trendora.settings')

application = get_wsgi_application()
