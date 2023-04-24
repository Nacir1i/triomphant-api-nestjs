-- CreateTable
CREATE TABLE "appointment" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "customer_id" INTEGER,
    "order_id" INTEGER,
    "delivery_invoice_id" INTEGER,

    CONSTRAINT "appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank_information" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "number" TEXT,
    "rib" TEXT,
    "swift" TEXT,
    "ice" TEXT,

    CONSTRAINT "bank_information_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_information" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "address" TEXT,
    "honorific" TEXT,
    "emergency" BOOLEAN,

    CONSTRAINT "contact_information_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cost_modifier" (
    "id" SERIAL NOT NULL,
    "shipping" DOUBLE PRECISION NOT NULL,
    "discount" INTEGER NOT NULL,
    "is_discount_percentage" BOOLEAN NOT NULL,
    "tax" INTEGER NOT NULL,

    CONSTRAINT "cost_modifier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "contact_information_id" INTEGER NOT NULL,
    "bank_information_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_log" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_invoice" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "delivery_invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_invoice_product" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "remaining" INTEGER NOT NULL,
    "delivery_invoice_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "delivery_invoice_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_invoice_user" (
    "id" SERIAL NOT NULL,
    "delivery_invoice_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "delivery_invoice_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_category" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invoice_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manual_delivery_invoice_content" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "title" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "delivery_invoice_id" INTEGER NOT NULL,

    CONSTRAINT "manual_delivery_invoice_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manual_order_content" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "title" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,

    CONSTRAINT "manual_order_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manual_package_content" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "title" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "package_id" INTEGER NOT NULL,

    CONSTRAINT "manual_package_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manual_quote_content" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "title" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "quote_id" INTEGER NOT NULL,

    CONSTRAINT "manual_quote_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "paid" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "price" DOUBLE PRECISION NOT NULL,
    "note" TEXT,
    "delivery_address" TEXT,
    "due_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "quote_id" INTEGER,
    "cost_modifier_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_package" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "package_id" INTEGER NOT NULL,

    CONSTRAINT "order_package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_payment" (
    "id" SERIAL NOT NULL,
    "status" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "method" TEXT NOT NULL,
    "message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paid_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_id" INTEGER NOT NULL,

    CONSTRAINT "order_payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_product" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "order_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_service" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,

    CONSTRAINT "order_service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "package" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category_id" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "package_product" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "package_id" INTEGER NOT NULL,

    CONSTRAINT "package_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "package_service" (
    "id" SERIAL NOT NULL,
    "service_id" INTEGER NOT NULL,
    "package_id" INTEGER NOT NULL,

    CONSTRAINT "package_service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "barcode" TEXT,
    "sku" TEXT,
    "quantity" INTEGER,
    "quantity_threshold" INTEGER,
    "location_id" INTEGER,
    "category_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_category" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "inventory_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quote" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "title" TEXT NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "cost_modifier_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quote_package" (
    "id" SERIAL NOT NULL,
    "quote_id" INTEGER NOT NULL,
    "package_id" INTEGER NOT NULL,

    CONSTRAINT "quote_package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quote_product" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "quote_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "quote_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quote_service" (
    "id" SERIAL NOT NULL,
    "quote_id" INTEGER NOT NULL,
    "service_id" INTEGER NOT NULL,

    CONSTRAINT "quote_service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "cost" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "inventory_categoryId" INTEGER,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recruited_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "birth_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "salary" INTEGER,
    "status" INTEGER,
    "role_id" INTEGER NOT NULL,
    "contact_information_id" INTEGER NOT NULL,
    "bank_information_id" INTEGER,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_log" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_payment" (
    "id" SERIAL NOT NULL,
    "status" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "method" TEXT NOT NULL,
    "message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paid_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employee_id" INTEGER NOT NULL,

    CONSTRAINT "user_payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "contact_information_id" INTEGER NOT NULL,
    "bank_information_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor_log" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "vendor_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vendor_log_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

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

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "invoice_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointment" ADD CONSTRAINT "appointment_delivery_invoice_id_fkey" FOREIGN KEY ("delivery_invoice_id") REFERENCES "delivery_invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_contact_information_id_fkey" FOREIGN KEY ("contact_information_id") REFERENCES "contact_information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_bank_information_id_fkey" FOREIGN KEY ("bank_information_id") REFERENCES "bank_information"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_log" ADD CONSTRAINT "customer_log_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_invoice" ADD CONSTRAINT "delivery_invoice_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "invoice_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_invoice" ADD CONSTRAINT "delivery_invoice_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_invoice_product" ADD CONSTRAINT "delivery_invoice_product_delivery_invoice_id_fkey" FOREIGN KEY ("delivery_invoice_id") REFERENCES "delivery_invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_invoice_product" ADD CONSTRAINT "delivery_invoice_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_invoice_user" ADD CONSTRAINT "delivery_invoice_user_delivery_invoice_id_fkey" FOREIGN KEY ("delivery_invoice_id") REFERENCES "delivery_invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_invoice_user" ADD CONSTRAINT "delivery_invoice_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manual_delivery_invoice_content" ADD CONSTRAINT "manual_delivery_invoice_content_delivery_invoice_id_fkey" FOREIGN KEY ("delivery_invoice_id") REFERENCES "delivery_invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manual_order_content" ADD CONSTRAINT "manual_order_content_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manual_package_content" ADD CONSTRAINT "manual_package_content_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manual_quote_content" ADD CONSTRAINT "manual_quote_content_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "invoice_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "quote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_cost_modifier_id_fkey" FOREIGN KEY ("cost_modifier_id") REFERENCES "cost_modifier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_package" ADD CONSTRAINT "order_package_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_package" ADD CONSTRAINT "order_package_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_payment" ADD CONSTRAINT "order_payment_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_product" ADD CONSTRAINT "order_product_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_product" ADD CONSTRAINT "order_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_service" ADD CONSTRAINT "order_service_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_service" ADD CONSTRAINT "order_service_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package" ADD CONSTRAINT "package_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "inventory_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package_product" ADD CONSTRAINT "package_product_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package_product" ADD CONSTRAINT "package_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package_service" ADD CONSTRAINT "package_service_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package_service" ADD CONSTRAINT "package_service_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "inventory_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote" ADD CONSTRAINT "quote_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote" ADD CONSTRAINT "quote_cost_modifier_id_fkey" FOREIGN KEY ("cost_modifier_id") REFERENCES "cost_modifier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote" ADD CONSTRAINT "quote_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "invoice_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_package" ADD CONSTRAINT "quote_package_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_package" ADD CONSTRAINT "quote_package_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_product" ADD CONSTRAINT "quote_product_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_product" ADD CONSTRAINT "quote_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_service" ADD CONSTRAINT "quote_service_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_service" ADD CONSTRAINT "quote_service_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_inventory_categoryId_fkey" FOREIGN KEY ("inventory_categoryId") REFERENCES "inventory_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_contact_information_id_fkey" FOREIGN KEY ("contact_information_id") REFERENCES "contact_information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_bank_information_id_fkey" FOREIGN KEY ("bank_information_id") REFERENCES "bank_information"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_log" ADD CONSTRAINT "user_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_payment" ADD CONSTRAINT "user_payment_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor" ADD CONSTRAINT "vendor_contact_information_id_fkey" FOREIGN KEY ("contact_information_id") REFERENCES "contact_information"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor" ADD CONSTRAINT "vendor_bank_information_id_fkey" FOREIGN KEY ("bank_information_id") REFERENCES "bank_information"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_log" ADD CONSTRAINT "vendor_log_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
