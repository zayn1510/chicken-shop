-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 28, 2024 at 04:23 PM
-- Server version: 8.0.39-0ubuntu0.22.04.1
-- PHP Version: 8.1.2-1ubuntu2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_shop_chicken`
--

-- --------------------------------------------------------

--
-- Table structure for table `bank`
--

CREATE TABLE `bank` (
  `id` bigint UNSIGNED NOT NULL,
  `nama_bank` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nomor_rekening` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `atas_nama` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bank`
--

INSERT INTO `bank` (`id`, `nama_bank`, `nomor_rekening`, `atas_nama`, `created_at`, `updated_at`) VALUES
(1, 'Bank BNI', '1234567890', 'PT Ayam', '2024-10-12 13:00:24', '2024-10-12 13:04:11'),
(2, 'Bank Mandiri', '1234567890', 'PT Ayam', '2024-10-12 13:01:18', '2024-10-12 13:04:28'),
(3, 'Bank BRI', '1234567890', 'PT Ayam', '2024-10-12 13:03:16', '2024-10-12 13:03:16');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint UNSIGNED NOT NULL,
  `userid` int NOT NULL,
  `nama_lengkap` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `userid`, `nama_lengkap`, `phone`, `alamat`, `created_at`, `updated_at`) VALUES
(12, 13, 'John Doe', '081234567890', 'Jl. Merdeka No. 123, Jakarta', '2024-09-02 05:42:42', '2024-09-02 05:42:42'),
(13, 14, '7m93N8cM32', '423611', 'RNcRrxbbbw', '2024-10-15 18:14:27', '2024-10-15 18:14:27'),
(14, 15, 'zaynmalik', '082297886738', 'Jln Ahmad Yani', '2024-10-15 19:21:32', '2024-10-15 19:21:32');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jenis_ayam`
--

