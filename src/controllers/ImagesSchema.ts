import { schemaComposer } from 'graphql-compose';
import aws from 'aws-sdk';

export const imageSchema = `
type mutation {
    signS3(data: SignS3Input!): S3Payload!
}
input SignS3Input {
    filename: String!
    url: String!
}
type S3Payload {
  signedRequest: String!
  url: String!
}
`;

const SignS3Input = `
input SignS3Input {
  filename: String!
  filetype: String!
}
`;

type TSignS3Input = {
  filename: string;
  filetype: string;
};

export const signS3 = schemaComposer.createResolver<
  any,
  {
    data: TSignS3Input;
  }
>({
  name: 'signS3',
  kind: 'mutation',
  description: '...',
  type: `type SingS3Result { url: String! signedRequest: String }`,
  args: {
    data: SignS3Input,
  },
  async resolve({ args }) {
    const bucketName = process?.env?.AWS_BUCKET_NAME ?? '';
    const spacesEndpoint = new aws.Endpoint(process?.env?.S3_ENDPOINT);
    const s3Params = {
      Bucket: bucketName,
      Key: args?.data?.filename,
      Expires: 60 * 5,
      ContentType: args?.data?.filetype,
      ACL: 'public-read',
    };
    const s3 = new aws.S3({
      apiVersion: '2021-07-26',
      endpoint: spacesEndpoint,
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    const signedRequest = s3.getSignedUrl('putObject', s3Params);
    const url = `https://linker-files.sfo3.digitaloceanspaces.com/${args.data.filename}`;

    return {
      signedRequest,
      url,
    };
  },
});
