const countries = ['Russia', 'Iran', 'China', 'India'];

module.exports = {
    async up(db, client) {
        return db.collection('unauthorizedCountries').insertMany(countries.map((country) => ({ name: country })));
    },

    async down(db, client) {
        return db.collection('unauthorizedCountries').deleteMany(countries.map((country) => ({ name: country })));
    },
};
