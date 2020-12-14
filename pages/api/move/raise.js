// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  console.log('req: ', req);
  res.statusCode = 200
  res.json({ hello: 'world' })
}
