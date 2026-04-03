import jwt from 'jsonwebtoken'

const requireAuth = (req, res, next) => {
  const auth = req.get('authorization')
  let token = ''

  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    token = auth.substring(7)
  }

  let decodedToken = {}
  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
  } catch (error) {
    return res.status(401).json({ error: 'token invalid or missing' })
  }

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid or missing' })
  }

  req.userId = decodedToken.id
  next()
}

export default requireAuth
