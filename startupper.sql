-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 27, 2020 at 09:12 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.3.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `startupper`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `email` varchar(150) COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(250) COLLATE utf8mb4_bin NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`email`, `password`, `id`) VALUES
('admin@demo.com', '@123qwer', 1);

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `CLIENT_ID` bigint(20) NOT NULL,
  `CLIENT_NAME` varchar(1024) COLLATE utf8mb4_bin DEFAULT NULL,
  `CITY` varchar(1024) COLLATE utf8mb4_bin DEFAULT NULL,
  `COUNTRY` varchar(1024) COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `EMPLOYEE_NAME` varchar(1024) COLLATE utf8mb4_bin DEFAULT NULL,
  `STATUS` varchar(1024) COLLATE utf8mb4_bin DEFAULT NULL,
  `BIRTHDAY` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `PROJECTS_DONE` int(8) DEFAULT NULL,
  `EMPLOYED_SINCE` timestamp NOT NULL DEFAULT current_timestamp(),
  `EMPLOYEE_ID` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `finance`
--

CREATE TABLE `finance` (
  `FINANCE_ID` bigint(20) NOT NULL,
  `PROJECT_PRICE` bigint(20) DEFAULT NULL,
  `PROJECT_PAID` bigint(20) DEFAULT NULL,
  `IS_PROJECT_PAID` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `PROJECT_ID` bigint(20) NOT NULL,
  `CLIENT_ID` bigint(20) DEFAULT NULL,
  `FINANCE_ID` bigint(20) DEFAULT NULL,
  `PROJECT_NAME` varchar(1024) COLLATE utf8mb4_bin DEFAULT NULL,
  `DESCRIPTION` text COLLATE utf8mb4_bin DEFAULT NULL,
  `START_DATE` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `END_DATE` timestamp NULL DEFAULT current_timestamp(),
  `PAYMENT_CURRENCY` varchar(255) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- --------------------------------------------------------

--
-- Table structure for table `project_with_employees`
--

CREATE TABLE `project_with_employees` (
  `PROJECT_WITH_EMPLOYEE_ID` bigint(20) NOT NULL,
  `EMPLOYEE_ID` bigint(20) DEFAULT NULL,
  `PROJECT_ID` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`CLIENT_ID`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`EMPLOYEE_ID`);

--
-- Indexes for table `finance`
--
ALTER TABLE `finance`
  ADD PRIMARY KEY (`FINANCE_ID`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`PROJECT_ID`),
  ADD KEY `FK_RELATIONSHIP_3` (`CLIENT_ID`),
  ADD KEY `FK_RELATIONSHIP_4` (`FINANCE_ID`);

--
-- Indexes for table `project_with_employees`
--
ALTER TABLE `project_with_employees`
  ADD PRIMARY KEY (`PROJECT_WITH_EMPLOYEE_ID`),
  ADD KEY `FK_RELATIONSHIP_1` (`PROJECT_ID`),
  ADD KEY `FK_RELATIONSHIP_2` (`EMPLOYEE_ID`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `CLIENT_ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `EMPLOYEE_ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `finance`
--
ALTER TABLE `finance`
  MODIFY `FINANCE_ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `PROJECT_ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `project_with_employees`
--
ALTER TABLE `project_with_employees`
  MODIFY `PROJECT_WITH_EMPLOYEE_ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `FK_RELATIONSHIP_3` FOREIGN KEY (`CLIENT_ID`) REFERENCES `client` (`CLIENT_ID`),
  ADD CONSTRAINT `FK_RELATIONSHIP_4` FOREIGN KEY (`FINANCE_ID`) REFERENCES `finance` (`FINANCE_ID`);

--
-- Constraints for table `project_with_employees`
--
ALTER TABLE `project_with_employees`
  ADD CONSTRAINT `FK_RELATIONSHIP_1` FOREIGN KEY (`PROJECT_ID`) REFERENCES `project` (`PROJECT_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
