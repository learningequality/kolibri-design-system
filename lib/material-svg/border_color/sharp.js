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
            _c('path', { attrs: { 'd': 'M17.75 8L14 4.25l-10 10V18h3.75l10-10zm3.66-3.66L17.66.59L15 3.25L18.75 7l2.66-2.66z' } }),
            _c('path', {
                attrs: {
                    'fill-opacity': '.3',
                    'd': 'M0 20h24v4H0v-4z'
                }
            })
        ]);
    }
}