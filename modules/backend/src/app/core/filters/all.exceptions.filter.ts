import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger(AllExceptionsFilter.name)

  constructor(private enableDebugRes: boolean = false) {}

  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const transactionId = ctx.getRequest()['transactionId']

    // default to 500 Internal Server Error if HttpException.statusCode !exists
    const statusCode =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    const error = {
      name: exception.name,
      statusCode
    }

    // 4xx Status Codes
    if (statusCode >= 400 && statusCode < 500) {
      this.logger.warn(`[${transactionId}] ${exception.name}: ${exception.message}`)
      error['message'] = exception.message
    }
    // 5xx Status Codes
    else {
      this.logger.error(`[${transactionId}] ${exception.stack}`)
      if (this.enableDebugRes) {
        error['message'] = exception.message
        error['stack'] = exception.stack?.split('\n')
      }
    }

    ctx.getResponse().status(statusCode).json(error)
  }
}
