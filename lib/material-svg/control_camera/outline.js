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
            _c('path', { attrs: { 'd': 'M5.54 8.46L2 12l3.54 3.54l1.76-1.77L5.54 12l1.76-1.77zm6.46 10l-1.77-1.76l-1.77 1.76L12 22l3.54-3.54l-1.77-1.76zm6.46-10l-1.76 1.77L18.46 12l-1.76 1.77l1.76 1.77L22 12zm-10-2.92l1.77 1.76L12 5.54l1.77 1.76l1.77-1.76L12 2z' } }),
            _c('circle', {
                attrs: {
                    'cx': '12',
                    'cy': '12',
                    'r': '3'
                }
            })
        ]);
    }
}