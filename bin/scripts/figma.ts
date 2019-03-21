import User from 'api/models/User'

const sampleFileId = 'csbBygV7MiBbA1k1PjXVBtrq'
const sampleTeamId = '690379723079036612'

export default async function() {
  const user: User = (await User.createQueryBuilder()
    .where('"User"."figmaAccessToken" IS NOT NULL')
    .getOne()) as User

  console.log(await user.figma.components(sampleTeamId))
  console.log(await user.figma.file(sampleFileId))
}
