-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 01, 2024 at 05:08 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_petshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `form_service`
--

CREATE TABLE `form_service` (
  `id` int(11) NOT NULL,
  `Name_Owner` varchar(255) DEFAULT NULL,
  `Name_Animal` varchar(255) DEFAULT NULL,
  `birthday_Animal` datetime NOT NULL,
  `Jenis` varchar(255) DEFAULT NULL,
  `RAS` varchar(255) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `kategori_service` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `form_service`
--

INSERT INTO `form_service` (`id`, `Name_Owner`, `Name_Animal`, `birthday_Animal`, `Jenis`, `RAS`, `Quantity`, `kategori_service`, `createdAt`, `updatedAt`) VALUES
(1, 'Ellyn Mariana', 'dudu2', '2021-01-01 00:00:00', 'anjing', 'buldog', 3, 1, '2024-08-31 21:36:01', '2024-08-31 21:36:01');

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `id` int(11) NOT NULL,
  `nameKategori` varchar(255) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id`, `nameKategori`, `Description`, `createdAt`, `updatedAt`) VALUES
(11, 'Kucing', 'Jenis makanan untuk kucing', '2024-08-28 18:16:25', '2024-08-28 18:16:25'),
(13, 'anjing', 'makanan anjing', '2024-08-28 19:07:30', '2024-08-28 19:07:30'),
(14, 'ular', 'makanan ular', '2024-08-29 11:57:18', '2024-08-29 11:57:18'),
(15, 'kelinci', 'makanan kelinci', '2024-08-29 11:57:31', '2024-08-29 11:57:31');

-- --------------------------------------------------------

--
-- Table structure for table `kategori_service`
--

CREATE TABLE `kategori_service` (
  `id` int(11) NOT NULL,
  `nameKategori` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kategori_service`
--

INSERT INTO `kategori_service` (`id`, `nameKategori`, `createdAt`, `updatedAt`) VALUES
(1, 'Grooming Cat', '2024-08-31 19:50:54', '2024-08-31 19:50:54'),
(3, 'pet Boarding', '2024-08-31 20:11:01', '2024-08-31 20:11:01');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `kategori_id` int(11) DEFAULT NULL,
  `price` decimal(20,2) DEFAULT NULL,
  `stock` int(11) DEFAULT 0,
  `description` mediumtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `role` enum('admin','customer') DEFAULT 'customer',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'Agustinus Sitompul', 'tinus0@gmail.com', '$2b$10$Znvq5BbJ3iGVjrBpm9fBRe/omD5V4hOIohd/cyjIUvhoLWObAuImC', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJBZ3VzdGludXMgU2l0b21wdWwiLCJlbWFpbCI6InRpbnVzMEBnbWFpbC5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWF0IjoxNzI1MTI3MzkyLCJleHAiOjE3MjUxMzA5OTJ9.OT_VmACvrnEymkTszMyaDrt_VxkXx6HoLnb5Fr_BQrI', 'admin', '2024-08-18 15:37:02', '2024-08-31 18:03:12'),
(3, 'Customer1', 'customer01@gmail.com', '$2b$10$f9oETLkbAPL3Mo7K9okzHOwzGnUxGXeQROPVZ.La1gqFgRlIftoz.', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsIm5hbWUiOiJDdXN0b21lcjEiLCJlbWFpbCI6ImN1c3RvbWVyMDFAZ21haWwuY29tIiwidXNlclJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcyMzk5ODkzMCwiZXhwIjoxNzI0MDAyNTMwfQ.cS_BoKAjFqwZbVGIAYPO62emRLtmG711EeUegsWrJSo', 'customer', '2024-08-18 16:28:52', '2024-08-18 16:35:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `form_service`
--
ALTER TABLE `form_service`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategori_service` (`kategori_service`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kategori_service`
--
ALTER TABLE `kategori_service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategori_id` (`kategori_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `form_service`
--
ALTER TABLE `form_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `kategori_service`
--
ALTER TABLE `kategori_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `form_service`
--
ALTER TABLE `form_service`
  ADD CONSTRAINT `form_service_ibfk_1` FOREIGN KEY (`kategori_service`) REFERENCES `kategori_service` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`kategori_id`) REFERENCES `kategori` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
