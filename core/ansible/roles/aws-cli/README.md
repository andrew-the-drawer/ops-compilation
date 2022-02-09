aws-cli
=========

A role to install aws-cli on server instance (EC2,...)

Requirements
------------

A single server instance with public IP

Usually, to download and set up the CLI, server must have python>=3.6 installed
Else, we could set up docker and run the CLI via illya/aws-cli image

Role Variables
--------------

```
aws_cli_install_dir=/usr/local/aws-cli
aws_cli_bin=/usr/local/bin/aws
aws_profile=
aws_region=
ec2_instance_role_arn=
aws_dir=
```

Dependencies
------------

None

Example Playbook
----------------

Including an example of how to use your role (for instance, with variables passed in as parameters) is always nice for users too:

```
- hosts: servers
  roles:
    - role: aws-cli
      vars:
        aws_cli_install_dir:/usr/local/aws-cli
        aws_cli_bin:/usr/local/bin/aws
        aws_profile: profile-name
        aws_region: ap-southeast-1
        ec2_instance_role_arn: arn:aws:iam::<account_id>:role/<role_name>
        aws_dir: /root/.aws
```
           

License
-------

MIT

