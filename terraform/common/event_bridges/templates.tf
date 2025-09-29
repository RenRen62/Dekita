resource "aws_cloudwatch_event_rule" "rule" {
  name                = "${var.event_bridge_name}_schedule"
  schedule_expression = var.cron
}

resource "aws_cloudwatch_event_target" "target" {
  rule      = aws_cloudwatch_event_rule.rule.name
  target_id = var.event_bridge_name
  arn       = var.schedule_lambdas_arn
}

# lambdaがeventBridgeから呼び出されることを許可
resource "aws_lambda_permission" "permission" {
  action        = "lambda:InvokeFunction"
  function_name = split(":", var.schedule_lambdas_arn)[6] # ARNから関数名を抽出
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.rule.arn
}
