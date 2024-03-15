import { Module ,forwardRef} from '@nestjs/common';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { PurchaseRepository } from './purchase.repository';


@Module({
  imports: [],
  exports: [PurchaseService, PurchaseRepository],
  controllers: [PurchaseController],
  providers: [
    PurchaseRepository,
    PurchaseService,
  ],
})
export class PurchaseModule {}
