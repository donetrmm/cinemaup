CREATE TABLE
  `movieseries` (
    `id` int NOT NULL,
    `titulo` varchar(45) DEFAULT NULL,
    `descripcion` varchar(105) DEFAULT NULL,
    `fecha_estreno` varchar(45) DEFAULT NULL,
    `tipo` varchar(45) DEFAULT NULL,
    `genero` varchar(45) DEFAULT NULL,
    `seccion` varchar(45) DEFAULT NULL,
    `trailer` varchar(45) DEFAULT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb3