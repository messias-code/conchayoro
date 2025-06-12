output "ecr_repository_name" {
    description = "ECR repository name"
    value = aws_ecr_repository.cyo_ecr_repo.name
}

output "ecr_repository_url" {
    description = "ECR repository URL"
    value = aws_ecr_repository.cyo_ecr_repo.repository_url
}

output "elastic_beanstalk_enviroment_name" {
    description = "elastic_beanstalk_enviroment_name"
    value = aws_elastic_beanstalk_environment.cyo_ebef.name
}

output "elastic_beanstalk_endpoint_url" {
    description = "elastic_beanstalk_endpoint_url"
    value = aws_elastic_beanstalk_environment.cyo_ebef.endpoint_url
}