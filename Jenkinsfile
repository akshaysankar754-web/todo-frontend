pipeline {
    agent any

    environment {
        IMAGE_NAME = "worldcup-frontend"
        CONTAINER_NAME = "worldcup-frontend-jenkins"
        NETWORK_NAME = "app-net"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Image') {
            steps {
                bat 'docker build --no-cache -t %IMAGE_NAME%:latest .'
            }
        }

        stage('Stop Existing Container') {
            steps {
                bat '''
                docker rm -f %CONTAINER_NAME% 2>nul || exit 0
                '''
            }
        }

        stage('Run Container') {
            steps {
                bat '''
                docker network inspect %NETWORK_NAME% >nul 2>&1 || docker network create %NETWORK_NAME%

                docker run -d ^
                --name %CONTAINER_NAME% ^
                --network %NETWORK_NAME% ^
                -p 4205:80 ^
                %IMAGE_NAME%:latest
                '''
            }
        }
    }

    post {
        success {
            echo 'Frontend deployed successfully!'
        }

        failure {
            echo 'Frontend deployment failed!'
        }
    }
}