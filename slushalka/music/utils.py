import os
from django.conf import settings

def handle_uploaded_image(image, model_name, instance_id):
    """
    Обрабатывает загруженное изображение и сохраняет его в соответствующую директорию
    """
    if not image:
        return None
        
    # Определяем директорию для сохранения
    if model_name == 'album':
        upload_dir = 'album_covers'
    elif model_name == 'artist':
        upload_dir = 'artist_photos'
    elif model_name == 'track':
        upload_dir = 'track_covers'
    else:
        return None

    # Создаем директорию, если её нет
    full_path = os.path.join(settings.MEDIA_ROOT, upload_dir)
    os.makedirs(full_path, exist_ok=True)

    # Формируем имя файла
    ext = os.path.splitext(image.name)[1]
    filename = f"{model_name}_{instance_id}{ext}"
    
    # Сохраняем файл
    filepath = os.path.join(full_path, filename)
    with open(filepath, 'wb+') as destination:
        for chunk in image.chunks():
            destination.write(chunk)
            
    # Возвращаем относительный путь для сохранения в БД
    return os.path.join(upload_dir, filename) 