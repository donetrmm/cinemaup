CREATE TABLE
  `movieseries` (
    `id` int NOT NULL,
    `titulo` varchar(60) DEFAULT NULL,
    `descripcion` varchar(605) DEFAULT NULL,
    `fecha_estreno` varchar(45) DEFAULT NULL,
    `tipo` varchar(45) DEFAULT NULL,
    `genero` varchar(45) DEFAULT NULL,
    `seccion` varchar(45) DEFAULT NULL,
    `trailer` varchar(45) DEFAULT NULL,
    `imagen` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3