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

### Módulo `user` — capa de datos lista
Ya están creados `User` (entidad JPA en `model/`), `UserRepository`, `UserRequestDTO` y `UserResponseDTO` (en `dto/`) y `UserMapper` (MapStruct en `mapper/`). Falta el `Service` y el `Controller` (asignado a Luis abajo).

> **Convención de carpetas:** cada módulo se organiza así → `controller/`, `dto/` (solo DTOs), `mapper/` (MapStruct), `model/` (entidades JPA), `repository/`, `service/`. **El mapper NO va en `dto/`.**

---

## Equipo y distribución del trabajo

Somos 3:
- **Luis Duarte** — ya hizo el módulo `user` (capa de datos), así que su carga es menor: completa la infraestructura compartida y cierra su módulo.
- **Juan Suaza** — módulo `author` completo + parte del módulo `loan`.
- **Maria Olaya** — módulo `book` completo + parte del módulo `loan`.

Juan y Maria llevan una carga equivalente.

---

## Luis Duarte — Infraestructura compartida + cerrar módulo user

### 1. `shared/config/Views.java`
Clase con dos interfaces anidadas (`Summary` y `Detail`, donde `Detail` extiende `Summary`). Se usan con `@JsonView` en los controladores para decidir qué campos se devuelven: `Summary` para listados (pocos campos) y `Detail` para consultas individuales (todos los campos).

Ubicación: `src/main/java/com/library/management/shared/config/Views.java`

### 2. `shared/controller/AbstractCrudController.java`
Controlador abstracto genérico parametrizado por `<RequestDTO, ResponseDTO>` con los 5 endpoints CRUD ya definidos. Las subclases solo implementan los 5 métodos abstractos (`getAll`, `getById`, `create`, `update`, `delete`) delegando al `Service`.

Endpoints HTTP esperados:
- `GET /` → lista, anotado con `@JsonView(Views.Summary.class)`
- `GET /{id}` → uno, anotado con `@JsonView(Views.Detail.class)`
- `POST /` → crea, valida con `@Valid`, retorna `201 Created`
- `PUT /{id}` → actualiza, valida con `@Valid`, retorna `200 OK`
- `DELETE /{id}` → elimina, retorna `204 No Content`

Ubicación: `src/main/java/com/library/management/shared/controller/AbstractCrudController.java`

### 3. `shared/exception/GlobalExceptionHandler.java`
Clase anotada con `@RestControllerAdvice` que centraliza el manejo de errores. Debe atrapar al menos:
- `MethodArgumentNotValidException` → `400 Bad Request` con el detalle de los campos inválidos
- `EntityNotFoundException` (o una `ResourceNotFoundException` propia) → `404 Not Found`
- `DataIntegrityViolationException` → `409 Conflict` (por ejemplo, email duplicado)
- `Exception` genérica → `500 Internal Server Error`

Ubicación: `src/main/java/com/library/management/shared/exception/GlobalExceptionHandler.java`

### 4. `modules/user/service/UserService.java`
Lógica de negocio del módulo. Usa `UserRepository` y `UserMapper`. Métodos:
- `findAll()` → lista todos los usuarios como `UserResponseDTO`
- `findById(Long id)` → busca por id; lanza excepción si no existe
- `create(UserRequestDTO dto)` → verifica que el email no esté registrado, hashea el password y guarda
- `update(Long id, UserRequestDTO dto)` → busca, actualiza campos y guarda
- `delete(Long id)` → verifica existencia y elimina

Ubicación: `src/main/java/com/library/management/modules/user/service/UserService.java`

### 5. `modules/user/controller/UserController.java`
Extiende `AbstractCrudController<UserRequestDTO, UserResponseDTO>`, mapea a `/api/users` y delega los 5 métodos al `UserService`.

Ubicación: `src/main/java/com/library/management/modules/user/controller/UserController.java`

---

## Juan Suaza — Módulo `author` completo + parte del módulo `loan`

### Módulo `author`

#### 1. Liquibase `002-create-authors.yaml`
Changelog que crea la tabla `authors` con: `id` (PK auto-increment), `full_name` (VARCHAR 100, not null), `nationality` (VARCHAR 50), `birth_date` (DATE), `biography` (VARCHAR 500), `created_at`, `updated_at`. Registrarlo en `db.changelog-master.yaml`.

#### 2. `Author.java` (entidad)
Entidad JPA mapeada a la tabla `authors` con los mismos campos del changelog. Usar `@PrePersist` / `@PreUpdate` para las fechas, igual que `User`.

#### 3. `AuthorRepository.java`
Extiende `JpaRepository<Author, Long>`. Agregar `existsByFullName(String fullName)` para evitar duplicados.

#### 4. `AuthorRequestDTO.java`
Validaciones: `fullName` obligatorio (max 100), `nationality` opcional (max 50), `birthDate` opcional, `biography` opcional (max 500).

#### 5. `AuthorResponseDTO.java`
Incluye todos los campos públicos (id, fullName, nationality, birthDate, biography, createdAt).

#### 6. `AuthorMapper.java` (en `modules/author/mapper/`)
MapStruct con `toEntity(AuthorRequestDTO)` y `toDTO(Author)`.

#### 7. `AuthorService.java`
Mismos métodos que `UserService` (`findAll`, `findById`, `create`, `update`, `delete`). En `create` debe verificar duplicado por nombre.

#### 8. `AuthorController.java`
Extiende `AbstractCrudController<AuthorRequestDTO, AuthorResponseDTO>`, mapea a `/api/authors`.

### Parte del módulo `loan` (capa de datos)

