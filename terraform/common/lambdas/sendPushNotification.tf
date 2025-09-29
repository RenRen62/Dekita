module "send_push_notification_function" {
  source           = "./templates"
  function_name    = "sendPushNotification"
  memory_size      = 128
  lambda_exec_role = var.lambda_exec_role
  layers           = [aws_lambda_layer_version.common_layer.arn]
}

output "arn_send_push_notification_function" {
  value = module.send_push_notification_function.arn
}
