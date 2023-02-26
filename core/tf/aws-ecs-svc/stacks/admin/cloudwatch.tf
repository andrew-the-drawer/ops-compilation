resource "aws_cloudwatch_log_group" "service_log_grp" {
  name              = local.cwlGrpName
  retention_in_days = var.cwl_grp_retention_in_days
}
