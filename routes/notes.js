const path = require('path');

const notesRoutes = (app, fs) => {
    const dataPath = path.join(__dirname ,'../','notes.json');
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }
            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {
        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }
            callback();
        });
    };

    app.get('/note', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    app.post('/note', (req, res) => {

        readFile(data => {
            const newUserId = Date.now().toString();

            data[newUserId.toString()] = {...req.body,id:newUserId};
            
            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new note added');
            });
        }, true);
    });

    app.put('/note/:id', (req, res) => {
        readFile(data => {
            const noteId = req.params["id"];

            data[noteId] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`note id:${noteId} updated`);
            });
        }, true);
    });

    app.delete('/note/:id', (req, res) => {
        readFile(data => {
            const noteId = req.params["id"];

            delete data[noteId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`notes id:${noteId} removed`);
            });
        }, true);
    });
};

module.exports = notesRoutes;
