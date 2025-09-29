data "template_file" "openapi" {
  template = file("${path.module}/../../openapi/openapi.yml")
  vars = {
    arn_send_push_notification = "${module.lambdas.arn_send_push_notification}"
  }
}

resource "aws_apigatewayv2_api" "self" {
  name          = var.project_name
  protocol_type = "HTTP"
  body          = data.template_file.openapi_for_app.rendered
}

resource "aws_apigatewayv2_stage" "self" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "api"
  auto_deploy = true
}
