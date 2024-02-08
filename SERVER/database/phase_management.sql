-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 06, 2024 at 10:28 PM
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
-- Database: `phase_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `background`
--

CREATE TABLE `background` (
  `_id` int(255) NOT NULL,
  `slot_id` int(255) NOT NULL,
  `phase_no` int(70) NOT NULL,
  `files` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `posX` int(20) NOT NULL,
  `posY` int(20) NOT NULL,
  `width` int(20) NOT NULL,
  `height` int(20) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `button`
--

CREATE TABLE `button` (
  `_id` int(255) NOT NULL,
  `slot_id` int(255) NOT NULL,
  `link_normal` varchar(1000) NOT NULL,
  `link_hover` varchar(1000) NOT NULL,
  `link_click` varchar(1000) NOT NULL,
  `text` text NOT NULL,
  `posX` int(20) NOT NULL,
  `posY` int(20) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `elements`
--

CREATE TABLE `elements` (
  `_id` int(255) NOT NULL,
  `slot_id` int(255) NOT NULL,
  `phase_no` int(70) NOT NULL,
  `files` varchar(1000) NOT NULL,
  `posX` int(20) NOT NULL,
  `posY` int(20) NOT NULL,
  `scale` int(20) NOT NULL,
  `animation` varchar(1000) NOT NULL,
  `time` time NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `slot`
--

CREATE TABLE `slot` (
  `_id` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(1000) DEFAULT NULL,
  `create_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `text`
--

CREATE TABLE `text` (
  `_id` int(255) NOT NULL,
  `slot_id` int(255) NOT NULL,
  `phase_no` int(70) NOT NULL,
  `text` text NOT NULL,
  `posX` int(20) DEFAULT NULL,
  `posY` int(20) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `background`
--
ALTER TABLE `background`
  ADD PRIMARY KEY (`_id`),
  ADD KEY `slot_foreign_key_with_background` (`slot_id`);

--
-- Indexes for table `button`
--
ALTER TABLE `button`
  ADD PRIMARY KEY (`_id`),
  ADD KEY `slot_foreign_key_with_button` (`slot_id`);

--
-- Indexes for table `elements`
--
ALTER TABLE `elements`
  ADD PRIMARY KEY (`_id`),
  ADD KEY `slot_foreign_key_with_elements` (`slot_id`);

--
-- Indexes for table `slot`
--
ALTER TABLE `slot`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `text`
--
ALTER TABLE `text`
  ADD PRIMARY KEY (`_id`),
  ADD KEY `slot_foreign_key` (`slot_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `background`
--
ALTER TABLE `background`
  MODIFY `_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `button`
--
ALTER TABLE `button`
  MODIFY `_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `elements`
--
ALTER TABLE `elements`
  MODIFY `_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `slot`
--
ALTER TABLE `slot`
  MODIFY `_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `text`
--
ALTER TABLE `text`
  MODIFY `_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `background`
--
ALTER TABLE `background`
  ADD CONSTRAINT `slot_foreign_key_with_background` FOREIGN KEY (`slot_id`) REFERENCES `slot` (`_id`);

--
-- Constraints for table `button`
--
ALTER TABLE `button`
  ADD CONSTRAINT `slot_foreign_key_with_button` FOREIGN KEY (`slot_id`) REFERENCES `slot` (`_id`);

--
-- Constraints for table `elements`
--
ALTER TABLE `elements`
  ADD CONSTRAINT `slot_foreign_key_with_elements` FOREIGN KEY (`slot_id`) REFERENCES `slot` (`_id`);

--
-- Constraints for table `text`
--
ALTER TABLE `text`
  ADD CONSTRAINT `slot_foreign_key` FOREIGN KEY (`slot_id`) REFERENCES `slot` (`_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
