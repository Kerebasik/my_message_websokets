import { Scalar } from '@nestjs/graphql';

@Scalar('UploadFileScalar')
export class UploadFileScalar {
  description = 'File upload scalar type';

  parseValue(value: any): any {
    return value;
  }

  serialize(value: any): any {
    return value;
  }


  parseLiteral(ast: any): any {
    return ast.value;
  }
}
