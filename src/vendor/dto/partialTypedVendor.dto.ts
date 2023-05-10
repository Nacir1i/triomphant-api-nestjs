import { PartialType } from '@nestjs/swagger';
import { VendorDto } from './vendor.dto';

export class PartialTypedVendor extends PartialType(VendorDto) {}
