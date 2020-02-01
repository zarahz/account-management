module.exports = {
    parser: "babel-eslint",
    extends: [
        'standard',
        "plugin:react/recommended",
        "plugin:flowtype/recommended"
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        fetch: false,
        localStorage: true
    },
    plugins: [
        'react',
        'flowtype'
    ],
    rules: {
        semi: [
            2,
            'always'
        ],
        "quote-props": [
            2,
            'as-needed',
            {
                "numbers": true
            }
        ]
    },
    "env": {
        "jest": true
    }
};