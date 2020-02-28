module.exports = function render() {
    with (this) {
        return _c('svg', {
            class: rtlClass,
            style: style,
            attrs: {
                'role': 'presentation',
                'focusable': 'false',
                'xmlns': 'http://www.w3.org/2000/svg',
                'width': '24',
                'height': '24',
                'viewBox': '0 0 24 24'
            }
        }, [
            _c('path', { attrs: { 'd': 'M4 5h3v13H4zm14 0h3v13h-3zM8 18h9V5H8v13zm2-11h5v9h-5V7z' } }),
            _c('path', {
                attrs: {
                    'opacity': '.3',
                    'd': 'M10 7h5v9h-5z'
                }
            })
        ]);
    }
}