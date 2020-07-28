## GNG portal

### Установка

1. Клонировать проект.
2. Перейти в приложение папки с помощью cd.
3. Запустить

        composer install
4. Скопировать .env.example файл в .env в корневую папку.
5. Запустить

        php artisan key:generate
6. Создать базу данных, внести ее параметры в .env.
7. Запустить

        php artisan voyager:install
8. Импортировать базу данных в текущую.
9. При необходимости создать нового пользователя с правами админа:
        
        php artisan voyager:admin your@email.com --create.
10. Запустить команды для настройки поиска:

        php artisan scout:flush "App\Models\Product"
        
        php artisan scout:import "App\Models\Product"

### Документация по зависимостям

- https://laravel.com/docs/
- https://docs.laravelvoyager.com/


### License
