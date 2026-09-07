@echo off
setlocal enabledelayedexpansion

set "DIR=%~dp0"
cd /d "%DIR%"

if not exist .env (
  if exist .env.example (
    copy .env.example .env >nul
    echo Created .env from .env.example
  )
)

if "%1"=="" goto help
if "%1"=="help" goto help
if "%1"=="infra" goto infra
if "%1"=="infra:down" goto infra_down
if "%1"=="full" goto full
if "%1"=="full:down" goto full_down
if "%1"=="stop" goto stop
if "%1"=="run" goto run
if "%1"=="build" goto build
if "%1"=="health" goto health
if "%1"=="ui" goto ui

echo Unknown command: %1
goto help

:infra
docker compose -f docker\docker-compose.infrastructure.yml up -d
goto end

:infra_down
docker compose -f docker\docker-compose.infrastructure.yml down
goto end

:full
docker compose -f docker\docker-compose.yml up --build -d
goto end

:full_down
docker compose -f docker\docker-compose.yml down
goto end

:stop
docker compose -f docker\docker-compose.infrastructure.yml down 2>nul
docker compose -f docker\docker-compose.yml down 2>nul
goto end

:run
if "%2"=="" (
  echo Usage: dev.bat run ^<service-name^>
  echo Available services: api-gateway, core-service, ingestion-service, analytics-service, behavior-engine
  goto end
)
if not exist "services\%2" (
  echo Service "services\%2" not found.
  goto end
)
echo Starting %2...
cd "services\%2" && mvn spring-boot:run
goto end

:build
mvn clean package -DskipTests
goto end

:health
echo Checking service health:
for %%P in (8080 8081 8082 8083 8085) do (
  curl -s -o nul -w "Port %%P: %%{http_code}\n" http://localhost:%%P/api/health 2>nul || echo Port %%P: UNREACHABLE
)
goto end

:ui
echo Starting Phylax Dashboard on port 3000...
cd "frontend\dashboard" && npm run dev
goto end

:help
echo Phylax Development Helper
echo.
echo Usage: dev.bat ^<command^>
echo.
echo Commands:
echo   infra        Start infrastructure in Docker
echo   infra:down   Stop infrastructure containers
echo   full         Start all services and infrastructure in Docker
echo   full:down    Stop all containers
echo   stop         Stop all running Phylax containers
echo   run ^<name^>   Run a specific service locally (e.g., dev.bat run core-service)
echo   ui           Start the frontend dashboard (port 3000)
echo   build        Build all microservices with Maven
echo   health       Check health endpoints of running services
goto end

:end
