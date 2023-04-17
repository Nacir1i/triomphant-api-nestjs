-- CreateTable
CREATE TABLE "appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "due_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "customer_id" INTEGER,
    "order_id" INTEGER,
    "delivery_invoice_id" INTEGER,
    CONSTRAINT "appointment_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "invoice_category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "appointment_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "appointment_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "appointment_delivery_invoice_id_fkey" FOREIGN KEY ("delivery_invoice_id") REFERENCES "delivery_invoice" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "bank_information" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "number" TEXT,
    "rib" TEXT,
    "swift" TEXT,
    "ice" TEXT
);

-- CreateTable
CREATE TABLE "contact_information" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "address" TEXT,
    "honorific" TEXT,
    "emergency" BOOLEAN
);

-- CreateTable
CREATE TABLE "cost_modifier" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shipping" REAL NOT NULL,
    "discount" INTEGER NOT NULL,
    "is_discount_percentage" BOOLEAN NOT NULL,
    "tax" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "contact_information_id" INTEGER NOT NULL,
    "bank_information_id" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "customer_contact_information_id_fkey" FOREIGN KEY ("contact_information_id") REFERENCES "contact_information" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "customer_bank_information_id_fkey" FOREIGN KEY ("bank_information_id") REFERENCES "bank_information" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "customer_log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "customer_log_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "delivery_invoice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "note" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "delivery_invoice_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "invoice_category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "delivery_invoice_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "delivery_invoice_product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "remaining" INTEGER NOT NULL,
    "delivery_invoice_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    CONSTRAINT "delivery_invoice_product_delivery_invoice_id_fkey" FOREIGN KEY ("delivery_invoice_id") REFERENCES "delivery_invoice" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "delivery_invoice_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "delivery_invoice_user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "delivery_invoice_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    CONSTRAINT "delivery_invoice_user_delivery_invoice_id_fkey" FOREIGN KEY ("delivery_invoice_id") REFERENCES "delivery_invoice" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "delivery_invoice_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "invoice_category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "manual_delivery_invoice_content" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "price" REAL NOT NULL,
    "title" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "delivery_invoice_id" INTEGER NOT NULL,
    CONSTRAINT "manual_delivery_invoice_content_delivery_invoice_id_fkey" FOREIGN KEY ("delivery_invoice_id") REFERENCES "delivery_invoice" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "manual_order_content" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "price" REAL NOT NULL,
    "title" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    CONSTRAINT "manual_order_content_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "manual_package_content" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "price" REAL NOT NULL,
    "title" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "package_id" INTEGER NOT NULL,
    CONSTRAINT "manual_package_content_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "package" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "manual_quote_content" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "price" REAL NOT NULL,
    "title" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "quote_id" INTEGER NOT NULL,
    CONSTRAINT "manual_quote_content_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "quote" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "paid" REAL NOT NULL DEFAULT 0,
    "price" REAL NOT NULL,
    "note" TEXT,
    "delivery_address" TEXT,
    "due_date" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "quote_id" INTEGER,
    "cost_modifier_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "order_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "invoice_category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "order_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "quote" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "order_cost_modifier_id_fkey" FOREIGN KEY ("cost_modifier_id") REFERENCES "cost_modifier" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "order_package" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "package_id" INTEGER NOT NULL,
    CONSTRAINT "order_package_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "order_package_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "package" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "order_payment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "method" TEXT NOT NULL,
    "message" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paid_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_id" INTEGER NOT NULL,
    CONSTRAINT "order_payment_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "order_product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    CONSTRAINT "order_product_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "order_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "order_service" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,
    CONSTRAINT "order_service_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "order_service_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "package" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category_id" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "package_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "inventory_category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "package_product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "package_id" INTEGER NOT NULL,
    CONSTRAINT "package_product_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "package" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "package_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "package_service" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "service_id" INTEGER NOT NULL,
    "package_id" INTEGER NOT NULL,
    CONSTRAINT "package_service_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "package" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "package_service_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cost" REAL NOT NULL,
    "price" REAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "barcode" TEXT,
    "sku" TEXT,
    "quantity" INTEGER,
    "quantity_threshold" INTEGER,
    "location_id" INTEGER,
    "category_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "product_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "inventory_category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "inventory_category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "quote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "price" REAL NOT NULL,
    "title" TEXT NOT NULL,
    "note" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "cost_modifier_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "quote_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "quote_cost_modifier_id_fkey" FOREIGN KEY ("cost_modifier_id") REFERENCES "cost_modifier" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "quote_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "invoice_category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "quote_package" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quote_id" INTEGER NOT NULL,
    "package_id" INTEGER NOT NULL,
    CONSTRAINT "quote_package_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "quote" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "quote_package_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "package" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "quote_product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "quote_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    CONSTRAINT "quote_product_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "quote" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "quote_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "quote_service" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quote_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,
    CONSTRAINT "quote_service_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "quote" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "quote_service_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "service" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "cost" REAL NOT NULL,
    "price" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "inventory_categoryId" INTEGER,
    CONSTRAINT "service_inventory_categoryId_fkey" FOREIGN KEY ("inventory_categoryId") REFERENCES "inventory_category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "image_url" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recruited_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "birth_date" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "salary" INTEGER,
    "status" INTEGER,
    "role_id" INTEGER NOT NULL,
    "contact_information_id" INTEGER NOT NULL,
    "bank_information_id" INTEGER,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_contact_information_id_fkey" FOREIGN KEY ("contact_information_id") REFERENCES "contact_information" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_bank_information_id_fkey" FOREIGN KEY ("bank_information_id") REFERENCES "bank_information" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "user_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user_payment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "method" TEXT NOT NULL,
    "message" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paid_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employee_id" INTEGER NOT NULL,
    CONSTRAINT "user_payment_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "vendor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "contact_information_id" INTEGER NOT NULL,
    "bank_information_id" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "vendor_contact_information_id_fkey" FOREIGN KEY ("contact_information_id") REFERENCES "contact_information" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "vendor_bank_information_id_fkey" FOREIGN KEY ("bank_information_id") REFERENCES "bank_information" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "vendor_log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "vendor_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "vendor_log_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "appointment_order_id_idx" ON "appointment"("order_id");

