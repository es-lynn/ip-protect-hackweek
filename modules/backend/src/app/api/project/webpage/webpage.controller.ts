import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'

import { AuthorizationService } from '../../../core/authorization/authorization.service'
import { AuthUser } from '../../../core/guards/decorators/AuthUser'
import { UseAuthGuard } from '../../../core/guards/decorators/UseAuthGuard'
import { PrismaService } from '../../../core/prisma/prisma.service'
import {
  WebpageAddBody,
  WebpageAddParam,
  WebpageAddRes,
  WebpageDeleteParam,
  WebpageDeleteRes,
  WebpageEditBody,
  WebpageEditParam,
  WebpageEditRes,
  WebpageListParam,
  WebpageListRes
} from './webpage.dto'

@UseAuthGuard()
@ApiTags('/project/:projectFriendlyId/webpage')
@Controller('/project/:projectFriendlyId/webpage')
export class WebpageController {
  constructor(private prisma: PrismaService, private authorization: AuthorizationService) {}

  @HttpCode(200)
  @Get('/list')
  async list(@AuthUser() user: User, @Param() param: WebpageListParam): Promise<WebpageListRes> {
    await this.authorization.assertUserBelongsProject(user, param.projectFriendlyId)

    const project = await this.prisma.project.findUniqueOrThrow({
      where: { friendlyId: param.projectFriendlyId }
    })
    const webpages = await this.prisma.webpage.findMany({
      where: {
        projectId: project.id
      }
    })

    return {
      webpages: webpages.map(it => ({
        id: it.id,
        name: it.name,
        url: it.url
      }))
    }
  }

  @HttpCode(200)
  @Post('/add')
  async add(
    @AuthUser() user: User,
    @Param() param: WebpageAddParam,
    @Body() body: WebpageAddBody
  ): Promise<WebpageAddRes> {
    await this.authorization.assertUserIsProjectAdmin(user, param.projectFriendlyId)

    const project = await this.prisma.project.findUniqueOrThrow({
      where: { friendlyId: param.projectFriendlyId }
    })
    const webpage = await this.prisma.webpage.create({
      data: {
        url: body.url,
        name: body.name,
        projectId: project.id
      }
    })

    return {
      webpage: {
        id: webpage.id,
        name: webpage.name,
        url: webpage.url
      }
    }
  }

  @HttpCode(200)
  @Post('/:webpageId/edit')
  async edit(
    @AuthUser() user: User,
    @Param() param: WebpageEditParam,
    @Body() body: WebpageEditBody
  ): Promise<WebpageEditRes> {
    await this.authorization.assertUserIsProjectAdmin(user, param.projectFriendlyId)

    const webpage = await this.prisma.webpage.update({
      where: { id: param.webpageId },
      data: {
        name: body.name,
        url: body.url
      }
    })
    return {
      webpage: {
        id: webpage.id,
        name: webpage.name,
        url: webpage.url
      }
    }
  }

  @HttpCode(200)
  @Post('/:webpageId/delete')
  async delete(
    @AuthUser() user: User,
    @Param() param: WebpageDeleteParam
  ): Promise<WebpageDeleteRes> {
    await this.authorization.assertUserIsProjectAdmin(user, param.projectFriendlyId)

    await this.prisma.webpage.deleteMany({
      where: {
        id: param.webpageId,
        project: { friendlyId: param.projectFriendlyId }
      }
    })
    return {}
  }
}
