const packageJson = require('./package.json');

const baseConfig = {
    input: 'src/index.ts',
    external: [
        ...Object.keys(packageJson.dependencies || {}),
        ...Object.keys(packageJson.peerDependencies || {}),
        'react',
        /^lodash\/.*/,
        /^@flowbite-react\/.*/,
        /^dayjs\/.*/,
    ],
};

module.exports = baseConfig;
