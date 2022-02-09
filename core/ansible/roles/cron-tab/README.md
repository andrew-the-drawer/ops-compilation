cron-tab
=========

A role to deploy cron on single server instance using Linux cron tab feature

Requirements
------------

Any server with necessary tools/resources

Role Variables
--------------

```
cron_config_file: # path to cron config, see config/crons/cron-config.yml for reference
```

Dependencies
------------

None

Example Playbook
----------------

Including an example of how to use your role (for instance, with variables passed in as parameters) is always nice for users too:

    - hosts: servers
      roles:
        - role: cron-tab
          vars:
            cron_config_file: "{{ lookup('env','PWD') }}/config/crons/cron-config.yml"

License
-------

MIT

External reference
------------

How to denote the schedule of cronjobs in YAML config file, please see [ansible.builtin.cron](https://docs.ansible.com/ansible/latest/collections/ansible/builtin/cron_module.html)