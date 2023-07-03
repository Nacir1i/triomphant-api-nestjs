import { Injectable } from '@nestjs/common';
import {
  appointment,
  customer,
  manual_order_content,
  order,
  order_package,
  order_product,
  order_service,
} from '@prisma/client';
import { AppointmentsService } from 'src/appointments/appointments.service';
import { CustomerService } from 'src/customer/customer.service';
import { OrdersService } from 'src/orders/orders.service';

export interface Dashboard {
  meta: {
    date_origin: number;
    date_minimum: number;
  };
  stats: {
    customers: Customers;
    appointments: Appointments;
    cash_flow: CashFlow;
  };
}

interface CashFlow {
  expenses: number;
  revenue: number;
  profit: number;
  unpaid: number;
  advances: number;
  remainder: number;
}

interface Customers {
  frequencies: Record<string, number>;
  total: number;
  repeating: number;
  unique: number;
}

interface Appointments {
  total: number;
  done: number;
  running: number;
}

@Injectable()
export class DashboardService {
  private readonly DAY_MS = 86_400_000;
  private readonly MONTH_MS = this.DAY_MS * 31;
  private readonly BI_WEEK_MS = this.DAY_MS * 14;

  constructor(
    private readonly appointmentService: AppointmentsService,
    private readonly customerService: CustomerService,
    private readonly orderService: OrdersService,
  ) {}

  async getDashboard(): Promise<Dashboard> {
    const date_origin = Date.now();
    const date_minimum = date_origin - this.BI_WEEK_MS;

    const customers = await this.getCustomers(date_minimum, date_origin);
    const appointments = await this.getAppointments(date_minimum);
    const cash_flow = await this.getCashFlow(date_minimum);

    return {
      meta: {
        date_origin,
        date_minimum,
      },
      stats: {
        customers,
        appointments,
        cash_flow,
      },
    };
  }

  private async getCashFlow(date_minimum: number): Promise<CashFlow> {
    const orders = await this.orderService.findDate(date_minimum);

    const revenue: number = orders.reduce(
      (prev: number, order: order) => prev + order.price,
      0,
    );

    const expenses: number = orders.reduce((prev, order) => {
      const packages_cost = order.packages.reduce(
        (prev: number, pack: order_package) => prev + pack.cost * pack.quantity,
        0,
      );
      const products_cost = order.products.reduce(
        (prev: number, product: order_product) =>
          prev + product.cost * product.quantity,
        0,
      );
      const services_cost = order.services.reduce(
        (prev: number, service: order_service) => prev + service.cost,
        0,
      );
      const manual_content_cost = order.manual_content.reduce(
        (prev: number, content: manual_order_content) => prev + content.cost,
        0,
      );

      const cost =
        packages_cost + products_cost + services_cost + manual_content_cost;

      return prev + cost;
    }, 0);

    const profit = revenue - expenses;

    return {
      revenue,
      expenses,
      profit,
      unpaid: 0,
      advances: 0,
      remainder: 0,
    };
  }

  private async getCustomers(
    date_minimum: number,
    date_origin: number,
  ): Promise<Customers> {
    const customers = await this.customerService.findDate(date_minimum);

    const frequencies = new Map();
    for (let frequency_index = 0; frequency_index < 14; frequency_index++) {
      const date_object = new Date(date_origin - this.DAY_MS * frequency_index);
      const month = (date_object.getMonth() + 1).toFixed(0).padStart(2, '0');
      const day_of_month = date_object.getDate().toFixed(0).padStart(2, '0');
      const frequency_key = `${month}/${day_of_month}`;
      frequencies.set(frequency_key, 0);
    }

    let [counter_customers_repeating, counter_customers_unique] = [0, 0];
    customers.forEach((customer: customer & { orders: order[] }) => {
      const date_object = new Date(customer.created_at);
      const month = (date_object.getMonth() + 1).toFixed(0).padStart(2, '0');
      const day_of_month = date_object.getDate().toFixed(0).padStart(2, '0');
      const frequency_key = `${month}/${day_of_month}`;

      const old_frequency = frequencies.get(frequency_key) ?? 0;
      frequencies.set(frequency_key, old_frequency + 1);
      // ---
      if (customer.orders.length > 1) counter_customers_repeating += 1;
      else counter_customers_unique += 1;
    });
    return {
      frequencies: Object.fromEntries(frequencies),
      repeating: counter_customers_repeating,
      unique: counter_customers_unique,
      total: customers.length,
    };
  }

  private async getAppointments(date_minimum: number): Promise<Appointments> {
    const appointments = await this.appointmentService.findDate(date_minimum);

    let [counter_appointments_done, counter_appointments_running] = [0, 0];
    appointments.forEach((appointment: appointment) => {
      if (appointment.status === 3) {
        counter_appointments_done += 1;
      } else {
        counter_appointments_running += 1;
      }
    });

    return {
      done: counter_appointments_done,
      running: counter_appointments_running,
      total: appointments.length,
    };
  }
}
