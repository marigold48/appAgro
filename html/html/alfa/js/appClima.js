requirejs.config({
    baseUrl: 'lib/libClima',
    paths: {
        app: 'Clima'
    }
});

requirejs(['app/main']);
