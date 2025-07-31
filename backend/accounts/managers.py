"""
Custom User Manager for Trendora E-commerce platform.
"""

from django.contrib.auth.models import BaseUserManager
from django.utils import timezone


class UserManager(BaseUserManager):
    """
    Custom user manager where email is the unique identifier
    for authentication instead of usernames.
    """
    
    def create_user(self, email, password=None, **extra_fields):
        """
        Create and save a regular User with the given email and password.
        """
        if not email:
            raise ValueError('The Email field must be set')
        
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_verified', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        
        return self.create_user(email, password, **extra_fields)
    
    def create_staff_user(self, email, password=None, **extra_fields):
        """
        Create and save a Staff User with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_verified', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Staff user must have is_staff=True.')
        
        return self.create_user(email, password, **extra_fields)
    
    def get_by_natural_key(self, email):
        """
        Allow authentication using email (case insensitive).
        """
        return self.get(email__iexact=email)
    
    def active_users(self):
        """
        Return only active users.
        """
        return self.filter(is_active=True)
    
    def verified_users(self):
        """
        Return only verified users.
        """
        return self.filter(is_verified=True)
    
    def staff_users(self):
        """
        Return only staff users.
        """
        return self.filter(is_staff=True)
    
    def recent_users(self, days=30):
        """
        Return users who joined within the specified number of days.
        """
        from datetime import timedelta
        cutoff_date = timezone.now() - timedelta(days=days)
        return self.filter(date_joined__gte=cutoff_date)
    
    def users_with_orders(self):
        """
        Return users who have placed at least one order.
        """
        return self.filter(orders__isnull=False).distinct()
    
    def users_by_location(self, location):
        """
        Return users by location (from their profile).
        """
        return self.filter(profile__location__icontains=location)
