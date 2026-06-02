# Trabajo Grupal — Biblioteca CRUD API REST

## ¿Qué es el proyecto?

API REST de gestión de biblioteca usando **Spring Boot 3.5**, **Java 17**, **SQL Server (Docker)**, **Liquibase** y arquitectura **N-Capas Modular**.

---

## Lo que ya está hecho

### Infraestructura
- `docker-compose.yml` — levanta SQL Server en Docker en el puerto `1433`
- `application.properties` — configurado para conectarse a `MER_Biblioteca` con usuario `sa`
- Liquibase configurado con el changelog `001-create-users.yaml` que crea la tabla `users`

### Dependencias en `pom.xml`
- `spring-boot-starter-web` — para exponer endpoints HTTP
- `spring-boot-starter-data-jpa` — para conectarse a la BD con JPA/Hibernate
- `spring-boot-starter-validation` — para validar datos de entrada (`@NotBlank`, `@Email`, etc.)
- `liquibase-core` — para manejar migraciones de base de datos
- `mssql-jdbc` — driver para conectarse a SQL Server
- `lombok` — para generar getters, setters, constructores automáticamente
- `mapstruct 1.6.3` — para convertir entre entidades y DTOs automáticamente

### Módulo `user` — completado

#### `User.java` (Model)
Entidad JPA que representa la tabla `users` en la base de datos. Tiene los campos `id`, `fullName`, `email`, `password`, `phone`, `profileImageUrl`, `createdAt`, `updatedAt`. Los campos de fecha se llenan automáticamente con `@PrePersist` y `@PreUpdate`.

#### `UserRepository.java`
Interfaz que extiende `JpaRepository<User, Long>`. Provee métodos como `findAll()`, `findById()`, `save()` y `deleteById()` sin escribir SQL. También tiene métodos personalizados: `findByEmail()` y `existsByEmail()`.

#### `UserRequestDTO.java`
Objeto que recibe los datos del cliente al crear o actualizar un usuario. Tiene validaciones:
- `fullName` → obligatorio, máximo 100 caracteres
- `email` → obligatorio, formato de email válido
- `password` → obligatorio, mínimo 6 caracteres
- `phone` → opcional, máximo 20 caracteres

#### `UserResponseDTO.java`
Objeto que se devuelve al cliente como respuesta. **No incluye el campo `password`** por seguridad. Incluye: `id`, `fullName`, `email`, `phone`, `profileImageUrl`, `createdAt`.

#### `UserMapper.java`
Interfaz de MapStruct que convierte automáticamente entre `User` ↔ `UserRequestDTO` / `UserResponseDTO`. MapStruct genera la implementación en tiempo de compilación.

```java
@Mapper(componentModel = "spring")
public interface UserMapper {
    User toEntity(UserRequestDTO dto);
    UserResponseDTO toDTO(User user);
}
```

---

## Trabajo pendiente — distribución

### Compañero 1

**Archivos a crear:**

#### 1. `shared/config/Views.java`
Clase con interfaces estáticas para controlar qué campos se devuelven en cada endpoint. `Summary` se usa en listas (devuelve pocos campos) y `Detail` en consultas individuales (devuelve todos los campos).

```
Ubicación: src/main/java/com/library/management/shared/config/Views.java
```

```java
package com.library.management.shared.config;

public class Views {
    public interface Summary {}
    public interface Detail extends Summary {}
}
```

#### 2. `shared/controller/AbstractCrudController.java`
Controlador abstracto genérico con los 5 endpoints del CRUD ya definidos. Todos los módulos (users, books, authors, loans) van a extender esta clase para no repetir código.

Los métodos HTTP que debe tener:
- `GET /` → devuelve lista, usa `@JsonView(Views.Summary.class)`
- `GET /{id}` → devuelve uno, usa `@JsonView(Views.Detail.class)`
- `POST /` → crea, valida con `@Valid`, retorna `201 Created`
- `PUT /{id}` → actualiza, valida con `@Valid`, retorna `200 OK`
- `DELETE /{id}` → elimina, retorna `204 No Content`

Cada método llama a un método abstracto protegido (`getAll`, `getById`, `create`, `update`, `delete`) que las subclases implementan.

```
Ubicación: src/main/java/com/library/management/shared/controller/AbstractCrudController.java
```

---

### Compañero 2

**Archivos a crear:**

#### 1. `modules/user/service/UserService.java`
Clase con la lógica de negocio del módulo user. Usa `UserRepository` y `UserMapper`. Métodos que debe tener:

- `findAll()` → obtiene todos los usuarios y los convierte a `UserResponseDTO`
- `findById(Long id)` → busca por id, lanza excepción si no existe
- `create(UserRequestDTO dto)` → verifica que el email no esté registrado antes de guardar
- `update(Long id, UserRequestDTO dto)` → busca el usuario, actualiza sus campos y guarda
- `delete(Long id)` → verifica que existe antes de eliminar

```
Ubicación: src/main/java/com/library/management/modules/user/service/UserService.java
```

#### 2. `modules/user/controller/UserController.java`
Controlador concreto que extiende `AbstractCrudController<UserRequestDTO, UserResponseDTO>`. Solo implementa los 5 métodos abstractos delegando al `UserService`. El `@RequestMapping` debe ser `/api/users`.

```
Ubicación: src/main/java/com/library/management/modules/user/controller/UserController.java
```

---

## Cómo levantar el proyecto

### 1. Levantar SQL Server con Docker
```bash
docker-compose up -d
```

### 2. Crear la base de datos (solo la primera vez)
```bash
docker exec -it biblioteca_sqlserver /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "Password123*" -No -Q "CREATE DATABASE MER_Biblioteca"
```

### 3. Compilar el proyecto
```bash
cd library_management
./mvnw clean install -DskipTests
```

### 4. Correr la aplicación
```bash
./mvnw spring-boot:run
```

La API queda disponible en `http://localhost:8080/api/users`

---

## Estructura del proyecto

```
library_management/
└── src/main/java/com/library/management/
    ├── modules/
    │   └── user/
    │       ├── controller/   ← UserController.java        (Compañero 2)
    │       ├── dto/          ← UserRequestDTO, UserResponseDTO, UserMapper
    │       ├── model/        ← User.java
    │       ├── repository/   ← UserRepository.java
    │       └── service/      ← UserService.java            (Compañero 2)
    └── shared/
        ├── config/           ← Views.java                  (Compañero 1)
        └── controller/       ← AbstractCrudController.java (Compañero 1)
```
