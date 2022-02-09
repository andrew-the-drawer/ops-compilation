docker
=========

A role to install docker on a single server instance (EC2...)

Requirements
------------

A single server instance

Role Variables
--------------

```
docker_compose_dest: /usr/local/bin
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
    - role: docker
      vars:
        docker_compose_dest: /usr/local/bin
      tags:
        - centos
```
License
-------

MIT

