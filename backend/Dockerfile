# Backend Dockerfile
# Uses multi-stage build to package the Spring Boot application and run it

# Stage 1: build the application
FROM maven:3.9.5-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn -B package -DskipTests

# Stage 2: run the application
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/product-manager-fullstack-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
