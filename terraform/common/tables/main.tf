# メインテーブル
resource "aws_dynamodb_table" "main" {
  name           = "main"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1 # AutoScalingの場合は便宜上1にしておく
  write_capacity = 1 # AutoScalingの場合は便宜上1にしておく
  hash_key       = "pk"
  range_key      = "sk"

  attribute {
    name = "pk"
    type = "S"
  }

  attribute {
    name = "sk"
    type = "S"
  }

  # AutoScalingの場合は必須
  lifecycle {
    ignore_changes = [
      read_capacity,
      write_capacity,
    ]
  }
}

module "settings_auto_scale" {
  source             = "./auto_scale"
  table_name         = aws_dynamodb_table.main.name
  read_max_capacity  = local.capacity_units_max
  read_min_capacity  = local.capacity_units_mid
  write_max_capacity = local.capacity_units_max
  write_min_capacity = local.capacity_units_mid
}
