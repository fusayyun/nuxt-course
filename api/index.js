const express = require('express')

const app = express()
app.use(express.json())
const router = express.Router()

// app.use(express.urlencoded({extended: true}));
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.post('/track-data', (req, res) => {
  console.log('Stored data!', req.body.data)
  res.status(200).json({ message: 'Success!' })
})

module.exports = {
  path: '/api',
  handler: router
}
