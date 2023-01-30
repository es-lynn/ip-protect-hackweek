import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'

import { generateTransactionId } from '../../../commons/utils/HttpUtils'

@Injectable()
export class HttpLogMiddleware implements NestMiddleware {
  private reqLogger = new Logger('-->')
  private resLogger = new Logger('<--')
  use(req: Request, res: Response, next: Function) {
    const transactionId = generateTransactionId()
    req['transactionId'] = transactionId

    this.reqLogger.log(`[${transactionId}] ${req.method} ${req.originalUrl}`)

    res.on('finish', () => {
      if (res.statusCode >= 400 && res.statusCode < 500) {
        this.resLogger.warn(`[${transactionId}] ${res.statusCode}`)
      } else if (res.statusCode >= 500 && res.statusCode < 600) {
        this.resLogger.error(`[${transactionId}] ${res.statusCode}`)
      } else {
        this.resLogger.log(`[${transactionId}] ${res.statusCode}`)
      }
    })
    next()
  }
}
