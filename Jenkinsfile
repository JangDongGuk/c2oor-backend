pipeline {
    agent any
    tools {nodejs "nodejs"}
    
    environment {
        SLACK_CHANNEL = '#jenkins'
    }

    stages {
        stage('Start') {
            steps {
                slackSend (channel: SLACK_CHANNEL , color: '#FFFFOO', message: "STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
            }
        }
    
        stage('Checkout') {
            steps {
                git branch: 'main',
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
            steps {
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



//  stage('deploy') {
//             steps 
//                 echo '배포'

//                 sh "scp -i /.ssh/ehdrnr3.pem /ubuntu@13.209.68.41:디렉토리 경로
              
//                 sh 'scp -v 0o StrictHostkeyChecking=no -i '
//                 sh 'ssh -o StrictHostKeyChecking=no JangDongGuk@13.209.68.41:'    

//                 scp -v -o StrictHostKeyChecking=no -i 
//                 젠킨스 서버 내 원격 서버 pem파일 경로 젠킨스 서버 내 원격서버로 전송할 파일경로 
//                 username@원격서버주소:파일을 저장할 경로

//                 sshagent'credentail 식별 값' 
//                     sh 'ssh -o StrictHostKeyChecking=no [user name]@[ip address] "whoami"'
//                     sh "ssh -o StrictHostKeyChecking=no [user name]@[ip address] 'docker pull [이미지 이름]:[태그 이름]'"
//                     sh "ssh -o StrictHostKeyChecking=no [user name]@[ip address] 'docker run [이미지 이름]:[태그 이름]'"
//                  이런느낌 경로설정으로 그리고 -o StrictHostKeyChecking=no 왜 no으로 설정했는지 인터넷 검색 해보기 까먹음
//             
//         
//     

