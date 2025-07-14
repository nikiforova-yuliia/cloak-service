const ipAddresses = ['185.220.101.0', '103.216.82.0', '45.77.192.0', '91.121.168.0', '198.50.167.0'];

module.exports = {
    async up(db, client) {
        return db.collection('forbiddenIpAddresses').insertMany(ipAddresses.map((ipAddress) => ({ ip: ipAddress })));
    },

    async down(db, client) {
        return db.collection('forbiddenIpAddresses').deleteMany(ipAddresses.map((ipAddress) => ({ ip: ipAddress })));
    },
};
