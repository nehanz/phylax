FROM maven:3.9-eclipse-temurin-21-alpine AS builder

WORKDIR /build

COPY pom.xml ./pom.xml
COPY services/behavior-engine/pom.xml ./services/behavior-engine/pom.xml
COPY services/behavior-engine/src ./services/behavior-engine/src

WORKDIR /build/services/behavior-engine
RUN mvn clean package -DskipTests -B

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /build/services/behavior-engine/target/*.jar app.jar

EXPOSE 8085

ENTRYPOINT ["java", "-jar", "app.jar"]
