resource "aws_service_discovery_service" "svc_discovery" {
  name          = "${var.ecs_task_family}"
  force_destroy = true
  dns_config {
    namespace_id = data.aws_service_discovery_dns_namespace.dns.id
    dns_records {
      ttl  = 0
      type = var.service_dns_record_type
    }
    routing_policy = "MULTIVALUE"
  }
}