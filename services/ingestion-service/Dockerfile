FROM maven:3.9-eclipse-temurin-21-alpine AS builder

WORKDIR /build

COPY pom.xml ./pom.xml
COPY services/ingestion-service/pom.xml ./services/ingestion-service/pom.xml
COPY services/ingestion-service/src ./services/ingestion-service/src

WORKDIR /build/services/ingestion-service
RUN mvn clean package -DskipTests -B

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /build/services/ingestion-service/target/*.jar app.jar

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "app.jar"]
