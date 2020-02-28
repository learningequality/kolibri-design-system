module.exports = function render() {
    with (this) {
        return _c('svg', {
            class: rtlClass,
            style: style,
            attrs: {
                'role': 'presentation',
                'focusable': 'false',
                'width': '24',
                'height': '24',
                'xmlns': 'http://www.w3.org/2000/svg',
                'viewBox': '0 0 24 24'
            }
        }, [
            _c('path', { attrs: { 'd': 'M15 1a1 1 0 0 1 0 2H4v13a1 1 0 0 1-2 0V3c0-1.1.9-2 2-2h11z' } }),
            _c('path', { attrs: { 'd': 'M8 5h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z' } })
        ]);
    }
}