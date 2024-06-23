const notesRoutes = require('./notes');

const appRouter = (app, fs) => {
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
    });

    notesRoutes(app, fs);

};

module.exports = appRouter;