-- CreateIndex
CREATE INDEX "appointment_delivery_invoice_id_idx" ON "appointment"("delivery_invoice_id");

-- CreateIndex
CREATE INDEX "appointment_category_id_idx" ON "appointment"("category_id");

-- CreateIndex
CREATE INDEX "appointment_customer_id_idx" ON "appointment"("customer_id");

-- CreateIndex
CREATE INDEX "customer_contact_information_id_idx" ON "customer"("contact_information_id");

-- CreateIndex
CREATE INDEX "customer_bank_information_id_idx" ON "customer"("bank_information_id");

-- CreateIndex
CREATE INDEX "customer_log_customer_id_idx" ON "customer_log"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "delivery_invoice_order_id_key" ON "delivery_invoice"("order_id");

-- CreateIndex
CREATE INDEX "delivery_invoice_category_id_idx" ON "delivery_invoice"("category_id");

-- CreateIndex
CREATE INDEX "delivery_invoice_product_delivery_invoice_id_idx" ON "delivery_invoice_product"("delivery_invoice_id");

-- CreateIndex
CREATE INDEX "delivery_invoice_product_product_id_idx" ON "delivery_invoice_product"("product_id");

-- CreateIndex
CREATE INDEX "delivery_invoice_user_delivery_invoice_id_idx" ON "delivery_invoice_user"("delivery_invoice_id");

-- CreateIndex
CREATE INDEX "delivery_invoice_user_user_id_idx" ON "delivery_invoice_user"("user_id");

-- CreateIndex
CREATE INDEX "manual_delivery_invoice_content_delivery_invoice_id_idx" ON "manual_delivery_invoice_content"("delivery_invoice_id");

-- CreateIndex
CREATE INDEX "manual_order_content_order_id_idx" ON "manual_order_content"("order_id");

