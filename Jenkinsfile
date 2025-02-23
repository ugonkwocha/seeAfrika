pipeline {
    agent any
    tools { nodejs 'NODEJS' }
    stages {
        stage('Build App') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'cat index.html'
            }
        }
        stage('Deploy') {
            steps {
                sh 'chmod -R +rwx ./jenkins/scripts/deliver.sh'
                sh 'chmod -R +rwx ./jenkins/scripts/kill.sh'
                sh './jenkins/scripts/deliver.sh'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                sh './jenkins/scripts/kill.sh'
            }
        }
    }
}
