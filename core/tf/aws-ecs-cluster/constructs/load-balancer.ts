import { Construct } from 'constructs';
import { alb, albListener } from '../.gen/providers/aws';

export type TALBConstructConfig = {
  albName: string;
  subnetIds: string[];
  securityGroupIds: string[];
  certArn: string;
};

export class ALBConstruct extends Construct {
  awsAlb: alb.Alb;
  awsAlbListener: albListener.AlbListener;
  constructor(scope: Construct, name: string, config: TALBConstructConfig) {
    super(scope, name);
    this.awsAlb = new alb.Alb(this, 'public-alb', {
      name: config.albName,
      subnets: config.subnetIds,
      securityGroups: config.securityGroupIds,
    });
    this.awsAlbListener = new albListener.AlbListener(this, 'https-listener', {
      loadBalancerArn: this.awsAlb.arn,
      port: 443,
      protocol: 'HTTPS',
      sslPolicy: 'ELBSecurityPolicy-2016-08',
      certificateArn: config.certArn,
      defaultAction: [
        {
          type: 'fixed-response',
          fixedResponse: {
            contentType: 'text/plain',
            messageBody: 'Forbidden access',
            statusCode: '403',
          },
        },
      ],
    });
  }
}
