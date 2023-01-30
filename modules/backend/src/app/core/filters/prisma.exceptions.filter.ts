import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionsFilter implements ExceptionFilter {
  private logger = new Logger(PrismaExceptionsFilter.name)

  constructor(private enableDebugRes: boolean = false) {}

  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const transactionId = ctx.getRequest()['transactionId']

    const error: {
      name: string
      message?: string
      statusCode: number
    } = {
      // eslint-disable-next-line no-secrets/no-secrets
      name: `PrismaClientKnownRequestError_${exception.code}`,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    }
    if (this.enableDebugRes) {
      switch (exception.code) {
        case 'P2002':
          error.message = `Unique constraint failed on (${exception.meta?.target})`
          break
        case 'P2025':
          error.message = exception.meta?.cause as string
          break
        default:
          error.message = exception.code
      }
      error['stack'] = exception.stack?.split('\n')
    }

    this.logger.error(`[${transactionId}] ${exception.stack}`)
    ctx.getResponse().status(error.statusCode).json(error)
  }
}
