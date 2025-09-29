data "archive_file" "common_layer_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../../../apps/lambda/layers"
  output_path = "lambda/nodejs.zip"
}

resource "aws_lambda_layer_version" "common_layer" {
  layer_name               = "common_layer"
  filename                 = data.archive_file.common_layer_zip.output_path
  compatible_runtimes      = [local.lambda_runtime]
  compatible_architectures = local.lambda_arch
  source_code_hash         = data.archive_file.common_layer_zip.output_base64sha256
}

output "arn_common_layer" {
  value = aws_lambda_layer_version.common_layer.arn
}
