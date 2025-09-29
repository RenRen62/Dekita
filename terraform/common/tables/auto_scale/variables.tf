variable "table_name" {}
variable "index_name" { default = null }
variable "read_max_capacity" {}
variable "read_min_capacity" {}
variable "write_max_capacity" {}
variable "write_min_capacity" {}
variable "auto_scale_used_rate" { default = 70 }
