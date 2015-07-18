module.exports = function(app) {

  // 404s
  app.use(function(req, res, next) {
    res.status(404);
    if (req.accepts('html')) {
      res.render('404.jade');
      return;
    }
    if (req.accepts('json')) {
      return res.json({
        error: 'Not found'
      });
    }
    // default response type
    res.type('txt');
    res.send("Hmmm, couldn't find that page.");
  })

  // 500
  app.use(function(err, req, res, next) {
    console.error('error at %s\n', req.url, err.stack);
    if (req.accepts('html')) {
      res.render('500.jade');
      return;
    }
    res.send(500, "Oops, we made a bit of a boo boo.");
  })
}