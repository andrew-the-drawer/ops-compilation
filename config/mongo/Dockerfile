# we use custom mongodb to support keyfile authentication since we will set up a simple replicaset
# https://docs.mongodb.com/manual/tutorial/enforce-keyfile-access-control-in-existing-replica-set/
FROM mongo:5.0.6

RUN mkdir -p /data/key \
  && openssl rand -base64 756 > /data/key/replica-set.key \
  && chown mongodb:mongodb /data/key/replica-set.key \
  && chmod 400 /data/key/replica-set.key
