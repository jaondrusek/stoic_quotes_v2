const {Client} = require('pg');

var Quote = module.exports = {
    get_quote: function(callback) {
        const client = new Client({ 
        user: 'postgres',
        database: 'postgres',
        password: 'macey!568923',
        });
        client.connect();
        client.query('select quote from quotes where chosen = 1 limit 1;', (err, res) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Getting: ' + res.rows[0].quote);
            client.end();
            callback(res.rows[0].quote)
        });
    },
    set_new_quote: function() {
        const client = new Client({ 
            user: 'postgres',
            database: 'postgres',
            password: 'macey!568923',
        });
        client.connect();
        client.query('update quotes set chosen = 0 where chosen = 1', (err, res) => {
            if (err) {
                return console.error(err.message);
            }
            console.log('Clearing old quote');
            client.query('select id from quotes where chosen = 0 order by random() limit 1;', (err, res) => {
                if (err) {
                    console.error(err.message);
                }
                console.log('Getting new quote id');
                client.query('update quotes set chosen = 1 where id = $1', [res.rows[0].id], (err, res) => {
                    if (err) {
                        console.error(err.message);
                    }
                    console.log('Setting new quote');
                    client.end();
                });
            });
        });
    }
}