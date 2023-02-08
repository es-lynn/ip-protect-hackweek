import { Format } from '../../../commons/utils/Format'
import { ProjectType } from '../../core/model/models/project.type'
import { Project3734 } from './project.dto'

export function mapProjectToRes(project: ProjectType): Project3734 {
  return {
    id: project.id,
    friendlyId: project.friendlyId,
    awsAccessKey: project.awsAccessKey,
    awsSecret: Format.mask(project.awsSecret),
    ipType: project.ipType,
    ipset: {
      id: project.config.ipset.id,
      name: project.config.ipset.name,
      region: project.config.ipset.region
    },
    ipsetV6: {
      id: project.config.ipsetV6.id,
      name: project.config.ipsetV6.name,
      region: project.config.ipsetV6.region
    }
  }
}
