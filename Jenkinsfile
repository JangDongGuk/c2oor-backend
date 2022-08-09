pipeline {
    agent any
    
    environment {
        SLACK_CHANNEL = '#jenkins'
    }

    stages {
        stage('Start') {
            steps {
                slackSend (channel: SLACK_CHANNEL, color: '#FFFFOO', message: "STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
            }
        }
    
        stage('Checkout') {
            steps {
                git branch: 'feature/signin.up',
                    credentialsId: 'github_access_token',
                    url: 'https://github.com/JangDongGuk/westudy.git'
            }
        }
   
        stage('Build') {
            steps {
                sh 'make' 
                archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true
            }
        }

        stage('Test') {
            steps {
                sh 'make check || true' 
                junit '**/target/*.xml' 
            }
        }

        stage('Deploy') {
            steops {
                echo '배포'
            }
        }

    post {
        success {
            slackSend (channel: SLACK_CHANNEL, color: '#00FF00', message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
        }
        failure {
            slackSend (channel: SLACK_CHANNEL, color: '#FF0000', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
        }
    }
}
}