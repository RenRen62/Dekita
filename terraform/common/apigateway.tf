data "template_file" "openapi" {
  template = file("${path.module}/../../apps/lambda/docs/openapi.yaml")
  vars = {
    arn_invoke_role = "${aws_iam_role.lambda_apigateway_exec_role.arn}"
    arn_send_push_notification = "${module.lambdas.arn_send_push_notification}"
  }
}

resource "aws_apigatewayv2_api" "self" {
  name          = var.project_name
  protocol_type = "HTTP"
  body          = data.template_file.openapi.rendered
}

resource "aws_apigatewayv2_stage" "self" {
  api_id      = aws_apigatewayv2_api.self.id
  name        = "api"
  auto_deploy = true
}
