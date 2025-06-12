terraform {
    required_providers {
        aws = {
        source = "hashicorp/aws"
        version = "~> 5.98"
        }
    }

    backend "s3" {
        bucket = ""
        key = ""
        region = ""
        encrypt = true
    }

    required_version = ">= 1.12.1"
    }
    
    provider "aws" {
        region = "${var.AWS_REGION}"
}