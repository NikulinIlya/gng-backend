<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://use.typekit.net/ajv5xzd.css">
    <title>Grapes & Grains</title>
</head>

<body>
    <div id="root"></div>
    <script src="{{ asset('build/bundles/main.bundle.js') }}"></script>
    <script src="{{ asset('build/chunks/vendors~main.chunk.js') }}"></script>
</body>
</body>

</html>