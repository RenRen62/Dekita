module "lambdas" {
  source           = "./lambdas"
  lambda_exec_role = aws_iam_role.lambda_iam_role.arn
  slack_channel_id = var.slack_channel_id
}
