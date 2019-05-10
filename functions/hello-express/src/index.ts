import { Request, Response } from 'express'

export function main(req: Request, res: Response) {
  res.status(200)
  res.send(`Hello ${req.path}`)
}
