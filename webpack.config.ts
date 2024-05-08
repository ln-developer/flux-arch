module.exports = {
    module: {
        rules: [
            {
                test: /\.component.ts|html$/i,
                use: 'raw-loader',
            },
        ],
    },
};