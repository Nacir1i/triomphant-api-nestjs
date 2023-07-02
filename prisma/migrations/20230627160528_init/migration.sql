-- CreateTable
CREATE TABLE `appointment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `due_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `category_id` INTEGER NOT NULL,
    `order_id` INTEGER NULL,
    `customer_id` INTEGER NULL,
    `delivery_invoice_id` INTEGER NULL,
    `taxed_invoice_id` INTEGER NULL,

    INDEX `appointment_order_id_idx`(`order_id`),
    INDEX `appointment_delivery_invoice_id_idx`(`delivery_invoice_id`),
    INDEX `appointment_category_id_idx`(`category_id`),
    INDEX `appointment_customer_id_idx`(`customer_id`),
    INDEX `appointment_taxed_invoice_id_idx`(`taxed_invoice_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bank_information` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `number` VARCHAR(191) NULL,
    `rib` VARCHAR(191) NULL,
    `swift` VARCHAR(191) NULL,
    `ice` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact_information` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `honorific` VARCHAR(191) NULL,
    `emergency` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cost_modifier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shipping` DOUBLE NOT NULL,
    `discount` INTEGER NOT NULL,
    `is_discount_percentage` BOOLEAN NOT NULL,
    `tax` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `contact_information_id` INTEGER NOT NULL,
    `bank_information_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `customer_contact_information_id_idx`(`contact_information_id`),
    INDEX `customer_bank_information_id_idx`(`bank_information_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer_log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `customer_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `customer_log_customer_id_idx`(`customer_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `delivery_invoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` INTEGER NOT NULL,
    `order_id` INTEGER NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `delivery_invoice_order_id_key`(`order_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `delivery_invoice_material` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `remaining` INTEGER NOT NULL,
    `delivery_invoice_id` INTEGER NOT NULL,
    `material_id` INTEGER NOT NULL,

    INDEX `delivery_invoice_material_delivery_invoice_id_idx`(`delivery_invoice_id`),
    INDEX `delivery_invoice_material_material_id_idx`(`material_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `delivery_invoice_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `delivery_invoice_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `delivery_invoice_user_delivery_invoice_id_idx`(`delivery_invoice_id`),
    INDEX `delivery_invoice_user_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoice_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `manual_delivery_invoice_content` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cost` DOUBLE NOT NULL DEFAULT 0,
    `price` DOUBLE NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `delivery_invoice_id` INTEGER NOT NULL,

    INDEX `manual_delivery_invoice_content_delivery_invoice_id_idx`(`delivery_invoice_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `manual_order_content` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cost` DOUBLE NOT NULL DEFAULT 0,
    `price` DOUBLE NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `order_id` INTEGER NOT NULL,

    INDEX `manual_order_content_order_id_idx`(`order_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `manual_package_content` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cost` DOUBLE NOT NULL DEFAULT 0,
    `price` DOUBLE NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `package_id` INTEGER NOT NULL,

    INDEX `manual_package_content_package_id_idx`(`package_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `manual_quote_content` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cost` DOUBLE NOT NULL DEFAULT 0,
    `price` DOUBLE NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `quote_id` INTEGER NOT NULL,

    INDEX `manual_quote_content_quote_id_idx`(`quote_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `material` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sku` VARCHAR(191) NOT NULL DEFAULT '',
    `price` DOUBLE NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `category_id` INTEGER NULL,
    `description` VARCHAR(191) NULL,
    `quantity` INTEGER NULL,
    `quantity_threshold` INTEGER NULL,
    `location_id` INTEGER NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `material_location_id_idx`(`location_id`),
    INDEX `material_category_id_idx`(`category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `paid` DOUBLE NOT NULL DEFAULT 0,
    `price` DOUBLE NOT NULL,
    `note` VARCHAR(191) NULL,
    `delivery_address` VARCHAR(191) NULL,
    `due_date` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` INTEGER NOT NULL,
    `customer_id` INTEGER NOT NULL,
    `quote_id` INTEGER NULL,
    `cost_modifier_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `order_ref_key`(`ref`),
    UNIQUE INDEX `order_quote_id_key`(`quote_id`),
    INDEX `order_category_id_idx`(`category_id`),
    INDEX `order_customer_id_idx`(`customer_id`),
    INDEX `order_cost_modifier_id_idx`(`cost_modifier_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_package` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cost` INTEGER NOT NULL DEFAULT 0,
    `price` INTEGER NOT NULL DEFAULT 0,
    `quantity` INTEGER NOT NULL,
    `order_id` INTEGER NOT NULL,
    `package_id` INTEGER NOT NULL,

    INDEX `order_package_package_id_idx`(`package_id`),
    INDEX `order_package_order_id_idx`(`order_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,
    `method` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `paid_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `order_id` INTEGER NOT NULL,

    INDEX `order_payment_order_id_idx`(`order_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cost` INTEGER NOT NULL DEFAULT 0,
    `price` INTEGER NOT NULL DEFAULT 0,
    `quantity` INTEGER NOT NULL,
    `order_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,

    INDEX `order_product_order_id_idx`(`order_id`),
    INDEX `order_product_product_id_idx`(`product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cost` INTEGER NOT NULL DEFAULT 0,
    `price` INTEGER NOT NULL DEFAULT 0,
    `quantity` INTEGER NOT NULL,
    `order_id` INTEGER NOT NULL,
    `service_id` INTEGER NOT NULL,

    INDEX `order_service_order_id_idx`(`order_id`),
    INDEX `order_service_service_id_idx`(`service_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `package` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `category_id` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `package_category_id_idx`(`category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `package_product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `package_id` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL DEFAULT 0,
    `cost` DOUBLE NOT NULL DEFAULT 0,

    INDEX `package_product_package_id_idx`(`package_id`),
    INDEX `package_product_product_id_idx`(`product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `package_service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `service_id` INTEGER NOT NULL,
    `package_id` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL DEFAULT 0,
    `cost` DOUBLE NOT NULL DEFAULT 0,

    INDEX `package_service_package_id_idx`(`package_id`),
    INDEX `package_service_service_id_idx`(`service_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cost` DOUBLE NOT NULL,
    `price` DOUBLE NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `barcode` VARCHAR(191) NULL,
    `sku` VARCHAR(191) NULL,
    `quantity` INTEGER NULL,
    `quantity_threshold` INTEGER NULL,
    `location_id` INTEGER NULL,
    `category_id` INTEGER NOT NULL,
    `vendor_invoice_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `product_location_id_idx`(`location_id`),
    INDEX `product_category_id_idx`(`category_id`),
    INDEX `product_vendor_invoice_id_idx`(`vendor_invoice_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventory_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `due_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `address` VARCHAR(191) NOT NULL DEFAULT '',
    `status` INTEGER NOT NULL,
    `customer_id` INTEGER NOT NULL,
    `cost_modifier_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `quote_ref_key`(`ref`),
    INDEX `quote_customer_id_idx`(`customer_id`),
    INDEX `quote_cost_modifier_id_idx`(`cost_modifier_id`),
    INDEX `quote_category_id_idx`(`category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quote_package` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `quote_id` INTEGER NOT NULL,
    `package_id` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL DEFAULT 0,
    `cost` DOUBLE NOT NULL DEFAULT 0,

    INDEX `quote_package_quote_id_idx`(`quote_id`),
    INDEX `quote_package_package_id_idx`(`package_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quote_product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `quote_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL DEFAULT 0,
    `cost` DOUBLE NOT NULL DEFAULT 0,

    INDEX `quote_product_quote_id_idx`(`quote_id`),
    INDEX `quote_product_product_id_idx`(`product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quote_service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `quote_id` INTEGER NOT NULL,
    `service_id` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL DEFAULT 0,
    `cost` DOUBLE NOT NULL DEFAULT 0,

    INDEX `quote_service_quote_id_idx`(`quote_id`),
    INDEX `quote_service_service_id_idx`(`service_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `cost` DOUBLE NOT NULL,
    `price` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `category_id` INTEGER NULL,

    INDEX `service_category_id_idx`(`category_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `image_url` MEDIUMTEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `recruited_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `birth_date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `salary` INTEGER NULL,
    `status` INTEGER NULL,
    `role_id` INTEGER NOT NULL,
    `contact_information_id` INTEGER NOT NULL,
    `bank_information_id` INTEGER NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `user_role_id_idx`(`role_id`),
    INDEX `user_contact_information_id_idx`(`contact_information_id`),
    INDEX `user_bank_information_id_idx`(`bank_information_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `user_log_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,
    `method` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `paid_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `employee_id` INTEGER NOT NULL,

    INDEX `user_payment_employee_id_idx`(`employee_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vendor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `company_name` VARCHAR(191) NOT NULL,
    `contact_information_id` INTEGER NOT NULL,
    `bank_information_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `vendor_contact_information_id_idx`(`contact_information_id`),
    INDEX `vendor_bank_information_id_idx`(`bank_information_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vendor_log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `vendor_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `vendor_log_vendor_id_idx`(`vendor_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vendor_invoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `paid` DOUBLE NOT NULL DEFAULT 0,
    `price` DOUBLE NOT NULL,
    `note` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` INTEGER NOT NULL,
    `vendor_id` INTEGER NOT NULL,
    `cost_modifier_id` INTEGER NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `vendor_invoice_vendor_id_idx`(`vendor_id`),
    INDEX `vendor_invoice_cost_modifier_id_idx`(`cost_modifier_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vendor_invoice_payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,
    `method` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `paid_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `vendor_invoice_id` INTEGER NOT NULL,

    INDEX `vendor_invoice_payment_vendor_invoice_id_idx`(`vendor_invoice_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vendor_invoice_product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `vendor_invoice_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `remaining` INTEGER NOT NULL,

    INDEX `vendor_invoice_product_product_id_idx`(`product_id`),
    INDEX `vendor_invoice_product_vendor_invoice_id_idx`(`vendor_invoice_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer_comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(512) NOT NULL,
    `metadata` BLOB NOT NULL,
    `is_system` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `customer_id` INTEGER NOT NULL,
    `commenter_id` INTEGER NULL,
    `notification_id` INTEGER NULL,

    INDEX `customer_comment_customer_id_idx`(`customer_id`),
    INDEX `customer_comment_commenter_id_idx`(`commenter_id`),
    INDEX `customer_comment_notification_id_idx`(`notification_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer_comment_note` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `comment_id` INTEGER NOT NULL,
    `notification_id` INTEGER NULL,

    INDEX `customer_comment_note_comment_id_idx`(`comment_id`),
    INDEX `customer_comment_note_notification_id_idx`(`notification_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vendor_comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(512) NOT NULL,
    `metadata` BLOB NOT NULL,
    `is_system` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `vendor_id` INTEGER NOT NULL,
    `notification_id` INTEGER NULL,
    `commenter_id` INTEGER NULL,

    INDEX `vendor_comment_vendor_id_idx`(`vendor_id`),
    INDEX `vendor_comment_commenter_id_idx`(`commenter_id`),
    INDEX `vendor_comment_notification_id_idx`(`notification_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vendor_comment_note` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `comment_id` INTEGER NOT NULL,
    `notification_id` INTEGER NULL,

    INDEX `vendor_comment_note_comment_id_idx`(`comment_id`),
    INDEX `vendor_comment_note_notification_id_idx`(`notification_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(512) NOT NULL,
    `metadata` BLOB NOT NULL,
    `is_system` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `order_id` INTEGER NOT NULL,
    `commenter_id` INTEGER NULL,
    `notification_id` INTEGER NULL,

    INDEX `order_comment_order_id_idx`(`order_id`),
    INDEX `order_comment_commenter_id_idx`(`commenter_id`),
    INDEX `order_comment_notification_id_idx`(`notification_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_comment_note` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `comment_id` INTEGER NOT NULL,
    `notification_id` INTEGER NULL,

    INDEX `order_comment_note_comment_id_idx`(`comment_id`),
    INDEX `order_comment_note_notification_id_idx`(`notification_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quote_comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(512) NOT NULL,
    `metadata` BLOB NOT NULL,
    `is_system` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `quote_id` INTEGER NOT NULL,
    `notification_id` INTEGER NULL,
    `commenter_id` INTEGER NULL,

    INDEX `quote_comment_quote_id_idx`(`quote_id`),
    INDEX `quote_comment_commenter_id_idx`(`commenter_id`),
    INDEX `quote_comment_notification_id_idx`(`notification_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quote_comment_note` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `comment_id` INTEGER NOT NULL,
    `notification_id` INTEGER NULL,

    INDEX `quote_comment_note_comment_id_idx`(`comment_id`),
    INDEX `quote_comment_note_notification_id_idx`(`notification_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `delivery_invoice_comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(512) NOT NULL,
    `metadata` BLOB NOT NULL,
    `is_system` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `delivery_invoice_id` INTEGER NOT NULL,
    `notification_id` INTEGER NULL,
    `commenter_id` INTEGER NULL,

    INDEX `delivery_invoice_comment_delivery_invoice_id_idx`(`delivery_invoice_id`),
    INDEX `delivery_invoice_comment_commenter_id_idx`(`commenter_id`),
    INDEX `delivery_invoice_comment_notification_id_idx`(`notification_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `delivery_invoice_comment_note` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `comment_id` INTEGER NOT NULL,
    `notification_id` INTEGER NULL,

    INDEX `delivery_invoice_comment_note_comment_id_idx`(`comment_id`),
    INDEX `delivery_invoice_comment_note_notification_id_idx`(`notification_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointment_comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(512) NOT NULL,
    `metadata` BLOB NOT NULL,
    `is_system` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `appointment_id` INTEGER NOT NULL,
    `notification_id` INTEGER NULL,
    `commenter_id` INTEGER NULL,

    INDEX `appointment_comment_appointment_id_idx`(`appointment_id`),
    INDEX `appointment_comment_commenter_id_idx`(`commenter_id`),
    INDEX `appointment_comment_notification_id_idx`(`notification_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointment_comment_note` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `comment_id` INTEGER NOT NULL,
    `notification_id` INTEGER NULL,

    INDEX `appointment_comment_note_comment_id_idx`(`comment_id`),
    INDEX `appointment_comment_note_notification_id_idx`(`notification_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL DEFAULT 'unknown',
    `is_read` BOOLEAN NOT NULL DEFAULT false,
    `metadata` LONGBLOB NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `employee_id` INTEGER NOT NULL,

    INDEX `notification_employee_id_idx`(`employee_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taxed_invoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NOT NULL DEFAULT '',
    `title` VARCHAR(191) NOT NULL,
    `delivery_address` VARCHAR(191) NOT NULL DEFAULT '',
    `paid` DOUBLE NOT NULL DEFAULT 0,
    `price` DOUBLE NOT NULL,
    `status` INTEGER NOT NULL,
    `due_date` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `quote_id` INTEGER NULL,
    `order_id` INTEGER NULL,
    `delivery_invoice_id` INTEGER NULL,
    `category_id` INTEGER NOT NULL,
    `customer_id` INTEGER NOT NULL,
    `cost_modifier_id` INTEGER NOT NULL,

    UNIQUE INDEX `taxed_invoice_ref_key`(`ref`),
    UNIQUE INDEX `taxed_invoice_quote_id_key`(`quote_id`),
    UNIQUE INDEX `taxed_invoice_order_id_key`(`order_id`),
    INDEX `taxed_invoice_category_id_idx`(`category_id`),
    INDEX `taxed_invoice_customer_id_idx`(`customer_id`),
    INDEX `taxed_invoice_cost_modifier_id_idx`(`cost_modifier_id`),
    INDEX `taxed_invoice_delivery_invoice_id_idx`(`delivery_invoice_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taxed_invoice_manual_content` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cost` DOUBLE NOT NULL DEFAULT 0,
    `price` DOUBLE NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `taxed_invoice_id` INTEGER NOT NULL,

    INDEX `taxed_invoice_manual_content_taxed_invoice_id_idx`(`taxed_invoice_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taxed_invoice_package` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cost` INTEGER NOT NULL DEFAULT 0,
    `price` INTEGER NOT NULL DEFAULT 0,
    `quantity` INTEGER NOT NULL,
    `package_id` INTEGER NOT NULL,
    `taxed_invoice_id` INTEGER NOT NULL,

    INDEX `taxed_invoice_package_package_id_idx`(`package_id`),
    INDEX `taxed_invoice_package_taxed_invoice_id_idx`(`taxed_invoice_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taxed_invoice_payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,
    `method` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `paid_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `taxed_invoice_id` INTEGER NOT NULL,

    INDEX `taxed_invoice_payment_taxed_invoice_id_idx`(`taxed_invoice_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taxed_invoice_product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cost` INTEGER NOT NULL DEFAULT 0,
    `price` INTEGER NOT NULL DEFAULT 0,
    `quantity` INTEGER NOT NULL,
    `taxed_invoice_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,

    INDEX `taxed_invoice_product_taxed_invoice_id_idx`(`taxed_invoice_id`),
    INDEX `taxed_invoice_product_product_id_idx`(`product_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taxed_invoice_service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cost` INTEGER NOT NULL DEFAULT 0,
    `price` INTEGER NOT NULL DEFAULT 0,
    `quantity` INTEGER NOT NULL,
    `service_id` INTEGER NOT NULL,
    `taxed_invoice_id` INTEGER NOT NULL,

    INDEX `taxed_invoice_service_taxed_invoice_id_idx`(`taxed_invoice_id`),
    INDEX `taxed_invoice_service_service_id_idx`(`service_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taxed_invoice_comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(512) NOT NULL,
    `metadata` BLOB NOT NULL,
    `is_system` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `commenter_id` INTEGER NULL,
    `taxed_invoice_id` INTEGER NOT NULL,

    INDEX `taxed_invoice_comment_commenter_id_idx`(`commenter_id`),
    INDEX `taxed_invoice_comment_taxed_invoice_id_idx`(`taxed_invoice_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dev_contact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subject` VARCHAR(191) NOT NULL DEFAULT 'Subject',
    `message` VARCHAR(191) NOT NULL,
    `state` ENUM('IN_PROGRESS', 'PENDING', 'RESOLVED') NOT NULL DEFAULT 'PENDING',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `is_closed` BOOLEAN NOT NULL DEFAULT false,
    `sender_id` INTEGER NOT NULL,

    INDEX `dev_contact_sender_id_idx`(`sender_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contact_message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `message` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sender_id` INTEGER NOT NULL,
    `contact_id` INTEGER NOT NULL,

    INDEX `contact_message_sender_id_idx`(`sender_id`),
    INDEX `contact_message_contact_id_idx`(`contact_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `charge` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `type` ENUM('AUTO', 'MANUAL') NOT NULL,
    `state` ENUM('PAID', 'NOT_PAID') NOT NULL,
    `frequency` ENUM('NONE', 'DAILY', 'WEEKLY', 'BIWEEKLY', 'MONTHLY', 'TRIMESTER', 'SIX_MONTHS', 'YEARLY') NOT NULL,
    `paid_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `vendor_id` INTEGER NULL,

    INDEX `charge_vendor_id_idx`(`vendor_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `charge_payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL DEFAULT 'new Payment',
    `amount` DOUBLE NOT NULL,
    `method` ENUM('CASH') NOT NULL,
    `charge_id` INTEGER NOT NULL,
    `paid_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `charge_payment_charge_id_idx`(`charge_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
