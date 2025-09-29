variable "lambda_exec_role" {}
variable "slack_channel_id" {}

locals {
  lambda_runtime = "nodejs22.x"
  lambda_arch    = ["arm64"]
}
