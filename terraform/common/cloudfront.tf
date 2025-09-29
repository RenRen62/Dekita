resource "aws_cloudfront_distribution" "for_api_gateway" {
  # APIGatewayのエンドポイントをオリジンに設定
  origin {
    domain_name = replace("${aws_apigatewayv2_api.self.api_endpoint}", "/^https?://([^/]*).*/", "$1")
    origin_id   = aws_apigatewayv2_api.self.id
    origin_path = "/${aws_apigatewayv2_stage.self.name}"
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1"]
      origin_read_timeout    = 30
    }
  }

  enabled         = true
  is_ipv6_enabled = true

  # 地理的なアクセス制限をかけない
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  # APIGatewayのキャッシュ設定
  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = aws_apigatewayv2_api.self.id
    forwarded_values {
      # オリジンへクエリ文字列を転送する
      query_string = true
      cookies {
        forward = "none"
      }
    }
    min_ttl                = 0
    default_ttl            = 1
    max_ttl                = 1
    viewer_protocol_policy = "redirect-to-https"
  }
}
