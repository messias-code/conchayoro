## Single instance settings
##---------------------------
EnvironmentType = "SingleInstance"
LoadBalancerType = "application"
MinSize = 1
MaxSize = 1
DeploymentPolicy = "AllAtOnce"
BatchSizeType = "Fixed"
BatchSize = 50
Timeout = 3600
## LoadedBalanced service settings
##---------------------------
#EnvironmentType = "LoadBalanced"
#LoadBalancerType = "application"
#MinSize = 1
#MaxSize = 2
#DeploymentPolicy = "TrafficSplitting"
#BatchSizeType = "Percentage"
#BatchSize = 50
#Timeout = 3600