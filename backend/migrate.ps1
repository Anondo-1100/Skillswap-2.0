# Activate virtual environment
$venvPath = "venv/Scripts/Activate.ps1"
if (Test-Path $venvPath) {
    & $venvPath
}
else {
    Write-Host "Error: Virtual environment not found at $venvPath"
    exit 1
}

# Make and apply migrations
Write-Host "Making migrations..."
python manage.py makemigrations

Write-Host "Applying migrations..."
python manage.py migrate

Write-Host "Creating default admin settings..."
python manage.py shell -c "
from authentication.models import SystemSettings
SystemSettings.objects.get_or_create(
    defaults={
        'maintenance_mode': False,
        'allow_new_registrations': True,
        'skill_approval_required': True,
        'max_skills_per_user': 10
    }
)"
