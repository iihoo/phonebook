FROM maven:3.6.3-openjdk-11 AS MAVEN_BUILD
 
# copy the pom and src code to the container
COPY ./ ./
 
# package our application code
RUN mvn clean package -DskipTests

FROM openjdk:13-jdk-alpine

ARG JAR_FILE=target/spring-boot-backend-puhelinluettelo.jar

WORKDIR /backend-app

COPY --from=MAVEN_BUILD ${JAR_FILE} app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]