import { PartialType } from '@nestjs/swagger';
import { VendorDto } from './vendor.dto';

export class partialTypedVendor extends PartialType(VendorDto) {}
