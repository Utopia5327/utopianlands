const sceneElement = document.querySelector('a-scene');
// console.log(sceneElement.querySelector('#ball'));

AFRAME.registerComponent('change-color-on-hover', {
    schema: {
        color: {default: 'red'}
    },
    init: function () {
        console.log('I am ready!');

        const data = this.data;
        const el = this.el;  // <a-entity>
        const defaultColor = el.getAttribute('material').color;
        console.log(defaultColor);

        el.addEventListener('mouseenter', function () {
            el.setAttribute('color', data.color);
        });

        el.addEventListener('mouseleave', function () {
            el.setAttribute('color', defaultColor);
        });
    }
});
