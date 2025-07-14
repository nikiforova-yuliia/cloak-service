require('dotenv').config();

const config = {
    mongodb: {
        url: process.env.DB_URI,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    migrationsDir: 'migrations',
    changelogCollectionName: 'changelog',
    migrationFileExtension: '.js',
    useFileHash: false,
    lockCollectionName: 'changelog_lock',
    lockTtl: 0,
    moduleSystem: 'commonjs',
};

module.exports = config;
