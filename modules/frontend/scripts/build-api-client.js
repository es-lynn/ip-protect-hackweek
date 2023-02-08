const { generateApi } = require('swagger-typescript-api')
const path = require('path')

generateApi({
  url: 'http://localhost:4000/swagger/docs-json',
  output: path.resolve(process.cwd(), './lib/api'),
  name: 'Api',
  primitiveTypeConstructs: struct => ({
    string: {
      'date-time': 'Date'
    }
  }),
  httpClientType: 'axios'
})
