const express = require('express');
const app = express();
const port = 3600;
const cors = require('cors');
const bodyParser = require('body-parser');

const connection = require('./conf');
// Support JSON-encoded bodies
app.use(cors());
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/paint/all', (req, res) => {
    // TODO récupération des données (étape 2)
    connection.query('SELECT * FROM paint', (err, results) => {
        // TODO envoyer les données récupérées (étape 3)
        if (err) {
            res.status(500).send('Erreur lors de la récupération des peintures');
        } else {
            res.json(results);
        }
    });
});

app.get('/painter/', (req, res) => {
    connection.query('SELECT * FROM painter', (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des peintres');
        } else {
            res.json(results);
        }
    });
});

app.get('/painter/lastname/:beginWith', (req, res) => {
    const beginWith = `${req.params.beginWith}%`;
    connection.query('SELECT lastname FROM painter WHERE lastname LIKE ?', [beginWith], (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des peintres');
        } else {
            res.json(results);
        }
    });
});

app.get('/paint/:hasInName', (req, res) => {
    const hasInName = `%${req.params.hasInName}%`;
    connection.query('SELECT * FROM paint WHERE name LIKE ?', [hasInName], (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des peintures');
        } else {
            res.json(results);
        }
    });
});

app.get('/paint/year/:afterYear', (req, res) => {
    const afterYear = `${req.params.afterYear}`;
    connection.query('SELECT name FROM paint WHERE creation_year > ?', [afterYear], (err, results) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des peintures');
        } else {
            res.json(results);
        }
    });
});

app.get('/painter/firstname/:orderBy', (req, res) => {
    const orderBy = `${req.params.orderBy}`;
    if (orderBy === 'descendant' ) {
        connection.query('SELECT firstname FROM painter ORDER BY firstname DESC', (err, results) => {
            if (err) {
                res.status(500).send('Erreur lors de la récupération des peintres');
            } else {
                res.json(results);
            }
        });
    } else if (orderBy === 'ascendant') {
            connection.query('SELECT firstname FROM painter ORDER BY firstname ASC', (err, results) => {
                if (err) {
                    res.status(500).send('Erreur lors de la récupération des peintres');
                } else {
                    res.json(results);
                }
            });
    }
});

app.post('/painter/new', (req, res) => {
    const formData = req.body;
    connection.query('INSERT INTO painter SET ?', [formData], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la sauvegarde d'un peintre"+newPainter);
        } else {
            res.sendStatus(200);
        }
    });
});

app.put('/paint/modiPrice/:id', (req, res) => {
    const formData = req.body;
    const idPaint = req.params.id;
    connection.query('UPDATE paint SET ? WHERE id = ?', [formData, idPaint], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la modification d'une peinture");
        } else {
            res.sendStatus(200);
        }
    });
});

app.put('/paint/forSale/:id', (req, res) => {
    const idPaint = req.params.id;
    connection.query('UPDATE paint SET for_sale = !for_sale WHERE id = ?', [idPaint], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la modification d'une peinture");
        } else {
            res.sendStatus(200);
        }
    });
});


app.delete('/painter/suppress/:id', (req, res) => {
    const idPainter = req.params.id;
    connection.query('DELETE FROM painter WHERE id = ?', [idPainter], err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la suppression du peintre");
        } else {
            res.sendStatus(200);
        }
    });
});

app.delete('/paint/removeNotForSale', (req, res) => {
    connection.query('DELETE FROM paint WHERE for_sale = 0', err => {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur lors de la suppression de la peinture");
        } else {
            res.sendStatus(200);
        }
    });
});



app.listen(port, (err) => {
    if (err) {
        throw new Error('Something bad happened...');
    }

    console.log(`Server is listening on ${port}`);
});