CREATE TABLE `jenis_ayam` (
  `id` bigint UNSIGNED NOT NULL,
  `jenis` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `keterangan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `berat` float NOT NULL,
  `harga` float NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `stok` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jenis_ayam`
--

INSERT INTO `jenis_ayam` (`id`, `jenis`, `keterangan`, `berat`, `harga`, `created_at`, `updated_at`, `stok`) VALUES
(16, 'Ayam Biasa', 'pilihan ayam potong dengan ukuran standar, biasanya beratnya sekitar 0.8 - 1.2 kg per ekor. Meski berukuran lebih kecil dibanding jenis jumbo, ayam biasa tetap memiliki kualitas daging yang lembut, segar, dan juicy.', 1.5, 150000, '2024-10-08 23:45:16', '2024-10-27 08:27:22', 93),
(17, 'Ayam Jumbo', 'pilihan ayam potong dengan ukuran standar, biasanya beratnya sekitar 0.8 - 1.2 kg per ekor. Meski berukuran lebih kecil dibanding jenis jumbo, ayam biasa tetap memiliki kualitas daging yang lembut, segar, dan juicy.', 2, 200000, '2024-10-08 23:45:41', '2024-10-27 08:27:22', 97),
(18, 'Ayam Super Jumbo', 'pilihan ayam potong dengan ukuran standar, biasanya beratnya sekitar 0.8 - 1.2 kg per ekor. Meski berukuran lebih kecil dibanding jenis jumbo, ayam biasa tetap memiliki kualitas daging yang lembut, segar, dan juicy.', 3, 300000, '2024-10-08 23:45:53', '2024-10-25 02:06:26', 99);

-- --------------------------------------------------------

--
-- Table structure for table `keranjang`
--

CREATE TABLE `keranjang` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int NOT NULL,
  `ayam` int NOT NULL,
  `jumlah` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `keranjang`
--

INSERT INTO `keranjang` (`id`, `user_id`, `ayam`, `jumlah`, `created_at`, `updated_at`) VALUES
(1, 1, 16, 10, '2024-10-10 21:24:18', '2024-10-10 21:24:18'),
(2, 1, 17, 10, '2024-10-10 22:52:27', '2024-10-10 22:52:27');

-- --------------------------------------------------------

--
-- Table structure for table `konfirmasi_pembayaran`
--

CREATE TABLE `konfirmasi_pembayaran` (
  `id` bigint UNSIGNED NOT NULL,
  `transaksi` int NOT NULL,
  `foto_pembayaran` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `konfirmasi_pembayaran`
--

INSERT INTO `konfirmasi_pembayaran` (`id`, `transaksi`, `foto_pembayaran`, `status`, `created_at`, `updated_at`) VALUES
(8, 12, '1729850799.jpg', 2, '2024-10-25 02:06:39', '2024-10-25 02:07:13');

-- --------------------------------------------------------

--
-- Table structure for table `metode_pembayarans`
--

CREATE TABLE `metode_pembayarans` (
  `id` bigint UNSIGNED NOT NULL,
  `nama_metode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `metode_pembayarans`
--

INSERT INTO `metode_pembayarans` (`id`, `nama_metode`, `deskripsi`, `created_at`, `updated_at`) VALUES
(1, 'Transfer Bank', 'Transfer Bank', '2024-10-12 15:11:10', '2024-10-12 15:11:10'),
(2, 'COD', 'COD', '2024-10-12 15:11:22', '2024-10-12 15:11:22');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_08_05_162836_add_username_to_users', 2),
(6, '2024_08_06_084330_add_role_to_users_table', 3),
(7, '2024_08_06_091954_create_produk_table', 4),
(9, '2024_08_06_092113_create_produk_table', 5),
(10, '2024_09_02_095305_create_customers_table', 6),
(11, '2024_09_17_081002_create_table_produk_media', 7),
(12, '2024_09_17_090327_create_produk_media', 8),
(13, '2024_10_07_142841_drop_column_produk', 9),
(14, '2024_10_07_142913_add_column_produk', 10),
(15, '2024_10_07_145359_create_jenis_ayam', 11),
(16, '2024_10_09_082815_add_colomn_to_jenis_ayam', 12),
(17, '2024_10_09_083305_create_stok_masuk', 13),
(18, '2024_10_09_120216_add_colomn_to_stok_masuk', 14),
(19, '2024_10_09_120445_add_date_to_stok_masuk', 15),
(20, '2024_10_11_025806_create_keranjang', 16),
(21, '2024_10_11_075215_create_orders', 17),
(22, '2024_10_11_080330_create_order_details', 18),
(23, '2024_10_11_081256_add_nomor_order', 19),
(24, '2024_10_12_203041_create_metode_pembayarans_table', 20),
(25, '2024_10_12_203215_create_transaksi_pembayarans_table', 21),
(26, '2024_10_12_203936_create_bank', 21),
(27, '2024_10_13_234354_add_bank_id', 22),
(28, '2024_10_17_015145_rename_stok_masuk_to_stok_ayam', 23),
(29, '2024_10_17_015425_add_jenis_stok', 24),
(30, '2024_10_17_094625_create_konfirmasi_pembayaran', 25);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` int NOT NULL,
  `total` float NOT NULL,
  `status` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `nomor_order` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total`, `status`, `created_at`, `updated_at`, `nomor_order`) VALUES
(32, 15, 1250000, 1, '2024-10-25 02:06:26', '2024-10-25 02:06:26', 'ORD202410250001'),
(33, 15, 700000, 1, '2024-10-27 08:27:22', '2024-10-27 08:27:22', 'ORD202410270033');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id` bigint UNSIGNED NOT NULL,
  `order_id` int NOT NULL,
  `ayam` int NOT NULL,
  `jumlah` int NOT NULL,
  `harga` double(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`id`, `order_id`, `ayam`, `jumlah`, `harga`, `created_at`, `updated_at`) VALUES
(48, 32, 16, 5, 150000.00, '2024-10-25 02:06:26', '2024-10-25 02:06:26'),
(49, 32, 17, 1, 200000.00, '2024-10-25 02:06:26', '2024-10-25 02:06:26'),
(50, 32, 18, 1, 300000.00, '2024-10-25 02:06:26', '2024-10-25 02:06:26'),
(51, 33, 16, 2, 150000.00, '2024-10-27 08:27:22', '2024-10-27 08:27:22'),
(52, 33, 17, 2, 200000.00, '2024-10-27 08:27:22', '2024-10-27 08:27:22');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `produk_media`
--

CREATE TABLE `produk_media` (
  `id` bigint UNSIGNED NOT NULL,
  `media_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `media_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `produk_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `produk_media`
--

INSERT INTO `produk_media` (`id`, `media_type`, `media_url`, `thumbnail_url`, `produk_id`, `created_at`, `updated_at`) VALUES
(34, 'image/png', '1729844424.png', '1729844424.png', 16, '2024-10-25 00:20:24', '2024-10-25 00:20:24'),
(35, 'image/png', '1729844453.png', '1729844453.png', 17, '2024-10-25 00:20:53', '2024-10-25 00:20:53'),
(36, 'image/png', '1729844465.png', '1729844465.png', 18, '2024-10-25 00:21:05', '2024-10-25 00:21:05');

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`id`, `name`, `description`, `address`, `phone`, `email`, `website`, `logo`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Farid Broiler', 'Potong', 'Jln Ahmad Yani', '082297886739', 'zayndev@gmail.com', 'www.potongfresh.com', '1729763438.jpeg', '1729763438.png', '2024-10-22 13:29:38', '2024-10-27 20:11:38');

-- --------------------------------------------------------

--
-- Table structure for table `stok_ayam`
--

CREATE TABLE `stok_ayam` (
  `id` bigint UNSIGNED NOT NULL,
  `jenis_ayam` int NOT NULL,
  `jumlah` int NOT NULL,
  `tanggal_masuk` date NOT NULL DEFAULT '1970-01-01',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `jenis_stok` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `stok_ayam`
--

INSERT INTO `stok_ayam` (`id`, `jenis_ayam`, `jumlah`, `tanggal_masuk`, `created_at`, `updated_at`, `jenis_stok`) VALUES
(48, 16, 100, '2024-10-25', '2024-10-24 23:45:33', '2024-10-24 23:45:33', 1),
(49, 17, 100, '2024-10-25', '2024-10-24 23:53:33', '2024-10-24 23:53:33', 1),
(50, 18, 100, '2024-10-25', '2024-10-24 23:53:46', '2024-10-24 23:53:46', 1),
(60, 16, 5, '2024-10-25', '2024-10-25 02:06:26', '2024-10-25 02:06:26', 2),
(61, 17, 1, '2024-10-25', '2024-10-25 02:06:26', '2024-10-25 02:06:26', 2),
(62, 18, 1, '2024-10-25', '2024-10-25 02:06:26', '2024-10-25 02:06:26', 2),
(63, 16, 2, '2024-10-27', '2024-10-27 08:27:22', '2024-10-27 08:27:22', 2),
(64, 17, 2, '2024-10-27', '2024-10-27 08:27:22', '2024-10-27 08:27:22', 2);

-- --------------------------------------------------------

--
-- Table structure for table `transaksi_pembayarans`
--

CREATE TABLE `transaksi_pembayarans` (
  `id` bigint UNSIGNED NOT NULL,
  `order_id` bigint UNSIGNED NOT NULL,
  `metode_id` bigint UNSIGNED NOT NULL,
  `bank_id` int NOT NULL DEFAULT '0',
  `total` float NOT NULL,
  `status` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transaksi_pembayarans`
--

INSERT INTO `transaksi_pembayarans` (`id`, `order_id`, `metode_id`, `bank_id`, `total`, `status`, `created_at`, `updated_at`) VALUES
(12, 32, 1, 1, 1250000, 4, '2024-10-25 02:06:26', '2024-10-25 02:07:55'),
(13, 33, 2, 0, 700000, 3, '2024-10-27 08:27:22', '2024-10-27 20:03:54');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `username` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `username`, `roles`) VALUES
(1, 'Farid Broiler', 'admin@gmail.com', NULL, '$2y$12$C6WED5clW34Kz.C4ET7FoO1WySOJSwjnJd4yhbLdnsh1q.9MK6d/.', NULL, '2024-08-05 08:37:19', '2024-10-27 20:47:25', 'admin1510', 0),
(13, 'John Doe', 'johndoe11@example.com', NULL, '$2y$12$uNrNuYR/q4HP9CuH15eR.OkIvM4UQdy/i8Tr9.DTbpjtRudBsuG.C', NULL, '2024-09-02 05:42:42', '2024-09-02 05:42:42', 'johndoe123', 1),
(14, '7m93N8cM32', '1hvv7@twtw.com', NULL, '$2y$12$RNmva5erKAreBEYOntt1JeXrlr5wjDlFxUrHWl7hcfyt1xAxfce4K', NULL, '2024-10-15 18:14:27', '2024-10-15 18:14:27', 'Dht6q3Viqo', 2),
(15, 'zaynmalik', 'zayn@gmail.com', NULL, '$2y$12$kEbjfP/m/AYnY5/.9BVfiuXpJfV.su8RL2iRycHonKxceSBOWk8Ay', NULL, '2024-10-15 19:21:32', '2024-10-15 19:21:32', 'zayn123', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bank`
--
ALTER TABLE `bank`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jenis_ayam`
--
ALTER TABLE `jenis_ayam`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `keranjang`
--
ALTER TABLE `keranjang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `konfirmasi_pembayaran`
--
ALTER TABLE `konfirmasi_pembayaran`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `metode_pembayarans`
--
ALTER TABLE `metode_pembayarans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orders_nomor_order_unique` (`nomor_order`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `produk_media`
--
ALTER TABLE `produk_media`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stok_ayam`
--
ALTER TABLE `stok_ayam`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaksi_pembayarans`
--
ALTER TABLE `transaksi_pembayarans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bank`
--
ALTER TABLE `bank`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jenis_ayam`
--
ALTER TABLE `jenis_ayam`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `keranjang`
--
ALTER TABLE `keranjang`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `konfirmasi_pembayaran`
--
ALTER TABLE `konfirmasi_pembayaran`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `metode_pembayarans`
--
ALTER TABLE `metode_pembayarans`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `produk_media`
--
ALTER TABLE `produk_media`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `stok_ayam`
--
ALTER TABLE `stok_ayam`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `transaksi_pembayarans`
--
ALTER TABLE `transaksi_pembayarans`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
