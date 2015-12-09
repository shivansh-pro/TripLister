-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 09, 2015 at 03:35 PM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `triplister`
--

-- --------------------------------------------------------

--
-- Table structure for table `data`
--

CREATE TABLE IF NOT EXISTS `data` (
  `id` varchar(100) NOT NULL,
  `start_place` varchar(250) NOT NULL,
  `places` varchar(10000) NOT NULL,
  `coordinates` varchar(1000) NOT NULL,
  `place_types` varchar(1000) NOT NULL,
  `timestamp` varchar(30) NOT NULL,
  `time_map` varchar(10) NOT NULL,
  `responses` varchar(1000) NOT NULL,
  `time_questions` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data`
--

INSERT INTO `data` (`id`, `start_place`, `places`, `coordinates`, `place_types`, `timestamp`, `time_map`, `responses`, `time_questions`) VALUES
('Random_QRVfL5BCz2', 'Gainesville Alachua County FL', 'Keystone Airpark|Cafe C', '(29.843901, -82.05059790000001)|(29.6595917, -82.32968060000002)', 'airport|cafe', 'Mon, 23 Nov 2015 12:29:56 GMT', '31.301', '0', ''),
('Random_rGPU4zPufz', 'Gainesville Alachua County FL', 'Gainesville Regional Airport|Silver Springs|Flying Biscuit Cafe|Aquatic Center', '(29.686569, -82.27673449999998)|(29.2021277, -82.0407485)|(29.6748447, -82.3878747)|(29.8251768, -82.59766580000002)', 'airport|park|cafe|aquarium', 'Mon, 23 Nov 2015 12:25:32 GMT', '85.543', '0', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data`
--
ALTER TABLE `data`
  ADD PRIMARY KEY (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
