import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CustomerModule } from './customer/customer.module';
import { VendorModule } from './vendor/vendor.module';
import { RolesModule } from './roles/roles.module';
import { LocationsModule } from './locations/locations.module';
import { InventoryModule } from './inventory/inventory.module';
import { InvoiceCategoryModule } from './invoiceCategory/invoiceCategory.module';
import { ProductsModule } from './products/products.module';
import { ServicesModule } from './services/services.module';
import { PackagesModule } from './packages/packages.module';
import { MaterialsModule } from './materials/materials.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    CustomerModule,
    VendorModule,
    RolesModule,
    LocationsModule,
    InventoryModule,
    InvoiceCategoryModule,
    ProductsModule,
    ServicesModule,
    PackagesModule,
    MaterialsModule,
  ],
})
export class AppModule {}
