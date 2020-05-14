FROM openjdk:13-jdk-alpine

ARG JAR_FILE=target/spring-boot-backend-puhelinluettelo.jar

WORKDIR /backend-app

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]