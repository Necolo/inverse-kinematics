import { vec3 } from 'gl-matrix';

const DEFAULT_COLOR = vec3.fromValues(1, 1, 1);

export = function (regl) {
    const drawLine = regl({
        vert: `
        precision mediump float;
        attribute float p;
        uniform vec3 p0, p1;
        uniform mat4 projection, view;
        void main () {
            gl_Position = projection * view * vec4(mix(p0, p1, p), 1);
        }
        `,
        frag: `
        precision mediump float;
        uniform lowp vec3 color;
        void main () {
            gl_FragColor = vec4(color, 1);
        }
        `,

        attributes: {
            p: [0, 1],
        },

        uniforms: {
            color: regl.prop('color'),
            p0: regl.prop('line[0]'),
            p1: regl.prop('line[1]'),
        },

        count: 2,
        primitive: 'lines',
        offset: 0,
    });

    return function (line:vec3[], color?:vec3) {
        drawLine({
            line,
            color: color || DEFAULT_COLOR,
        });
    };
};

