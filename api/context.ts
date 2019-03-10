
export default interface Context {}

export const getContext = async (_req: Request, _res: Response): Promise<Context> => {
  return {}
}
