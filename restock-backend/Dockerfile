FROM maven:3.9-amazoncorretto-17 as builder
WORKDIR /usr/mvn/build
COPY src/ src/
COPY pom.xml .
RUN ls -la
RUN mvn clean install -DskipTests

FROM amazoncorretto:17-alpine-jdk as restock-backend
WORKDIR app
COPY --from=builder /usr/mvn/build/target/*.jar app.jar
ENTRYPOINT ["sh", "-c","java ${JAVA_OPTS} -jar app.jar ${0} ${@}"]