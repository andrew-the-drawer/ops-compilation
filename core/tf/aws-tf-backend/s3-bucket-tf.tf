resource "aws_s3_bucket" "tf_state" {
  bucket = local.s3_bucket
  force_destroy = true
}

resource "aws_s3_bucket_policy" "tf_state_access" {
  bucket = aws_s3_bucket.tf_state.id
  policy = <<EOF
{
  "Version":"2012-10-17",
  "Statement":[
    {
      "Sid":"ReadWriteAccessBasedOnAccountId",
      "Effect":"Deny",
      "Principal":{
        "AWS": "*"
      },
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::${local.s3_bucket}/*",
        "arn:aws:s3:::${local.s3_bucket}"
      ],
      "Condition": {  
        "StringNotEquals": {
          "aws:PrincipalAccount": "${data.aws_caller_identity.main.account_id}"
        }
      }
    },
    {
      "Sid":"ReadWriteAccessBasedOnTag",
      "Effect":"Deny",
      "Principal":{
        "AWS": "*"
      },
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::${local.s3_bucket}/*",
        "arn:aws:s3:::${local.s3_bucket}"
      ],
      "Condition": {  
        "StringNotEquals": {
          "aws:PrincipalTag/isTfDeployer": "yes"
        }
      }
    }
  ]
}
EOF
}

resource "aws_s3_bucket_acl" "acl" {
  bucket = aws_s3_bucket.tf_state.id
  acl = "private"
}