#### 9. Liquibase `004-create-loans.yaml`
Changelog para la tabla `loans` con: `id`, `user_id` (FK a users), `book_id` (FK a books), `loan_date` (DATETIME, not null), `return_date` (DATETIME, nullable), `status` (VARCHAR 20, valores: `ACTIVE`, `RETURNED`, `OVERDUE`), `created_at`, `updated_at`.

Importante: depende de que las tablas `users` y `books` existan, así que el `id` del changelog debe ser posterior al de Maria. Coordinar el orden.

#### 10. `Loan.java` (entidad)
Entidad JPA con relaciones `@ManyToOne` a `User` y `Book` (lazy). `status` como `enum LoanStatus { ACTIVE, RETURNED, OVERDUE }` mapeado con `@Enumerated(EnumType.STRING)`.

#### 11. `LoanRepository.java`
Extiende `JpaRepository<Loan, Long>`. Agregar consultas útiles: `findByUserId(Long userId)`, `findByStatus(LoanStatus status)`.

---

## Maria Olaya — Módulo `book` completo + parte del módulo `loan`

### Módulo `book`

#### 1. Liquibase `003-create-books.yaml`
Changelog que crea la tabla `books` con: `id` (PK auto-increment), `title` (VARCHAR 150, not null), `isbn` (VARCHAR 20, unique), `author_id` (FK a authors), `published_year` (INT), `available_copies` (INT, default 0), `cover_image_url` (VARCHAR 255), `created_at`, `updated_at`. Registrarlo en `db.changelog-master.yaml` después del de `authors`.

#### 2. `Book.java` (entidad)
Entidad JPA. La relación con `Author` es `@ManyToOne` lazy. Usar `@PrePersist` / `@PreUpdate` para las fechas.

#### 3. `BookRepository.java`
Extiende `JpaRepository<Book, Long>`. Agregar `findByIsbn(String isbn)` y `existsByIsbn(String isbn)`.

#### 4. `BookRequestDTO.java`
Validaciones: `title` obligatorio (max 150), `isbn` obligatorio y único (max 20), `authorId` obligatorio, `publishedYear` opcional, `availableCopies` mínimo 0.

#### 5. `BookResponseDTO.java`
Incluye id, title, isbn, nombre del autor (no solo el id), publishedYear, availableCopies, coverImageUrl, createdAt.

#### 6. `BookMapper.java` (en `modules/book/mapper/`)
MapStruct. La conversión del autor requiere un método auxiliar o usar `@Mapping` para mapear `author.fullName` → `authorName` en el response.

#### 7. `BookService.java`
Métodos estándar. En `create` y `update` validar que el `authorId` exista (consultar `AuthorRepository`). En `create` validar que el `isbn` no esté duplicado.

#### 8. `BookController.java`
Extiende `AbstractCrudController<BookRequestDTO, BookResponseDTO>`, mapea a `/api/books`.

### Parte del módulo `loan` (DTOs + lógica + controlador)

#### 9. `LoanRequestDTO.java`
Validaciones: `userId` obligatorio, `bookId` obligatorio, `loanDate` obligatorio, `returnDate` opcional.

#### 10. `LoanResponseDTO.java`
Incluye id, nombre del usuario, título del libro, loanDate, returnDate, status, createdAt.

#### 11. `LoanMapper.java` (en `modules/loan/mapper/`)
MapStruct. Igual que en `Book`, mapear los campos derivados (`user.fullName`, `book.title`) en el response.

#### 12. `LoanService.java`
Métodos estándar más reglas de negocio:
- Al crear: validar que el libro tenga `availableCopies > 0`, descontar una copia, marcar `status = ACTIVE`
- Al devolver (`update` con `returnDate`): sumar una copia al libro, marcar `status = RETURNED`
- No permitir eliminar préstamos con `status = ACTIVE`

#### 13. `LoanController.java`
Extiende `AbstractCrudController<LoanRequestDTO, LoanResponseDTO>`, mapea a `/api/loans`.

---

## Orden recomendado de ejecución

1. **Luis** termina primero `Views` y `AbstractCrudController` para no bloquear a los demás.
2. En paralelo, **Juan** y **Maria** trabajan sus changelogs de Liquibase y sus entidades/repositorios.
3. Cuando Luis tenga el `AbstractCrudController` listo, todos cierran sus controladores.
4. **Luis** termina `GlobalExceptionHandler` y su `UserService` / `UserController`.
5. Probar cada módulo con Postman / Thunder Client antes de mergear.

---

## Cómo levantar el proyecto

### 1. Levantar SQL Server con Docker
```
docker-compose up -d
```

### 2. Crear la base de datos (solo la primera vez)
```
docker exec -it biblioteca_sqlserver /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "Password123*" -No -Q "CREATE DATABASE MER_Biblioteca"
```

### 3. Compilar el proyecto
```
cd library_management
./mvnw clean install -DskipTests
```

### 4. Correr la aplicación
```
./mvnw spring-boot:run
```

La API queda disponible en `http://localhost:8080/api/...`

---

## Estructura del proyecto

```
library_management/
└── src/main/java/com/library/management/
    ├── modules/
    │   ├── user/    ← Luis (cierra Service + Controller)
    │   ├── author/  ← Juan
    │   ├── book/    ← Maria
    │   └── loan/    ← Juan (datos) + Maria (DTOs + lógica + controller)
    └── shared/
        ├── config/      ← Luis: Views
        ├── controller/  ← Luis: AbstractCrudController
        └── exception/   ← Luis: GlobalExceptionHandler
```

Cada módulo internamente:
```
<modulo>/
├── controller/
├── dto/         ← solo RequestDTO y ResponseDTO
├── mapper/      ← MapStruct
├── model/       ← entidad JPA
├── repository/
└── service/
```
