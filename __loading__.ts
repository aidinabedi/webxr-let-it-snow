export function createLoadingScreen(app, options) {
    function showSplash() {
        // splash wrapper
        let wrapper = document.createElement('div');
        wrapper.id = 'application-splash-wrapper';
        document.body.appendChild(wrapper);

        // splash
        let splash = document.createElement('div');
        splash.id = 'application-splash';
        wrapper.appendChild(splash);
        splash.style.display = 'none';

        let logo = document.createElement('img');
        logo.src = options.ASSET_PREFIX + 'logo.png';
        splash.appendChild(logo);
        logo.onload = function () {
            splash.style.display = 'block';
        };

        let container = document.createElement('div');
        container.id = 'progress-bar-container';
        splash.appendChild(container);

        let bar = document.createElement('div');
        bar.id = 'progress-bar';
        container.appendChild(bar);

    };

    function hideSplash() {
        let splash = document.getElementById('application-splash-wrapper')!;
        splash.parentElement!.removeChild(splash);
    };

    function setProgress(value) {
        let bar = document.getElementById('progress-bar');
        if (bar) {
            value = Math.min(1, Math.max(0, value));
            bar.style.width = value * 100 + '%';
        }
    };

    function createCss() {
        let css = [
            'body {',
            '    background-color: #283538;',
            '}',

            '#application-splash-wrapper {',
            '    position: absolute;',
            '    top: 0;',
            '    left: 0;',
            '    height: 100%;',
            '    width: 100%;',
            '    background-color: #283538;',
            '}',

            '#application-splash {',
            '    position: absolute;',
            '    top: calc(50% - 28px);',
            '    width: 264px;',
            '    left: calc(50% - 132px);',
            '}',

            '#application-splash img {',
            '    width: 100%;',
            '}',

            '#progress-bar-container {',
            '    margin: 20px auto 0 auto;',
            '    height: 2px;',
            '    width: 100%;',
            '    background-color: #1d292c;',
            '}',

            '#progress-bar {',
            '    width: 0%;',
            '    height: 100%;',
            '    background-color: #f60;',
            '}',
            '@media (max-width: 480px) {',
            '    #application-splash {',
            '        width: 170px;',
            '        left: calc(50% - 85px);',
            '    }',
            '}'

        ].join('\n');

        let style = document.createElement('style');
        style.type = 'text/css';
        if ((style as any).styleSheet) {
            (style as any).styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        document.head.appendChild(style);
    };


    createCss();

    showSplash();

    app.on('preload:end', function () {
        app.off('preload:progress');
    });
    app.on('preload:progress', setProgress);
    app.on('start', hideSplash);
}
