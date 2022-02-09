mongodb-replicaset
=========

A role to setup simple mongodb replicaset on a single server instance (EC2...)

Requirements
------------

A single server instance with docker has been installed

Role Variables
--------------
```
- remote_config_dir: # remote directory to store all configuration file (docker config files, build scripts...)
- dockerfile_path: # point to local Dockerfile for mongo keyfile
- docker_compose_path: # point to local docker-compose file that we'll set up mongo containers
- docker_secrets_path: # point to dotenv file contains mongo credentials
- keyfile_mongo_image_name: #name of the keyfile mongo image that we'll build by our Dockerfile
- mongo_config: # array of config object that mulitple mongo containers would use
- root_domain: # if the value is db.example.com, then mongo alias would look like mongo-27017.db.example.com 
- remote_docker_compose_exec: # remote path point to docker-compose executable script (/usr/local/bin/docker-compose)
- mongo_rs_id: # name or ID of replica-set (default to rs)
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
    - role: mongodb-replicaset
      vars:
        remote_config_dir: /root/mongodb-repl
        dockerfile_path: "{{ lookup('env','PWD') }}/config/mongo/Dockerfile"
        docker_compose_path: "{{ lookup('env', 'PWD') }}/config/mongo/docker-compose.yml"
        keyfile_mongo_image_name: "mongo-keyfile"
        docker_secrets_path: "{{ lookup('env', 'PWD') }}/config/mongo/docker-secrets.decrypted.env"
        mongo_config:
          - port: 27017
            priority: 10
            arbiter: no
          - port: 27018
            priority: 1
            arbiter: no
          - port: 27019
            priority: 1
            arbiter: yes
        root_domain: db.example.com
        remote_docker_compose_exec: /usr/local/bin/docker-compose
        mongo_rs_id: rs
```

License
-------

MIT

