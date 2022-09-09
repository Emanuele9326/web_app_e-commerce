<!DOCTYPE html>

<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Fonts -->
    <link href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">
    <!-- Styles-->
    <link href="{{ asset('.css/app.css') }}" rel="stylesheet">
</head>
<style>
    .container {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
        line-height: 1.5;
        font-size: 20px;

    }

    h1 {
        text-align: center;
        color: #877524
    }
    
    a {
        color:#877524
    }

    .btn-primary {
        background-color: #877524;
        border-color: #877524;

        --bs-btn-bg: #877524;
        --bs-btn-border-color: #877524;

        --bs-btn-hover-bg: #877524;
        --bs-btn-hover-border-color: #877524;
        --bs-btn-focus-shadow-rgb: 135, 117, 36;

        --bs-btn-active-bg: #877524;
        --bs-btn-active-border-color: #877524;

        --bs-btn-disabled-bg: #877524;
        --bs-btn-disabled-border-color: #877524;
    }
</style>

<body>
    <div class="container text-center m-auto">
        <h1 class="mt-5">L'Angolo della Bontà</h1>
        <div class="mt-5">
            <p>Hai ricevuto questa email perché abbiamo ricevuto una richiesta di reimpostazione della password per il
                tuo account.</p>
            <br>
            <div class="d-grid gap-2 col-6 mx-auto">

                <a href="{{ $url }}"><button class="btn btn-primary fs-5" type="button">Reset Password</button></a>
            </div>

            <br>
            <p class="mt-5 text-center fs-5">Questo collegamento per la reimpostazione della password scadrà tra 60
                minuti.<br>Se non hai
                richiesto la
                reimpostazione della password, non sono necessarie ulteriori azioni.</p>
            </p>
            <br>
            <p class="text-center fs-6">
                Se hai problemi a fare clic sul pulsante "Reimposta password", copia e incolla
                l'URL riportato di seguito nel tuo browser web: <a href=`$url`>{{ $url }}</a>
            </p>
        </div>

    </div>

</body>

</html>