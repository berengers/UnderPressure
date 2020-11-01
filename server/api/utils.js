function logged(fn) {
  return (req, res, next) => {
    if (!req.user) {
      res.sendStatus(401)
    } else {
      fn(req, res, next)
    }
  }
}

module.exports = {
  logged
}
