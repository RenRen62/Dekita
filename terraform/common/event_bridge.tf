module "send_push_notification" {
  source               = "./event_bridges"
  event_bridge_name    = "sendPushNotification"
  cron                 = "cron(0 3 * * ? *)" # 毎日UTC 3:00 (JST 12:00)
  schedule_lambdas_arn = module.lambdas.arn_schedule_function
}