-- CreateIndex
CREATE INDEX "manual_package_content_package_id_idx" ON "manual_package_content"("package_id");

-- CreateIndex
CREATE INDEX "manual_quote_content_quote_id_idx" ON "manual_quote_content"("quote_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_quote_id_key" ON "order"("quote_id");

-- CreateIndex
CREATE INDEX "order_category_id_idx" ON "order"("category_id");

-- CreateIndex
CREATE INDEX "order_customer_id_idx" ON "order"("customer_id");

-- CreateIndex
CREATE INDEX "order_cost_modifier_id_idx" ON "order"("cost_modifier_id");

-- CreateIndex
CREATE INDEX "order_package_package_id_idx" ON "order_package"("package_id");

-- CreateIndex
CREATE INDEX "order_package_order_id_idx" ON "order_package"("order_id");

-- CreateIndex
CREATE INDEX "order_payment_order_id_idx" ON "order_payment"("order_id");

-- CreateIndex
CREATE INDEX "order_product_order_id_idx" ON "order_product"("order_id");

-- CreateIndex
CREATE INDEX "order_product_product_id_idx" ON "order_product"("product_id");

-- CreateIndex
CREATE INDEX "order_service_order_id_idx" ON "order_service"("order_id");

-- CreateIndex
CREATE INDEX "order_service_service_id_idx" ON "order_service"("service_id");

-- CreateIndex
CREATE INDEX "package_category_id_idx" ON "package"("category_id");

-- CreateIndex
CREATE INDEX "package_product_package_id_idx" ON "package_product"("package_id");

-- CreateIndex
CREATE INDEX "package_product_product_id_idx" ON "package_product"("product_id");

-- CreateIndex
CREATE INDEX "package_service_package_id_idx" ON "package_service"("package_id");

-- CreateIndex
CREATE INDEX "package_service_service_id_idx" ON "package_service"("service_id");

-- CreateIndex
CREATE INDEX "product_location_id_idx" ON "product"("location_id");

-- CreateIndex
CREATE INDEX "product_category_id_idx" ON "product"("category_id");

-- CreateIndex
CREATE INDEX "quote_customer_id_idx" ON "quote"("customer_id");

-- CreateIndex
CREATE INDEX "quote_cost_modifier_id_idx" ON "quote"("cost_modifier_id");

-- CreateIndex
CREATE INDEX "quote_category_id_idx" ON "quote"("category_id");

-- CreateIndex
CREATE INDEX "quote_package_quote_id_idx" ON "quote_package"("quote_id");

-- CreateIndex
CREATE INDEX "quote_package_package_id_idx" ON "quote_package"("package_id");

-- CreateIndex
CREATE INDEX "quote_product_quote_id_idx" ON "quote_product"("quote_id");

-- CreateIndex
CREATE INDEX "quote_product_product_id_idx" ON "quote_product"("product_id");

-- CreateIndex
CREATE INDEX "quote_service_quote_id_idx" ON "quote_service"("quote_id");

-- CreateIndex
CREATE INDEX "quote_service_service_id_idx" ON "quote_service"("service_id");

-- CreateIndex
CREATE INDEX "service_inventory_categoryId_idx" ON "service"("inventory_categoryId");

-- CreateIndex
CREATE INDEX "user_role_id_idx" ON "user"("role_id");

-- CreateIndex
CREATE INDEX "user_contact_information_id_idx" ON "user"("contact_information_id");

-- CreateIndex
CREATE INDEX "user_bank_information_id_idx" ON "user"("bank_information_id");

-- CreateIndex
CREATE INDEX "user_log_user_id_idx" ON "user_log"("user_id");

-- CreateIndex
CREATE INDEX "user_payment_employee_id_idx" ON "user_payment"("employee_id");

-- CreateIndex
CREATE INDEX "vendor_contact_information_id_idx" ON "vendor"("contact_information_id");

-- CreateIndex
CREATE INDEX "vendor_bank_information_id_idx" ON "vendor"("bank_information_id");

-- CreateIndex
CREATE INDEX "vendor_log_vendor_id_idx" ON "vendor_log"("vendor_id");
