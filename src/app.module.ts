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
import { QuotesModule } from './quotes/quotes.module';
import { OrdersModule } from './orders/orders.module';
import { DeliveryInvoiceModule } from './deliveryInvoice/deliveryInvoice.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { UserService } from './user/user.service';
import { WebsocketModule } from './websocket/websocket.module';
import { PingModule } from './ping/ping.module';

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
    QuotesModule,
    OrdersModule,
    DeliveryInvoiceModule,
    AppointmentsModule,
    WebsocketModule,
    PingModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    UserService,
  ],
})
export class AppModule {}
